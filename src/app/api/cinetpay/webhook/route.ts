import { NextResponse } from "next/server";
import { parseCinetPayWebhook, verifyCinetPayPayment } from "@/lib/cinetpay";
import { db } from "@/lib/db";
import { sendOrderConfirmationEmail, sendMoodleAccessEmail } from "@/lib/email";
import { ProductType } from "@prisma/client";

export async function POST(req: Request): Promise<Response> {
  const rawText = await req.text();

  let body: unknown;
  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      body = JSON.parse(rawText) as unknown;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
  } else {
    const params = new URLSearchParams(rawText);
    const obj: Record<string, string> = {};
    params.forEach((value, key) => {
      obj[key] = value;
    });
    body = obj;
  }

  let payload: ReturnType<typeof parseCinetPayWebhook>;
  try {
    payload = parseCinetPayWebhook(body);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }

  const transactionId = payload.cpm_trans_id;

  const order = await db.order.findUnique({
    where: { id: transactionId },
    include: { items: { include: { product: true } } },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "PENDING") {
    return NextResponse.json({ received: true });
  }

  let paymentStatus: Awaited<ReturnType<typeof verifyCinetPayPayment>>;
  try {
    paymentStatus = await verifyCinetPayPayment(transactionId);
  } catch (err) {
    console.error("CinetPay payment verification failed:", err);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }

  if (paymentStatus.status !== "ACCEPTED") {
    return NextResponse.json({ received: true });
  }

  await db.order.update({
    where: { id: transactionId },
    data: { status: "PAID", paymentId: transactionId },
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
