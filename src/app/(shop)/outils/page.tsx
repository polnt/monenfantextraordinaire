'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatPrice } from '@/lib/currency';
import { OUTILS, PACKS, type OutilProduct, type Pack } from '@/lib/catalog';

interface ProductCard {
  title: string;
  subtitle: string;
  img: string | null;
  imgPosition: string;
  bg: string;
  priceEur: number;
  priceXof?: number;
  priceBarreEur: number | null;
  priceBarreXof?: number;
  badge: string | null;
  href: string;
  slug: string;
  color: string;
}

function outilToCard(p: OutilProduct): ProductCard {
  return {
    title: p.listingTitle,
    subtitle: p.listingSubtitle,
    img: p.img,
    imgPosition: p.imgPosition,
    bg: p.colorLight,
    priceEur: p.priceEur,
    priceXof: p.priceXof,
    priceBarreEur: null,
    badge: null,
    href: `/outils/${p.slug}`,
    slug: p.slug,
    color: p.color,
  };
}

function packToCard(p: Pack): ProductCard {
  return {
    title: `${p.title} — ${p.subtitle}`,
    subtitle: p.tagline,
    img: p.img,
    imgPosition: p.imgPosition,
    bg: p.colorLight,
    priceEur: p.priceEur,
    priceXof: p.priceXof,
    priceBarreEur: p.priceBarreEur,
    priceBarreXof: p.priceBarreXof,
    badge: p.badge,
    href: `/packs/${p.slug}`,
    slug: p.productSlug,
    color: p.color,
  };
}

// Each pack's two outils are shown right before the pack itself
// (1 outil per column, then the pack in the 3rd column on desktop).
const packedSlugs = new Set(PACKS.flatMap((p) => p.itemSlugs));

const products: ProductCard[] = [
  ...PACKS.flatMap((pack) => [
    ...pack.itemSlugs
      .map((slug) => OUTILS.find((o) => o.slug === slug))
      .filter((o): o is OutilProduct => o !== undefined)
      .map(outilToCard),
    packToCard(pack),
  ]),
  ...OUTILS.filter((o) => !packedSlugs.has(o.slug)).map(outilToCard),
];

export default function OutilsPage(): React.JSX.Element {
  const isMobile = useIsMobile();
  const { addToCart, loading } = useAddToCart();
  const { currency } = useCurrency();

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: '#EFD010', padding: isMobile ? '40px 0 60px' : '64px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-nunito)', fontSize: isMobile ? 36 : 48, fontWeight: 900, color: '#090943', marginBottom: 12 }}>Outils</h1>
          <p style={{ fontSize: 16, color: '#5a6070', maxWidth: 500 }}>
            Kits pratiques, fiches et supports imprimables pour accompagner votre enfant au quotidien.
          </p>
        </div>
      </section>
      <section style={{ background: 'white', padding: isMobile ? '32px 0 56px' : '48px 0 80px' }}>
        <div className="mef-container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
            {products.map((p, i) => (
              <div key={i} className="mef-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: isMobile ? 200 : 260, background: p.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {p.badge && (
                    <span style={{ position: 'absolute', top: 12, left: 12, zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 50, padding: '5px 12px', fontSize: 12, fontFamily: 'var(--font-nunito)', fontWeight: 700, background: 'white', color: p.color, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                      {p.badge}
                    </span>
                  )}
                  {p.img ? (
                    <Image src={p.img} alt={p.title} width={600} height={400} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: p.imgPosition ?? 'center center', display: 'block', filter: 'drop-shadow(-10px 16px 16px rgba(0,0,0,0.75))' }} />
                  ) : (
                    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 12px,rgba(0,0,0,0.025) 12px,rgba(0,0,0,0.025) 13px)' }} />
                      <span style={{ position: 'relative', zIndex: 1, fontFamily: 'monospace', fontSize: 10, color: '#090943', textAlign: 'center', padding: 12 }}>visuel outil</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 style={{ fontFamily: 'var(--font-nunito)', fontSize: 15, fontWeight: 800, marginBottom: 8, lineHeight: 1.4, color: '#090943' }}>{p.title}</h4>
                  <p style={{ color: '#5a6070', fontSize: 13, lineHeight: 1.65, flex: 1, fontStyle: 'italic' }}>{p.subtitle}</p>
                  <div style={{ marginTop: 16, borderTop: '1px solid #f3f4f6', paddingTop: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 20, color: p.color }}>{formatPrice(p.priceEur, p.priceXof ?? null, currency)}</span>
                        {p.priceBarreEur !== null && (
                          <span style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 13, color: '#9ca3af', textDecoration: 'line-through' }}>{formatPrice(p.priceBarreEur, p.priceBarreXof ?? null, currency)}</span>
                        )}
                      </div>
                      <Link href={p.href} style={{ fontFamily: 'var(--font-nunito)', fontSize: 13, color: 'var(--gray)', textDecoration: 'underline' }}>
                        Détails →
                      </Link>
                    </div>
                    <button
                      onClick={() => void addToCart(p.slug)}
                      disabled={loading}
                      className="mef-btn"
                      style={{ width: '100%', justifyContent: 'center', padding: '10px 18px', fontSize: 13, background: p.color, color: 'white', opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
                    >
                      {loading ? 'Chargement…' : '🛒 Ajouter au panier'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
