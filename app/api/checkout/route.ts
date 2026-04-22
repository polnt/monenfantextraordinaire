import { NextResponse } from "next/server";
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

  const productIds = body.items.map((item) => item.productId);

  const products = await db.product.findMany({
    where: { id: { in: productIds }, active: true },
  });

  if (products.length !== productIds.length) {
    return NextResponse.json(
      { error: "One or more products are unavailable" },
      { status: 400 }
    );
  }

  for (const cartItem of body.items) {
    const product = products.find((p) => p.id === cartItem.productId)!;
    if (product.stock !== null && product.stock < cartItem.quantity) {
      return NextResponse.json(
        { error: `Insufficient stock for "${product.name}"` },
        { status: 400 }
      );
    }
  }

  const gateway = getPaymentGateway(body.customerCountry);
  const [firstProduct] = products;
  const productCurrency = firstProduct?.currency ?? "EUR";

  const orderItems = body.items.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId)!;
    return {
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
      quantity: cartItem.quantity,
    };
  });

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const order = await db.order.create({
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

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  try {
    if (gateway === "STRIPE") {
      const lineItems: CheckoutLineItem[] = orderItems.map((item) => ({
        name: item.productName,
        unitAmountCents: Math.round(item.unitPrice * 100),
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
        totalAmount,
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
    console.error("Payment initiation failed:", err);
    return NextResponse.json(
      { error: "Failed to initiate payment. Please try again." },
      { status: 500 }
    );
  }
}
