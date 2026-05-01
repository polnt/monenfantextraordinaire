import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { constructStripeEvent } from "@/lib/stripe";
import { db } from "@/lib/db";
import { sendOrderConfirmationEmail, sendMoodleAccessEmail } from "@/lib/email";
import { ProductType } from "@prisma/client";

export async function POST(req: Request): Promise<Response> {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = constructStripeEvent(payload, signature);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  const orderId = session.metadata?.orderId;

  if (!orderId) {
    return NextResponse.json(
      { error: "Missing orderId in session metadata" },
      { status: 400 }
    );
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: { include: { training: true } } } } },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "PENDING") {
    return NextResponse.json({ received: true });
  }

  // Atomically mark order as PAID — only if it's still PENDING
  // This prevents duplicate processing if the same webhook is delivered twice
  const updated = await db.order.updateMany({
    where: { id: orderId, status: "PENDING" },
    data: { status: "PAID", paymentId: paymentIntentId },
  });

  // If no rows were updated, another webhook already processed this order
  if (updated.count === 0) {
    return NextResponse.json({ received: true });
  }

  const customerName = `${order.customerFirstName} ${order.customerLastName}`;

  const moodleBaseUrl = process.env.MOODLE_BASE_URL;
  const moodleToken = process.env.MOODLE_TOKEN;

  for (const item of order.items) {
    if (item.product.type === ProductType.TRAINING && item.product.training?.moodleCourseId) {
      if (!moodleBaseUrl || !moodleToken) {
        console.error(`Cannot send Moodle link for order item ${item.id}: MOODLE_BASE_URL or MOODLE_TOKEN is not configured`);
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
        console.error(`Failed to send Moodle email for order item ${item.id}:`, err);
      }
    }
  }

  // Include TRAINING items without a moodleCourseId — they have no access link to send
  // so they must appear in the regular confirmation email
  const itemsForConfirmation = order.items.filter(
    (item) => item.product.type !== ProductType.TRAINING || !item.product.training?.moodleCourseId
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
