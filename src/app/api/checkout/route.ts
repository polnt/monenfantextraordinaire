import { NextResponse } from "next/server";
import { Prisma, type Order } from "@prisma/client";
import { db } from "@/lib/db";
import { getPaymentGateway } from "@/lib/geo";
import { createStripeCheckoutSession, type CheckoutLineItem } from "@/lib/stripe";
import { initializeCinetPayment, type CinetPayInitParams } from "@/lib/cinetpay";

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
  addressLine1?: string;
  addressLine2?: string;
  addressCity?: string;
  addressPostalCode?: string;
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

function convertForCinetPay(
  amount: number,
  fromCurrency: string,
  countryCode: string
): { amount: number; currency: string } {
  if (fromCurrency.toUpperCase() === "EUR") {
    // Fixed rate: 1 EUR = 655.957 XOF / XAF
    const currency = countryCode.toUpperCase() === "CM" ? "XAF" : "XOF";
    return { amount: Math.round(amount * 655.957), currency };
  }
  return { amount: Math.round(amount), currency: fromCurrency.toUpperCase() };
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

  // Reserve stock and create order atomically to prevent overselling
  let order: Order;
  try {
    order = await db.$transaction(async (tx) => {
      for (const [productId, quantity] of requestedQuantityByProductId.entries()) {
        const product = productsById.get(productId);
        if (!product || product.stock === null) continue;

        const reserved = await tx.product.updateMany({
          where: { id: productId, active: true, stock: { gte: quantity } },
          data: { stock: { decrement: quantity } },
        });

        if (reserved.count === 0) {
          throw new Error(`Insufficient stock for "${product.name}"`);
        }
      }

      return tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          idempotencyKey: crypto.randomUUID(),
          customerEmail: body.customerEmail,
          customerFirstName: body.customerFirstName,
          customerLastName: body.customerLastName,
          customerPhone: body.customerPhone ?? null,
          customerCountry: body.customerCountry,
          addressLine1: body.addressLine1 ?? null,
          addressLine2: body.addressLine2 ?? null,
          addressCity: body.addressCity ?? null,
          addressPostalCode: body.addressPostalCode ?? null,
          gateway,
          totalAmount,
          currency: productCurrency,
          items: { create: orderItems },
        },
      });
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "One or more items are unavailable";
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
      const converted = convertForCinetPay(
        totalAmount.toNumber(),
        productCurrency,
        body.customerCountry
      );

      const cinetPayParams: CinetPayInitParams = {
        transactionId: order.id,
        amount: converted.amount,
        currency: converted.currency,
        description: `Order ${order.orderNumber}`,
        notifyUrl: `${baseUrl}/api/cinetpay/webhook`,
        returnUrl: `${baseUrl}/checkout/confirmation?orderId=${order.id}`,
        customerName: body.customerLastName,
        customerSurname: body.customerFirstName,
        customerEmail: body.customerEmail,
        customerPhoneNumber: body.customerPhone ?? "",
        customerAddress: body.addressLine1 ?? "",
        customerCity: body.addressCity ?? "",
        customerCountry: body.customerCountry,
      };

      const result = await initializeCinetPayment(cinetPayParams);

      await db.order.update({
        where: { id: order.id },
        data: { paymentId: order.id },
      });

      return NextResponse.json({ paymentUrl: result.paymentUrl });
    }
  } catch (err) {
    await db.order.update({
      where: { id: order.id },
      data: { status: "CANCELLED" },
    });

    // Restore reserved stock since payment initiation failed
    for (const item of orderItems) {
      const product = productsById.get(item.productId);
      if (product !== undefined && product.stock !== null) {
        await db.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
    }

    console.error("Payment initiation failed:", err);
    return NextResponse.json(
      { error: "Failed to initiate payment. Please try again." },
      { status: 500 }
    );
  }
}
