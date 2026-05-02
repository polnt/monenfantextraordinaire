import TabSection from '@/components/TabSection';

const tabs = [
  { id: 'parents', label: 'Les parents' },
  { id: 'professionnels', label: 'Les professionnels' },
  { id: 'methodes', label: 'Les méthodes' },
  { id: 'outils', label: 'Les outils de communication' },
];

const content = {
  parents: [
    { key: 'Comprendre son rôle', desc: "Le parent est le premier thérapeute de l'enfant — comment adopter la bonne posture au quotidien.", color: '#87ceeb', text: '#0f3d5a' },
    { key: "Gérer l'épuisement", desc: 'Le burn-out parental existe — reconnaître les signes et trouver du soutien.', color: '#27ae60', text: 'white' },
    { key: 'La fratrie', desc: 'Comment accompagner les autres enfants de la famille dans ce parcours particulier.', color: '#F90021', text: 'white' },
    { key: 'Les droits', desc: "MDPH, AEEH, AVS — tout sur les aides auxquelles vous avez droit.", color: '#EFD010', text: '#090943' },
  ],
  professionnels: [
    {
      key: 'Orthophoniste', color: '#87ceeb', text: '#0f3d5a',
      sections: [
        { title: 'Pourquoi consulter ?', content: "Si votre enfant présente des retards de parole, des difficultés à comprendre les consignes, un bégaiement ou des troubles de la déglutition, l'orthophoniste est le premier professionnel à consulter." },
        { title: 'Son rôle', content: "L'orthophoniste évalue et traite les troubles du langage oral et écrit, de la communication, de la voix et de la déglutition chez l'enfant." },
        { title: 'Son approche', content: "Les séances sont ludiques et adaptées à l'âge de l'enfant. L'orthophoniste travaille sur la compréhension, l'expression, la phonologie et la pragmatique du langage." },
        { title: "L'objectif", content: "Permettre à l'enfant de communiquer efficacement, d'accéder aux apprentissages scolaires et de développer une autonomie langagière au quotidien." },
        { title: 'Où consulter ?', content: "En cabinet libéral (remboursé sur prescription médicale), en CMPP, en SESSAD ou dans les centres de référence des troubles du langage." },
      ],
    },
    {
      key: 'Psychomotricien', color: '#27ae60', text: 'white',
      sections: [
        { title: 'Pourquoi consulter ?', content: "Maladresse, difficultés de coordination, troubles de l'équilibre, agitation motrice ou au contraire inhibition — autant de signes qui justifient une évaluation psychomotrice." },
        { title: 'Son rôle', content: "Le psychomotricien évalue le développement corporel, la motricité fine et globale, le schéma corporel, l'espace et le temps chez l'enfant." },
        { title: 'Son approche', content: "Par le jeu, le mouvement, la relaxation et les médiations corporelles, il aide l'enfant à mieux habiter son corps et à gagner en confiance dans ses actions." },
        { title: "L'objectif", content: "Harmoniser le développement psychomoteur pour faciliter les apprentissages, l'autonomie et le bien-être émotionnel de l'enfant." },
        { title: 'Où consulter ?', content: "En cabinet libéral (remboursé sur prescription), en CMPP, en hôpital de jour ou dans les structures médico-sociales comme le SESSAD." },
      ],
    },
    {
      key: 'Psychologue', color: '#F90021', text: 'white',
      sections: [
        { title: 'Pourquoi consulter ?', content: "Anxiété, troubles du comportement, difficultés relationnelles, souffrance émotionnelle ou impact du handicap sur la vie familiale — le psychologue apporte un soutien essentiel." },
        { title: 'Son rôle', content: "Le psychologue évalue le fonctionnement cognitif et émotionnel de l'enfant, pose un bilan psychologique et accompagne l'enfant comme la famille dans leur vécu." },
        { title: 'Son approche', content: "Selon sa spécialisation, il utilise des approches cognitivo-comportementales (TCC), de thérapie par le jeu, ou de soutien à la parentalité adaptées au profil de l'enfant." },
        { title: "L'objectif", content: "Aider l'enfant à développer des stratégies d'adaptation, renforcer son estime de soi et soutenir la dynamique familiale face aux défis du quotidien." },
        { title: 'Où consulter ?', content: "En cabinet libéral (non remboursé sauf exceptions), en CMPP, en CMP, ou dans les structures scolaires via le RASED." },
      ],
    },
    {
      key: 'Éducateur ABA', color: '#EFD010', text: '#090943',
      sections: [
        { title: 'Pourquoi consulter ?', content: "Si votre enfant présente des comportements-défis, des difficultés d'apprentissage importantes ou un autisme diagnostiqué, l'éducateur ABA peut transformer le quotidien." },
        { title: 'Son rôle', content: "L'éducateur ABA analyse les comportements de l'enfant, identifie leurs fonctions et met en place des programmes d'apprentissage individualisés basés sur les principes du renforcement." },
        { title: 'Son approche', content: "La méthode ABA (Applied Behavior Analysis) décompose les apprentissages en petites étapes, valorise les réussites et réduit progressivement les comportements-obstacles." },
        { title: "L'objectif", content: "Développer les compétences de communication, d'autonomie et de socialisation de l'enfant, tout en réduisant les comportements inadaptés qui freinent ses apprentissages." },
        { title: 'Où consulter ?', content: "Auprès d'associations spécialisées en ABA, en SESSAD ou via des structures privées. Certains éducateurs interviennent directement au domicile ou à l'école." },
      ],
    },
    {
      key: 'Pédopsychiatre', color: '#ff7043', text: 'white',
      sections: [
        { title: 'Pourquoi consulter ?', content: "Le pédopsychiatre est incontournable pour poser un diagnostic de TSA, de TDAH ou d'autres troubles neurodéveloppementaux, et coordonner la prise en charge." },
        { title: 'Son rôle', content: "Médecin spécialiste de la santé mentale de l'enfant et de l'adolescent, il pose les diagnostics, prescrit les traitements médicamenteux si nécessaire et coordonne l'équipe pluridisciplinaire." },
        { title: 'Son approche', content: "Il combine évaluation clinique, bilans spécialisés et échanges avec l'entourage pour établir un tableau complet du fonctionnement de l'enfant et proposer un plan de soin adapté." },
        { title: "L'objectif", content: "Obtenir un diagnostic fiable, accéder aux aides (MDPH, SESSAD…) et mettre en place un suivi coordonné pour que l'enfant évolue dans les meilleures conditions possibles." },
        { title: 'Où consulter ?', content: "En CMP (Centre Médico-Psychologique, gratuit), en CMPP, dans les centres de référence TSA ou TDAH, ou en cabinet libéral. Les délais sont souvent longs — anticipez la demande." },
      ],
    },
  ],
  methodes: [
    { key: 'Méthode ABA', desc: "L'analyse appliquée du comportement, approche la plus documentée.", color: '#87ceeb', text: '#0f3d5a' },
    { key: 'Méthode TEACCH', desc: "Structuration de l'environnement pour favoriser l'autonomie.", color: '#27ae60', text: 'white' },
    { key: 'PECS', desc: "Système de communication par échange d'images pour enfants non-verbaux.", color: '#F90021', text: 'white' },
    { key: 'Thérapie par le jeu', desc: "Utiliser le jeu comme vecteur d'apprentissage et d'interaction.", color: '#EFD010', text: '#090943' },
    { key: 'Makaton', desc: 'Programme de langage utilisant signes, symboles et parole.', color: '#ff7043', text: 'white' },
  ],
  outils: [
    { key: 'Les pictogrammes', desc: 'Images et symboles pour faciliter la communication non-verbale.', color: '#87ceeb', text: '#0f3d5a' },
    { key: 'Les supports visuels', desc: "Plannings, routines illustrées, cartes d'émotion — rendre le quotidien prévisible.", color: '#27ae60', text: 'white' },
    { key: 'Les applications', desc: 'Les meilleures apps pour soutenir la communication de votre enfant.', color: '#F90021', text: 'white' },
    { key: 'La CAA', desc: "Communication Améliorée et Alternative — tout comprendre sur cette approche.", color: '#EFD010', text: '#090943' },
  ],
};

export const revalidate = 3600;

export default function AiderPage(): React.JSX.Element {
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: '#F90021', padding: '64px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 100%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', fontFamily: 'var(--font-nunito)', fontSize: 48, fontWeight: 900, marginBottom: 12 }}>Aider</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, maxWidth: 520 }}>
            Des ressources concrètes pour tous ceux qui accompagnent un enfant neurodivers.
          </p>
        </div>
      </section>
      <section style={{ background: 'white', padding: '48px 0 80px' }}>
        <div className="mef-container">
          <TabSection tabs={tabs} content={content} accentColor="#F90021" />
        </div>
      </section>
    </div>
  );
}
