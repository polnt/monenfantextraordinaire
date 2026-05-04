"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { isFlutterwaveCountry } from "@/lib/geo";

const COUNTRIES = [
  { code: "FR", label: "France" },
  { code: "BE", label: "Belgique" },
  { code: "CH", label: "Suisse" },
  { code: "LU", label: "Luxembourg" },
  { code: "CA", label: "Canada" },
  { code: "CI", label: "Côte d'Ivoire" },
  { code: "SN", label: "Sénégal" },
  { code: "CM", label: "Cameroun" },
  { code: "ML", label: "Mali" },
  { code: "TG", label: "Togo" },
  { code: "BF", label: "Burkina Faso" },
  { code: "BJ", label: "Bénin" },
  { code: "GN", label: "Guinée" },
  { code: "MA", label: "Maroc" },
  { code: "TN", label: "Tunisie" },
  { code: "DZ", label: "Algérie" },
  { code: "OTHER", label: "Autre pays" },
];

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(price);
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
}

export default function CheckoutPage(): React.JSX.Element {
  const router = useRouter();
  const { items, totalPrice, currency, clearCart } = useCart();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    country: "FR",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFlutterwave = isFlutterwaveCountry(form.country);

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/");
    }
  }, [items.length, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): string | null => {
    if (!form.firstName.trim()) return "Le prénom est requis.";
    if (!form.lastName.trim()) return "Le nom est requis.";
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(form.email)) return "Adresse e-mail invalide.";
    if (!form.country) return "Le pays est requis.";
    if (isFlutterwave && !form.phone.trim()) return "Le numéro de téléphone est requis pour ce pays.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerFirstName: form.firstName.trim(),
          customerLastName: form.lastName.trim(),
          customerEmail: form.email.trim(),
          customerCountry: form.country,
          customerPhone: form.phone.trim() || undefined,
          items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        }),
      });

      const data = (await res.json()) as { paymentUrl?: string; error?: string };

      if (!res.ok || !data.paymentUrl) {
        setError(data.error ?? "Une erreur est survenue. Veuillez réessayer.");
        return;
      }

      clearCart();
      window.location.href = data.paymentUrl;
    } catch {
      setError("Une erreur réseau est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) return <div />;

  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: "#fafbff" }}>
      <div className="mef-container" style={{ maxWidth: 900, paddingTop: 48, paddingBottom: 80 }}>
        <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 32, color: "#090943", marginBottom: 8 }}>
          Finaliser la commande
        </h1>
        <p style={{ fontFamily: "var(--font-aleo)", fontSize: 15, color: "#9ca3af", marginBottom: 40 }}>
          Paiement sécurisé · Sans création de compte
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>

          {/* Order summary */}
          <div style={{ background: "white", borderRadius: 20, padding: "28px 32px", boxShadow: "0 4px 24px rgba(9,9,67,0.06)", border: "1px solid #f0f0f8" }}>
            <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 17, color: "#090943", marginBottom: 20 }}>
              Récapitulatif
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item) => (
                <div key={item.productId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 14, color: "#090943", margin: 0 }}>
                      {item.name}
                    </p>
                    {item.quantity > 1 && (
                      <p style={{ fontFamily: "var(--font-aleo)", fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>
                        × {item.quantity}
                      </p>
                    )}
                  </div>
                  <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 15, color: "#090943" }}>
                    {formatPrice(item.price * item.quantity, item.currency)}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "2px solid #f3f4f6", marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 15, color: "#5a6070" }}>Total</span>
              <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 22, color: "#090943" }}>
                {formatPrice(totalPrice, currency)}
              </span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => void handleSubmit(e)}
            style={{ background: "white", borderRadius: 20, padding: "28px 32px", boxShadow: "0 4px 24px rgba(9,9,67,0.06)", border: "1px solid #f0f0f8" }}
          >
            <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 17, color: "#090943", marginBottom: 24 }}>
              Vos coordonnées
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Prénom *</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  style={inputStyle}
                  placeholder="Camille"
                />
              </div>
              <div>
                <label style={labelStyle}>Nom *</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  style={inputStyle}
                  placeholder="Martin"
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Adresse e-mail *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                style={inputStyle}
                placeholder="camille@exemple.fr"
              />
              <p style={{ fontFamily: "var(--font-aleo)", fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
                Votre accès à la formation vous sera envoyé à cette adresse.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Pays *</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                style={{ ...inputStyle, appearance: "none" as const }}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>

            {isFlutterwave && (
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Téléphone * <span style={{ fontWeight: 400, color: "#9ca3af" }}>(requis pour Mobile Money)</span></label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  style={inputStyle}
                  placeholder="+225 07 00 00 00 00"
                />
              </div>
            )}

            {/* Gateway indicator */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              background: isFlutterwave ? "#fff8e1" : "#f0f7ff",
              borderRadius: 12,
              border: `1px solid ${isFlutterwave ? "#ffe082" : "#bfdbfe"}`,
              marginBottom: 24,
            }}>
              <span style={{ fontSize: 18 }}>{isFlutterwave ? "📱" : "💳"}</span>
              <div>
                <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 13, color: "#090943", margin: 0 }}>
                  {isFlutterwave ? "Paiement via Flutterwave" : "Paiement sécurisé par Stripe"}
                </p>
                <p style={{ fontFamily: "var(--font-aleo)", fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>
                  {isFlutterwave
                    ? "Mobile Money, carte bancaire et autres moyens locaux"
                    : "Carte bancaire, Apple Pay, Google Pay"}
                </p>
              </div>
            </div>

            {error && (
              <div style={{ padding: "12px 16px", background: "#fef2f2", borderRadius: 10, border: "1px solid #fecaca", marginBottom: 20 }}>
                <p style={{ fontFamily: "var(--font-nunito)", fontSize: 13, color: "#dc2626", margin: 0, fontWeight: 600 }}>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mef-btn mef-btn-blue"
              style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "16px 24px", fontWeight: 800, opacity: submitting ? 0.7 : 1, cursor: submitting ? "wait" : "pointer" }}
            >
              {submitting ? "Redirection en cours…" : `🔒 Payer ${formatPrice(totalPrice, currency)}`}
            </button>

            <p style={{ fontFamily: "var(--font-aleo)", fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 12 }}>
              En cliquant sur &ldquo;Payer&rdquo;, vous acceptez nos conditions générales de vente. Garantie satisfait ou remboursé 30 jours.
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-nunito)",
  fontWeight: 700,
  fontSize: 13,
  color: "#090943",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1.5px solid #e5e7eb",
  fontFamily: "var(--font-aleo)",
  fontSize: 15,
  color: "#090943",
  background: "white",
  outline: "none",
  boxSizing: "border-box",
};
