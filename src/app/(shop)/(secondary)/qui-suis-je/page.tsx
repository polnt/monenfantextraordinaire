'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';
import CollaborationUnique from '@/components/CollaborationUnique';
import { R2_IMAGES_BASE } from '@/lib/images';

const domaines = [
  { color: '#0792dc', bg: '#e8f4fd', title: 'Psychologue clinicienne', desc: "Spécialisée dans les TSA et les troubles du neurodéveloppement, j'accompagne enfants, adolescents et familles depuis plus de 15 ans." },
  { color: '#F90021', bg: '#ffe5e8', title: 'Formatrice', desc: "J'interviens auprès des équipes éducatives, professionnels de santé et parents avec des outils concrets et des stratégies fondées sur l'empathie." },
  { color: '#27ae60', bg: '#e8f5e9', title: "Directrice d'école", desc: "Fondatrice de l'école L'Éveil à Dakar depuis 2016, un établissement inclusif accueillant des enfants TSA et en situation d'échec scolaire." },
];

interface Section {
  id: string;
  color: string;
  label: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'parcours',
    color: '#0792dc',
    label: 'Mon parcours',
    content: (
      <p style={{ color: '#5a6070', lineHeight: 1.85, fontSize: 16 }}>
        Titulaire d&apos;un <strong style={{ color: '#090943' }}>Master 2 de Psychologie Clinique et Pathologique</strong> et d&apos;un <strong style={{ color: '#090943' }}>Diplôme Universitaire sur les Troubles du spectre autistique</strong>, je me suis formée tout au long de mon parcours à différentes approches spécifiques autour des TSA, du TDAH, des troubles dys et des difficultés scolaires, afin de proposer un accompagnement réellement adapté et personnalisé.
      </p>
    ),
  },
  {
    id: 'formations',
    color: '#F90021',
    label: 'Formations & interventions',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F90021', flexShrink: 0, marginTop: 8 }} />
          <p style={{ color: '#5a6070', lineHeight: 1.85, fontSize: 16, margin: 0 }}>
            <strong style={{ color: '#090943' }}>Formatrice spécialisée en autisme et neurodéveloppement :</strong> J&apos;interviens régulièrement auprès des équipes éducatives, des professionnels de santé et des parents, pour partager des outils concrets, des stratégies éducatives et des pratiques fondées sur l&apos;empathie, la compréhension des profils sensoriels et cognitifs, et la co-construction de solutions.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F90021', flexShrink: 0, marginTop: 8 }} />
          <p style={{ color: '#5a6070', lineHeight: 1.85, fontSize: 16, margin: 0 }}>
            <strong style={{ color: '#090943' }}>Formatrice en développement personnel :</strong> Je m&apos;occupe particulièrement de la gestion du stress et de la confiance en soi.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'ecole',
    color: '#EFD010',
    label: "Directrice d'une école inclusive",
    content: (
      <p style={{ color: '#5a6070', lineHeight: 1.85, fontSize: 16 }}>
        Depuis 2016, je suis la fondatrice et directrice de l&apos;école <strong style={{ color: '#090943' }}>&ldquo;L&apos;Éveil&rdquo; à Dakar</strong>, un établissement innovant qui accueille des enfants présentant des TSA, des troubles du neurodéveloppement ou en situation d&apos;échec scolaire. Ce projet est né de ma conviction profonde : chaque enfant peut progresser, s&apos;épanouir et apprendre si on lui offre un cadre bienveillant, structuré et stimulant, adapté à ses besoins spécifiques.
      </p>
    ),
  },
  {
    id: 'liberal',
    color: '#27ae60',
    label: 'Mon travail en libéral',
    content: (
      <p style={{ color: '#5a6070', lineHeight: 1.85, fontSize: 16 }}>
        En parallèle, je reçois en consultation libérale des enfants, adolescents, adultes et couples. Je propose un accompagnement global, afin d&apos;aider les personnes à surmonter des difficultés, telles que l&apos;anxiété, le Burn out, les troubles relationnels ou à les soutenir pendant des périodes de transition.
      </p>
    ),
  },
];

