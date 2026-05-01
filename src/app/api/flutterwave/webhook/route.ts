import { NextResponse } from "next/server";
import {
  verifyFlutterwaveWebhookSignature,
  parseFlutterwaveWebhook,
  verifyFlutterwaveTransaction,
} from "@/lib/flutterwave";
import { db } from "@/lib/db";
import { sendOrderConfirmationEmail, sendMoodleAccessEmail } from "@/lib/email";
import { ProductType } from "@prisma/client";

export async function POST(req: Request): Promise<Response> {
  const signature = req.headers.get("verif-hash");

  try {
    verifyFlutterwaveWebhookSignature(signature);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  let body: unknown;
  try {
    body = (await req.json()) as unknown;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  let payload: ReturnType<typeof parseFlutterwaveWebhook>;
  try {
    payload = parseFlutterwaveWebhook(body);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }

  // Only process successful charge events
  if (payload.event !== "charge.completed") {
    return NextResponse.json({ received: true });
  }

  const transactionId = payload.data.id;
  const txRef = payload.data.tx_ref;

  const order = await db.order.findUnique({
    where: { id: txRef },
    include: { items: { include: { product: { include: { training: true } } } } },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "PENDING") {
    return NextResponse.json({ received: true });
  }

  let txStatus: Awaited<ReturnType<typeof verifyFlutterwaveTransaction>>;
  try {
    txStatus = await verifyFlutterwaveTransaction(transactionId);
  } catch (err) {
    console.error("Flutterwave transaction verification failed:", err);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }

  if (txStatus.status !== "successful") {
    return NextResponse.json({ received: true });
  }

  // Atomically transition to PAID — prevents double-processing on concurrent deliveries
  const updated = await db.order.updateMany({
    where: { id: txRef, status: "PENDING" },
    data: { status: "PAID", paymentId: String(transactionId) },
  });

  if (updated.count === 0) {
    return NextResponse.json({ received: true });
  }

  const customerName = `${order.customerFirstName} ${order.customerLastName}`;

  const moodleBaseUrl = process.env.MOODLE_BASE_URL;
  const moodleToken = process.env.MOODLE_TOKEN;

  for (const item of order.items) {
    if (
      item.product.type === ProductType.TRAINING &&
      item.product.training?.moodleCourseId
    ) {
      if (!moodleBaseUrl || !moodleToken) {
        console.error(
          `Cannot send Moodle link for order item ${item.id}: MOODLE_BASE_URL or MOODLE_TOKEN is not configured`
        );
        continue;
      }
      const moodleLink = `${moodleBaseUrl}/course/view.php?id=${item.product.training?.moodleCourseId}&token=${moodleToken}`;
      try {
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
          `Failed to send Moodle email for order item ${item.id}:`,
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
