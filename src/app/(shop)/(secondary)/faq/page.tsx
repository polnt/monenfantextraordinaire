'use client';

import { useState } from 'react';

const faqs = [
  { q: 'Comment savoir si mon enfant est autiste ?', a: "Les signes précoces peuvent apparaître dès 18 mois. Consultez votre pédiatre si vous observez des difficultés de communication, des comportements répétitifs ou un manque d'intérêt social.", color: '#0792dc', text: 'white' },
  { q: 'Quelles sont les méthodes les plus efficaces ?', a: "Les méthodes ABA, TEACCH et PECS sont parmi les plus reconnues scientifiquement. Le choix dépend du profil et des besoins spécifiques de votre enfant.", color: '#F90021', text: 'white' },
  { q: 'À quel âge commencer la prise en charge ?', a: "Plus tôt la prise en charge commence, meilleurs sont les résultats. Il est recommandé de commencer dès les premières observations de signes, même avant un diagnostic officiel.", color: '#EFD010', text: '#090943' },
  { q: 'Comment trouver les bons professionnels ?', a: "Orthophoniste, psychomotricien, éducateur ABA... Notre guide des professionnels vous aide à identifier les bons interlocuteurs selon la situation de votre enfant.", color: '#27ae60', text: 'white' },
  { q: 'Les formations sont-elles accessibles à tous ?', a: "Absolument ! Nos formations sont conçues pour les parents sans formation médicale. Elles sont progressives, pratiques et applicables dès aujourd'hui.", color: '#ff7043', text: 'white' },
  { q: "Y a-t-il une communauté de parents ?", a: "Oui — rejoignez notre groupe privé de parents et d'éducateurs. Partagez vos expériences, posez vos questions et recevez le soutien d'une communauté bienveillante.", color: '#9c27b0', text: 'white' },
];

export default function FaqPage(): React.JSX.Element {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: '#090943', padding: '64px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(7,146,220,0.2) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', fontFamily: 'var(--font-nunito)', fontSize: 48, fontWeight: 900, marginBottom: 12 }}>FAQ</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, maxWidth: 520 }}>
            Les questions les plus fréquentes des parents et des éducateurs.
          </p>
        </div>
      </section>
      <section style={{ background: 'white', padding: '48px 0 80px' }}>
        <div className="mef-container" style={{ maxWidth: 960 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map((f, i) => (
              <div
                key={i}
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  background: f.color,
                  borderRadius: 22,
                  padding: '28px 32px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: open === i ? '0 16px 48px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <h3 style={{ color: f.text, fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 17, lineHeight: 1.4 }}>{f.q}</h3>
                  <span style={{ color: f.text, fontSize: 24, flexShrink: 0, marginTop: -2 }}>{open === i ? '−' : '+'}</span>
                </div>
                {open === i && (
                  <p style={{ color: f.text, opacity: 0.85, marginTop: 18, lineHeight: 1.7, fontSize: 15 }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
