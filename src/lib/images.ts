const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

if (!r2PublicUrl) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_R2_PUBLIC_URL");
}

export const R2_IMAGES_BASE = `${r2PublicUrl}/images`;
