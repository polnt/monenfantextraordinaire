'use client';

import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';

const navColumns: Array<{
  title: string;
  links: Array<{ label: string; href: string | null }>;
}> = [
  {
    title: 'Navigation',
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Comprendre', href: '/comprendre' },
      { label: 'Aider', href: '/aider' },
      { label: 'Outils', href: '/outils' },
      { label: 'Ressources', href: '/ressources' },
      { label: 'Formations', href: '/formations' },
    ],
  },
  {
    title: 'À propos',
    links: [
      { label: 'Le site', href: '/le-site' },
      { label: 'Qui suis-je ?', href: '/qui-suis-je' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'contact@monenfant...', href: null },
      { label: 'Mentions légales', href: null },
      { label: 'Confidentialité', href: null },
    ],
  },
];

export default function Footer(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <footer style={{ background: '#090943', color: 'white', padding: isMobile ? '48px 0 24px' : '60px 0 28px' }}>
      <div className="mef-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr',
            gap: isMobile ? 32 : 40,
            marginBottom: isMobile ? 36 : 48,
          }}
        >
          {/* Brand — full width on mobile */}
          <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <img
                src="/logo.png"
                alt="Logo Mon Enfant Extra-Ordinaire"
                style={{
                  width: 48,
                  height: 48,
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.9,
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 900,
                  fontSize: 15,
                  color: 'white',
                  lineHeight: 1.3,
                }}
              >
                Mon Enfant
                <br />
                <span style={{ color: '#87ceeb' }}>Extra-Ordinaire</span>
              </div>
            </div>
            <p
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: 14,
                lineHeight: 1.75,
                maxWidth: 260,
              }}
            >
              Accompagner les familles dans la compréhension et le soutien des enfants neurodiverses.
            </p>
          </div>

          {navColumns.map((col) => (
            <div key={col.title}>
              <h5
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 700,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 14,
                }}
              >
                {col.title}
              </h5>
              {col.links.map(({ label, href }) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  {href ? (
                    <Link
                      href={href}
                      style={{
                        color: 'rgba(255,255,255,0.65)',
                        fontSize: 14,
                        textDecoration: 'none',
                      }}
                    >
                      {label}
                    </Link>
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>{label}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 20,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: 8,
            color: 'rgba(255,255,255,0.3)',
            fontSize: 12,
          }}
        >
          <span>© 2026 Mon Enfant Extra-Ordinaire. Tous droits réservés.</span>
          <span>Made with care for every extraordinary child</span>
        </div>
      </div>
    </footer>
  );
}
