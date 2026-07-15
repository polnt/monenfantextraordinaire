import { Resend } from "resend";
import { escapeHtml } from "@/lib/escapeHtml";
import { formatAmount } from "@/lib/formatAmount";
import { renderEmailLayout } from "@/lib/emailLayout";
import {
  getOrCreateDownloadUrl,
  DOWNLOAD_EXPIRY_DAYS,
  DOWNLOAD_MAX_COUNT,
} from "@/lib/downloadToken";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing required environment variable: RESEND_API_KEY");
  }
  return new Resend(apiKey);
}

export interface SendProductEmailParams {
  productId: string;
  productName: string;
  email: string;
  orderId: string | null;
  orderNumber?: string;
  customerFirstName?: string;
  /** Line total for this item — shown as "Montant" when the purchase was paid. */
  amount?: number;
  currency?: string;
  /** Pass a direct public URL to skip download-token creation (free/public products). */
  directUrl?: string;
}

export async function sendProductEmail(
  params: SendProductEmailParams
): Promise<void> {
  const {
    productId,
    productName,
    email,
    orderId,
    orderNumber,
    customerFirstName,
    amount,
    currency,
    directUrl,
  } = params;

  let downloadUrl: string;

  if (directUrl) {
    // Public/free product — use the direct URL, no token needed
    downloadUrl = directUrl;
  } else {
    // Paid product — token creation must succeed before we send, since an
    // email without a working download link isn't useful. A DB/token
    // failure here aborts and no email is sent.
    downloadUrl = await getOrCreateDownloadUrl({ productId, orderId, email });
  }

  const isFree = Boolean(directUrl);
  const greeting = customerFirstName
    ? `Bonjour ${escapeHtml(customerFirstName)}, `
    : "Bonjour, ";
  const introText = isFree
    ? `${greeting}voici votre bonus gratuit : <strong>${escapeHtml(productName)}</strong>.`
    : `${greeting}merci pour votre confiance ! Voici votre lien de téléchargement pour <strong>${escapeHtml(productName)}</strong>.`;

  const infoRows = [
    `<tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#5a6070;padding:6px 0;">Produit</td><td align="right" style="font-family:Arial,sans-serif;font-weight:700;font-size:13px;color:#090943;padding:6px 0;">${escapeHtml(productName)}</td></tr>`,
    amount !== undefined && currency
      ? `<tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#5a6070;padding:6px 0;">Montant</td><td align="right" style="font-family:Arial,sans-serif;font-weight:700;font-size:13px;color:#090943;padding:6px 0;">${formatAmount(amount, currency)}</td></tr>`
      : "",
    orderNumber
      ? `<tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#5a6070;padding:6px 0;">Numéro de commande</td><td align="right" style="font-family:Arial,sans-serif;font-weight:700;font-size:13px;color:#090943;padding:6px 0;">${escapeHtml(orderNumber)}</td></tr>`
      : "",
  ].join("");

  const bodyHtml = `
    <p style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#090943;margin:0 0 24px;">${introText}</p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 8px;">
      <tr><td align="center" style="background:#0792dc;border-radius:50px;">
        <a href="${escapeHtml(downloadUrl)}" style="display:inline-block;padding:16px 36px;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:15px;color:#ffffff;text-decoration:none;">Télécharger mon ${isFree ? "bonus" : "outil"}</a>
      </td></tr>
    </table>
    ${
      isFree
        ? ""
        : `<p style="font-family:Arial,sans-serif;font-size:12px;color:#9ca3af;text-align:center;margin:10px 0 28px;">Ce lien reste valable ${DOWNLOAD_EXPIRY_DAYS} jours et peut être utilisé jusqu'à ${DOWNLOAD_MAX_COUNT} fois. Conservez cet email précieusement.</p>`
    }

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafbff;border-radius:14px;margin:0 0 24px;">
      <tr><td style="padding:20px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${infoRows}
        </table>
      </td></tr>
    </table>

    <p style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#090943;margin:0 0 28px;">Un souci pour ouvrir ou imprimer votre fichier ? Répondez à cet email, je vous aide avec plaisir.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafbff;border-radius:14px;margin:0 0 8px;">
      <tr><td align="center" style="padding:24px 24px;">
        <p style="font-family:Georgia,serif;font-size:15px;line-height:1.6;color:#090943;margin:0 0 16px;">Envie d'aller plus loin&nbsp;? Allez découvrir nos formations clés en main et commencez dès aujourd'hui à accompagner votre enfant extra-ordinaire.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
          <tr><td align="center" style="background:#090943;border-radius:50px;">
            <a href="https://monenfantextraordinaire.com/formations" style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:14px;color:#ffffff;text-decoration:none;">Découvrir nos formations</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  `;

  const signatureHtml = `Merci d’avoir choisi Mon Enfant Extra-Ordinaire, nous vous souhaitons une belle aventure à nos côtés.<br><br>Belle découverte avec ${escapeHtml(productName)} !<br><br>À très vite,<br><strong style="color:#090943;">Laurence et Ludivine</strong> — Mon Enfant Extra-Ordinaire`;

  const html = renderEmailLayout({
    previewText: isFree
      ? `Votre bonus ${productName} est prêt à télécharger.`
      : `Votre outil ${productName} est prêt à télécharger.`,
    heroBackground: "#e8f4fd",
    eyebrow: isFree ? "Merci pour votre intérêt" : "Merci pour votre achat",
    titleHtml: isFree ? "Votre bonus est prêt ✅" : "Votre outil est prêt ✅",
    bodyHtml,
    signatureHtml,
  });

  const { error } = await getResendClient().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: isFree
      ? `Votre bonus gratuit "${productName}"`
      : `Votre fichier "${productName}" est prêt`,
    html,
  });

  if (error) {
    throw new Error(
      `Failed to send product email for ${productId}${orderId ? ` (order ${orderId})` : ""}: ${error.message}`
    );
  }

  console.warn(
    `[sendProductEmail] Email sent for product ${productId}${orderId ? ` (order ${orderId})` : " (free)"}`
  );
}
