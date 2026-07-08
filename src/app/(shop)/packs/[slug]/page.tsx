import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PACKS, getPackItems, type Pack } from '@/lib/catalog';
import { PackBuyButton } from './PackBuyButton';

const POURQUOI = [
  {
    icon: '🔓',
    title: 'Il ne reste pas bloqué sur une seule image',
    desc: "Voir le même mot sous plusieurs formes lui apprend qu'une seule chose peut avoir plusieurs représentations.",
  },
  {
    icon: '🔗',
    title: 'Il fait des liens plus solides',
    desc: "Alterner les supports renforce l'acquisition du vocabulaire, bien plus qu'un seul support répété.",
  },
  {
    icon: '📦',
    title: 'Vous gagnez en simplicité',
    desc: 'Un seul achat, une seule ressource — les deux outils sont livrés ensemble, prêts à imprimer.',
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return PACKS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pack = PACKS.find((p) => p.slug === slug);
  if (!pack) return {};
  return {
    title: `${pack.title} — ${pack.subtitle} — Mon Enfant Extra-Ordinaire`,
    description: pack.tagline,
  };
}

export default async function PackDetailPage({ params }: Props): Promise<React.JSX.Element> {
  const { slug } = await params;
  const pack: Pack | undefined = PACKS.find((p) => p.slug === slug);
  if (!pack) notFound();

  const { color, color2 } = pack;
  const items = getPackItems(pack);

  return (
    <div style={{ paddingTop: 72 }}>

      {/* ── HERO ── */}
      <section style={{ background: '#090943', padding: '72px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -120, width: 480, height: 480, borderRadius: '50%', background: `${color}18`, filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 40, left: -80, width: 320, height: 320, borderRadius: '50%', background: `${color2}18`, filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>

        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid gap-10 md:gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', maxWidth: 1100, margin: '0 auto' }}>

            {/* Left — text */}
            <div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 50, padding: '5px 14px', fontSize: 13, fontFamily: 'var(--font-nunito)', fontWeight: 600, background: '#FDF48222', color: '#FDF482' }}>
                  {pack.badge}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 50, padding: '5px 14px', fontSize: 13, fontFamily: 'var(--font-nunito)', fontWeight: 600, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}>
                  PDF imprimable · Accès immédiat
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 'clamp(32px, 4vw, 46px)', color: 'white', lineHeight: 1.1, marginBottom: 8 }}>
                {pack.title}
              </h1>
              <p style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 'clamp(18px, 2.2vw, 23px)', color, marginBottom: 24, lineHeight: 1.3 }}>
                {pack.subtitle}
              </p>
              <p style={{ fontFamily: 'var(--font-aleo)', fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
                {pack.tagline}
              </p>

              <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 8 }}>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 42, color: 'white' }}>{pack.price}</div>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 18, color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>{pack.priceBarre}</div>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 50, padding: '5px 14px', fontSize: 13, fontFamily: 'var(--font-nunito)', fontWeight: 600, background: '#27ae6022', color: '#27ae60' }}>
                  Économisez {pack.economie}
                </span>
                <div style={{ fontFamily: 'var(--font-aleo)', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Téléchargement PDF immédiat</div>
              </div>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <PackBuyButton
                  itemSlugs={pack.itemSlugs}
                  price={pack.price}
                  style={{ background: '#FDF482', color: '#090943', fontSize: 16, padding: '14px 32px', fontWeight: 800, boxShadow: '0 8px 32px rgba(239,208,16,0.4)' }}
                />
                <a
                  href="#pack-outils"
                  className="mef-btn"
                  style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)', fontSize: 14, padding: '14px 24px' }}
                >
                  Voir les 2 outils
                </a>
              </div>
            </div>

            {/* Right — visual stack, desktop only */}
            <div className="hidden md:block" style={{ position: 'relative', height: 380 }}>
              {items.map((item, i) => (
                item.img ? (
                  <div
                    key={item.slug}
                    style={{
                      position: 'absolute',
                      width: '78%',
                      left: i === 0 ? 0 : '22%',
                      top: i === 0 ? 0 : 60,
                      borderRadius: 18,
                      overflow: 'hidden',
                      boxShadow: `0 24px 70px ${item.color}44, 0 4px 24px rgba(0,0,0,0.35)`,
                      transform: `rotate(${i === 0 ? -4 : 4}deg)`,
                      zIndex: i,
                      border: '4px solid white',
                    }}
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={item.imgWidth ?? 800}
                      height={item.imgHeight ?? 1067}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                ) : null
              ))}
              <div style={{
                position: 'absolute', top: -12, right: 0,
                background: '#FDF482', color: '#090943',
                borderRadius: 50, padding: '8px 18px',
                fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 13,
                boxShadow: '0 4px 16px rgba(239,208,16,0.4)',
                zIndex: 3,
              }}>
                {pack.badge}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LES 2 OUTILS DU PACK ── */}
      <section id="pack-outils" style={{ background: 'white', padding: '80px 0 72px' }}>
        <div className="mef-container" style={{ maxWidth: 1000 }}>
          <div className="mef-eyebrow" style={{ textAlign: 'center' }}>Ce que contient le pack</div>
          <h2 className="mef-h2" style={{ textAlign: 'center', marginBottom: 48 }}>2 outils, réunis pour vous</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {items.map((item) => (
              <div key={item.slug} className="mef-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 240, background: item.colorLight, overflow: 'hidden' }}>
                  {item.img && (
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={600}
                      height={400}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )}
                </div>
                <div style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 50, padding: '5px 14px', fontSize: 13, fontFamily: 'var(--font-nunito)', fontWeight: 600, background: `${item.color}18`, color: item.color, width: 'fit-content', marginBottom: 14 }}>
                    {item.badge}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 18, color: '#090943', marginBottom: 10, lineHeight: 1.35 }}>
                    {item.title} {item.subtitle}
                  </h3>
                  <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 14, color: '#5a6070', lineHeight: 1.7, flex: 1 }}>
                    {item.description}
                  </p>
                  <Link
                    href={`/outils/${item.slug}`}
                    className="mef-btn"
                    style={{ marginTop: 20, background: 'transparent', border: `2px solid ${item.color}`, color: item.color, fontSize: 13, padding: '10px 20px', alignSelf: 'flex-start' }}
                  >
                    Voir la fiche détaillée →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI EN PACK ── */}
      <section style={{ background: '#090943', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: `${color}0d`, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="mef-container" style={{ position: 'relative', zIndex: 1, maxWidth: 1000 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="mef-eyebrow" style={{ color }}>Pourquoi choisir le pack</div>
            <h2 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 36px)', color: 'white', lineHeight: 1.2, marginBottom: 16 }}>
              Deux formats valent mieux qu&apos;un
            </h2>
            <p style={{ fontFamily: 'var(--font-aleo)', fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 640, margin: '0 auto', lineHeight: 1.75 }}>
              Un enfant qui reconnaît un objet en photo ne le reconnaît pas toujours en dessin — et inversement. C&apos;est la <strong style={{ color: 'white' }}>généralisation</strong>, une compétence qui se travaille avec les deux supports ensemble.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {POURQUOI.map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20, padding: '32px 28px',
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 17, color: 'white', marginBottom: 12, lineHeight: 1.3 }}>{item.title}</div>
                <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ background: `${color}0d`, padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div className="mef-container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="mef-eyebrow">Téléchargement PDF</div>
            <h2 className="mef-h2" style={{ marginBottom: 12 }}>Prêt à commencer ?</h2>
            <p style={{ color: '#5a6070', fontSize: 15, fontFamily: 'var(--font-aleo)' }}>Accès immédiat · PDF haute résolution · Imprimable à volonté</p>
          </div>

          <div style={{ background: '#090943', borderRadius: 28, padding: '44px 48px', boxShadow: '0 24px 80px rgba(9,9,67,0.25)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, color: '#FDF482', marginBottom: 12 }}>
              {pack.badge}
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', justifyContent: 'center', marginBottom: 6 }}>
              <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 56, color: 'white', lineHeight: 1 }}>{pack.price}</div>
              <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 22, color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>{pack.priceBarre}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-aleo)', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>paiement unique · accès illimité aux 2 outils</div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 28, marginBottom: 32 }}>
              {[
                `Les 2 outils : ${items.map((i) => i.badge).join(' + ')}`,
                'Fiches en haute définition, format PDF imprimable — à vie',
                'Téléchargement immédiat après paiement',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, justifyContent: 'center' }}>
                  <span style={{ color: '#FDF482', fontSize: 14 }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-aleo)', fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>{t}</span>
                </div>
              ))}
            </div>
            <PackBuyButton
              itemSlugs={pack.itemSlugs}
              price={pack.price}
              style={{ background: '#FDF482', color: '#090943', fontSize: 17, padding: '16px 48px', fontWeight: 800, width: '100%', justifyContent: 'center' }}
            />
            <p style={{ margin: '16px 0 0', fontFamily: 'var(--font-aleo)', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              ✅ Satisfait ou remboursé 7 jours · Paiement sécurisé
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ background: color, padding: '64px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
        <div className="mef-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 700 }}>
          <h2 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 34, color: 'white', marginBottom: 14, lineHeight: 1.2 }}>
            Aidez votre enfant à comprendre le monde qui l&apos;entoure
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, fontFamily: 'var(--font-aleo)', marginBottom: 36 }}>
            Le pack complet, pour ne rien laisser au hasard — les deux outils, un seul achat.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <PackBuyButton
              itemSlugs={pack.itemSlugs}
              price={pack.price}
              style={{ background: 'white', color, fontSize: 16, padding: '14px 36px', fontWeight: 800 }}
            />
            <Link
              href="/outils"
              className="mef-btn"
              style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.5)', color: 'white', fontSize: 14, padding: '14px 24px' }}
            >
              ← Retour aux outils
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
