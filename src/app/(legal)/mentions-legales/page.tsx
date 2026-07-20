import type { Metadata } from 'next';
import { getLegalMarkdown, getLegalToc } from '@/lib/legal';
import LegalMarkdown from '@/components/legal/LegalMarkdown';
import LegalToc from '@/components/legal/LegalToc';

export const metadata: Metadata = {
  title: 'Mentions légales – Mon Enfant Extra-Ordinaire',
  description: 'Mentions légales du site Mon Enfant Extra-Ordinaire : éditeur, hébergeur et contact.',
};

export default function MentionsLegalesPage(): React.JSX.Element {
  const content = getLegalMarkdown('mentions-legales');
  const toc = getLegalToc(content);

  return (
    <>
      <LegalToc entries={toc} />
      <LegalMarkdown content={content} />
    </>
  );
}
