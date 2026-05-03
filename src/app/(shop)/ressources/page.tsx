'use client';

import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

const PDF_URL = '/ressources/Article%20Le%20d%C3%A9veloppement%20du%20langage%20(1)%20(1).pdf';

const resource = {
  title: 'Les stades du développement du langage',
  description:
    "Le langage, c'est bien plus que parler — c'est tout ce qui permet à un enfant de comprendre le monde et d'y prendre sa place. Cet article vous guide à travers les grandes étapes du développement langagier et vous donne des repères concrets pour accompagner votre enfant.",
  tag: 'Article · PDF gratuit',
  img: '/uploads/Miniature Le développement du langage-1.png',
  imgPosition: 'top',
};

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
          <div style={{ maxWidth: 560 }}>
            <div className="mef-card" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                <Image
                  src={resource.img}
                  alt={resource.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: resource.imgPosition ?? 'center center' }}
                  sizes="560px"
                />
              </div>

              <div style={{ padding: '20px 22px' }}>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#5a6070', marginBottom: 10 }}>
                  {resource.tag}
                </span>
                <h4 style={{ fontFamily: 'var(--font-nunito)', fontSize: 18, fontWeight: 700, marginBottom: 10, lineHeight: 1.4, color: '#090943' }}>
                  {resource.title}
                </h4>
                <p style={{ color: '#5a6070', fontSize: 14, lineHeight: 1.65 }}>{resource.description}</p>
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mef-btn mef-btn-outline"
                  style={{ display: 'inline-block', marginTop: 18, padding: '8px 20px', fontSize: 13, textDecoration: 'none' }}
                >
                  Lire l&apos;article
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
