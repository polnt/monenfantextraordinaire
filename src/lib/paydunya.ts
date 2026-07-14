// lib/paydunya.ts
// PayDunya client configuration and payment helpers

import crypto from "crypto";
import type { Prisma } from "@prisma/client";
import { EUR_TO_XOF_RATE } from "@/lib/currency";

const PAYDUNYA_API_URL = process.env.PAYDUNYA_API_URL ?? "https://app.paydunya.com/sandbox-api/v1";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaydunyaInitParams {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  redirectUrl: string;
  cancelUrl: string;
  callbackUrl: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  description: string;
}

export interface PaydunyaPaymentResult {
  token: string;
  paymentLink: string;
}

export interface PaydunyaTransactionStatus {
  status: string;
  totalAmount: number;
  token: string;
}

export interface PaydunyaWebhookPayload {
  hash: string;
  invoiceToken: string;
  status: string;
}

interface PaydunyaCreateApiResponse {
  response_code: string;
  response_text: string;
  description?: string;
  token?: string;
}

interface PaydunyaConfirmApiResponse {
  response_code: string;
  status: string;
  invoice?: {
    token?: string;
    total_amount?: number;
  };
}

// ─── Credentials ──────────────────────────────────────────────────────────────

function getCredentials(): { masterKey: string; privateKey: string; token: string } {
  const masterKey = process.env.PAYDUNYA_MASTER_KEY;
  const privateKey = process.env.PAYDUNYA_PRIVATE_KEY;
  const token = process.env.PAYDUNYA_TOKEN;

  if (!masterKey || !privateKey || !token) {
    throw new Error(
      "Missing required environment variables: PAYDUNYA_MASTER_KEY, PAYDUNYA_PRIVATE_KEY, PAYDUNYA_TOKEN"
    );
  }

  return { masterKey, privateKey, token };
}

function buildHeaders(creds: ReturnType<typeof getCredentials>): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "PAYDUNYA-MASTER-KEY": creds.masterKey,
    "PAYDUNYA-PRIVATE-KEY": creds.privateKey,
    "PAYDUNYA-TOKEN": creds.token,
  };
}

// ─── Currency ───────────────────────────────────────────────────────────────

/**
 * Returns the amount (in XOF/XAF) to charge for a product via PayDunya.
 * Uses the merchant-set priceXof when available; otherwise falls back to
 * the fixed EUR treaty peg.
 */
