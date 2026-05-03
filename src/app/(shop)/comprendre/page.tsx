import TabSection from '@/components/TabSection';

const tabs = [
  {
    id: 'developpement',
    label: 'Trouble du développement',
    image: '/uploads/trouble-developpement.jpg',
  },
  { id: 'autisme', label: "L'autisme de A à Z", image: '/uploads/Autisme de A à Z.jpg' },
  { id: 'attention', label: "Trouble de l'attention", image: "/uploads/trouble de l'attention.jpg" },
];

const content = {
  developpement: [
    { key: "Qu'est-ce que c'est ?", desc: "Les troubles du développement regroupent un ensemble de conditions affectant le développement neurologique de l'enfant.", color: '#87ceeb', text: '#0f3d5a' },
    { key: 'Les signes', desc: 'Retards de langage, difficultés motrices, comportements atypiques — reconnaître les premiers signaux.', color: '#27ae60', text: 'white' },
    { key: 'Le diagnostic', desc: 'Comment est posé le diagnostic et par quels professionnels ? Les étapes clés à connaître.', color: '#F90021', text: 'white' },
    { key: "L'accompagnement", desc: "Les différentes formes de soutien disponibles pour l'enfant et sa famille au quotidien.", color: '#EFD010', text: '#090943' },
    { key: 'Les ressources', desc: 'Associations, centres de référence, aides financières — tout ce qui existe pour vous soutenir.', color: '#ff7043', text: 'white' },
  ],
  autisme: [
    { key: 'Autisme', desc: "Comprendre ce qu'est l'autisme, ses formes et son spectre large.", color: '#87ceeb', text: '#0f3d5a' },
    { key: 'Causes', desc: "L'état des connaissances actuelles sur les origines de l'autisme.", color: '#27ae60', text: 'white' },
    { key: "Signes d'alerte", desc: 'Les signaux à surveiller dès les premières années de vie.', color: '#F90021', text: 'white' },
    { key: 'Que faire ?', desc: 'Les premières démarches à mettre en place après un diagnostic.', color: '#EFD010', text: '#090943' },
    { key: 'Conséquences', desc: "Impact sur la vie quotidienne de l'enfant et de la famille.", color: '#ff7043', text: 'white' },
    { key: 'Traitements', desc: 'Les approches thérapeutiques reconnues et leur efficacité.', color: '#9c27b0', text: 'white' },
  ],
  attention: [
    { key: 'Le TDAH', desc: "Trouble de l'attention avec ou sans hyperactivité — comprendre et agir.", color: '#87ceeb', text: '#0f3d5a' },
    { key: 'Les symptômes', desc: "Inattention, impulsivité, hyperactivité — comment les identifier chez l'enfant.", color: '#27ae60', text: 'white' },
    { key: 'Le diagnostic', desc: 'Par qui et comment est posé le diagnostic de TDAH ?', color: '#F90021', text: 'white' },
    { key: 'Traitements', desc: 'Médicamenteux, comportementaux, éducatifs — les options disponibles.', color: '#EFD010', text: '#090943' },
    { key: "À l'école", desc: "Comment accompagner l'enfant TDAH dans son parcours scolaire.", color: '#ff7043', text: 'white' },
  ],
};

export const revalidate = 3600;

export default function ComprendrePage(): React.JSX.Element {
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: '#0792dc', padding: '64px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', fontFamily: 'var(--font-nunito)', fontSize: 48, fontWeight: 900, marginBottom: 12 }}>Comprendre</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 520 }}>
            Tout pour mieux comprendre les troubles du neurodéveloppement et l&apos;autisme.
          </p>
        </div>
      </section>
      <section style={{ background: 'white', padding: '48px 0 80px' }}>
        <div className="mef-container">
          <TabSection tabs={tabs} content={content} accentColor="#0792dc" />
        </div>
      </section>
    </div>
  );
}
