'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatBlock from '@/components/StatBlock';
import { useIsMobile } from '@/hooks/useIsMobile';

const slides = [
  {
    tag: 'Ressources pour parents & éducateurs',
    h: 'Votre enfant est extra-ordinaire',
    sub: "Comprendre, accompagner et aider votre enfant autiste ou neurodivers à développer tout son potentiel — pas à pas, avec bienveillance.",
    bg: '#FDF482',
    img: '/uploads/michellemaria_pitzel-beach-7017637_1920.jpg',
    imgPosition: 'center',
  },
  {
    tag: 'Formations pratiques en ligne',
    h: 'Des outils concrets pour chaque famille',
    sub: "Des méthodes ABA, TEACCH, PECS expliquées simplement — applicables dès aujourd'hui à la maison.",
    bg: '#e8f4fd',
    img: '/uploads/drnickstafford-young-5122497_1920.jpg',
    imgPosition: 'center',
  },
  {
    tag: 'Communauté & soutien',
    h: "Vous n'êtes pas seuls dans ce parcours",
    sub: "Rejoignez des milliers de parents et professionnels qui partagent, s'entraident et progressent ensemble.",
    bg: '#ffe5e8',
    img: '/uploads/mojpe-mother-1613726_1920.jpg',
    imgPosition: 'left center',
  },
];

