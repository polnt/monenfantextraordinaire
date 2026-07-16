'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CONSENT_STORAGE_KEY = 'mef-cookie-consent';

type ConsentValue = 'accepted' | 'rejected';

export default function CookieConsent(): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored !== 'accepted' && stored !== 'rejected') {
      setVisible(true);
    }
  }, []);

  function handleChoice(value: ConsentValue): void {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 left-0 right-0 z-[1002] flex justify-center px-4 pb-4"
    >
      <div
        className="mef-card flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        style={{
          maxWidth: 900,
          width: '100%',
          padding: '24px 28px',
          boxShadow: '0 10px 40px rgba(9,9,67,0.18)',
        }}
      >
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--gray)' }}>
          Nous utilisons des cookies pour assurer le bon fonctionnement du site et, avec votre
          accord, mesurer son audience. Vous pouvez accepter, refuser, ou en savoir plus sur notre{' '}
          <Link href="/cookies" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
            politique de cookies
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 gap-3">
          <button
            type="button"
            onClick={() => handleChoice('rejected')}
            className="mef-btn mef-btn-outline"
            style={{ padding: '11px 20px', fontSize: 14 }}
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="mef-btn mef-btn-blue"
            style={{ padding: '11px 20px', fontSize: 14 }}
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
