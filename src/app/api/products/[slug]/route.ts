import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
  const { slug } = await params;

  const product = await db.product.findFirst({
    where: { slug, active: true },
    select: { id: true, name: true, price: true, currency: true, type: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    currency: product.currency,
    type: product.type,
  });
}
