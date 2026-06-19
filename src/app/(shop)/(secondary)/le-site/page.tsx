'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';

const propositions = [
  { color: '#0792dc', bg: '#e8f4fd', text: 'Outils pédagogiques adaptés et concrets pour le quotidien' },
  { color: '#F90021', bg: '#ffe5e8', text: "Cahiers d'activités originaux, illustrés et faciles à utiliser" },
  { color: '#27ae60', bg: '#e8f5e9', text: 'Articles clairs et bienveillants pour mieux comprendre les TSA, TDAH, troubles dys…' },
  { color: '#9c27b0', bg: '#f3e5f5', text: 'Formations en ligne pour les parents et les professionnels' },
  { color: '#EFD010', bg: '#fffde7', text: 'Vidéos, films et témoignages à découvrir et partager' },
  { color: '#ff7043', bg: '#fbe9e7', text: 'Poésie et textes sensibles, pour apaiser, soutenir et inspirer' },
  { color: '#0792dc', bg: '#e8f4fd', text: "Ressources téléchargeables, liens utiles, outils d'évaluation, lectures recommandées" },
];

const themes: Array<{ label: string; color: string; sub?: string[] }> = [
  { label: "Qu'est-ce que l'autisme ? Comprendre les troubles du neurodéveloppement", color: '#0792dc' },
  { label: 'Accompagner au quotidien', color: '#F90021' },
  { label: 'Les spécificités', color: '#27ae60' },
  { label: 'Éducation et pédagogie adaptée', color: '#9c27b0' },
  { label: 'Soutenir les familles', color: '#EFD010' },
  { label: 'Bien-être parental', color: '#ff7043' },
  { label: 'Ressources pratiques', color: '#0792dc' },
  {
    label: 'Formations et accompagnement',
    color: '#F90021',
    sub: [
      "Formation : développement du langage chez l'enfant autiste",
      "Formation : gestion du stress pour les parents et professionnels",
      'Webinaires, ateliers, coaching individuel',
      "Témoignages de participants et retours d'expérience",
    ],
  },
];

export default function LeSitePage(): React.JSX.Element {
  const isMobile = useIsMobile();
  const [openTheme, setOpenTheme] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: 72 }}>
      {/* ── HERO ── */}
      <section style={{ background: '#090943', padding: isMobile ? '48px 0 64px' : '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 70% 30%, rgba(7,146,220,0.25) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(249,0,33,0.12) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
          <div className="mef-eyebrow" style={{ color: '#87ceeb' }}>Le site</div>
          <h1 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: isMobile ? 32 : 52, color: 'white', lineHeight: 1.1, marginBottom: 24 }}>
            Un espace dédié à l&apos;autisme
            <br />
            et aux troubles du <span style={{ color: '#FDF482' }}>neurodéveloppement</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 660 }}>
            Sur ce site, vous trouverez des ressources uniques et inspirantes pour accompagner les enfants extraordinaires avec bienveillance, créativité et efficacité.
          </p>
        </div>
      </section>

      {/* ── CE QUE NOUS PROPOSONS ── */}
      <section style={{ background: 'white', padding: isMobile ? '48px 0' : '80px 0' }}>
        <div className="mef-container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 72, alignItems: 'start' }}>
            <div>
              <div className="mef-eyebrow">Ce que nous vous proposons</div>
              <h2 className="mef-h2" style={{ fontSize: 36 }}>
                Des ressources <span style={{ color: '#0792dc' }}>concrètes et humaines</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                {propositions.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: p.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                      <div style={{ width: 9, height: 9, borderRadius: '50%', background: p.color }} />
                    </div>
                    <p style={{ color: '#5a6070', fontSize: 16, lineHeight: 1.65, margin: 0 }}>{p.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div className="mef-card" style={{ padding: '36px 32px', borderTop: '4px solid #0792dc' }}>
                <div className="mef-eyebrow">Pour qui ?</div>
                <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 16 }}>
                  Ce site s&apos;adresse à tous ceux qui accompagnent des enfants extraordinaires :{' '}
                  <strong style={{ color: '#090943' }}>Parents, enseignants, éducateurs, thérapeutes, professionnels de la petite enfance et du médico-social.</strong>
                </p>
                <div style={{ background: '#e8f4fd', borderRadius: 14, padding: '18px 22px', fontStyle: 'italic', fontSize: 17, color: '#090943', lineHeight: 1.7 }}>
                  Parce que chaque enfant mérite d&apos;être compris, soutenu et valorisé dans sa singularité.
                </div>
              </div>

              <div className="mef-card" style={{ padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#090943', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 22, color: '#FDF482' }}>
                  L
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 17, color: '#090943', marginBottom: 4 }}>
                    ✏️ Laurence Bugnet
                  </div>
                  <div style={{ fontSize: 14, color: '#0792dc', fontFamily: 'var(--font-nunito)', fontWeight: 600 }}>
                    Psychologue spécialisée TSA, TDA, TDN
                  </div>
                </div>
                <Link href="/qui-suis-je" className="mef-btn mef-btn-outline" style={{ marginLeft: 'auto', padding: '8px 16px', fontSize: 13 }}>
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THÈMES ── */}
      <section style={{ background: '#fafbff', padding: isMobile ? '48px 0' : '80px 0' }}>
        <div className="mef-container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="mef-eyebrow mef-eyebrow-red">Contenu du site</div>
            <h2 className="mef-h2">Les thèmes que nous allons aborder</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {themes.map((t, i) => {
              const hasSub = Boolean(t.sub && t.sub.length > 0);
              const isOpen = openTheme === i;
              return (
                <div
                  key={i}
                  className="mef-card"
                  style={{ overflow: 'hidden', cursor: hasSub ? 'pointer' : 'default' }}
                  onClick={() => hasSub && setOpenTheme(isOpen ? null : i)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '20px 28px', borderLeft: `4px solid ${t.color}` }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 16, color: '#090943', flex: 1 }}>{t.label}</span>
                    {hasSub && (
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: t.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.color, fontSize: 18, fontWeight: 300, lineHeight: 1, transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>
                        +
                      </div>
                    )}
                  </div>
                  {hasSub && isOpen && (
                    <div style={{ padding: '4px 28px 20px 60px', borderLeft: `4px solid ${t.color}` }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {t.sub!.map((s, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                            <div style={{ width: 7, height: 7, borderRadius: '50%', background: t.color, flexShrink: 0, marginTop: 7 }} />
                            <p style={{ color: '#5a6070', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{s}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#FDF482', padding: isMobile ? '48px 0' : '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -60, top: -60, width: 200, height: 200, borderRadius: '50%', background: '#EFD010', opacity: 0.4 }} />
        <div className="mef-container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-nunito)', fontSize: isMobile ? 28 : 40, fontWeight: 900, color: '#090943', marginBottom: 16 }}>
            Envie d&apos;en savoir plus ?
          </h2>
          <p style={{ fontSize: 17, color: '#5a6070', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Découvrez qui je suis et ma démarche, ou écrivez-moi directement.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/qui-suis-je" className="mef-btn mef-btn-blue">Qui suis-je ?</Link>
            <Link href="/reseaux" className="mef-btn mef-btn-outline">Me contacter</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
