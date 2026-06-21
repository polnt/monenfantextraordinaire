import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { streamFromR2 } from "@/lib/r2";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
): Promise<Response> {
  const { token } = await params;

  const record = await db.downloadToken.findUnique({
    where: { token },
    include: { product: { include: { ebook: true } } },
  });

  if (!record) {
    return NextResponse.json(
      { error: "Lien de téléchargement invalide." },
      { status: 404 }
    );
  }

  if (record.expiresAt < new Date()) {
    return NextResponse.json(
      {
        error:
          "Ce lien de téléchargement a expiré. Contactez le support pour en obtenir un nouveau.",
      },
      { status: 410 }
    );
  }

  if (record.downloadCount >= record.maxDownloads) {
    return NextResponse.json(
      {
        error:
          "Ce lien a atteint son nombre maximum de téléchargements. Contactez le support.",
      },
      { status: 410 }
    );
  }

  // Atomic increment — prevents a race condition if two requests arrive simultaneously
  const updated = await db.downloadToken.updateMany({
    where: { token, downloadCount: { lt: record.maxDownloads } },
    data: { downloadCount: { increment: 1 } },
  });

  if (updated.count === 0) {
    return NextResponse.json(
      {
        error:
          "Ce lien a atteint son nombre maximum de téléchargements. Contactez le support.",
      },
      { status: 410 }
    );
  }

  const r2Key = record.product.ebook?.fileKey;

  if (!r2Key) {
    console.error(
      `[download] No fileKey configured for product ${record.productId}`
    );
    return NextResponse.json(
      {
        error:
          "Fichier non disponible. Contactez le support.",
      },
      { status: 500 }
    );
  }

  console.warn(
    `[download] Token used: product ${record.productId}, count ${record.downloadCount + 1}/${record.maxDownloads}`
  );

  try {
    return await streamFromR2(r2Key);
  } catch (err) {
    console.error(`[download] Failed to stream key "${r2Key}":`, err);
    return NextResponse.json(
      {
        error:
          "Impossible de récupérer le fichier. Veuillez réessayer ou contacter le support.",
      },
      { status: 500 }
    );
  }
}
