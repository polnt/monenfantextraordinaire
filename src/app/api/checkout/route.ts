import { NextResponse } from "next/server";
import { Prisma, type Order } from "@prisma/client";
import { db } from "@/lib/db";
import { getPaymentGateway } from "@/lib/geo";
import { createStripeCheckoutSession, type CheckoutLineItem } from "@/lib/stripe";
import {
  initializePayduniaPayment,
  convertForPaydunia,
  type PayduniaInitParams,
} from "@/lib/paydunia";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

interface CheckoutRequestBody {
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone?: string;
  customerCountry: string;
  items: CheckoutItem[];
}

function parseCheckoutBody(value: unknown): CheckoutRequestBody | null {
  if (typeof value !== "object" || value === null) return null;
  if (
    !("customerEmail" in value) ||
    !("customerFirstName" in value) ||
    !("customerLastName" in value) ||
    !("customerCountry" in value) ||
    !("items" in value)
  )
    return null;

  const v = value as {
    customerEmail: unknown;
    customerFirstName: unknown;
    customerLastName: unknown;
    customerCountry: unknown;
    items: unknown;
  };

  if (
    typeof v.customerEmail !== "string" ||
    typeof v.customerFirstName !== "string" ||
    typeof v.customerLastName !== "string" ||
    typeof v.customerCountry !== "string" ||
    !Array.isArray(v.items) ||
    v.items.length === 0
  )
    return null;

  // Validate each item has required fields with correct types
  for (const item of v.items) {
    const itemObj = item as Record<string, unknown>;
    if (
      typeof item !== "object" ||
      item === null ||
      typeof itemObj.productId !== "string" ||
      typeof itemObj.quantity !== "number" ||
      !Number.isInteger(itemObj.quantity) ||
      itemObj.quantity <= 0
    ) {
      return null;
    }
  }

  return value as CheckoutRequestBody;
}

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase();
  return `ORD-${year}-${suffix}`;
}

export async function POST(req: Request): Promise<Response> {
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const body = parseCheckoutBody(rawBody);
  if (!body) {
    return NextResponse.json(
      { error: "Missing or invalid required fields" },
      { status: 400 }
    );
  }

  // Aggregate quantities per product to handle duplicate productIds
  const requestedQuantityByProductId = new Map<string, number>();
  for (const item of body.items) {
    requestedQuantityByProductId.set(
      item.productId,
      (requestedQuantityByProductId.get(item.productId) ?? 0) + item.quantity
    );
  }

  const productIds = Array.from(requestedQuantityByProductId.keys());
  const products = await db.product.findMany({
    where: { id: { in: productIds }, active: true },
  });

  if (products.length !== productIds.length) {
    return NextResponse.json(
      { error: "One or more products are unavailable" },
      { status: 400 }
    );
  }

  const productsById = new Map(products.map((product) => [product.id, product]));

  const gateway = getPaymentGateway(body.customerCountry);
  const [firstProduct] = products;
  const productCurrency = firstProduct?.currency ?? "EUR";

  const hasMixedCurrencies = products.some(
    (product) => product.currency !== productCurrency
  );

  if (hasMixedCurrencies) {
    return NextResponse.json(
      { error: "All items in the cart must use the same currency" },
      { status: 400 }
    );
  }

  const orderItems = body.items.map((cartItem) => {
    const product = productsById.get(cartItem.productId)!;
    return {
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
      quantity: cartItem.quantity,
    };
  });

  const totalAmount = orderItems.reduce(
    (sum, item) => sum.add(item.unitPrice.mul(item.quantity)),
    new Prisma.Decimal(0)
  );

  let order: Order;
  try {
    order = await db.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        idempotencyKey: crypto.randomUUID(),
        customerEmail: body.customerEmail,
        customerFirstName: body.customerFirstName,
        customerLastName: body.customerLastName,
        customerPhone: body.customerPhone ?? null,
        customerCountry: body.customerCountry,
        gateway,
        totalAmount,
        currency: productCurrency,
        items: { create: orderItems },
      },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  try {
    if (gateway === "STRIPE") {
      const lineItems: CheckoutLineItem[] = orderItems.map((item) => ({
        name: item.productName,
        unitAmountCents: item.unitPrice.mul(100).round().toNumber(),
        currency: productCurrency,
        quantity: item.quantity,
      }));

      const session = await createStripeCheckoutSession({
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerEmail: body.customerEmail,
        lineItems,
        successUrl: `${baseUrl}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/checkout`,
      });

      if (!session.url) {
        throw new Error("Stripe session URL is null");
      }

      await db.order.update({
        where: { id: order.id },
        data: { paymentId: session.id },
      });

      return NextResponse.json({ paymentUrl: session.url });
    } else {
      const converted = convertForPaydunia(
        totalAmount.toNumber(),
        productCurrency,
        body.customerCountry
      );

      const paydunaParams: PayduniaInitParams = {
        orderId: order.id,
        orderNumber: order.orderNumber,
        amount: converted.amount,
        currency: converted.currency,
        redirectUrl: `${baseUrl}/checkout/confirmation?orderId=${order.id}`,
        cancelUrl: `${baseUrl}/checkout`,
        callbackUrl: `${baseUrl}/api/paydunia/webhook`,
        customerEmail: body.customerEmail,
        customerName: `${body.customerFirstName} ${body.customerLastName}`,
        customerPhone: body.customerPhone,
        description: `Order ${order.orderNumber}`,
      };

      const result = await initializePayduniaPayment(paydunaParams);

      await db.order.update({
        where: { id: order.id },
        data: { paymentId: result.token },
      });

      return NextResponse.json({ paymentUrl: result.paymentLink });
    }
  } catch (err) {
    await db.order.update({
      where: { id: order.id },
      data: { status: "CANCELLED" },
    });

    console.error("Payment initiation failed:", err);
    return NextResponse.json(
      { error: "Failed to initiate payment. Please try again." },
      { status: 500 }
    );
  }
}
