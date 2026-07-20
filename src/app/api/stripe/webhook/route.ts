import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { constructStripeEvent } from "@/lib/stripe";
import { db } from "@/lib/db";
import { sendTrainingConfirmationEmail } from "@/lib/sendTrainingConfirmationEmail";
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

  // Defense in depth: confirm Stripe actually charged the amount we expected
  // for this order before marking it PAID and delivering goods.
  const expectedAmountCents = order.totalAmount.mul(100).round().toNumber();

  if (
    session.amount_total !== expectedAmountCents ||
    session.currency?.toUpperCase() !== order.currency
  ) {
    console.error(
      `Stripe amount mismatch for order ${order.id}: expected ${expectedAmountCents} ${order.currency}, got ${session.amount_total} ${session.currency}`
    );
    return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
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

  for (const item of order.items) {
    if (item.product.type === ProductType.TRAINING) {
      const moodleCourseId = item.product.training?.moodleCourseId;
      if (moodleCourseId) {
        try {
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
        } catch (err) {
          console.error(`[Moodle] Full enrolment flow failed for order item ${item.id}:`, err);
          continue;
        }

        try {
          await sendTrainingConfirmationEmail({
            to: order.customerEmail,
            customerFirstName: order.customerFirstName,
            trainingName: item.productName,
            orderNumber: order.orderNumber,
          });
        } catch (err) {
          console.error(`Failed to send training confirmation email for order item ${item.id}:`, err);
          continue;
        }

        await db.orderItem.update({
          where: { id: item.id },
          data: { moodleLinkSent: true, moodleLinkSentAt: new Date() },
        });
      } else {
        console.error(`[Moodle] No moodleCourseId configured for training order item ${item.id}, skipping confirmation email`);
      }
    } else if (item.product.type === ProductType.EBOOK) {
      try {
        await sendProductEmail({
          productId: item.productId,
          productName: item.productName,
          email: order.customerEmail,
          orderId: order.id,
          orderNumber: order.orderNumber,
          customerFirstName: order.customerFirstName,
          amount: item.unitPrice.mul(item.quantity).toNumber(),
          currency: order.currency,
        });
      } catch (err) {
        console.error(`Failed to send product email for order item ${item.id}:`, err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
