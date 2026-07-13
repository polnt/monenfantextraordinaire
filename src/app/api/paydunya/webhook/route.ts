import { NextResponse } from "next/server";
import {
  verifyPaydunyaWebhookSignature,
  parsePaydunyaWebhook,
  verifyPaydunyaTransaction,
} from "@/lib/paydunya";
import { db } from "@/lib/db";
import { sendOrderConfirmationEmail, sendMoodleAccessEmail } from "@/lib/email";
import { sendProductEmail } from "@/lib/sendProductEmail";
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

  let payload: ReturnType<typeof parsePaydunyaWebhook>;
  try {
    payload = parsePaydunyaWebhook(params);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }

  try {
    verifyPaydunyaWebhookSignature(payload.hash);
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

  let txStatus: Awaited<ReturnType<typeof verifyPaydunyaTransaction>>;
  try {
    txStatus = await verifyPaydunyaTransaction(invoiceToken);
  } catch (err) {
    console.error("PayDunya transaction verification failed:", err);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }

  if (txStatus.status !== "completed") {
    return NextResponse.json({ received: true });
  }

  // Defense in depth: confirm the amount PayDunya actually charged matches
  // what we expected for this order before marking it PAID and delivering goods.
  const expectedAmount = order.totalAmount.toNumber();

  if (txStatus.totalAmount !== expectedAmount) {
    console.error(
      `PayDunya amount mismatch for order ${order.id}: expected ${expectedAmount} ${order.currency}, got ${txStatus.totalAmount}`
    );
    return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
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
        const moodleCourseId = item.product.training.moodleCourseId;
        let moodleUserId: number;
        try {
          moodleUserId = await getOrCreateUser(
            order.customerEmail,
            order.customerFirstName,
            order.customerLastName
          );
        } catch (err) {
          console.error(`[Moodle] getOrCreateUser failed for order item ${item.id}:`, err);
          throw err;
        }

        try {
          await enrolUserToCourse(moodleUserId, moodleCourseId);
        } catch (err) {
          console.error(`[Moodle] enrolUserToCourse failed (userId=${moodleUserId}, courseId=${moodleCourseId}) for order item ${item.id}:`, err);
          throw err;
        }

        const moodleLink = `${process.env.NEXT_PUBLIC_MOODLE_BASE_URL}/course/view.php?id=${moodleCourseId}`;
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
        console.error(`[Moodle] Full enrolment flow failed for order item ${item.id}:`, err);
      }
    } else if (item.product.type === ProductType.EBOOK) {
      try {
        await sendProductEmail({
          productId: item.productId,
          productName: item.productName,
          email: order.customerEmail,
          orderId: order.id,
          orderNumber: order.orderNumber,
        });
      } catch (err) {
        console.error(`Failed to send product email for order item ${item.id}:`, err);
      }
    }
  }

  // Exclude items already handled individually (TRAINING with Moodle, EBOOK with download link)
  const itemsForConfirmation = order.items.filter(
    (item) =>
      item.product.type !== ProductType.EBOOK &&
      (item.product.type !== ProductType.TRAINING || !item.product.training?.moodleCourseId)
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
