import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { escapeHtml } from "@/lib/escapeHtml";
import { streamFromR2 } from "@/lib/r2";

function renderFileListPage(token: string, productName: string, fileKeys: string[]): Response {
  const links = fileKeys
    .map((key, i) => {
      const label = key.split("/").pop() ?? `Fichier ${i + 1}`;
      return `<li style="margin-bottom:12px">
        <a href="/api/download/${token}?file=${i}"
           style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;
                  text-decoration:none;border-radius:8px;font-weight:bold">
          Télécharger ${escapeHtml(label)}
        </a>
      </li>`;
    })
    .join("");

  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="fr"><head><meta charset="utf-8"><title>Téléchargements</title></head>
    <body style="font-family:sans-serif;max-width:560px;margin:40px auto;padding:24px">
      <h1 style="font-size:20px">${escapeHtml(productName)}</h1>
      <p>Ce pack contient ${fileKeys.length} fichiers :</p>
      <ul style="list-style:none;padding:0">${links}</ul>
    </body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
): Promise<Response> {
  const { token } = await params;
  const fileIndexParam = new URL(req.url).searchParams.get("file");

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

  const fileKeys = record.product.ebook?.fileKeys ?? [];

  if (fileKeys.length === 0) {
    console.error(
      `[download] No fileKeys configured for product ${record.productId}`
    );
    return NextResponse.json(
      {
        error:
          "Fichier non disponible. Contactez le support.",
      },
      { status: 500 }
    );
  }

  // Multiple files and no specific one requested yet — show the picker page.
  // Listing files here does not count against maxDownloads; only an actual
  // stream below does.
  if (fileKeys.length > 1 && fileIndexParam === null) {
    return renderFileListPage(token, record.product.name, fileKeys);
  }

  const fileIndex = fileIndexParam ? Number(fileIndexParam) : 0;
  if (!Number.isInteger(fileIndex) || fileIndex < 0 || fileIndex >= fileKeys.length) {
    return NextResponse.json({ error: "Fichier invalide." }, { status: 400 });
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

  const r2Key = fileKeys[fileIndex]!;

  console.warn(
    `[download] Token used: product ${record.productId}, file ${fileIndex}, count ${record.downloadCount + 1}/${record.maxDownloads}`
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