export function getPaydunyaUnitAmount(product: {
  priceEur: Prisma.Decimal;
  priceXof: Prisma.Decimal | null;
}): number {
  return product.priceXof !== null
    ? Math.round(product.priceXof.toNumber())
    : Math.round(product.priceEur.toNumber() * EUR_TO_XOF_RATE);
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Creates a PayDunya hosted checkout invoice.
 * Returns the checkout URL to redirect the customer to, plus the invoice token.
 */
export async function initializePaydunyaPayment(
  params: PaydunyaInitParams
): Promise<PaydunyaPaymentResult> {
  const creds = getCredentials();

  const response = await fetch(`${PAYDUNYA_API_URL}/checkout-invoice/create`, {
    method: "POST",
    headers: buildHeaders(creds),
    body: JSON.stringify({
      invoice: {
        total_amount: params.amount,
        description: params.description,
      },
      store: {
        name: "Mon Enfant Extraordinaire",
      },
      actions: {
        return_url: params.redirectUrl,
        cancel_url: params.cancelUrl,
        callback_url: params.callbackUrl,
      },
      custom_data: {
        order_id: params.orderId,
        order_number: params.orderNumber,
      },
      customer: {
        name: params.customerName,
        email: params.customerEmail,
        phone: params.customerPhone ?? "",
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `PayDunya API error: ${response.status} ${response.statusText}`
    );
  }

  const result = (await response.json()) as PaydunyaCreateApiResponse;

  if (result.response_code !== "00" || !result.token || !result.response_text) {
    throw new Error(
      `PayDunya invoice creation failed: ${result.response_text ?? "Unknown error"}`
    );
  }

  return {
    token: result.token,
    paymentLink: result.response_text,
  };
}

/**
 * Verifies the status of a PayDunya invoice by its token.
 * Should be called upon receiving an IPN webhook notification.
 */
export async function verifyPaydunyaTransaction(
  invoiceToken: string
): Promise<PaydunyaTransactionStatus> {
  const creds = getCredentials();

  const response = await fetch(
    `${PAYDUNYA_API_URL}/checkout-invoice/confirm/${invoiceToken}`,
    { headers: buildHeaders(creds) }
  );

  if (!response.ok) {
    throw new Error(
      `PayDunya confirm API error: ${response.status} ${response.statusText}`
    );
  }

  const result = (await response.json()) as PaydunyaConfirmApiResponse;

  if (result.response_code !== "00") {
    throw new Error(
      `PayDunya transaction verification failed: response_code ${result.response_code}`
    );
  }

  if (result.invoice?.total_amount === undefined) {
    throw new Error(
      "PayDunya confirm API response is missing invoice.total_amount"
    );
  }

  return {
    status: result.status,
    totalAmount: result.invoice.total_amount,
    token: result.invoice.token ?? invoiceToken,
  };
}

/**
 * Verifies the PayDunya IPN webhook signature.
 * PayDunya sends data[hash] = SHA-512 of your master key.
 * Throws if the hash is missing or does not match.
 */
export function verifyPaydunyaWebhookSignature(hash: string | null): void {
  const masterKey = process.env.PAYDUNYA_MASTER_KEY;
  if (!masterKey) {
    throw new Error("Missing required environment variable: PAYDUNYA_MASTER_KEY");
  }
  if (!hash) {
    throw new Error("Missing PayDunya webhook hash");
  }

  const expected = crypto.createHash("sha512").update(masterKey).digest("hex");

  if (!/^[0-9a-fA-F]+$/.test(hash)) {
    throw new Error("Invalid PayDunya webhook signature");
  }

  const hashBuffer = Buffer.from(hash.toLowerCase(), "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  const isValid =
    hashBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(hashBuffer, expectedBuffer);

  if (!isValid) {
    throw new Error("Invalid PayDunya webhook signature");
  }
}

/**
 * Signs a PayDunya order id so it can be safely carried in the redirect URL
 * back to the confirmation page. PayDunya has no session token like Stripe's
 * checkout session, so without this signature anyone who obtains the plain
 * orderId (browser history, referrer headers, logs) could fetch that order's
 * paid download links from /api/orders/status.
 */
export function signOrderReference(orderId: string): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("Missing required environment variable: NEXTAUTH_SECRET");
  }
  return crypto.createHmac("sha256", secret).update(orderId).digest("hex");
}

/**
 * Verifies a signature produced by signOrderReference for the given orderId.
 */
export function verifyOrderReference(orderId: string, signature: string): boolean {
  if (!/^[0-9a-fA-F]{64}$/.test(signature)) {
    return false;
  }

  let expected: string;
  try {
    expected = signOrderReference(orderId);
  } catch {
    return false;
  }
  const signatureBuffer = Buffer.from(signature.toLowerCase(), "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  return (
    signatureBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  );
}

/**
 * Parses a PayDunya IPN webhook payload (application/x-www-form-urlencoded).
 * PayDunya sends: data[hash], data[invoice][token], data[status] — the
 * invoice token is nested under data[invoice], same as data[invoice][total_amount]
 * on the confirm API (see verifyPaydunyaTransaction). A flat data[invoice_token]
 * is checked too as a defensive fallback in case PayDunya's IPN format ever
 * diverges from the confirm API's shape.
 * Throws if required fields are missing.
 */
export function parsePaydunyaWebhook(params: URLSearchParams): PaydunyaWebhookPayload {
  const hash = params.get("data[hash]");
  const invoiceToken =
    params.get("data[invoice][token]") ?? params.get("data[invoice_token]");
  const status = params.get("data[status]");

  if (!hash || !invoiceToken || !status) {
    throw new Error(
      "Invalid PayDunya webhook payload: missing data[hash], invoice token (data[invoice][token] or data[invoice_token]), or data[status]"
    );
  }

  return { hash, invoiceToken, status };
}
