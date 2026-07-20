import Link from 'next/link';

export default function LegalLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div style={{ paddingTop: 72 }}>
      <div className="mef-container" style={{ maxWidth: 760, padding: '48px 40px 96px' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--blue)',
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
            marginBottom: 32,
          }}
        >
          ← Retour à l&apos;accueil
        </Link>
        {children}
      </div>
    </div>
  );
}
