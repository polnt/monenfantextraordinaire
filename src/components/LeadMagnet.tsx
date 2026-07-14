'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { R2_IMAGES_BASE } from '@/lib/images';

export default function LeadMagnet(): React.JSX.Element {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiErr, setApiErr] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErr(true);
      return;
    }
    setErr(false);
    setApiErr(false);
    setLoading(true);
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setApiErr(true);
      }
    } catch {
      setApiErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ background: 'white', padding: isMobile ? '56px 0' : '96px 0' }}>
      <div className="mef-container">
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #eef7ff 0%, #e6f4ec 100%)',
            borderRadius: 28,
            padding: isMobile ? '36px 24px' : '56px 64px',
            overflow: 'hidden',
            border: '1px solid rgba(7,146,220,0.12)',
          }}
        >
          <div style={{ position: 'absolute', top: -70, left: -70, width: 220, height: 220, borderRadius: '50%', background: 'rgba(39,174,96,0.10)' }} />
          <div style={{ position: 'absolute', bottom: -80, right: '38%', width: 180, height: 180, borderRadius: '50%', background: 'rgba(7,146,220,0.08)' }} />

          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr',
              gap: isMobile ? 32 : 56,
              alignItems: 'center',
            }}
          >
            <div>
              <div className="mef-eyebrow" style={{ color: '#27ae60' }}>Bonus offert</div>
              <h2
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 900,
                  fontSize: isMobile ? 28 : 40,
                  color: '#090943',
                  lineHeight: 1.15,
                  marginBottom: 18,
                }}
              >
                Envie d&apos;aller <span style={{ color: '#27ae60' }}>plus loin</span>&nbsp;?
              </h2>
              <p style={{ fontSize: isMobile ? 15 : 17, color: '#5a6070', lineHeight: 1.75, marginBottom: 14 }}>
                Découvrez notre approche à travers nos astuces concrètes, rapides et efficaces pour{' '}
                <strong style={{ color: '#090943' }}>stimuler le langage au quotidien</strong>.
              </p>
              <p style={{ fontSize: isMobile ? 15 : 17, color: '#5a6070', lineHeight: 1.75, marginBottom: 28 }}>
                Téléchargez votre bonus exclusif offert et passez à l&apos;action dès aujourd&apos;hui&nbsp;!
              </p>

              {sent ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    background: 'white',
                    borderRadius: 16,
                    padding: '20px 24px',
                    border: '1px solid rgba(39,174,96,0.3)',
                    boxShadow: '0 8px 24px rgba(39,174,96,0.12)',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#27ae60',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="18" height="14" viewBox="0 0 10 8">
                      <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 17, color: '#090943', marginBottom: 2 }}>
                      C&apos;est parti&nbsp;!
                    </div>
                    <p style={{ fontSize: 14, color: '#5a6070', lineHeight: 1.5 }}>
                      Votre guide « Mini astuces » arrive dans votre boîte mail. Pensez à vérifier vos spams.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: 12,
                      alignItems: 'stretch',
                    }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (err) setErr(false);
                      }}
                      placeholder="Votre adresse e-mail"
                      aria-label="Votre adresse e-mail"
                      style={{
                        flex: 1,
                        fontFamily: 'var(--font-aleo)',
                        fontSize: 15,
                        color: '#090943',
                        padding: '15px 20px',
                        borderRadius: 50,
                        border: err ? '2px solid #F90021' : '2px solid rgba(9,9,67,0.12)',
                        background: 'white',
                        outline: 'none',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="mef-btn"
                      style={{ background: '#27ae60', color: 'white', whiteSpace: 'nowrap', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? 'Envoi…' : 'Recevoir le bonus'}
                      {!loading && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 6 }}>
                          <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {err && (
                    <p style={{ color: '#F90021', fontSize: 13, marginTop: 10, marginLeft: 4 }}>
                      Merci de saisir une adresse e-mail valide.
                    </p>
                  )}
                  {apiErr && (
                    <p style={{ color: '#F90021', fontSize: 13, marginTop: 10, marginLeft: 4 }}>
                      Une erreur est survenue. Veuillez réessayer.
                    </p>
                  )}
                  <p style={{ fontSize: 12.5, color: '#9ca3af', marginTop: 12, marginLeft: 4 }}>
                    100&nbsp;% gratuit · Aucun spam · Désinscription en un clic.
                  </p>
                </form>
              )}
            </div>

            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div
                style={{
                  position: 'absolute',
                  top: isMobile ? -8 : 4,
                  right: isMobile ? 4 : -8,
                  zIndex: 2,
                  background: '#FDF482',
                  color: '#090943',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 900,
                  fontSize: 13,
                  padding: '10px 18px',
                  borderRadius: 50,
                  boxShadow: '0 8px 20px rgba(239,208,16,0.45)',
                  transform: 'rotate(6deg)',
                }}
              >
                Offert
              </div>
              <Image
                src={`${R2_IMAGES_BASE}/bonus-mini-astuces.png`}
                alt="Guide Mini astuces pour développer le langage — bonus gratuit"
                width={380}
                height={475}
                style={{
                  width: '100%',
                  maxWidth: isMobile ? 320 : 380,
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: 16,
                  boxShadow: '0 24px 56px rgba(9,9,67,0.18)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
