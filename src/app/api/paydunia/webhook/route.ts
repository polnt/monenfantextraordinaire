import { NextResponse } from "next/server";
import {
  verifyPayduniaWebhookSignature,
  parsePayduniaWebhook,
  verifyPayduniaTransaction,
} from "@/lib/paydunia";
import { db } from "@/lib/db";
import { sendOrderConfirmationEmail, sendMoodleAccessEmail } from "@/lib/email";
import { getOrCreateUser, enrolUserToCourse } from "@/lib/moodle/client";
import { ProductType } from "@prisma/client";

export async function POST(req: Request): Promise<Response> {
  let params: URLSearchParams;
  try {
    const text = await req.text();
    params = new URLSearchParams(text);
  } catch {
    return NextResponse.json({ error: "Invalid webhook body" }, { status: 400 });
  }

  let payload: ReturnType<typeof parsePayduniaWebhook>;
  try {
    payload = parsePayduniaWebhook(params);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }

  try {
    verifyPayduniaWebhookSignature(payload.hash);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  // Only process completed payment events
  if (payload.status !== "completed") {
    return NextResponse.json({ received: true });
  }

  const invoiceToken = payload.invoiceToken;

  const order = await db.order.findFirst({
    where: { paymentId: invoiceToken },
    include: { items: { include: { product: { include: { training: true } } } } },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "PENDING") {
    return NextResponse.json({ received: true });
  }

  let txStatus: Awaited<ReturnType<typeof verifyPayduniaTransaction>>;
  try {
    txStatus = await verifyPayduniaTransaction(invoiceToken);
  } catch (err) {
    console.error("PayDunia transaction verification failed:", err);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }

  if (txStatus.status !== "completed") {
    return NextResponse.json({ received: true });
  }

  // Atomically transition to PAID — prevents double-processing on concurrent deliveries
  const updated = await db.order.updateMany({
    where: { id: order.id, status: "PENDING" },
    data: { status: "PAID" },
  });

  if (updated.count === 0) {
    return NextResponse.json({ received: true });
  }

  const customerName = `${order.customerFirstName} ${order.customerLastName}`;

  for (const item of order.items) {
    if (
      item.product.type === ProductType.TRAINING &&
      item.product.training?.moodleCourseId
    ) {
      try {
        const moodleUserId = await getOrCreateUser(
          order.customerEmail,
          order.customerFirstName,
          order.customerLastName
        );
        await enrolUserToCourse(moodleUserId, item.product.training.moodleCourseId);
        const moodleLink = `${process.env.NEXT_PUBLIC_MOODLE_BASE_URL}/course/view.php?id=${item.product.training.moodleCourseId}`;
        await sendMoodleAccessEmail({
          to: order.customerEmail,
          customerName,
          orderNumber: order.orderNumber,
          courseName: item.productName,
          moodleLink,
        });
        await db.orderItem.update({
          where: { id: item.id },
          data: { moodleLinkSent: true, moodleLinkSentAt: new Date() },
        });
      } catch (err) {
        console.error(
          `Moodle enrolment failed for order item ${item.id}:`,
          err
        );
      }
    }
  }

  // Include TRAINING items without a moodleCourseId in the regular confirmation email
  const itemsForConfirmation = order.items.filter(
    (item) =>
      item.product.type !== ProductType.TRAINING || !item.product.training?.moodleCourseId
  );

  if (itemsForConfirmation.length > 0) {
    await sendOrderConfirmationEmail({
      to: order.customerEmail,
      customerName,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount.toNumber(),
      currency: order.currency,
      items: itemsForConfirmation.map((item) => ({
        name: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toNumber(),
      })),
    });
  }

  return NextResponse.json({ received: true });
}
