import { NextResponse } from "next/server";
import { sendProductEmail } from "@/lib/sendProductEmail";
import { addContactToBrevoList } from "@/lib/brevo";
import { BREVO_LISTS } from "@/lib/brevoLists";
import { getPublicUrl } from "@/lib/r2";
import { BONUS } from "@/lib/catalog";

export async function POST(req: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || !("email" in body)) {
    return NextResponse.json({ error: "Email manquant." }, { status: 400 });
  }

  const rawEmail = (body as { email: unknown }).email;
  if (typeof rawEmail !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail.trim())) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }

  const email = rawEmail.trim();
  const bonus = BONUS[0];

  if (!bonus) {
    console.error("[lead-magnet] No bonus configured in catalog");
    return NextResponse.json({ error: "Bonus introuvable." }, { status: 500 });
  }

  try {
    const directUrl = getPublicUrl(bonus.fileKey);
    await sendProductEmail({
      productId: bonus.fileKey,
      productName: bonus.title,
      email,
      orderId: null,
      directUrl,
    });
  } catch (err) {
    console.error(
      "[lead-magnet] Failed to send email:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      { error: "Impossible d'envoyer l'email. Veuillez réessayer." },
      { status: 500 }
    );
  }

  try {
    await addContactToBrevoList(email, BREVO_LISTS.leadMagnetBonus.id);
  } catch (err) {
    console.error(
      "[lead-magnet] Failed to add contact to Brevo list:",
      err instanceof Error ? err.message : err
    );
  }

  return NextResponse.json({ success: true });
}
