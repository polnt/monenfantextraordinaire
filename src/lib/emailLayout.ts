import { escapeHtml } from "@/lib/escapeHtml";
import { R2_IMAGES_BASE } from "@/lib/images";

const SITE_BASE_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
const LOGO_URL = `${R2_IMAGES_BASE}/logo-full.png`;

export interface EmailLayoutParams {
  /** Hidden preheader text shown by inbox clients next to the subject line. */
  previewText: string;
  /** Background color of the hero band, e.g. "#FDF482". */
  heroBackground: string;
  eyebrow: string;
  /** Pre-escaped HTML — build with escapeHtml() on any dynamic parts before passing in. */
  titleHtml: string;
  /** Pre-escaped HTML — build with escapeHtml() on any dynamic parts before passing in. */
  bodyHtml: string;
  /** Pre-escaped HTML — build with escapeHtml() on any dynamic parts before passing in. */
  signatureHtml: string;
}

/**
 * Shared branded wrapper (logo header, hero band, footer) for transactional
 * emails, matching the design in prototype/Email - *.html.
 */
export function renderEmailLayout(params: EmailLayoutParams): string {
  const { previewText, heroBackground, eyebrow, titleHtml, bodyHtml, signatureHtml } = params;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!--[if mso]>
<style>table{border-collapse:collapse;} .fallback-font{font-family:Arial,sans-serif !important;}</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background:#f0f4fa;font-family:Georgia,'Times New Roman',serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4fa;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(9,9,67,0.07);">

<tr><td style="background:#ffffff;padding:28px 40px 20px;text-align:center;border-bottom:1px solid #f0f1f5;">
<img src="${LOGO_URL}" alt="Mon Enfant Extra-Ordinaire" width="220" style="display:block;margin:0 auto;max-width:220px;height:auto;">
</td></tr>

<tr><td style="background:${heroBackground};padding:36px 40px;text-align:center;">
<div style="font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#0567a8;margin-bottom:10px;">${escapeHtml(eyebrow)}</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-weight:800;font-size:28px;line-height:1.2;color:#090943;">${titleHtml}</div>
</td></tr>

<tr><td style="padding:36px 40px 8px;">
${bodyHtml}
</td></tr>

<tr><td style="padding:0 40px 36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0f1f5;padding-top:24px;">
<tr><td style="font-family:Georgia,serif;font-size:14px;line-height:1.6;color:#5a6070;">
${signatureHtml}
</td></tr>
</table>
</td></tr>

<tr><td style="background:#f7f8fc;padding:24px 40px;text-align:center;">
<p style="font-family:Arial,sans-serif;font-size:12px;color:#9ca3af;margin:0 0 6px;">Mon Enfant Extra-Ordinaire — Accompagner au mieux</p>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#9ca3af;margin:0;"><a href="${SITE_BASE_URL}" style="color:#0792dc;text-decoration:none;">monenfantextraordinaire.com</a> · <a href="${SITE_BASE_URL}/contact" style="color:#0792dc;text-decoration:none;">Contact</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
