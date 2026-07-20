import type { Metadata } from 'next';
import { getLegalMarkdown, getLegalToc } from '@/lib/legal';
import LegalMarkdown from '@/components/legal/LegalMarkdown';
import LegalToc from '@/components/legal/LegalToc';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente – Mon Enfant Extra-Ordinaire',
  description: 'Conditions générales de vente applicables aux commandes passées sur Mon Enfant Extra-Ordinaire.',
};

export default function CgvPage(): React.JSX.Element {
  const content = getLegalMarkdown('cgv');
  const toc = getLegalToc(content);

  return (
    <>
      <LegalToc entries={toc} />
      <LegalMarkdown content={content} />
    </>
  );
}
