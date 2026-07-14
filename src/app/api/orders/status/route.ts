import { NextResponse } from "next/server";
import { ProductType, PaymentGateway } from "@prisma/client";
import { db } from "@/lib/db";
import { getOrCreateDownloadUrl } from "@/lib/downloadToken";
import { verifyOrderReference } from "@/lib/paydunya";

interface DownloadEntry {
  productId: string;
  productName: string;
  url: string;
}

interface ResolvedOrderId {
  orderId: string;
  // PayDunya redirects carry the bare orderId with no session to verify against,
  // so lookups via orderIdParam must be restricted to PayDunya orders. Stripe
  // orders must always be resolved through a verified session_id.
  requireGateway: PaymentGateway | null;
}

async function resolveOrderId(
  sessionId: string | null,
  orderIdParam: string | null,
  signature: string | null
): Promise<ResolvedOrderId | null> {
  if (orderIdParam) {
    if (!signature || !verifyOrderReference(orderIdParam, signature)) {
      return null;
    }
    return { orderId: orderIdParam, requireGateway: PaymentGateway.PAYDUNYA };
  }

  if (sessionId) {
    try {
      const { stripe } = await import("@/lib/stripe");
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const orderId = session.metadata?.orderId;
      return orderId ? { orderId, requireGateway: null } : null;
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
  const signature = url.searchParams.get("sig");

  const resolved = await resolveOrderId(sessionId, orderIdParam, signature);

  if (!resolved) {
    return NextResponse.json(
      { error: "Missing or invalid session_id/orderId." },
      { status: 400 }
    );
  }

  const order = await db.order.findUnique({
    where: { id: resolved.orderId },
    include: { items: { include: { product: { include: { ebook: true } } } } },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  if (resolved.requireGateway && order.gateway !== resolved.requireGateway) {
    return NextResponse.json({ error: "Invalid order lookup." }, { status: 403 });
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
      const fileKeys = item.product.ebook?.fileKeys ?? [];

      if (fileKeys.length > 1) {
        // Pack — one file per bundled tool. Emit a direct per-file link for
        // each so the confirmation page can show all of them at once,
        // instead of a single link to the intermediate file-picker page.
        fileKeys.forEach((key, i) => {
          const label = key.split("/").pop() ?? `Fichier ${i + 1}`;
          downloads.push({
            productId: item.productId,
            productName: `${item.productName} — ${label}`,
            url: `${downloadUrl}?file=${i}`,
          });
        });
      } else {
        downloads.push({
          productId: item.productId,
          productName: item.productName,
          url: downloadUrl,
        });
      }
    } catch (err) {
      console.error(
        `[orders/status] Failed to build download URL for order item ${item.id}:`,
        err
      );
    }
  }

  return NextResponse.json({ status: order.status, downloads });
}