export default function QuiSuisJePage(): React.JSX.Element {
  const isMobile = useIsMobile();
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div style={{ paddingTop: 72 }}>
      {/* ── HERO ── */}
      <section style={{ background: '#fafbff', padding: isMobile ? '48px 0' : '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="mef-container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'center' }}>
            <div>
              <div className="mef-eyebrow">À propos</div>
              <h1 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: isMobile ? 32 : 46, color: '#090943', lineHeight: 1.1, marginBottom: 20 }}>
                Laurence Bugnet
              </h1>
              <p style={{ fontSize: isMobile ? 15 : 18, color: '#0792dc', fontFamily: 'var(--font-nunito)', fontWeight: 700, lineHeight: 1.5, marginBottom: 24 }}>
                Psychologue clinicienne — Formatrice en TSA, TDA &amp; gestion du stress
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.85, marginBottom: 32 }}>
                Passionnée depuis toujours par le développement de l&apos;enfant et les liens humains, je suis spécialisée dans les troubles du spectre de l&apos;autisme (TSA) et les troubles du neurodéveloppement. J&apos;accompagne depuis plus de <strong style={{ color: '#090943' }}>15 ans</strong> des enfants, des adolescents et leurs familles dans leurs parcours de vie souvent complexes et singuliers.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/reseaux" className="mef-btn mef-btn-blue">Me contacter</Link>
                <Link href="/formations" className="mef-btn mef-btn-outline">Voir mes formations</Link>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src={`${R2_IMAGES_BASE}/laurence.png`}
                alt="Laurence Bugnet"
                style={{ width: '100%', height: isMobile ? 280 : 480, objectFit: 'cover', objectPosition: 'center top', borderRadius: isMobile ? 16 : 28, display: 'block' }}
              />
              {!isMobile && (
                <>
                  <div style={{ position: 'absolute', bottom: -20, left: -20, background: '#0792dc', color: 'white', borderRadius: 16, padding: '16px 24px', boxShadow: '0 8px 32px rgba(7,146,220,0.35)', fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 15 }}>
                    +15 ans d&apos;expérience
                  </div>
                  <div style={{ position: 'absolute', top: 24, right: -20, background: '#FDF482', color: '#090943', borderRadius: 16, padding: '14px 20px', boxShadow: '0 8px 24px rgba(239,208,16,0.4)', fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 13 }}>
                    Psychologue clinicienne ✓
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 DOMAINES ── */}
      <section style={{ background: 'white', padding: isMobile ? '48px 0' : '80px 0' }}>
        <div className="mef-container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="mef-eyebrow">Ce que je fais</div>
            <h2 className="mef-h2">Mes domaines d&apos;action</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
            {domaines.map((d, i) => (
              <div key={i} className="mef-card" style={{ padding: '36px 28px', borderTop: `4px solid ${d.color}` }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: d.bg, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: d.color }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 18, color: '#090943', marginBottom: 12 }}>{d.title}</h3>
                <p style={{ color: '#5a6070', lineHeight: 1.75, fontSize: 15 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CollaborationUnique />

      {/* ── SECTIONS DÉTAILLÉES ── */}
      <section style={{ background: '#fafbff', padding: isMobile ? '48px 0' : '80px 0' }}>
        <div className="mef-container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="mef-eyebrow mef-eyebrow-red">Mon parcours</div>
            <h2 className="mef-h2">En détail</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {sections.map((s) => (
              <div
                key={s.id}
                className="mef-card"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderLeft: `4px solid ${s.color}` }}>
                  <h3 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 18, color: '#090943', margin: 0 }}>{s.label}</h3>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.3s', transform: openSection === s.id ? 'rotate(45deg)' : 'none', color: s.color, fontSize: 20, fontWeight: 300, lineHeight: 1 }}>
                    +
                  </div>
                </div>
                {openSection === s.id && (
                  <div style={{ padding: '0 32px 28px 36px', borderLeft: `4px solid ${s.color}` }}>
                    {s.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOTIVATIONS ── */}
      <section style={{ background: '#090943', padding: isMobile ? '48px 0' : '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(7,146,220,0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(249,0,33,0.1) 0%, transparent 50%)' }} />
        <div className="mef-container" style={{ maxWidth: 860, position: 'relative', zIndex: 1 }}>
          <div className="mef-eyebrow" style={{ color: '#87ceeb', textAlign: 'center' }}>Mes motivations et mes valeurs</div>
          <div style={{ fontSize: 64, color: '#FDF482', fontFamily: 'Georgia', lineHeight: 0.8, marginBottom: 24, opacity: 0.8, textAlign: 'center' }}>&ldquo;</div>
          <p style={{ fontSize: isMobile ? 16 : 19, color: 'rgba(255,255,255,0.88)', lineHeight: 1.85, fontStyle: 'italic', marginBottom: 36, textAlign: 'center' }}>
            Ce qui m&apos;anime, chaque jour, c&apos;est la volonté profonde d&apos;accompagner l&apos;humain dans toute sa richesse, sa complexité et sa vulnérabilité. Je me lève avec l&apos;élan d&apos;offrir un espace d&apos;écoute, de transformation et de reconnexion, que ce soit pour un enfant autiste, un enfant TDA, une maman épuisée, une personne souffrant d&apos;anxiété, un professionnel en questionnement, ou une âme en chemin vers elle-même.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 40 }}>
            {[
              { label: 'Créer des ponts entre les mondes', desc: 'Entre la science et l\'intuition, entre la pédagogie et le soin, entre le visible et l\'invisible.', color: '#0792dc' },
              { label: 'Mon mot d\'ordre', desc: 'Voir l\'autre se relever, se comprendre, s\'apaiser et s\'aimer à nouveau.', color: '#FDF482' },
            ].map((v, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px 28px', borderLeft: `3px solid ${v.color}` }}>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 15, color: v.color, marginBottom: 8 }}>{v.label}</div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#0792dc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 22, color: 'white' }}>L</div>
            <div>
              <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, color: 'white', fontSize: 16 }}>Laurence Bugnet</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Psychologue clinicienne — Fondatrice</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOÛTS PERSONNELS ── */}
      <section style={{ background: 'white', padding: isMobile ? '48px 0' : '72px 0' }}>
        <div className="mef-container" style={{ maxWidth: 860 }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="mef-eyebrow">La personne derrière la professionnelle</div>
            <h2 className="mef-h2" style={{ fontSize: isMobile ? 26 : 34 }}>Quelques goûts personnels…</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
            <div style={{ background: '#fafbff', borderRadius: 20, padding: '32px 36px' }}>
              <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 13, color: '#0792dc', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 14 }}>J&apos;aime</div>
              <p style={{ color: '#5a6070', lineHeight: 1.85, fontSize: 16, margin: 0 }}>
                La nature, la création artistique, les danses intuitives, les voyages initiatiques, et les espaces de reconnexion à soi.
              </p>
            </div>
            <div style={{ background: '#fafbff', borderRadius: 20, padding: '32px 36px' }}>
              <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 13, color: '#F90021', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 14 }}>Je suis</div>
              <p style={{ color: '#5a6070', lineHeight: 1.85, fontSize: 16, margin: 0 }}>
                Curieuse, toujours en quête de nouvelles connaissances, sensible aux approches holistiques, corporelles et inclusives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#FDF482', padding: isMobile ? '48px 0' : '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -60, bottom: -60, width: 220, height: 220, borderRadius: '50%', background: '#EFD010', opacity: 0.4 }} />
        <div className="mef-container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-nunito)', fontSize: isMobile ? 28 : 38, fontWeight: 900, color: '#090943', marginBottom: 16 }}>Travaillons ensemble</h2>
          <p style={{ fontSize: 17, color: '#5a6070', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Que vous soyez parent, éducateur ou professionnel, je serais ravie d&apos;échanger avec vous.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/reseaux" className="mef-btn mef-btn-blue">Me contacter</Link>
            <Link href="/formations" className="mef-btn mef-btn-outline">Voir les formations</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
