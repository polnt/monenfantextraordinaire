import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { EBOOKS, type EbookProduct } from "@/lib/catalog";
import { Price } from "@/components/shop/Price";
import { EbookBuyButton } from "./EbookBuyButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return EBOOKS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = EBOOKS.find((p) => p.slug === slug);
  if (!d) return {};
  return {
    title: `${d.title} ${d.subtitle} — Mon Enfant Extra-Ordinaire`,
    description: d.description,
  };
}

export default async function EbookDetailPage({ params }: Props): Promise<React.JSX.Element> {
  const { slug } = await params;
  const d: EbookProduct | undefined = EBOOKS.find((p) => p.slug === slug);
  if (!d) notFound();

  const { color, colorLight } = d;

  return (
    <div style={{ paddingTop: 72 }}>

      {/* ── HERO ── */}
      <section style={{ background: "#090943", padding: "72px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -120, width: 480, height: 480, borderRadius: "50%", background: `${color}18`, filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 40, left: -80, width: 320, height: 320, borderRadius: "50%", background: "#FDF48218", filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>

        <div className="mef-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid gap-10 md:gap-16 items-center" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", maxWidth: 1100, margin: "0 auto" }}>

            {/* Left — text */}
            <div>
              <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 50, padding: "5px 14px", fontSize: 13, fontFamily: "var(--font-nunito)", fontWeight: 600, background: `${color}22`, color }}>
                  {d.badge}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 50, padding: "5px 14px", fontSize: 13, fontFamily: "var(--font-nunito)", fontWeight: 600, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                  PDF · Téléchargement immédiat
                </span>
              </div>

              <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(32px, 4vw, 48px)", color: "white", lineHeight: 1.1, marginBottom: 8 }}>
                {d.title}
              </h1>
              <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 26px)", color, marginBottom: 24, lineHeight: 1.3 }}>
                {d.subtitle}
              </p>
              <p style={{ fontFamily: "var(--font-aleo)", fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
                {d.description}
              </p>

              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 36 }}>
                <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 42, color: "white" }}><Price eur={d.priceEur} xof={d.priceXof} /></div>
                <div style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Téléchargement PDF immédiat</div>
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <EbookBuyButton
                  productSlug={slug}
                  priceEur={d.priceEur}
                  priceXof={d.priceXof}
                  style={{ background: color, color: "white", fontSize: 16, padding: "14px 32px", fontWeight: 800, boxShadow: `0 8px 32px ${color}55` }}
                />
                <a
                  href="#tsp-sommaire"
                  className="mef-btn"
                  style={{ background: "transparent", borderColor: "rgba(255,255,255,0.3)", border: "2px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)", fontSize: 14, padding: "14px 24px" }}
                >
                  Voir le sommaire
                </a>
              </div>
            </div>

            {/* Right — product visual, desktop only */}
            <div className="hidden md:block" style={{ position: "relative" }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: `0 24px 80px ${color}44, 0 4px 24px rgba(0,0,0,0.3)`, transform: "rotate(1deg)" }}>
                <Image
                  src={d.img}
                  alt={d.title}
                  width={800}
                  height={1067}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <div style={{
                position: "absolute", top: -12, right: -12,
                background: "#FDF482", color: "#090943",
                borderRadius: 50, padding: "8px 18px",
                fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 13,
                boxShadow: "0 4px 16px rgba(239,208,16,0.4)",
              }}>
                {d.badge}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ background: "white", padding: "80px 0 72px" }}>
        <div className="mef-container" style={{ maxWidth: 760, textAlign: "center" }}>
          <div className="mef-eyebrow">Pourquoi cet ebook</div>
          <h2 className="mef-h2" style={{ marginBottom: 24 }}>
            Parce que des difficultés similaires peuvent avoir des origines très différentes
          </h2>
          <p style={{ fontFamily: "var(--font-aleo)", fontSize: 16, color: "#5a6070", lineHeight: 1.8 }}>
            {d.intro}
          </p>
        </div>
      </section>

      {/* ── POUR QUI ── */}
      <section style={{ background: `${color}0d`, padding: "80px 0 72px" }}>
        <div className="mef-container" style={{ maxWidth: 960 }}>
          <div className="mef-eyebrow" style={{ textAlign: "center" }}>À qui s&apos;adresse cet ebook ?</div>
          <h2 className="mef-h2" style={{ textAlign: "center", marginBottom: 48 }}>Un outil pensé pour tous ceux qui accompagnent les enfants</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 16 }}>
            {d.pourQui.map((a, i) => (
              <div key={i} style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                background: "white", borderRadius: 16, padding: "20px 24px",
                border: "1px solid #f0f0f8",
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</span>
                <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 15, lineHeight: 1.65, color: "#090943" }}>{a.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, background: `${color}10`, borderRadius: 16, padding: "20px 28px", borderLeft: `4px solid ${color}` }}>
            <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 15, color: "#090943", lineHeight: 1.7 }}>
              {d.pourQuiNote}
            </p>
          </div>
        </div>
      </section>

      {/* ── SOMMAIRE ── */}
      <section id="tsp-sommaire" style={{ background: "#090943", padding: "80px 0" }}>
        <div className="mef-container" style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="mef-eyebrow" style={{ color }}>Que trouverez-vous dans cet ebook ?</div>
            <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(26px, 3.5vw, 38px)", color: "white", lineHeight: 1.2 }}>
              Un panorama illustré des troubles du neurodéveloppement
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {d.sommaire.map((ch) => (
              <div key={ch.num} style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16, padding: "20px 24px", display: "flex", gap: 20, alignItems: "flex-start",
              }}>
                <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 22, color, flexShrink: 0, minWidth: 36 }}>{ch.num}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 16, color: "white", marginBottom: 6 }}>{ch.title}</div>
                  <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{ch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATOUTS ── */}
      <section style={{ background: "white", padding: "80px 0" }}>
        <div className="mef-container" style={{ maxWidth: 1000 }}>
          <div className="mef-eyebrow" style={{ textAlign: "center" }}>Bien plus qu&apos;un ebook</div>
          <h2 className="mef-h2" style={{ textAlign: "center", marginBottom: 48 }}>Un outil pour enrichir votre regard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {d.atouts.map((item, i) => (
              <div key={i} style={{ background: "#fafbff", borderRadius: 20, padding: "28px 24px", border: "1px solid #f0f0f8" }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 16, color: "#090943", marginBottom: 10 }}>{item.title}</div>
                <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 14, color: "#5a6070", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROCHE ── */}
      <section style={{ background: `${color}0d`, padding: "80px 0" }}>
        <div className="mef-container" style={{ maxWidth: 1000 }}>
          <div className="mef-eyebrow" style={{ textAlign: "center" }}>Une approche accessible, visuelle et concrète</div>
          <h2 className="mef-h2" style={{ textAlign: "center", marginBottom: 48 }}>Des connaissances essentielles, sans jargon inutile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {d.approche.map((item, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 18, padding: "24px 28px",
                border: "1px solid #f0f0f8", boxShadow: "0 4px 24px rgba(9,9,67,0.06)",
                display: "flex", gap: 20, alignItems: "flex-start",
              }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 16, color: "#090943", marginBottom: 6 }}>{item.title}</div>
                  <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 14, color: "#5a6070", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE QUE CELA VOUS APPORTE / CE QUE VOUS RECEVEZ ── */}
      <section style={{ background: "#090943", padding: "72px 0" }}>
        <div className="mef-container" style={{ maxWidth: 1000 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="mef-eyebrow" style={{ color }}>Ce que ça va vous apporter</div>
              <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 28, color: "white", marginBottom: 24, lineHeight: 1.25 }}>
                Mieux comprendre pour mieux accompagner
              </h2>
              {d.apports.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%", background: color, color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
                  }}>✓</span>
                  <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.85)" }}>{a}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="mef-eyebrow" style={{ color }}>Votre ebook en pratique</div>
              <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 28, color: "white", marginBottom: 24, lineHeight: 1.25 }}>
                Ce que vous recevez
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {d.inclus.map((inc, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16, padding: "18px 20px",
                    display: "flex", gap: 14, alignItems: "flex-start",
                  }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{inc.icon}</span>
                    <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>{inc.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p style={{ marginTop: 48, fontFamily: "var(--font-aleo)", fontSize: 13, color: "rgba(255,255,255,0.4)", fontStyle: "italic", textAlign: "center", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
            {d.disclaimer}
          </p>
        </div>
      </section>

      {/* ── PRICING / CTA FINAL ── */}
      <section style={{ background: colorLight, padding: "80px 0 100px" }}>
        <div className="mef-container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="mef-eyebrow">Prêt à mieux comprendre ?</div>
            <h2 className="mef-h2" style={{ marginBottom: 12 }}>{d.title}</h2>
            <p style={{ color: "#5a6070", fontSize: 15, fontFamily: "var(--font-aleo)" }}>
              {d.tagline}
            </p>
          </div>

          <div style={{ background: color, borderRadius: 28, padding: "44px 48px", boxShadow: `0 24px 80px ${color}40`, textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>
              {d.badge}
            </div>
            <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 56, color: "white", lineHeight: 1, marginBottom: 6 }}><Price eur={d.priceEur} xof={d.priceXof} /></div>
            <div style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>
              paiement unique · accès illimité
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 28, marginBottom: 32 }}>
              {d.apports.slice(0, 4).map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, justifyContent: "center" }}>
                  <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>✓</span>
                  <span style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{a}</span>
                </div>
              ))}
            </div>
            <EbookBuyButton
              productSlug={slug}
              priceEur={d.priceEur}
              priceXof={d.priceXof}
              style={{ background: "white", color, fontSize: 17, padding: "16px 48px", fontWeight: 800, width: "100%", justifyContent: "center" }}
            />
            <p style={{ margin: "16px 0 0", fontFamily: "var(--font-aleo)", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              ✅ Paiement sécurisé
            </p>
          </div>

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link href="/ressources" style={{ fontFamily: "var(--font-nunito)", fontSize: 14, color: "#5a6070", textDecoration: "underline" }}>
              ← Retour aux ressources
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
