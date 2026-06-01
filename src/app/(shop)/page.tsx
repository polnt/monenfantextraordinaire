'use client';

import Link from 'next/link';
import StatBlock from '@/components/StatBlock';
import { useIsMobile } from '@/hooks/useIsMobile';

// font-aleo CSS variable assumed available globally (see layout.tsx)

const heroBannerImgPosition = 'center 10%';

const heroNavLinks = [
  { label: 'COMPRENDRE', href: '/comprendre' },
  { label: 'ACCOMPAGNER', href: '/aider' },
  { label: 'FORMER', href: '/formations' },
  { label: 'VALORISER', href: '/qui-suis-je' },
  { label: 'ENSEMBLE', href: '/ressources' },
];

export default function HomePage(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <div>
      {/* ── HERO BANNER ── */}
      <section style={{ background: 'white', paddingTop: 72, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
          <img
            src={isMobile ? '/uploads/bandeau-mobile.png' : '/uploads/bandeau-desktop.png'}
            alt="Mon enfant extra-ordinaire — Chaque enfant est unique, chaque différence mérite d'être comprise."
            style={{ width: '100%', height: isMobile ? 'auto' : '47vw', display: 'block', objectFit: 'cover', objectPosition: isMobile ? 'center center' : heroBannerImgPosition }}
          />
          {!isMobile && (
            <div style={{ position: 'absolute', left: '6%', bottom: '12%', display: 'flex', gap: 'clamp(8px,1.6vw,28px)', alignItems: 'center' }}>
              {heroNavLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    background: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 900,
                    fontSize: 'clamp(10px,0.95vw,15px)',
                    letterSpacing: 0.5,
                    color: 'transparent',
                    padding: '8px 4px',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                  aria-label={l.label}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
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
                Une plateforme dédiée à l&apos;accompagnement d&apos;enfants atypiques, pensée pour les parents et les familles.
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 28 }}>
                Vous souhaitez mieux comprendre votre enfant et trouver des solutions concrètes au quotidien ?
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 28 }}>
                Autisme, TND, retard de langage, trouble de l&apos;attention, trouble dys : découvrez des solutions
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
                src="/uploads/mission.png"
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

      {/* ── CTA FORMATIONS / OUTILS / RESSOURCES ── */}
      <section style={{ background: 'white', padding: isMobile ? '56px 0 24px' : '96px 0 32px' }}>
        <div className="mef-container">
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 56 }}>
            <div className="mef-eyebrow">Par où commencer ?</div>
            <h2 className="mef-h2">
              Trois façons d&apos;<span style={{ color: '#0792dc' }}>avancer</span> avec votre enfant
            </h2>
            <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.7, maxWidth: 640, margin: '0 auto' }}>
              De la formation complète aux ressources gratuites, choisissez le niveau d&apos;accompagnement qui vous correspond.
            </p>
          </div>

          {/* Formations — featured */}
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #0792dc 0%, #0567a8 100%)',
              borderRadius: 24,
              padding: isMobile ? '32px 24px' : '48px 56px',
              color: 'white',
              marginBottom: 24,
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(7,146,220,0.28)',
            }}
          >
            <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', bottom: -80, right: 120, width: 160, height: 160, borderRadius: '50%', background: 'rgba(253,244,130,0.12)' }} />

            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 24 : 48, alignItems: 'center' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#FDF482', color: '#090943',
                    padding: '6px 14px', borderRadius: 50,
                    fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5,
                    marginBottom: 16,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EFD010' }} />
                  Recommandé pour un accompagnement complet
                </div>

                <h3 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: isMobile ? 28 : 38, color: 'white', lineHeight: 1.15, marginBottom: 16 }}>
                  Formations pratiques pour <span style={{ color: '#FDF482' }}>aider votre enfant</span> au quotidien
                </h3>
                <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.92)', marginBottom: 20 }}>
                  Découvrez des formations pratiques et accessibles pour apprendre à aider votre enfant à développer son langage, améliorer la communication, stimuler ses apprentissages et mieux gérer les défis du quotidien avec plus de confiance et de sérénité.
                </p>
                <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: 28, fontStyle: 'italic' }}>
                  Commencez par notre formation complète et pratique pour{' '}
                  <strong style={{ color: 'white', fontStyle: 'normal' }}>stimuler le langage de votre enfant en 20 minutes par jour</strong>,
                  {' '}avec un accompagnement adapté à vos besoins.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <Link href="/formations" className="mef-btn mef-btn-yellow" style={{ fontSize: 15 }}>
                    Découvrir la formation langage
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 6 }}>
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link
                    href="/formations"
                    style={{
                      background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.4)',
                      padding: '11px 24px', borderRadius: 50, fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 15,
                      textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                    }}
                  >
                    Voir toutes les formations
                  </Link>
                </div>
              </div>

              {!isMobile && (
                <div style={{ position: 'relative' }}>
                  <img
                    src="/uploads/cta-formation.png"
                    alt="Un parent suit une formation en ligne pour mieux accompagner son enfant"
                    style={{ width: '100%', height: 340, objectFit: 'cover', objectPosition: '0% 70%', borderRadius: 20, display: 'block', border: '4px solid rgba(255,255,255,0.22)', boxShadow: '0 16px 40px rgba(9,9,67,0.28)' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Outils + Ressources — secondary */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>

            {/* Outils pédagogiques */}
            <div className="mef-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', borderTop: '4px solid #F90021' }}>
              <img
                src="/uploads/cta-outils.png"
                alt="Un parent et son enfant utilisent un tableau de communication par images"
                style={{ width: '100%', height: isMobile ? 150 : 168, objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
              />
              <div style={{ padding: isMobile ? '24px 20px' : '32px 28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: '#ffe5e8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F90021" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M7 8h10M7 12h10M7 16h6" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 11, color: '#F90021', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 2 }}>Prêts à l&apos;emploi</div>
                    <h3 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 20, color: '#090943' }}>Outils pédagogiques</h3>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-aleo)', fontSize: 14, fontStyle: 'italic', color: '#5a6070', marginBottom: 12 }}>
                  Des outils guidés prêts à l&apos;emploi
                </p>
                <p style={{ color: '#5a6070', lineHeight: 1.7, fontSize: 15, marginBottom: 24, flexGrow: 1 }}>
                  Activités, routines visuelles, supports éducatifs et fiches à télécharger pour favoriser l&apos;apprentissage, l&apos;autonomie et le bien-être de votre enfant.
                </p>
                <Link
                  href="/outils"
                  className="mef-btn mef-btn-outline"
                  style={{ alignSelf: 'flex-start', color: '#F90021', borderColor: '#F90021', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  Voir les outils
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Ressources */}
            <div className="mef-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', borderTop: '4px solid #27ae60' }}>
              <img
                src="/uploads/cta-ressources.png"
                alt="Une maman consulte des articles et des ressources sur l'autisme sur son ordinateur"
                style={{ width: '100%', height: isMobile ? 150 : 168, objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
              />
              <div style={{ padding: isMobile ? '24px 20px' : '32px 28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 4h7a3 3 0 013 3v13a2 2 0 00-2-2H2V4zM22 4h-7a3 3 0 00-3 3v13a2 2 0 012-2h8V4z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 11, color: '#27ae60', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 2 }}>Gratuit · pour commencer</div>
                    <h3 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 20, color: '#090943' }}>Ressources</h3>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-aleo)', fontSize: 14, fontStyle: 'italic', color: '#5a6070', marginBottom: 12 }}>
                  Pour commencer simplement
                </p>
                <p style={{ color: '#5a6070', lineHeight: 1.7, fontSize: 15, marginBottom: 24, flexGrow: 1 }}>
                  Profitez gratuitement de ressources utiles et concrètes : guides, fiches pédagogiques, routines, conseils et explications claires pour mieux accompagner votre enfant au quotidien.
                </p>
                <Link
                  href="/ressources"
                  className="mef-btn mef-btn-outline"
                  style={{ alignSelf: 'flex-start', color: '#27ae60', borderColor: '#27ae60', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  Accéder aux ressources
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
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
              { n: '01', title: 'Epanouissement', desc: "Offrir à chaque enfant extraordinaire les moyens de s'épanouir et de réussir en créant des ressources adaptées qui respectent son rythme, valorisent ses forces, encouragent sa confiance et lui donne l'élan au quotidien", color: '#0792dc' },
              { n: '02', title: 'Accompagnement', desc: "Accompagner les parents dans leur quotidien avec une approche bienveillante, simple et concrète, pour leur permettre d'avancer avec plus de sérénité et de confiance.", color: '#F90021' },
              { n: '03', title: 'Apprentissage', desc: "Faire du plaisir un moteur d'apprentissage en proposant des outils pédagogiques ludiques, pratiques et adaptés aux besoins des enfants neuroatypiques.", color: '#EFD010' },
              { n: '04', title: 'Transmission', desc: "Proposer des formations des outils et des ressources concrètes et accessibles pour permettre aux familles et aux professionnels de mieux comprendre, d'agir concrètement et d'accompagner chaque enfant avec des solutions personnalisées", color: '#27ae60' },
            ].map((o, i) => (
              <div key={i} className="mef-card" style={{ padding: isMobile ? '24px 20px' : '36px 32px', borderTop: `4px solid ${o.color}` }}>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: isMobile ? 36 : 52, color: o.color, opacity: 0.25, lineHeight: 1, marginBottom: 4 }}>{o.n}</div>
                <h3 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 20, marginBottom: 10, color: '#090943' }}>{o.title}</h3>
                <p style={{ color: '#5a6070', lineHeight: 1.7, fontSize: 15 }}>{o.desc}</p>
              </div>
            ))}
          </div>
          <img
            src="/uploads/objectifs.png"
            alt="Illustration de nos objectifs"
            style={{ width: isMobile ? '100%' : '50%', height: 'auto', objectFit: 'cover', borderRadius: isMobile ? 16 : 20, display: 'block', marginTop: isMobile ? 32 : 48, marginLeft: 'auto', marginRight: 'auto' }}
          />
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
                  +15 ans d&apos;expertise
                </div>
              </div>
            )}
            <div>
              <div className="mef-eyebrow">À propos</div>
              <h2 className="mef-h2">Qui suis-je ?</h2>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 16 }}>
                Passionnée par le développement de l&apos;enfant et les liens humains. Spécialisée en TSA et troubles du neurodéveloppement, <strong style={{ color: '#090943' }}>j&apos;accompagne depuis plus de 15 ans</strong> les enfants et familles dans leurs parcours de vie singuliers.
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 16 }}>
                Je permets aux parents de comprendre, soutenir et stimuler le développement de leur enfant grâce à des <strong style={{ color: '#090943' }}>formations clés en main, des outils simples et accessibles.</strong>
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 16 }}>
                Riches des résultats obtenus à l&apos;école l&apos;éveil, <strong style={{ color: '#090943' }}>j&apos;ai créé une méthode complète</strong> et ludique pour accompagner votre enfant dans toutes ses spécificités.
              </p>
              <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, marginBottom: 16 }}>
                La méthode <strong style={{ color: '#090943' }}>Élan quotidien</strong> est une approche d&apos;accompagnement basée sur <strong style={{ color: '#090943' }}>15 à 20 minutes d&apos;activités par jour</strong>, conçue pour stimuler principalement le développement du langage, de la communication et les intéractions sociales chez l&apos;enfant.
              </p>
              <p style={{ color: '#5a6070', lineHeight: 1.8, fontSize: 15, marginBottom: 24, fontStyle: 'italic' }}>
                Parce que je considère que la communication est la base de la vie, apprendre à son enfant à
                communiquer même sans les mots, c&apos;est lui donner la chance de réussir
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
