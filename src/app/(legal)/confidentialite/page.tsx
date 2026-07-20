import type { Metadata } from 'next';
import { getLegalMarkdown, getLegalToc } from '@/lib/legal';
import LegalMarkdown from '@/components/legal/LegalMarkdown';
import LegalToc from '@/components/legal/LegalToc';

export const metadata: Metadata = {
  title: 'Politique de confidentialité – Mon Enfant Extra-Ordinaire',
  description: 'Comment Mon Enfant Extra-Ordinaire collecte, utilise et protège vos données personnelles.',
};

export default function ConfidentialitePage(): React.JSX.Element {
  const content = getLegalMarkdown('politique-confidentialite');
  const toc = getLegalToc(content);

  return (
    <>
      <LegalToc entries={toc} />
      <LegalMarkdown content={content} />
    </>
  );
}
