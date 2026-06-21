import { NextResponse } from "next/server";
import { AccessType, ProductType } from "@prisma/client";
import { db } from "@/lib/db";
import { sendProductEmail } from "@/lib/sendProductEmail";
import { getPublicUrl } from "@/lib/r2";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
  const { slug } = await params;

  let email: string;
  let customerName: string;

  try {
    const body = (await req.json()) as { email?: unknown; customerName?: unknown };

    if (typeof body.email !== "string" || !body.email.includes("@")) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    email = body.email.trim().toLowerCase();
    customerName =
      typeof body.customerName === "string" && body.customerName.trim()
        ? body.customerName.trim()
        : "là";
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide." },
      { status: 400 }
    );
  }

  // Always verify server-side that the product is free — never trust client data
  const product = await db.product.findFirst({
    where: {
      slug,
      active: true,
      type: ProductType.EBOOK,
      accessType: AccessType.FREE_DIRECT,
    },
    include: { ebook: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }

  const fileKey = product.ebook?.fileKey;
  const directUrl = fileKey ? getPublicUrl(fileKey) : undefined;

  try {
    await sendProductEmail({
      productId: product.id,
      productName: product.name,
      email,
      customerName,
      orderId: null,
      directUrl,
    });
  } catch (err) {
    console.error(
      `[claim-free] Failed to send email for product ${product.slug} to ${email}:`,
      err
    );
    // Return generic success — don't reveal internal errors to client
  }

  // Generic response regardless of outcome to avoid email enumeration
  return NextResponse.json({ success: true });
}
