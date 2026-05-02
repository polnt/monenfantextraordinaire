'use client';

import { useIsMobile } from '@/hooks/useIsMobile';

const articles = [
  { title: 'Les stades du développement du langage', sub: "Le langage, c'est bien plus que parler — c'est tout ce qui permet à un enfant de comprendre le monde.", bg: '#FDF482', fg: '#090943' },
  { title: "TDAH : trouble de l'attention avec ou sans hyperactivité", sub: "Un trouble neurodéveloppemental qui affecte la concentration, l'organisation et le contrôle des impulsions.", bg: '#f8a882', fg: '#090943' },
  { title: 'Mini astuces pour développer le langage', sub: "Des conseils pratiques et accessibles à mettre en place dès aujourd'hui dans votre quotidien.", bg: '#87ceeb', fg: '#0f3d5a' },
  { title: 'Comprendre le comportement de mon enfant autiste', sub: 'Décoder les comportements atypiques pour mieux y répondre avec calme et bienveillance.', bg: '#e8f5e9', fg: '#1b5e20' },
  { title: "Les émotions et l'autisme", sub: 'Comment aider un enfant autiste à identifier et exprimer ses émotions au quotidien.', bg: '#f3e8ff', fg: '#4a148c' },
  { title: "Scolarisation d'un enfant neurodivers", sub: 'ULIS, SESSAD, AVS — tout comprendre sur les dispositifs scolaires disponibles.', bg: '#e8f4fd', fg: '#0d47a1' },
];

export default function RessourcesPage(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: '#FDF482', padding: isMobile ? '40px 0 60px' : '64px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-nunito)', fontSize: isMobile ? 36 : 48, fontWeight: 900, color: '#090943', marginBottom: 12 }}>Ressources</h1>
          <p style={{ fontSize: 16, color: '#5a6070', maxWidth: 520 }}>
            Articles, guides et contenus gratuits pour mieux accompagner votre enfant.
          </p>
        </div>
      </section>
      <section style={{ background: 'white', padding: isMobile ? '32px 0 56px' : '48px 0 80px' }}>
        <div className="mef-container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {articles.map((a, i) => (
              <div key={i} className="mef-card" style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    height: 160,
                    background: a.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    borderRadius: 0,
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 12px,rgba(0,0,0,0.025) 12px,rgba(0,0,0,0.025) 13px)' }} />
                  <span style={{ position: 'relative', zIndex: 1, fontFamily: 'monospace', fontSize: 10, color: a.fg, textAlign: 'center', padding: 12, lineHeight: 1.5 }}>
                    photo article {i + 1}
                  </span>
                </div>
                <div style={{ padding: '20px 22px' }}>
                  <h4 style={{ fontFamily: 'var(--font-nunito)', fontSize: 16, fontWeight: 700, marginBottom: 10, lineHeight: 1.4 }}>{a.title}</h4>
                  <p style={{ color: '#5a6070', fontSize: 14, lineHeight: 1.65 }}>{a.sub}</p>
                  <button className="mef-btn mef-btn-outline" style={{ marginTop: 16, padding: '8px 20px', fontSize: 13 }}>
                    Lire l&apos;article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
