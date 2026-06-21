import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { constructStripeEvent } from "@/lib/stripe";
import { db } from "@/lib/db";
import { sendOrderConfirmationEmail, sendMoodleAccessEmail } from "@/lib/email";
import { sendProductEmail } from "@/lib/sendProductEmail";
import { getOrCreateUser, enrolUserToCourse } from "@/lib/moodle/client";
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
        console.error(`Moodle enrolment failed for order item ${item.id}:`, err);
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
