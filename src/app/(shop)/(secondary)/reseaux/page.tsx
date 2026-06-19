'use client';

import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';

type SocialKind = 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin' | 'web';

interface Social {
  kind: SocialKind;
  name: string;
  handle: string;
  color: string;
  url: string;
}

const brandSocials: Social[] = [
  { kind: 'instagram', name: 'Instagram', handle: '@monenfantextra', color: '#c13584', url: 'https://www.instagram.com/monenfantextra' },
  { kind: 'facebook', name: 'Facebook', handle: 'Mon Enfant Extra-Ordinaire', color: '#1877f2', url: 'https://www.facebook.com/monenfantextraordinaire' },
  { kind: 'tiktok', name: 'TikTok', handle: '@monenfantextra', color: '#010101', url: 'https://www.tiktok.com/@monenfantextra' },
  { kind: 'youtube', name: 'YouTube', handle: 'Mon Enfant Extra-Ordinaire', color: '#F90021', url: 'https://www.youtube.com/@monenfantextraordinaire' },
  { kind: 'linkedin', name: 'LinkedIn', handle: 'Laurence Bugnet', color: '#0a66c2', url: 'https://www.linkedin.com/in/laurence-bugnet' },
];

const ecoleLinks: Social[] = [
  { kind: 'facebook', name: "L'Éveil sur Facebook", handle: "La page de l'école", color: '#1877f2', url: 'https://www.facebook.com/leveildakar' },
  { kind: 'web', name: "Le site de l'école", handle: 'LE CENTRE — leveil', color: '#0792dc', url: 'https://leveil.sn' },
];

const SocialIcon = ({ kind }: { kind: SocialKind }): React.JSX.Element | null => {
  const common = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'white' } as const;
  switch (kind) {
    case 'instagram':
      return (
        <svg {...common} fill="none">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.3" fill="white" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M14.5 8.5h2V5.6h-2.4c-2 0-3.3 1.3-3.3 3.4v1.6H8.5v2.9h2.3V21h3v-7.5h2.3l.4-2.9h-2.7V9.4c0-.6.3-.9 1.2-.9z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M16.6 3c.3 1.9 1.4 3.1 3.4 3.3v2.6c-1.2.1-2.3-.3-3.4-1v5.7c0 3.6-2.6 5.7-5.6 5.4-2.9-.3-4.5-2.7-4.1-5.2.4-2.4 2.6-3.9 5-3.5v2.8c-.4-.1-.8-.2-1.2-.1-1 .1-1.7.9-1.6 1.9.1 1 .9 1.6 1.9 1.5 1.1-.1 1.6-1 1.6-2.1V3h2.6z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M21.4 8c-.2-.9-.8-1.5-1.6-1.7C18.2 6 12 6 12 6s-6.2 0-7.8.3C3.4 6.5 2.8 7.1 2.6 8 2.3 9.5 2.3 12 2.3 12s0 2.5.3 4c.2.9.8 1.5 1.6 1.7C5.8 18 12 18 12 18s6.2 0 7.8-.3c.8-.2 1.4-.8 1.6-1.7.3-1.5.3-4 .3-4s0-2.5-.3-4zM10 15V9l5.2 3-5.2 3z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common}>
          <path d="M6.6 9.2H4V20h2.6V9.2zM5.3 4.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM20 13.6c0-2.7-1.4-3.9-3.3-3.9-1.5 0-2.2.8-2.6 1.4V9.2H11.5c0 .7 0 10.8 0 10.8h2.6v-6c0-.3 0-.6.1-.8.2-.6.8-1.2 1.7-1.2 1.2 0 1.6.9 1.6 2.2V20H20v-6.4z" />
        </svg>
      );
    case 'web':
      return (
        <svg {...common} fill="none">
          <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
          <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" stroke="white" strokeWidth="1.8" />
        </svg>
      );
    default:
      return null;
  }
};

const Tile = ({ s }: { s: Social }): React.JSX.Element => (
  <a
    href={s.url}
    target="_blank"
    rel="noopener noreferrer"
    className="mef-card"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '22px 24px',
      textDecoration: 'none',
      borderLeft: `4px solid ${s.color}`,
    }}
  >
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: 16,
        background: s.color,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 6px 18px ${s.color}33`,
      }}
    >
      <SocialIcon kind={s.kind} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 17, color: '#090943', marginBottom: 2 }}>{s.name}</div>
      <div style={{ fontSize: 14, color: '#5a6070', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.handle}</div>
    </div>
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: s.color + '14',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: s.color,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </a>
);

export default function ReseauxPage(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <div style={{ paddingTop: 72 }}>
      {/* ── HERO ── */}
      <section style={{ background: '#090943', padding: isMobile ? '64px 0 88px' : '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 75% 25%, rgba(7,146,220,0.28) 0%, transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(249,0,33,0.12) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
          <div className="mef-eyebrow" style={{ color: '#87ceeb' }}>Réseaux sociaux</div>
          <h1 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: isMobile ? 34 : 52, color: 'white', lineHeight: 1.1, marginBottom: 18 }}>
            Suivez-nous <span style={{ color: '#FDF482' }}>partout</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, maxWidth: 600 }}>
            Conseils, témoignages, coulisses et nouveautés&nbsp;: retrouvez Mon Enfant Extra-Ordinaire sur vos plateformes préférées, et découvrez l&apos;école L&apos;Éveil.
          </p>
        </div>
      </section>

      {/* ── RÉSEAUX DE LA MARQUE ── */}
      <section style={{ background: 'white', padding: isMobile ? '48px 0' : '80px 0' }}>
        <div className="mef-container" style={{ maxWidth: 880 }}>
          <div style={{ marginBottom: isMobile ? 28 : 40 }}>
            <div className="mef-eyebrow">Mon Enfant Extra-Ordinaire</div>
            <h2 className="mef-h2" style={{ fontSize: isMobile ? 28 : 36 }}>Nos comptes officiels</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
            {brandSocials.map((s, i) => <Tile key={i} s={s} />)}
          </div>
        </div>
      </section>

      {/* ── ÉCOLE L'ÉVEIL ── */}
      <section style={{ background: '#fafbff', padding: isMobile ? '48px 0' : '80px 0' }}>
        <div className="mef-container" style={{ maxWidth: 880 }}>
          <div style={{ marginBottom: isMobile ? 28 : 40 }}>
            <div className="mef-eyebrow mef-eyebrow-red">L&apos;école L&apos;Éveil</div>
            <h2 className="mef-h2" style={{ fontSize: isMobile ? 28 : 36 }}>L&apos;établissement inclusif de Dakar</h2>
            <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.8, maxWidth: 560 }}>
              Fondée et dirigée par Laurence Bugnet, l&apos;école L&apos;Éveil accueille des enfants extraordinaires. Suivez son actualité.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
            {ecoleLinks.map((s, i) => <Tile key={i} s={s} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#FDF482', padding: isMobile ? '48px 0' : '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -60, top: -60, width: 200, height: 200, borderRadius: '50%', background: '#EFD010', opacity: 0.4 }} />
        <div className="mef-container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-nunito)', fontSize: isMobile ? 26 : 38, fontWeight: 900, color: '#090943', marginBottom: 16 }}>
            Une question&nbsp;?
          </h2>
          <p style={{ fontSize: 17, color: '#5a6070', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Écrivez-moi directement, je réponds personnellement à chaque message.
          </p>
          <Link href="/reseaux" className="mef-btn mef-btn-blue">Me contacter</Link>
        </div>
      </section>
    </div>
  );
}
