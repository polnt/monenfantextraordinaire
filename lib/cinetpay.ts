// lib/cinetpay.ts
// CinetPay client configuration and payment session helpers

const CINETPAY_API_URL = "https://api-checkout.cinetpay.com/v2/payment";
const CINETPAY_CHECK_URL = "https://api-checkout.cinetpay.com/v2/payment/check";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CinetPayInitParams {
  transactionId: string;
  amount: number;
  currency: string;
  description: string;
  notifyUrl: string;
  returnUrl: string;
  customerName: string;
  customerSurname: string;
  customerEmail: string;
  customerPhoneNumber: string;
  customerAddress: string;
  customerCity: string;
  customerCountry: string;
}

export interface CinetPayPaymentResult {
  paymentToken: string;
  paymentUrl: string;
}

export interface CinetPayPaymentStatus {
  status: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  operatorId: string;
  paymentDate: string;
}

export interface CinetPayWebhookPayload {
  cpm_site_id: string;
  cpm_trans_id: string;
  cpm_trans_date: string;
  cpm_amount: string;
  cpm_currency: string;
  cpm_payid: string;
  cpm_payment_date: string;
  cpm_payment_time: string;
  cpm_error_message: string;
  cpm_result: string;
  cpm_trans_status: string;
  payment_method: string;
  cel_phone_num: string;
}

interface CinetPayApiInitResponse {
  code: string;
  message: string;
  description: string;
  data?: {
    payment_token: string;
    payment_url: string;
  };
}

interface CinetPayApiCheckResponse {
  code: string;
  message: string;
  data?: {
    amount: number;
    currency: string;
    status: string;
    payment_method: string;
    description: string;
    operator_id: string;
    payment_date: string;
  };
}

interface CinetPayCredentials {
  apiKey: string;
  siteId: string;
}

// ─── Credentials ──────────────────────────────────────────────────────────────

// Validate environment variables at module load time
if (!process.env.CINETPAY_API_KEY || !process.env.CINETPAY_SITE_ID) {
  throw new Error(
    "Missing required environment variables: CINETPAY_API_KEY or CINETPAY_SITE_ID"
  );
}

/**
 * Returns CinetPay credentials from environment variables.
 * Credentials are validated at module load time (above).
 */
function getCredentials(): CinetPayCredentials {
  return {
    apiKey: process.env.CINETPAY_API_KEY as string,
    siteId: process.env.CINETPAY_SITE_ID as string,
  };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const json: unknown = await response.json();
  return json as T;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Initializes a CinetPay payment session.
 * Returns the payment token and URL to redirect the customer to.
 */
export async function initializeCinetPayment(
  params: CinetPayInitParams
): Promise<CinetPayPaymentResult> {
  const { apiKey, siteId } = getCredentials();

  const response = await fetch(CINETPAY_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: apiKey,
      site_id: siteId,
      transaction_id: params.transactionId,
      amount: params.amount,
      currency: params.currency,
      description: params.description,
      notify_url: params.notifyUrl,
      return_url: params.returnUrl,
      customer_name: params.customerName,
      customer_surname: params.customerSurname,
      customer_email: params.customerEmail,
      customer_phone_number: params.customerPhoneNumber,
      customer_address: params.customerAddress,
      customer_city: params.customerCity,
      customer_country: params.customerCountry,
      customer_state: params.customerCountry,
      customer_zip_code: "00000",
      lang: "fr",
      channels: "ALL",
    }),
  });

  if (!response.ok) {
    throw new Error(
      `CinetPay API error: ${response.status} ${response.statusText}`
    );
  }

  const result = await parseJsonResponse<CinetPayApiInitResponse>(response);

  if (result.code !== "201" || !result.data) {
    throw new Error(
      `CinetPay initialization failed: ${result.message} — ${result.description}`
    );
  }

  return {
    paymentToken: result.data.payment_token,
    paymentUrl: result.data.payment_url,
  };
}

/**
 * Verifies the status of a CinetPay payment by transaction ID.
 * Should be called upon receiving a webhook notification.
 */
export async function verifyCinetPayPayment(
  transactionId: string
): Promise<CinetPayPaymentStatus> {
  const { apiKey, siteId } = getCredentials();

  const response = await fetch(CINETPAY_CHECK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: apiKey,
      site_id: siteId,
      transaction_id: transactionId,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `CinetPay check API error: ${response.status} ${response.statusText}`
    );
  }

  const result = await parseJsonResponse<CinetPayApiCheckResponse>(response);

  if (result.code !== "00" || !result.data) {
    throw new Error(
      `CinetPay payment verification failed: ${result.message}`
    );
  }

  return {
    status: result.data.status,
    amount: result.data.amount,
    currency: result.data.currency,
    paymentMethod: result.data.payment_method,
    operatorId: result.data.operator_id,
    paymentDate: result.data.payment_date,
  };
}

/**
 * Parses and validates a raw CinetPay webhook payload.
 * Throws if the payload is missing required fields.
 */
export function parseCinetPayWebhook(body: unknown): CinetPayWebhookPayload {
  if (typeof body !== "object" || body === null) {
    throw new Error("Invalid CinetPay webhook payload: expected an object");
  }

  const payload = body as Record<string, unknown>;

  if (
    typeof payload.cpm_site_id !== "string" ||
    typeof payload.cpm_trans_id !== "string"
  ) {
    throw new Error(
      "Invalid CinetPay webhook payload: missing required fields"
    );
  }

  return payload as unknown as CinetPayWebhookPayload;
}
