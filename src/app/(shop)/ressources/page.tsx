'use client';

import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

const resources = [
  {
    title: "Le développement du langage chez l'enfant",
    subtitle: 'Comprendre les grandes étapes de la naissance à 6 ans',
    tag: 'Article · PDF gratuit',
    img: '/uploads/miniature_developpement-langage.png',
    imgPosition: 'center 0%',
    pdf: '/ressources/article_developpement-langage.pdf',
  },
  {
    title: 'Différence entre retard et troubles du langage',
    subtitle: '',
    tag: 'Article · PDF gratuit',
    img: '/uploads/miniature_retards-troubles-langage.png',
    imgPosition: 'center 0%',
    pdf: '/ressources/article_retards-troubles-langage.pdf',
  },
  {
    title: 'La sensorialité',
    subtitle: 'Comprendre le monde avec ses 5 sens',
    tag: 'Article · PDF gratuit',
    img: '/uploads/miniature_profil-sensoriel-autiste.png',
    imgPosition: 'center 0%',
    pdf: '/ressources/article_profil-sensoriel-autiste.pdf',
  },
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 24,
          }}>
            {resources.map((resource) => (
              <div key={resource.pdf} className="mef-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: isMobile ? 200 : 260, overflow: 'hidden' }}>
                  <Image
                    src={resource.img}
                    alt={resource.title}
                    fill
                    style={{ objectFit: 'cover', objectPosition: resource.imgPosition ?? 'center center' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div style={{ padding: '20px 22px' }}>
                  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#5a6070', marginBottom: 10 }}>
                    {resource.tag}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-nunito)', fontSize: 18, fontWeight: 700, marginBottom: resource.subtitle ? 6 : 0, lineHeight: 1.4, color: '#090943' }}>
                    {resource.title}
                  </h4>
                  {resource.subtitle && (
                    <p style={{ color: '#5a6070', fontSize: 14, lineHeight: 1.55, marginBottom: 0 }}>{resource.subtitle}</p>
                  )}
                  <a
                    href={resource.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mef-btn mef-btn-outline"
                    style={{ display: 'inline-block', marginTop: 18, padding: '8px 20px', fontSize: 13, textDecoration: 'none' }}
                  >
                    Lire l&apos;article
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
