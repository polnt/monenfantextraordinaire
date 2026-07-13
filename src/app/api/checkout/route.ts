import { NextResponse } from "next/server";
import { Prisma, PaymentGateway, type Order } from "@prisma/client";
import { db } from "@/lib/db";
import type { Currency } from "@/lib/currency";
import { createStripeCheckoutSession, type CheckoutLineItem } from "@/lib/stripe";
import {
  initializePaydunyaPayment,
  getPaydunyaUnitAmount,
  signOrderReference,
  type PaydunyaInitParams,
} from "@/lib/paydunya";

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
  // The currency the customer was browsing in (EUR/XOF). Drives the payment
  // gateway directly: EUR -> Stripe, XOF -> PayDunya.
  currency: Currency;
  items: CheckoutItem[];
  // Generated once by the client per checkout attempt. Used as the order's
  // idempotency key so a double-submit (double click, network retry) reuses
  // the same order/payment session instead of creating a second one.
  checkoutToken: string;
}

function parseCheckoutBody(value: unknown): CheckoutRequestBody | null {
  if (typeof value !== "object" || value === null) return null;
  if (
    !("customerEmail" in value) ||
    !("customerFirstName" in value) ||
    !("customerLastName" in value) ||
    !("customerCountry" in value) ||
    !("currency" in value) ||
    !("items" in value) ||
    !("checkoutToken" in value)
  )
    return null;

  const v = value as {
    customerEmail: unknown;
    customerFirstName: unknown;
    customerLastName: unknown;
    customerCountry: unknown;
    currency: unknown;
    items: unknown;
    checkoutToken: unknown;
  };

  if (
    typeof v.customerEmail !== "string" ||
    typeof v.customerFirstName !== "string" ||
    typeof v.customerLastName !== "string" ||
    typeof v.customerCountry !== "string" ||
    (v.currency !== "EUR" && v.currency !== "XOF") ||
    typeof v.checkoutToken !== "string" ||
    v.checkoutToken.trim().length === 0 ||
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

  // A retried submission (double click, client-side network retry) carries
  // the same checkoutToken — reuse the existing order/items instead of
  // creating a duplicate one.
  const existingOrder = await db.order.findUnique({
    where: { idempotencyKey: body.checkoutToken },
    include: { items: true },
  });

  if (existingOrder && existingOrder.status !== "PENDING") {
    return NextResponse.json(
      { error: "This order has already been processed." },
      { status: 409 }
    );
  }

  let order: Order;
  let orderItems: { productId: string; productName: string; unitPrice: Prisma.Decimal; quantity: number }[];
  let gateway: PaymentGateway;
  let productCurrency: string;
  let totalAmount: Prisma.Decimal;

  if (existingOrder) {
    order = existingOrder;
    orderItems = existingOrder.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    }));
    gateway = existingOrder.gateway;
    productCurrency = existingOrder.currency;
    totalAmount = existingOrder.totalAmount;
  } else {
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

    gateway = body.currency === "XOF" ? PaymentGateway.PAYDUNYA : PaymentGateway.STRIPE;
    productCurrency = gateway === PaymentGateway.PAYDUNYA ? "XOF" : "EUR";

    orderItems = Array.from(requestedQuantityByProductId.entries()).map(
      ([productId, quantity]) => {
        const product = productsById.get(productId)!;
        const unitPrice = gateway === PaymentGateway.PAYDUNYA
          ? new Prisma.Decimal(getPaydunyaUnitAmount(product))
          : product.priceEur;
        return {
          productId: product.id,
          productName: product.name,
          unitPrice,
          quantity,
        };
      }
    );

    totalAmount = orderItems.reduce(
      (sum, item) => sum.add(item.unitPrice.mul(item.quantity)),
      new Prisma.Decimal(0)
    );

    try {
      order = await db.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          idempotencyKey: body.checkoutToken,
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
      console.error("Order creation failed:", err);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 400 }
      );
    }
  }

  // A PayDunya invoice was already created for this order on a prior attempt.
  // PayDunya has no idempotency key on invoice creation, so re-calling it here
  // would mint a second invoice and overwrite paymentId, orphaning the first
  // one if the customer already opened/paid it. Re-serve the stored link instead.
  if (existingOrder && gateway === PaymentGateway.PAYDUNYA && existingOrder.paymentId && existingOrder.paymentUrl) {
    return NextResponse.json({ paymentUrl: existingOrder.paymentUrl });
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  try {
    if (gateway === PaymentGateway.STRIPE) {
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
        idempotencyKey: body.checkoutToken,
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
      const paydunyaParams: PaydunyaInitParams = {
        orderId: order.id,
        orderNumber: order.orderNumber,
        amount: totalAmount.toNumber(),
        currency: productCurrency,
        redirectUrl: `${baseUrl}/checkout/confirmation?orderId=${order.id}&sig=${signOrderReference(order.id)}`,
        cancelUrl: `${baseUrl}/checkout`,
        callbackUrl: `${baseUrl}/api/paydunya/webhook`,
        customerEmail: body.customerEmail,
        customerName: `${body.customerFirstName} ${body.customerLastName}`,
        customerPhone: body.customerPhone,
        description: `Order ${order.orderNumber}`,
      };

      const result = await initializePaydunyaPayment(paydunyaParams);

      await db.order.update({
        where: { id: order.id },
        data: { paymentId: result.token, paymentUrl: result.paymentLink },
      });

      return NextResponse.json({ paymentUrl: result.paymentLink });
    }
  } catch (err) {
    // Leave the order PENDING (not CANCELLED) so a retry with the same
    // checkoutToken can reuse it instead of being blocked by the
    // `status !== "PENDING"` guard above.
    console.error("Payment initiation failed:", err);
    return NextResponse.json(
      { error: "Failed to initiate payment. Please try again." },
      { status: 500 }
    );
  }
}
