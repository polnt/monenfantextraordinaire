// lib/paydunia.ts
// PayDunya client configuration and payment helpers

import crypto from "crypto";

const PAYDUNYA_API_URL = "https://app.paydunya.com/api/v1";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PayduniaInitParams {
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

export interface PayduniaPaymentResult {
  token: string;
  paymentLink: string;
}

export interface PayduniaTransactionStatus {
  status: string;
  totalAmount: number;
  currency: string;
  token: string;
}

export interface PayduniaWebhookPayload {
  hash: string;
  invoiceToken: string;
  status: string;
}

interface PayduniaCreateApiResponse {
  response_code: string;
  response_text: string;
  description?: string;
  token?: string;
}

interface PayduniaConfirmApiResponse {
  response_code: string;
  status: string;
  total_amount?: number;
  currency?: string;
  token?: string;
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

// ─── Currency conversion ────────────────────────────────────────────────────

/**
 * Converts an order's amount/currency into the amount/currency to charge via PayDunya.
 * XOF/XAF are pegged to EUR at a fixed treaty rate (1 EUR = 655.957 XOF/XAF).
 * Deterministic — safe to recompute later (e.g. to verify a webhook's reported amount).
 */
export function convertForPaydunia(
  amount: number,
  fromCurrency: string,
  countryCode: string
): { amount: number; currency: string } {
  if (fromCurrency.toUpperCase() === "EUR") {
    const currency = countryCode.toUpperCase() === "CM" ? "XAF" : "XOF";
    return { amount: Math.round(amount * 655.957), currency };
  }
  return { amount: Math.round(amount), currency: fromCurrency.toUpperCase() };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Creates a PayDunya hosted checkout invoice.
 * Returns the checkout URL to redirect the customer to, plus the invoice token.
 */
export async function initializePayduniaPayment(
  params: PayduniaInitParams
): Promise<PayduniaPaymentResult> {
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

  const result = (await response.json()) as PayduniaCreateApiResponse;

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
export async function verifyPayduniaTransaction(
  invoiceToken: string
): Promise<PayduniaTransactionStatus> {
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

  const result = (await response.json()) as PayduniaConfirmApiResponse;

  if (result.response_code !== "00") {
    throw new Error(
      `PayDunya transaction verification failed: response_code ${result.response_code}`
    );
  }

  return {
    status: result.status,
    totalAmount: result.total_amount ?? 0,
    currency: result.currency ?? "",
    token: result.token ?? invoiceToken,
  };
}

/**
 * Verifies the PayDunya IPN webhook signature.
 * PayDunya sends data[hash] = SHA-512 of your master key.
 * Throws if the hash is missing or does not match.
 */
export function verifyPayduniaWebhookSignature(hash: string | null): void {
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
 * Parses a PayDunya IPN webhook payload (application/x-www-form-urlencoded).
 * PayDunya sends: data[hash], data[invoice_token], data[status].
 * Throws if required fields are missing.
 */
export function parsePayduniaWebhook(params: URLSearchParams): PayduniaWebhookPayload {
  const hash = params.get("data[hash]");
  const invoiceToken = params.get("data[invoice_token]");
  const status = params.get("data[status]");

  if (!hash || !invoiceToken || !status) {
    throw new Error(
      "Invalid PayDunya webhook payload: missing data[hash], data[invoice_token], or data[status]"
    );
  }

  return { hash, invoiceToken, status };
}
