import { randomBytes } from "crypto";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { escapeHtml } from "@/lib/escapeHtml";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const DOWNLOAD_EXPIRY_DAYS = 7;
const DOWNLOAD_MAX_COUNT = 5;

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
  customerName: string;
  orderId: string | null;
  orderNumber?: string;
  /** Pass a direct public URL to skip download-token creation (free/public products). */
  directUrl?: string;
}

export async function sendProductEmail(
  params: SendProductEmailParams
): Promise<void> {
  const { productId, productName, email, customerName, orderId, orderNumber, directUrl } =
    params;

  let downloadUrl: string;

  if (directUrl) {
    // Public/free product — use the direct URL, no token needed
    downloadUrl = directUrl;
  } else {
    // Paid product — create a time-limited download token
    if (orderId) {
      const existing = await db.downloadToken.findFirst({
        where: { orderId, productId },
      });
      if (existing) {
        console.warn(
          `[sendProductEmail] Token already exists for order ${orderId}, product ${productId} — skipping`
        );
        return;
      }
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(
      Date.now() + DOWNLOAD_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    );

    await db.downloadToken.create({
      data: {
        token,
        productId,
        orderId,
        email,
        expiresAt,
        maxDownloads: DOWNLOAD_MAX_COUNT,
        downloadCount: 0,
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? "https://monenfantextraordinaire.com";
    downloadUrl = `${baseUrl}/download/${token}`;
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
        <p>Bonjour ${escapeHtml(customerName)},</p>
        <p>
          ${isFree
            ? `Voici votre bonus gratuit&nbsp;:`
            : `Merci pour votre achat${orderRef}. Votre fichier`
          }
          <strong>${escapeHtml(productName)}</strong>
          ${isFree ? "" : "est disponible en téléchargement."}
        </p>
        <p style="margin:32px 0">
          <a href="${downloadUrl}"
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
      `Failed to send product email for ${productId} to ${email}: ${error.message}`
    );
  }

  console.warn(
    `[sendProductEmail] Email sent for product ${productId} to ${email}${orderId ? ` (order ${orderId})` : " (free)"}`
  );
}
