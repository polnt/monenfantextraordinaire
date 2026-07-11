import { Resend } from "resend";
import { escapeHtml } from "@/lib/escapeHtml";
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
  /** Pass a direct public URL to skip download-token creation (free/public products). */
  directUrl?: string;
}

export async function sendProductEmail(
  params: SendProductEmailParams
): Promise<void> {
  const { productId, productName, email, orderId, orderNumber, directUrl } =
    params;

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
  const orderRef = orderNumber ? ` (commande ${escapeHtml(orderNumber)})` : "";
  const isFree = Boolean(directUrl);

  const { error } = await getResendClient().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: isFree
      ? `Votre bonus gratuit "${productName}"`
      : `Votre fichier "${productName}" est prêt`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <p>Bonjour</p>
        <p>
          ${isFree
            ? `Voici votre bonus gratuit&nbsp;:`
            : `Merci pour votre achat${orderRef}. Votre fichier`
          }
          <strong>${escapeHtml(productName)}</strong>
          ${isFree ? "" : "est disponible en téléchargement."}
        </p>
        <p style="margin:32px 0">
          <a href="${escapeHtml(downloadUrl)}"
             style="display:inline-block;padding:14px 28px;background:#4f46e5;color:#fff;
                    text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px">
            Télécharger mon fichier
          </a>
        </p>
        ${isFree ? "" : `
        <p style="color:#6b7280;font-size:14px">
          Ce lien est valable ${DOWNLOAD_EXPIRY_DAYS} jours et peut être utilisé
          jusqu'à ${DOWNLOAD_MAX_COUNT} fois. Ne le partagez pas.
        </p>
        `}
        <p style="color:#6b7280;font-size:14px">
          En cas de problème, répondez à cet email ou contactez notre support.
        </p>
      </div>
    `,
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
