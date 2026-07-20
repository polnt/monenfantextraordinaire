import type { Metadata } from 'next';
import { getLegalMarkdown, getLegalToc } from '@/lib/legal';
import LegalMarkdown from '@/components/legal/LegalMarkdown';
import LegalToc from '@/components/legal/LegalToc';

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation – Mon Enfant Extra-Ordinaire",
  description: "Conditions générales d'utilisation du site Mon Enfant Extra-Ordinaire.",
};

export default function CguPage(): React.JSX.Element {
  const content = getLegalMarkdown('cgu');
  const toc = getLegalToc(content);

  return (
    <>
      <LegalToc entries={toc} />
      <LegalMarkdown content={content} />
    </>
  );
}
