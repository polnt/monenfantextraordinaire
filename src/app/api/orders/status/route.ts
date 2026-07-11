import { NextResponse } from "next/server";
import { ProductType } from "@prisma/client";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getOrCreateDownloadUrl } from "@/lib/downloadToken";

interface DownloadEntry {
  productId: string;
  productName: string;
  url: string;
}

async function resolveOrderId(
  sessionId: string | null,
  orderIdParam: string | null
): Promise<string | null> {
  if (orderIdParam) return orderIdParam;

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return session.metadata?.orderId ?? null;
    } catch (err) {
      console.error("[orders/status] Failed to retrieve Stripe session:", err);
      return null;
    }
  }

  return null;
}

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  const orderIdParam = url.searchParams.get("orderId");

  const orderId = await resolveOrderId(sessionId, orderIdParam);

  if (!orderId) {
    return NextResponse.json(
      { error: "Missing or invalid session_id/orderId." },
      { status: 400 }
    );
  }

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  if (order.status !== "PAID") {
    return NextResponse.json({ status: order.status, downloads: [] });
  }

  const downloads: DownloadEntry[] = [];
  for (const item of order.items) {
    if (item.product.type !== ProductType.EBOOK) continue;
    try {
      const downloadUrl = await getOrCreateDownloadUrl({
        productId: item.productId,
        orderId: order.id,
        email: order.customerEmail,
      });
      downloads.push({
        productId: item.productId,
        productName: item.productName,
        url: downloadUrl,
      });
    } catch (err) {
      console.error(
        `[orders/status] Failed to build download URL for order item ${item.id}:`,
        err
      );
    }
  }

  return NextResponse.json({ status: order.status, downloads });
}
