import { Resend } from "resend";
import { escapeHtml } from "@/lib/escapeHtml";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing required environment variable: RESEND_API_KEY");
  }
  return new Resend(apiKey);
}

// XOF/XAF (CFA francs) have no minor unit — show whole amounts, unlike EUR.
function formatAmount(amount: number, currency: string): string {
  const isZeroDecimal = currency === "XOF" || currency === "XAF";
  return `${amount.toFixed(isZeroDecimal ? 0 : 2)} ${escapeHtml(currency)}`;
}

export interface OrderConfirmationParams {
  to: string;
  customerName: string;
  orderNumber: string;
  totalAmount: number;
  currency: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export async function sendOrderConfirmationEmail(
  params: OrderConfirmationParams
): Promise<void> {
  const { to, customerName, orderNumber, totalAmount, currency, items } = params;

  const itemsList = items
    .map(
      (item) =>
        `<li>${item.quantity}× ${escapeHtml(item.name)} — ${formatAmount(item.unitPrice, currency)}</li>`
    )
    .join("");

  const { error } = await getResendClient().emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order confirmation — ${orderNumber}`,
    html: `
      <p>Hello ${escapeHtml(customerName)},</p>
      <p>Your order <strong>${escapeHtml(orderNumber)}</strong> has been confirmed.</p>
      <ul>${itemsList}</ul>
      <p>Total: <strong>${formatAmount(totalAmount, currency)}</strong></p>
    `,
  });

  if (error) {
    throw new Error(`Failed to send order confirmation email: ${error.message}`);
  }
}

