// lib/flutterwave.ts
// Flutterwave client configuration and payment session helpers

const FLW_API_URL = "https://api.flutterwave.com/v3";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FlutterwaveInitParams {
  txRef: string;
  amount: number;
  currency: string;
  redirectUrl: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  description: string;
}

export interface FlutterwavePaymentResult {
  paymentLink: string;
}

export interface FlutterwaveTransactionStatus {
  status: string;
  amount: number;
  currency: string;
  txRef: string;
  flwRef: string;
  paymentType: string;
}

export interface FlutterwaveWebhookPayload {
  event: string;
  data: {
    id: number;
    tx_ref: string;
    flw_ref: string;
    amount: number;
    currency: string;
    charged_amount: number;
    status: string;
    payment_type: string;
    customer: {
      email: string;
      name: string;
    };
  };
}

interface FlwInitApiResponse {
  status: string;
  message: string;
  data?: { link: string };
}

interface FlwVerifyApiResponse {
  status: string;
  message: string;
  data?: {
    status: string;
    amount: number;
    currency: string;
    tx_ref: string;
    flw_ref: string;
    payment_type: string;
  };
}

// ─── Credentials ──────────────────────────────────────────────────────────────

function getSecretKey(): string {
  const key = process.env.FLW_SECRET_KEY;
  if (!key) {
    throw new Error("Missing required environment variable: FLW_SECRET_KEY");
  }
  return key;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Initiates a Flutterwave Standard payment session.
 * Returns the hosted payment link to redirect the customer to.
 */
export async function initializeFlutterwavePayment(
  params: FlutterwaveInitParams
): Promise<FlutterwavePaymentResult> {
  const secretKey = getSecretKey();

  const response = await fetch(`${FLW_API_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      tx_ref: params.txRef,
      amount: params.amount,
      currency: params.currency,
      redirect_url: params.redirectUrl,
      customer: {
        email: params.customerEmail,
        name: params.customerName,
        phonenumber: params.customerPhone ?? "",
      },
      customizations: {
        title: "Mon Enfant Extraordinaire",
        description: params.description,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Flutterwave API error: ${response.status} ${response.statusText}`
    );
  }

  const result = (await response.json()) as FlwInitApiResponse;

  if (result.status !== "success" || !result.data?.link) {
    throw new Error(`Flutterwave initialization failed: ${result.message}`);
  }

  return { paymentLink: result.data.link };
}

/**
 * Verifies the status of a Flutterwave transaction by its numeric ID.
 * Should be called upon receiving a webhook notification.
 */
export async function verifyFlutterwaveTransaction(
  transactionId: number
): Promise<FlutterwaveTransactionStatus> {
  const secretKey = getSecretKey();

  const response = await fetch(
    `${FLW_API_URL}/transactions/${transactionId}/verify`,
    {
      headers: { Authorization: `Bearer ${secretKey}` },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Flutterwave verify API error: ${response.status} ${response.statusText}`
    );
  }

  const result = (await response.json()) as FlwVerifyApiResponse;

  if (result.status !== "success" || !result.data) {
    throw new Error(`Flutterwave transaction verification failed: ${result.message}`);
  }

  return {
    status: result.data.status,
    amount: result.data.amount,
    currency: result.data.currency,
    txRef: result.data.tx_ref,
    flwRef: result.data.flw_ref,
    paymentType: result.data.payment_type,
  };
}

/**
 * Verifies the Flutterwave webhook signature.
 * Flutterwave sends the secret hash in the `verif-hash` header.
 * Throws if the header is missing or does not match FLW_SECRET_HASH.
 */
export function verifyFlutterwaveWebhookSignature(
  signature: string | null
): void {
  const secret = process.env.FLW_SECRET_HASH;
  if (!secret) {
    throw new Error(
      "Missing required environment variable: FLW_SECRET_HASH"
    );
  }
  if (signature !== secret) {
    throw new Error("Invalid Flutterwave webhook signature");
  }
}

/**
 * Parses and validates a raw Flutterwave webhook payload.
 * Throws if the payload is missing required fields.
 */
export function parseFlutterwaveWebhook(
  body: unknown
): FlutterwaveWebhookPayload {
  if (typeof body !== "object" || body === null) {
    throw new Error(
      "Invalid Flutterwave webhook payload: expected an object"
    );
  }

  const payload = body as Record<string, unknown>;

  if (
    typeof payload.event !== "string" ||
    typeof payload.data !== "object" ||
    payload.data === null
  ) {
    throw new Error(
      "Invalid Flutterwave webhook payload: missing top-level fields"
    );
  }

  const data = payload.data as Record<string, unknown>;

  if (
    typeof data.id !== "number" ||
    typeof data.tx_ref !== "string" ||
    typeof data.status !== "string"
  ) {
    throw new Error(
      "Invalid Flutterwave webhook payload: missing required data fields"
    );
  }

  return payload as unknown as FlutterwaveWebhookPayload;
}