export default function HomePage(): React.JSX.Element {
  const isMobile = useIsMobile();
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = slides[slideIdx]!;

  return (
    <div>
      {/* ── HERO ── */}
      <section
        style={{
          background: 'white',
          paddingTop: 72,
          minHeight: isMobile ? 'auto' : '92vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Image panel — desktop: absolute right | mobile: top banner */}
        {isMobile ? (
          <div style={{ position: 'relative', width: '100%', height: 240, overflow: 'hidden' }}>
            {slides.map((sl, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${sl.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: sl.imgPosition ?? 'center',
                  opacity: i === slideIdx ? 1 : 0,
                  transition: 'opacity 0.9s ease',
                }}
              />
            ))}
            <div style={{ position: 'absolute', inset: 0, background: s.bg, opacity: 0.18, transition: 'background 0.9s ease' }} />
          </div>
        ) : (
          <>
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '46%',
                clipPath: 'polygon(6% 0, 100% 0, 100% 100%, 0% 100%)',
                overflow: 'hidden',
              }}
            >
              {slides.map((sl, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${sl.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: sl.imgPosition ?? 'center',
                    opacity: i === slideIdx ? 1 : 0,
                    transition: 'opacity 0.9s ease',
                  }}
                />
              ))}
              <div style={{ position: 'absolute', inset: 0, background: s.bg, opacity: 0.18, transition: 'background 0.9s ease' }} />
            </div>
            {/* Floating circles — desktop only */}
            <div style={{ position: 'absolute', top: 120, right: '8%', width: 80, height: 80, borderRadius: '50%', background: '#0792dc', opacity: 0.12, animation: 'mefFloat 4s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', bottom: 120, right: '22%', width: 48, height: 48, borderRadius: '50%', background: '#F90021', opacity: 0.15, animation: 'mefFloat 5s ease-in-out infinite 1s' }} />
            <div style={{ position: 'absolute', top: '40%', right: '42%', width: 32, height: 32, borderRadius: '50%', background: '#EFD010', opacity: 0.4, animation: 'mefFloat 3.5s ease-in-out infinite 0.5s' }} />
          </>
        )}

        <div
          className="mef-container"
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 0 : 60,
            alignItems: 'center',
            padding: isMobile ? '32px 16px 40px' : '60px 40px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div key={slideIdx} style={{ animation: 'mefFadeUp 0.6s ease both' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#e8f4fd',
                color: '#0792dc',
                borderRadius: 50,
                padding: '6px 18px',
                fontSize: 12,
                fontFamily: 'var(--font-nunito)',
                fontWeight: 800,
                letterSpacing: 0.5,
                marginBottom: 20,
                textTransform: 'uppercase',
              }}
            >
              {s.tag}
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-nunito)',
                fontSize: isMobile ? 34 : 52,
                fontWeight: 900,
                color: '#090943',
                lineHeight: 1.1,
                marginBottom: 18,
              }}
            >
              {s.h.includes('extra-ordinaire') ? (
                <>Votre enfant est <span style={{ color: '#0792dc' }}>extra-ordinaire</span></>
              ) : (
                s.h
              )}
            </h1>
            <p style={{ fontSize: isMobile ? 16 : 18, color: '#5a6070', lineHeight: 1.75, marginBottom: 28, maxWidth: 480 }}>
              {s.sub}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              <Link href="/ressources" className="mef-btn mef-btn-blue">Découvrir les ressources</Link>
              <Link href="/outils" className="mef-btn mef-btn-yellow">Accéder à la boutique</Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex' }}>
                {['#0792dc', '#F90021', '#EFD010', '#27ae60'].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: c,
                      border: '2px solid white',
                      marginLeft: i ? -10 : 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      color: i === 2 ? '#090943' : 'white',
                      fontWeight: 700,
                      fontFamily: 'var(--font-nunito)',
                    }}
                  >
                    P
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 13, color: '#9ca3af' }}>
                <strong style={{ color: '#090943' }}>+456 000 familles</strong> accompagnées
              </span>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIdx(i)}
                  style={{
                    width: i === slideIdx ? 28 : 8,
                    height: 8,
                    borderRadius: 50,
                    background: i === slideIdx ? '#0792dc' : '#d1d5db',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
          {/* Right column spacer — desktop only */}
          {!isMobile && <div />}
        </div>

        <svg style={{ display: 'block', marginTop: -1 }} viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64Z" fill="#fafbff" />
        </svg>
      </section>

      {/* ── MISSION ── */}
      <section style={{ background: '#fafbff', padding: isMobile ? '56px 0' : '96px 0' }}>
        <div className="mef-container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'center' }}>
            <div>
              <div className="mef-eyebrow">Notre mission</div>
              <h2 className="mef-h2">
                Vous n&apos;êtes <span style={{ color: '#0792dc' }}>pas seuls</span>
              </h2>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 16 }}>
                Une plateforme dédiée à l’accompagnement d’enfants atypiques, pensée pour les parents et les familles.
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 28 }}>
                Vous souhaitez mieux comprendre votre enfant et trouver des solutions concrètes au quotidien ?
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 28 }}>
                Autisme, TND, retard de langage, trouble de l’attention, trouble dys : découvrez des solutions
                simples, concrètes, bienveillantes pour avancer sereinement au quotidien.              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  "Vous aider à comprendre votre enfant",
                  'Développer ses compétences et avancer avec plus de sérénité',
                  'Découvrir des ressources fiables, accessibles et bienveillantes',
                  'Renforcer le lien parent enfant et le plaisir partagé'
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0792dc', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                      <svg width="10" height="8" viewBox="0 0 10 8">
                        <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ color: '#090943', fontSize: 15, lineHeight: 1.5 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src="/uploads/pexels-beach-1867271_1920.jpg"
                alt="Maman et enfant accompagnement"
                style={{ width: '100%', height: isMobile ? 260 : 400, objectFit: 'cover', objectPosition: 'center', borderRadius: 20, display: 'block' }}
              />
              {!isMobile && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: -18,
                    left: -18,
                    background: '#FDF482',
                    borderRadius: 16,
                    padding: '16px 22px',
                    boxShadow: '0 8px 24px rgba(239,208,16,0.4)',
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 800,
                    fontSize: 14,
                    color: '#090943',
                  }}
                >
                  Méthode approuvée par des experts ✓
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJECTIFS ── */}
      <section style={{ background: 'white', padding: isMobile ? '56px 0' : '96px 0' }}>
        <div className="mef-container">
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 64 }}>
            <div className="mef-eyebrow mef-eyebrow-red">Ce que nous offrons</div>
            <h2 className="mef-h2">Nos objectifs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
            {[
              { n: '01', title: 'Epanouissement', desc: "Offrir à chaque enfant extraordinaire les moyens de s’épanouir et de réussir en créant des ressources adaptées qui respectent son rythme, valorisent ses forces, encouragent sa confiance et lui donne l’élan au quotidien", color: '#0792dc' },
              { n: '02', title: 'Accompagnement', desc: 'Accompagner les parents dans leur quotidien avec une approche bienveillante, simple et concrète, pour leur permettre d’avancer avec plus de sérénité et de confiance.', color: '#F90021' },
              { n: '03', title: 'Apprentissage', desc: "Faire du plaisir un moteur d’apprentissage en proposant des outils pédagogiques ludiques, pratiques et adaptés aux besoins des enfants neuroatypiques.", color: '#EFD010' },
              { n: '04', title: 'Transmission', desc: 'Proposer des formations des outils et des ressources concrètes et accessibles pour permettre aux familles et aux professionnels de mieux comprendre, d’agir concrètement et d’accompagner chaque enfant avec des solutions personnalisées', color: '#27ae60' },
            ].map((o, i) => (
              <div key={i} className="mef-card" style={{ padding: isMobile ? '24px 20px' : '36px 32px', borderTop: `4px solid ${o.color}` }}>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: isMobile ? 36 : 52, color: o.color, opacity: 0.25, lineHeight: 1, marginBottom: 4 }}>{o.n}</div>
                <h3 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 20, marginBottom: 10, color: '#090943' }}>{o.title}</h3>
                <p style={{ color: '#5a6070', lineHeight: 1.7, fontSize: 15 }}>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUI SUIS-JE ── */}
      <section style={{ background: '#fafbff', padding: isMobile ? '56px 0' : '96px 0' }}>
        <div className="mef-container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'center' }}>
            {/* Image — desktop: left | mobile: after text */}
            {!isMobile && (
              <div style={{ position: 'relative' }}>
                <img
                  src="/uploads/pasted-1777296342775-0.png"
                  alt="Portrait professionnel de la formatrice"
                  style={{ width: '100%', height: 440, objectFit: 'cover', objectPosition: 'center top', borderRadius: 28, display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: -18,
                    right: -18,
                    background: '#0792dc',
                    color: 'white',
                    borderRadius: 16,
                    padding: '16px 24px',
                    boxShadow: '0 8px 24px rgba(7,146,220,0.35)',
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 800,
                    fontSize: 15,
                  }}
                >
                  +15 ans d&apos;expérience
                </div>
              </div>
            )}
            <div>
              <div className="mef-eyebrow">À propos</div>
              <h2 className="mef-h2">Qui suis-je ?</h2>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 16 }}>
                Passionnée par le développement de l’enfant et les liens humains. Spécialisée en TSA et troubles du neurodéveloppement, <strong style={{ color: '#090943' }}>j’accompagne depuis plus de 15 ans</strong> les enfants et familles dans leurs parcours de vie singuliers.
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 16 }}>
                Je permets aux parents de comprendre, soutenir et stimuler le développement de leur enfant grâce à des <strong style={{ color: '#090943' }}>formations clés en main, des outils simples et accessibles.</strong>
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 16 }}>
                Riches des résultats obtenus à l’école l’éveil, <strong style={{ color: '#090943' }}>j’ai créé une méthode complète</strong> et ludique pour accompagner votre enfant dans toutes ses spécificités.
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 16 }}>
                La méthode <strong style={{ color: '#090943' }}>Élan quotidien</strong> est une approche d’accompagnement basée sur <strong style={{ color: '#090943' }}>15 à 20 minutes d’activités par jour</strong>, conçue pour stimuler principalement le développement du langage, de la communication et les intéractions sociales chez l’enfant.
              </p>
              <p style={{ color: '#5a6070', lineHeight: 1.8, fontSize: 15, marginBottom: 24, fontStyle: 'italic' }}>
                Parce que je considère que la communication est la base de la vie, apprendre à son enfant à
                communiquer même sans les mots, c’est lui donner la chance de réussir
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/qui-suis-je" className="mef-btn mef-btn-blue">En savoir plus</Link>
                <Link href="/formations" className="mef-btn mef-btn-outline">Voir les formations</Link>
              </div>
            </div>
            {/* Image mobile — after text */}
            {isMobile && (
              <div style={{ position: 'relative' }}>
                <img
                  src="/uploads/pasted-1777296342775-0.png"
                  alt="Portrait professionnel de la formatrice"
                  style={{ width: '100%', height: 300, objectFit: 'cover', objectPosition: 'center top', borderRadius: 20, display: 'block' }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#090943', padding: isMobile ? '56px 0' : '88px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(7,146,220,0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(249,0,33,0.15) 0%, transparent 50%)' }} />
        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ textAlign: 'center', color: 'white', fontFamily: 'var(--font-nunito)', fontSize: isMobile ? 28 : 40, fontWeight: 800, marginBottom: isMobile ? 36 : 64 }}>
            Quelques chiffres
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 8 : 24 }}>
            <StatBlock target={350} prefix="+" label="enfants accompagnés" />
            <StatBlock target={15} prefix="+" suffix=" ans" label="une méthode éprouvée" />
            <StatBlock target={98} suffix="%" label="de familles accompagnées satisfaites" />
          </div>
          {/* <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 32 }}>
            *Statistiques pour aider à se déterminer
          </p> */}
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section style={{ background: 'white', padding: isMobile ? '56px 0' : '96px 0' }}>
        <div className="mef-container">
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 64 }}>
            <div className="mef-eyebrow">Ce qu&apos;ils disent</div>
            <h2 className="mef-h2">
              Témoignages des parents
              <br />
              et des éducateurs
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { name: 'Laura S.', role: 'Maman de Lucas, 6 ans', q: "Grâce aux outils proposés, j'ai enfin compris mon fils et créé un lien différent. Je me sens beaucoup moins seule dans ce parcours.", color: '#e8f4fd', a: '#0792dc' },
              { name: 'Corinna M.', role: 'Éducatrice spécialisée', q: "Une mine d'or de ressources pratiques ! Je recommande ce site à tous les professionnels qui accompagnent des enfants autistes.", color: '#FDF482', a: '#090943' },
              { name: 'Luca M.', role: 'Papa de Sofia, 8 ans', q: "Les formations sont claires et vraiment utiles. On voit des progrès concrets chez notre fille en peu de temps.", color: '#ffe5e8', a: '#F90021' },
            ].map((t, i) => (
              <div key={i} className="mef-card" style={{ padding: isMobile ? '24px 20px' : 32 }}>
                <div style={{ fontSize: 40, color: t.a, fontFamily: 'Georgia', lineHeight: 1, marginBottom: 14, opacity: 0.7 }}>&ldquo;</div>
                <p style={{ color: '#5a6070', lineHeight: 1.8, fontSize: 15, marginBottom: 24, fontStyle: 'italic' }}>{t.q}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 16, color: t.a, flexShrink: 0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#FDF482', padding: isMobile ? '56px 0' : '88px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -60, top: -60, width: 240, height: 240, borderRadius: '50%', background: '#EFD010', opacity: 0.4 }} />
        <div style={{ position: 'absolute', right: -40, bottom: -40, width: 180, height: 180, borderRadius: '50%', background: '#0792dc', opacity: 0.08 }} />
        <div className="mef-container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-nunito)', fontSize: isMobile ? 28 : 44, fontWeight: 900, color: '#090943', marginBottom: 14 }}>
            Prêt à faire la différence ?
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 18, color: '#5a6070', marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
            Rejoignez des milliers de parents et professionnels qui accompagnent leurs enfants avec confiance.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/ressources" className="mef-btn mef-btn-blue">Accéder aux ressources gratuites</Link>
            <Link href="/formations" className="mef-btn mef-btn-outline">Voir les formations</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
