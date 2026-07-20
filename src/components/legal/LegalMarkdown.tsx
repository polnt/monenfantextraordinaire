import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';

const components: Components = {
  h1: ({ children }) => (
    <h1 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 34, color: 'var(--navy)', marginBottom: 8 }}>
      {children}
    </h1>
  ),
  h2: ({ id, children }) => (
    <h2 id={id} style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 22, color: 'var(--navy)', marginTop: 40, marginBottom: 12, scrollMarginTop: 108 }}>
      {children}
    </h2>
  ),
  h3: ({ id, children }) => (
    <h3 id={id} style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 17, color: 'var(--navy)', marginTop: 24, marginBottom: 8, scrollMarginTop: 108 }}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p style={{ color: 'var(--gray)', lineHeight: 1.8, fontSize: 15.5, marginBottom: 16 }}>{children}</p>
  ),
  ul: ({ children }) => (
    <ul style={{ color: 'var(--gray)', lineHeight: 1.8, fontSize: 15.5, marginBottom: 16, paddingLeft: 22, listStyle: 'disc' }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{ color: 'var(--gray)', lineHeight: 1.8, fontSize: 15.5, marginBottom: 16, paddingLeft: 22, listStyle: 'decimal' }}>
      {children}
    </ol>
  ),
  li: ({ children }) => <li style={{ marginBottom: 4 }}>{children}</li>,
  strong: ({ children }) => <strong style={{ color: 'var(--navy)', fontWeight: 700 }}>{children}</strong>,
  a: ({ href, children }) => {
    if (!href) return <>{children}</>;
    const isInternal = href.startsWith('/');
    if (isInternal) {
      return (
        <Link href={href} style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
        {children}
      </a>
    );
  },
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid #eef0f4', margin: '32px 0' }} />,
  table: ({ children }) => (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14.5 }}>{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th style={{ textAlign: 'left', color: 'var(--navy)', borderBottom: '2px solid #eef0f4', padding: '8px 12px' }}>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td style={{ color: 'var(--gray)', borderBottom: '1px solid #eef0f4', padding: '8px 12px' }}>{children}</td>
  ),
};

export default function LegalMarkdown({ content }: { content: string }): React.JSX.Element {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
