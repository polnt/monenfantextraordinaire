'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface FormState {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

interface FormErrors {
  nom?: string;
  email?: string;
  sujet?: string;
  message?: string;
}

const subjects = [
  'Une question sur le site',
  'Une question sur les formations',
  'Un partenariat ou une collaboration',
  'Un témoignage',
  'Autre',
];

const infos = [
  { color: '#0792dc', bg: '#e8f4fd', icon: '✉', label: 'Email', val: 'contact@monenfantextraordinaire.com' },
  { color: '#27ae60', bg: '#e8f5e9', icon: '⏰', label: 'Délai de réponse', val: 'Sous 48 heures ouvrées' },
  { color: '#F90021', bg: '#ffe5e8', icon: '📍', label: 'Localisation', val: 'Paris, France — et en ligne partout' },
];

export default function ContactPage(): React.JSX.Element {
  const isMobile = useIsMobile();
  const [form, setForm] = useState<FormState>({ nom: '', email: '', sujet: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.nom.trim()) e.nom = 'Votre nom est requis.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Adresse email invalide.';
    if (!form.sujet) e.sujet = 'Veuillez choisir un sujet.';
    if (!form.message.trim() || form.message.trim().length < 20) e.message = 'Votre message doit faire au moins 20 caractères.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1400);
  };

  const inputStyle = (field: keyof FormErrors): React.CSSProperties => ({
    width: '100%',
    padding: '14px 18px',
    borderRadius: 12,
    fontSize: 15,
    color: '#090943',
    border: `2px solid ${errors[field] ? '#F90021' : '#e5e7eb'}`,
    outline: 'none',
    transition: 'border-color 0.2s',
    background: 'white',
    boxSizing: 'border-box',
  });

  const labelStyle: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 13, color: '#090943', marginBottom: 8 };
  const errorStyle: React.CSSProperties = { color: '#F90021', fontSize: 12, fontFamily: 'var(--font-nunito)', marginTop: 6, display: 'block' };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#0792dc';
  };
  const handleBlur = (field: keyof FormErrors) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = errors[field] ? '#F90021' : '#e5e7eb';
  };

  return (
    <div style={{ paddingTop: 72 }}>
      {/* ── HERO ── */}
      <section style={{ background: '#0792dc', padding: '72px 0 96px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="mef-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>À propos</div>
          <h1 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: isMobile ? 36 : 52, color: 'white', lineHeight: 1.1, marginBottom: 16 }}>Contact</h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.8)', maxWidth: 520, lineHeight: 1.7 }}>
            Une question, un témoignage, une idée de collaboration ? Écrivez-moi — je réponds personnellement à chaque message.
          </p>
        </div>
      </section>

      <section style={{ background: 'white', padding: isMobile ? '40px 0 64px' : '64px 0 96px' }}>
        <div className="mef-container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 420px', gap: isMobile ? 40 : 64, alignItems: 'start' }}>

            {/* ── FORMULAIRE ── */}
            <div>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '64px 32px' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e8f5e9', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M7 18l7 7L29 11" stroke="#27ae60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 28, color: '#090943', marginBottom: 12 }}>Message envoyé !</h2>
                  <p style={{ color: '#5a6070', fontSize: 16, lineHeight: 1.7, maxWidth: 380, margin: '0 auto 28px' }}>
                    Merci pour votre message. Je vous répondrai dans les 48 heures ouvrées.
                  </p>
                  <button
                    className="mef-btn mef-btn-blue"
                    onClick={() => { setSent(false); setForm({ nom: '', email: '', sujet: '', message: '' }); }}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div>
                      <label style={labelStyle}>Votre nom <span style={{ color: '#F90021' }}>*</span></label>
                      <input
                        type="text"
                        placeholder="Marie Dupont"
                        value={form.nom}
                        onChange={e => { setForm({ ...form, nom: e.target.value }); setErrors({ ...errors, nom: '' }); }}
                        style={inputStyle('nom')}
                        onFocus={handleFocus}
                        onBlur={handleBlur('nom')}
                      />
                      {errors.nom && <span style={errorStyle}>{errors.nom}</span>}
                    </div>
                    <div>
                      <label style={labelStyle}>Adresse email <span style={{ color: '#F90021' }}>*</span></label>
                      <input
                        type="email"
                        placeholder="marie@exemple.fr"
                        value={form.email}
                        onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                        style={inputStyle('email')}
                        onFocus={handleFocus}
                        onBlur={handleBlur('email')}
                      />
                      {errors.email && <span style={errorStyle}>{errors.email}</span>}
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Sujet <span style={{ color: '#F90021' }}>*</span></label>
                    <select
                      value={form.sujet}
                      onChange={e => { setForm({ ...form, sujet: e.target.value }); setErrors({ ...errors, sujet: '' }); }}
                      style={{
                        ...inputStyle('sujet'),
                        appearance: 'none',
                        cursor: 'pointer',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a6070' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'calc(100% - 16px) center',
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur('sujet')}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.sujet && <span style={errorStyle}>{errors.sujet}</span>}
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={labelStyle}>
                      Votre message <span style={{ color: '#F90021' }}>*</span>
                      <span style={{ fontWeight: 400, color: '#9ca3af', marginLeft: 8 }}>({form.message.length} / 20 min.)</span>
                    </label>
                    <textarea
                      placeholder="Bonjour, je souhaitais vous contacter à propos de..."
                      rows={6}
                      value={form.message}
                      onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }); }}
                      style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 160 }}
                      onFocus={handleFocus}
                      onBlur={handleBlur('message')}
                    />
                    {errors.message && <span style={errorStyle}>{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="mef-btn mef-btn-blue"
                    style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '15px', opacity: sending ? 0.7 : 1, transition: 'opacity 0.2s' }}
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                          <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                          <path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Envoi en cours…
                      </>
                    ) : 'Envoyer le message'}
                  </button>
                </form>
              )}
            </div>

            {/* ── INFOS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <h3 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 22, color: '#090943', marginBottom: 8 }}>Informations de contact</h3>
                <p style={{ color: '#5a6070', fontSize: 15, lineHeight: 1.7 }}>Je lis et réponds personnellement à tous les messages. Merci pour votre patience.</p>
              </div>
              {infos.map((info, i) => (
                <div key={i} style={{ background: info.bg, borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: info.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'white', flexShrink: 0 }}>{info.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 13, color: '#090943', marginBottom: 2 }}>{info.label}</div>
                    <div style={{ fontSize: 14, color: '#5a6070', lineHeight: 1.5 }}>{info.val}</div>
                  </div>
                </div>
              ))}

              <div style={{ background: '#090943', borderRadius: 16, padding: '24px', marginTop: 8 }}>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Suivez-nous</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    { label: 'YouTube', color: '#F90021' },
                    { label: 'Instagram', color: '#c13584' },
                    { label: 'Facebook', color: '#1877f2' },
                  ].map((s, i) => (
                    <button
                      key={i}
                      style={{ background: s.color, color: 'white', border: 'none', borderRadius: 10, padding: '8px 14px', fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'opacity 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
