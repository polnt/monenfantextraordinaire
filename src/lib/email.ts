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

export interface MoodleAccessParams {
  to: string;
  customerName: string;
  orderNumber: string;
  courseName: string;
  moodleLink: string;
}

export async function sendOrderConfirmationEmail(
  params: OrderConfirmationParams
): Promise<void> {
  const { to, customerName, orderNumber, totalAmount, currency, items } = params;

  const itemsList = items
    .map(
      (item) =>
        `<li>${item.quantity}× ${escapeHtml(item.name)} — ${item.unitPrice.toFixed(2)} ${escapeHtml(currency)}</li>`
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
      <p>Total: <strong>${totalAmount.toFixed(2)} ${escapeHtml(currency)}</strong></p>
    `,
  });

  if (error) {
    throw new Error(`Failed to send order confirmation email: ${error.message}`);
  }
}

export async function sendMoodleAccessEmail(
  params: MoodleAccessParams
): Promise<void> {
  const { to, customerName, orderNumber, courseName, moodleLink } = params;

  const { error } = await getResendClient().emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Your course access — ${courseName}`,
    html: `
      <p>Hello ${escapeHtml(customerName)},</p>
      <p>Thank you for purchasing <strong>${escapeHtml(courseName)}</strong> (order ${escapeHtml(orderNumber)}).</p>
      <p>Access your course here:<br/>
        <a href="${escapeHtml(moodleLink)}">${escapeHtml(moodleLink)}</a>
      </p>
      <p>This link is personal — please do not share it.</p>
    `,
  });

  if (error) {
    throw new Error(`Failed to send Moodle access email: ${error.message}`);
  }
}
