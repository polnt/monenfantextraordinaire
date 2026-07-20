'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';
import { R2_IMAGES_BASE } from '@/lib/images';

type SocialKind = 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin' | 'web';

function SocialIcon({ kind }: { kind: SocialKind }): React.JSX.Element | null {
  const p = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'white' as const };
  switch (kind) {
    case 'instagram':
      return (
        <svg {...p} fill="none">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.3" fill="white" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...p}>
          <path d="M14.5 8.5h2V5.6h-2.4c-2 0-3.3 1.3-3.3 3.4v1.6H8.5v2.9h2.3V21h3v-7.5h2.3l.4-2.9h-2.7V9.4c0-.6.3-.9 1.2-.9z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...p}>
          <path d="M16.6 3c.3 1.9 1.4 3.1 3.4 3.3v2.6c-1.2.1-2.3-.3-3.4-1v5.7c0 3.6-2.6 5.7-5.6 5.4-2.9-.3-4.5-2.7-4.1-5.2.4-2.4 2.6-3.9 5-3.5v2.8c-.4-.1-.8-.2-1.2-.1-1 .1-1.7.9-1.6 1.9.1 1 .9 1.6 1.9 1.5 1.1-.1 1.6-1 1.6-2.1V3h2.6z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...p}>
          <path d="M21.4 8c-.2-.9-.8-1.5-1.6-1.7C18.2 6 12 6 12 6s-6.2 0-7.8.3C3.4 6.5 2.8 7.1 2.6 8 2.3 9.5 2.3 12 2.3 12s0 2.5.3 4c.2.9.8 1.5 1.6 1.7C5.8 18 12 18 12 18s6.2 0 7.8-.3c.8-.2 1.4-.8 1.6-1.7.3-1.5.3-4 .3-4s0-2.5-.3-4zM10 15V9l5.2 3-5.2 3z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...p}>
          <path d="M6.6 9.2H4V20h2.6V9.2zM5.3 4.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM20 13.6c0-2.7-1.4-3.9-3.3-3.9-1.5 0-2.2.8-2.6 1.4V9.2H11.5c0 .7 0 10.8 0 10.8h2.6v-6c0-.3 0-.6.1-.8.2-.6.8-1.2 1.7-1.2 1.2 0 1.6.9 1.6 2.2V20H20v-6.4z" />
        </svg>
      );
    case 'web':
      return (
        <svg {...p} fill="none">
          <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
          <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" stroke="white" strokeWidth="1.8" />
        </svg>
      );
    default:
      return null;
  }
}

type Social = {
  kind: SocialKind;
  label: string;
  color: string;
  href: string | null;
};

const SOCIALS: Social[] = [
  { kind: 'instagram', label: 'Instagram', color: '#c13584', href: 'https://www.instagram.com/monenfantextraordinaire/' },
  { kind: 'facebook',  label: 'Facebook',  color: '#1877f2', href: 'https://www.facebook.com/profile.php?id=61556536320114' },
  { kind: 'tiktok',    label: 'TikTok',    color: '#010101', href: 'https://www.tiktok.com/@monenfantextra' },
  { kind: 'youtube',   label: 'YouTube',   color: '#F90021', href: 'https://www.youtube.com/channel/UCZ0pPxfidRLNgSfSu_5DEyg' },
  { kind: 'linkedin',  label: 'LinkedIn',  color: '#0a66c2', href: 'https://www.linkedin.com/in/laurence-bugnet-806b6642/' },
];

const LEGAL_LINKS: { label: string; href: string }[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'CGU', href: '/cgu' },
  { label: 'CGV', href: '/cgv' },
  { label: 'Confidentialité', href: '/confidentialite' },
  { label: 'Cookies', href: '/cookies' },
];

const ECOLE_LINKS: Social[] = [
  { kind: 'facebook', label: "L'Éveil sur Facebook", color: '#1877f2', href: 'https://www.facebook.com/profile.php?id=100067132929137' },
  { kind: 'web',      label: "Le site de l'école",   color: '#0792dc', href: 'https://ecoleleveil.wixsite.com/leveil/l-ecole' },
];

function SocialButton({ s }: { s: Social }): React.JSX.Element {
  const [hovered, setHovered] = useState(false);

  const style: React.CSSProperties = {
    width: 46,
    height: 46,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.16)',
    background: hovered ? s.color : 'rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background .2s, transform .2s',
    textDecoration: 'none',
    transform: hovered ? 'translateY(-3px)' : 'none',
  };

  const handlers = {
    onMouseEnter: (): void => setHovered(true),
    onMouseLeave: (): void => setHovered(false),
  };

  if (s.href === null) {
    return (
      <Link href="/reseaux" aria-label={s.label} style={style} {...handlers}>
        <SocialIcon kind={s.kind} />
      </Link>
    );
  }
  return (
    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={style} {...handlers}>
      <SocialIcon kind={s.kind} />
    </a>
  );
}

function SocialGroup({ label, links, centered }: { label: string; links: Social[]; centered: boolean }): React.JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: centered ? 'center' : 'flex-start', gap: 14 }}>
      <div style={{
        fontFamily: 'var(--font-nunito)',
        fontWeight: 700,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: 'rgba(255,255,255,0.45)',
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        {links.map((s) => <SocialButton key={s.label} s={s} />)}
      </div>
    </div>
  );
}

export default function Footer(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <footer style={{ background: '#090943', color: 'white', padding: isMobile ? '48px 0 24px' : '88px 0 40px' }}>
      <div className="mef-container">

        {/* Top: logo + social groups */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 30 : 40,
          marginBottom: isMobile ? 32 : 52,
          textAlign: isMobile ? 'center' : 'left',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
            <Image
              src={`${R2_IMAGES_BASE}/logo.png`}
              alt="Logo Mon Enfant Extra-Ordinaire"
              width={64}
              height={64}
              style={{
                width: isMobile ? 56 : 64,
                height: isMobile ? 56 : 64,
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                opacity: 0.95,
              }}
            />
            <div style={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 900,
              fontSize: isMobile ? 19 : 22,
              color: 'white',
              lineHeight: 1.2,
              textAlign: 'left',
            }}>
              Mon Enfant<br />
              <span style={{ color: '#87ceeb' }}>Extra-Ordinaire</span>
            </div>
          </Link>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? 24 : 48,
          }}>
            <SocialGroup label="Suivez-nous" links={SOCIALS} centered={isMobile} />
            <SocialGroup label="L'Éveil" links={ECOLE_LINKS} centered={isMobile} />
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 20,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          color: 'rgba(255,255,255,0.3)',
          fontSize: 12,
        }}>
          <span>© 2026 Mon Enfant Extra-Ordinaire. Tous droits réservés.</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 22px' }}>
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
