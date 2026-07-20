import type { LegalTocEntry } from '@/lib/legal';

export default function LegalToc({ entries }: { entries: LegalTocEntry[] }): React.JSX.Element | null {
  if (entries.length === 0) return null;

  return (
    <nav
      aria-label="Sommaire"
      style={{
        background: 'var(--off)',
        border: '1px solid #eef0f4',
        borderRadius: 16,
        padding: '20px 24px',
        marginBottom: 40,
      }}
    >
      <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--blue)', marginBottom: 12 }}>
        Sommaire
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} style={{ color: 'var(--gray)', fontSize: 14.5, textDecoration: 'none' }}>
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
