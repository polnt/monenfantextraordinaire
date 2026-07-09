import { NextResponse } from "next/server";
import { RESSOURCES } from "@/lib/catalog";
import { getPublicUrl } from "@/lib/r2";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
  const { slug } = await params;

  const resource = RESSOURCES.find((r) => r.slug === slug);

  if (!resource) {
    return NextResponse.json(
      { error: "Ressource introuvable." },
      { status: 404 }
    );
  }

  try {
    return NextResponse.redirect(getPublicUrl(resource.fileKey), 302);
  } catch (err) {
    console.error(
      `[ressources/download] Failed to build public URL for key "${resource.fileKey}":`,
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      { error: "Impossible de récupérer le fichier. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
