// lib/stripe.ts
// Stripe client configuration and payment session helpers

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required environment variable: STRIPE_SECRET_KEY");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CheckoutLineItem {
  name: string;
  description?: string;
  unitAmountCents: number; // amount in cents (e.g. 2999 for 29.99 EUR)
  currency: string;
  quantity: number;
}

export interface StripeCheckoutParams {
  orderId: string;
  orderNumber: string;
  customerEmail: string;
  lineItems: CheckoutLineItem[];
  successUrl: string;
  cancelUrl: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Creates a Stripe Checkout session for the given order.
 * Returns the full session object (use session.url to redirect the customer).
 * Metadata is set on both the Session and the PaymentIntent so it remains
 * accessible in payment_intent.succeeded webhook events.
 */
export async function createStripeCheckoutSession(
  params: StripeCheckoutParams
): Promise<Stripe.Checkout.Session> {
  const { orderId, orderNumber, customerEmail, lineItems, successUrl, cancelUrl } =
    params;

  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customerEmail,
    line_items: lineItems.map((item) => ({
      price_data: {
        currency: item.currency.toLowerCase(),
        unit_amount: item.unitAmountCents,
        product_data: {
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
        },
      },
      quantity: item.quantity,
    })),
    metadata: { orderId, orderNumber },
    payment_intent_data: {
      // Duplicate metadata on PaymentIntent so it's accessible
      // in payment_intent.succeeded webhook events
      metadata: { orderId, orderNumber },
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

/**
 * Verifies the Stripe webhook signature and returns the parsed event.
 * Throws if the signature is invalid or the secret is missing.
 */
export function constructStripeEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Missing required environment variable: STRIPE_WEBHOOK_SECRET");
  }

  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}
