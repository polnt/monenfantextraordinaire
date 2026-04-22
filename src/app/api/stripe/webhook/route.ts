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
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    return NextResponse.json(
      { error: "Missing orderId in session metadata" },
      { status: 400 }
    );
  }

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "PENDING") {
    return NextResponse.json({ received: true });
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);

  await db.order.update({
    where: { id: orderId },
    data: { status: "PAID", paymentId: paymentIntentId },
  });

  const customerName = `${order.customerFirstName} ${order.customerLastName}`;

  for (const item of order.items) {
    if (item.product.type === ProductType.TRAINING && item.product.moodleCourseId) {
      const moodleLink = `${process.env.MOODLE_BASE_URL}/course/view.php?id=${item.product.moodleCourseId}&token=${process.env.MOODLE_TOKEN}`;
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
    }
  }

  const nonTrainingItems = order.items.filter(
    (item) => item.product.type !== ProductType.TRAINING
  );

  if (nonTrainingItems.length > 0) {
    await sendOrderConfirmationEmail({
      to: order.customerEmail,
      customerName,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount.toNumber(),
      currency: order.currency,
      items: nonTrainingItems.map((item) => ({
        name: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toNumber(),
      })),
    });
  }

  return NextResponse.json({ received: true });
}
