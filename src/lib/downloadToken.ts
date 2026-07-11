import { randomBytes } from "crypto";
import { db } from "@/lib/db";

export const DOWNLOAD_EXPIRY_DAYS = 7;
export const DOWNLOAD_MAX_COUNT = 5;

export interface GetOrCreateDownloadUrlParams {
  productId: string;
  orderId: string | null;
  email: string;
}

/**
 * Reuses the existing download token for this order/product if one was
 * already created (e.g. a retry after a failed send), otherwise creates a
 * new time-limited one. Shared by the post-purchase email and the
 * confirmation page's "Télécharger" button so both hand out the same link.
 */
export async function getOrCreateDownloadUrl(
  params: GetOrCreateDownloadUrlParams
): Promise<string> {
  const { productId, orderId, email } = params;

  const existing = orderId
    ? await db.downloadToken.findFirst({ where: { orderId, productId } })
    : null;

  let token: string;
  if (existing) {
    token = existing.token;
  } else {
    token = randomBytes(32).toString("hex");
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
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  return `${baseUrl}/api/download/${token}`;
}
