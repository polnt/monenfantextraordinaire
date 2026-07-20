import { NextResponse } from "next/server";
import {
  verifyPaydunyaWebhookSignature,
  parsePaydunyaWebhook,
  verifyPaydunyaTransaction,
} from "@/lib/paydunya";
import { db } from "@/lib/db";
import { sendTrainingConfirmationEmail } from "@/lib/sendTrainingConfirmationEmail";
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
  } catch (err) {
    console.error("PayDunya webhook: invalid payload:", err, "raw keys received:", Array.from(params.keys()));
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
          amount: item.unitPrice.toNumber() * item.quantity,
          currency: order.currency,
        });
      } catch (err) {
        console.error(`Failed to send product email for order item ${item.id}:`, err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
