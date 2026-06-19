"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ConfirmationContent(): React.JSX.Element {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const orderId = params.get("orderId");
  const isPaydunia = !sessionId && !!orderId;

  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: "#fafbff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 560, width: "100%", padding: "0 24px", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 40 }}>
          ✅
        </div>
        <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 32, color: "#090943", marginBottom: 12 }}>
          Merci pour votre commande !
        </h1>
        <p style={{ fontFamily: "var(--font-aleo)", fontSize: 16, color: "#5a6070", lineHeight: 1.75, marginBottom: 8 }}>
          Votre paiement a bien été reçu. Vous allez recevoir un e-mail de confirmation avec vos accès dans les prochaines minutes.
        </p>
        {isPaydunia && (
          <p style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "#9ca3af", marginBottom: 8 }}>
            Référence : <strong style={{ color: "#090943" }}>{orderId}</strong>
          </p>
        )}
        <p style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "#9ca3af", lineHeight: 1.65, marginBottom: 40 }}>
          Si vous n&apos;avez rien reçu dans 10 minutes, vérifiez vos spams ou{" "}
          <Link href="/contact" style={{ color: "var(--blue)", textDecoration: "underline" }}>
            contactez-nous
          </Link>.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <Link
            href="/formations"
            className="mef-btn mef-btn-blue"
            style={{ padding: "14px 32px", fontSize: 15 }}
          >
            Voir toutes les formations
          </Link>
          <Link
            href="/"
            style={{ fontFamily: "var(--font-nunito)", fontSize: 14, color: "var(--gray)", textDecoration: "underline" }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage(): React.JSX.Element {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
