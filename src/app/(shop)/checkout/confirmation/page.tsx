"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface DownloadEntry {
  productId: string;
  productName: string;
  url: string;
}

interface OrderStatusResponse {
  status: string;
  downloads: DownloadEntry[];
}

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 8; // ~16s — covers typical webhook delivery delay

function useOrderDownloads(sessionId: string | null, orderId: string | null): {
  downloads: DownloadEntry[];
  pending: boolean;
} {
  const [downloads, setDownloads] = useState<DownloadEntry[]>([]);
  const [pending, setPending] = useState(Boolean(sessionId || orderId));
  const attemptsRef = useRef(0);

  useEffect(() => {
    if (!sessionId && !orderId) {
      setPending(false);
      return;
    }

    let cancelled = false;
    const query = sessionId
      ? `session_id=${encodeURIComponent(sessionId)}`
      : `orderId=${encodeURIComponent(orderId!)}`;

    const poll = async (): Promise<void> => {
      try {
        const res = await fetch(`/api/orders/status?${query}`);
        if (!res.ok) throw new Error("Order status request failed");
        const data = (await res.json()) as OrderStatusResponse;

        if (cancelled) return;

        if (data.status === "PAID") {
          setDownloads(data.downloads);
          setPending(false);
          return;
        }
      } catch (err) {
        console.error("[confirmation] Failed to fetch order status:", err);
      }

      attemptsRef.current += 1;
      if (!cancelled) {
        if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
          setPending(false);
        } else {
          setTimeout(() => void poll(), POLL_INTERVAL_MS);
        }
      }
    };

    void poll();

    return (): void => {
      cancelled = true;
    };
  }, [sessionId, orderId]);

  return { downloads, pending };
}

function ConfirmationContent(): React.JSX.Element {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const orderId = params.get("orderId");
  const isPaydunia = !sessionId && !!orderId;
  const { downloads, pending } = useOrderDownloads(sessionId, orderId);

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

        {pending && (
          <p style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "#9ca3af", marginBottom: 24 }}>
            Préparation de votre téléchargement…
          </p>
        )}

        {downloads.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", marginBottom: 32 }}>
            {downloads.map((d) => (
              <a
                key={d.productId}
                href={d.url}
                className="mef-btn"
                style={{ background: "#090943", color: "white", fontSize: 15, padding: "14px 32px", fontWeight: 800, width: "100%", justifyContent: "center" }}
              >
                ⬇️ Télécharger {d.productName}
              </a>
            ))}
          </div>
        )}

        <p style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "#9ca3af", lineHeight: 1.65, marginBottom: 40 }}>
          Si vous n&apos;avez rien reçu dans 10 minutes, vérifiez vos spams ou{" "}
          <Link href="/reseaux" style={{ color: "var(--blue)", textDecoration: "underline" }}>
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
