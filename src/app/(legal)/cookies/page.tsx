import type { Metadata } from 'next';
import { getLegalMarkdown, getLegalToc } from '@/lib/legal';
import LegalMarkdown from '@/components/legal/LegalMarkdown';
import LegalToc from '@/components/legal/LegalToc';

export const metadata: Metadata = {
  title: 'Politique de cookies – Mon Enfant Extra-Ordinaire',
  description: 'Quels cookies et traceurs sont utilisés sur le site Mon Enfant Extra-Ordinaire et comment les gérer.',
};

export default function CookiesPage(): React.JSX.Element {
  const content = getLegalMarkdown('politique-cookies');
  const toc = getLegalToc(content);

  return (
    <>
      <LegalToc entries={toc} />
      <LegalMarkdown content={content} />
    </>
  );
}
