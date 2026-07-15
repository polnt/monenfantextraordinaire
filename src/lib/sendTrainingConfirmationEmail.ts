import { Resend } from "resend";
import { escapeHtml } from "@/lib/escapeHtml";
import { renderEmailLayout } from "@/lib/emailLayout";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing required environment variable: RESEND_API_KEY");
  }
  return new Resend(apiKey);
}

function getMoodleLoginUrl(): string {
  const moodleBaseUrl = process.env.NEXT_PUBLIC_MOODLE_BASE_URL;
  if (!moodleBaseUrl) {
    throw new Error(
      "Missing required environment variable: NEXT_PUBLIC_MOODLE_BASE_URL"
    );
  }
  return `${moodleBaseUrl}/login/index.php`;
}

export interface SendTrainingConfirmationEmailParams {
  to: string;
  customerFirstName: string;
  trainingName: string;
  orderNumber: string;
}

export async function sendTrainingConfirmationEmail(
  params: SendTrainingConfirmationEmailParams
): Promise<void> {
  const { to, customerFirstName, trainingName, orderNumber } = params;
  const moodleLoginUrl = getMoodleLoginUrl();

  const bodyHtml = `
    <p style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#090943;margin:0 0 20px;">Votre inscription à <strong>${escapeHtml(trainingName)}</strong> est bien enregistrée. Merci de votre confiance — je suis ravie de vous compter parmi les membres de notre communauté qui souhaitent accompagner leur
enfant extra-ordinaire.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e8f4fd;border-radius:14px;margin:0 0 24px;">
      <tr><td style="padding:20px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#5a6070;padding:6px 0;">Formation</td><td align="right" style="font-family:Arial,sans-serif;font-weight:700;font-size:13px;color:#090943;padding:6px 0;">${escapeHtml(trainingName)}</td></tr>
          <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#5a6070;padding:6px 0;">Numéro de commande</td><td align="right" style="font-family:Arial,sans-serif;font-weight:700;font-size:13px;color:#090943;padding:6px 0;">${escapeHtml(orderNumber)}</td></tr>
        </table>
      </td></tr>
    </table>

    <p style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#090943;margin:0 0 28px;">Vous pouvez dès à présent vous connecter à notre plateforme de formation “Académie des Formations Personnalisées” sur laquelle vous aurez directement accès au contenu de la formation. Un email de notre plateforme vous parvient séparément avec vos identifiants de connexion.</p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
      <tr><td align="center" style="background:#0792dc;border-radius:50px;">
        <a href="${escapeHtml(moodleLoginUrl)}" style="display:inline-block;padding:15px 32px;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:15px;color:#ffffff;text-decoration:none;">Accéder à mon espace</a>
      </td></tr>
    </table>
  `;

  const signatureHtml = `Si vous avez la moindre question ou difficulté technique répondez simplement à cet email et je m’assurerai de vous aider le plus rapidement possible<br><br>Merci d’avoir choisi Mon Enfant Extra-Ordinaire, nous vous souhaitons une belle aventure à nos côtés.<br><br>À très vite dans la formation,<br><strong style="color:#090943;">Laurence et Ludivine</strong> — Mon Enfant Extra-Ordinaire`;

  const html = renderEmailLayout({
    previewText: `Votre inscription à ${trainingName} est confirmée — voici les prochaines étapes.`,
    heroBackground: "#FDF482",
    eyebrow: "Inscription confirmée",
    titleHtml: `C'est noté, ${escapeHtml(customerFirstName)} ! 🎉`,
    bodyHtml,
    signatureHtml,
  });

  const { error } = await getResendClient().emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Inscription confirmée — ${trainingName}`,
    html,
  });

  if (error) {
    throw new Error(
      `Failed to send training confirmation email: ${error.message}`
    );
  }
}
