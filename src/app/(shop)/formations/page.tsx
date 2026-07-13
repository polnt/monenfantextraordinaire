'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatPrice } from '@/lib/currency';
import { FORMATIONS } from '@/lib/catalog';

export default function FormationsPage(): React.JSX.Element {
  const isMobile = useIsMobile();
  const { currency } = useCurrency();

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: 'white', padding: isMobile ? '48px 0 40px' : '80px 0 60px' }}>
        <div className="mef-container">
          <div style={{ maxWidth: 680, marginBottom: isMobile ? 36 : 64 }}>
            <div className="mef-eyebrow">Formations en ligne</div>
            <h1 style={{ fontFamily: 'var(--font-nunito)', fontSize: isMobile ? 32 : 48, fontWeight: 900, color: '#090943', marginBottom: 16 }}>
              Apprenez à votre <span style={{ color: '#0792dc' }}>rythme</span>
            </h1>
            <p style={{ fontSize: 16, color: '#5a6070', lineHeight: 1.7 }}>
              Des formations pratiques conçues pour les parents et professionnels — accessibles 24h/24, à vie.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
            {FORMATIONS.map((f, i) => (
              <div key={i} className="mef-card" style={{ overflow: 'hidden', opacity: f.disabled ? 0.75 : 1 }}>
                {f.disabled && (
                  <div style={{ background: '#090943', textAlign: 'center', padding: '10px', fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 12, color: 'white', borderBottom: '1px solid #1a1a6e' }}>
                    🕐 BIENTÔT DISPONIBLE
                  </div>
                )}
                {!f.disabled && f.popular && (
                  <div style={{ background: '#FDF482', textAlign: 'center', padding: '10px', fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 12, color: '#090943', borderBottom: '1px solid #EFD010' }}>
                    ⭐ FORMATION LA PLUS POPULAIRE
                  </div>
                )}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <Image src={f.img} alt={f.title} width={600} height={f.imgHeight} style={{ height: f.imgHeight, width: '100%', objectFit: 'contain', objectPosition: f.imgPosition, display: 'block', filter: f.disabled ? 'grayscale(40%)' : 'none' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: f.disabled ? '#9ca3af' : f.color }} />
                </div>
                <div style={{ padding: isMobile ? '20px 18px' : 28 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                    {[f.modules, f.hours, f.level].map((tag) => (
                      <span key={tag} style={{ background: '#f3f4f6', color: '#5a6070', borderRadius: 50, padding: '4px 12px', fontSize: 12, fontFamily: 'var(--font-nunito)', fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-nunito)', fontSize: 17, fontWeight: 700, marginBottom: 10, lineHeight: 1.35 }}>{f.title}</h3>
                  <p style={{ color: '#5a6070', fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{f.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: 16, gap: 8 }}>
                    {!f.disabled && (
                      <span style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 24, color: f.color }}>{formatPrice(f.priceEur, f.priceXof ?? null, currency)}</span>
                    )}
                    <div style={{ display: 'flex', gap: 8 }}>
                      {f.disabled ? (
                        <>
                          <span
                            className="mef-btn"
                            style={{ padding: '10px 16px', fontSize: 13, background: '#e5e7eb', color: '#9ca3af', cursor: 'not-allowed', pointerEvents: 'none' }}
                          >
                            Détails
                          </span>
                          <span
                            className="mef-btn"
                            style={{ padding: '10px 16px', fontSize: 13, background: '#e5e7eb', color: '#9ca3af', cursor: 'not-allowed', pointerEvents: 'none' }}
                          >
                            S&apos;inscrire
                          </span>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/formations/${f.slug}`}
                            className="mef-btn"
                            style={{ padding: '10px 16px', fontSize: 13, background: 'transparent', color: f.color, border: `1.5px solid ${f.color}` }}
                          >
                            Détails
                          </Link>
                          <Link
                            href={`/formations/${f.slug}`}
                            className="mef-btn"
                            style={{ padding: '10px 16px', fontSize: 13, background: f.color, color: 'white' }}
                          >
                            S&apos;inscrire
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fafbff', borderRadius: 20, padding: isMobile ? '24px 20px' : '32px 40px', marginTop: 40, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 20 : 32, textAlign: 'center' }}>
            {[
              { title: 'Accès à vie', desc: 'Une fois acheté, le contenu est disponible pour toujours.' },
              { title: 'Satisfait ou remboursé', desc: 'Garanti 7 jours — aucune question posée.' },
              { title: 'Certificat inclus', desc: 'Un certificat de complétion remis à la fin de chaque formation.' },
            ].map((g, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 16, color: '#090943', marginBottom: 6 }}>{g.title}</div>
                <div style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6 }}>{g.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
