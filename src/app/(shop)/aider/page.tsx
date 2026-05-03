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
      key: 'Pédopsychiatre', color: '#ff7043', text: 'white',
      sections: [
        { title: 'Son rôle', content: "Médecin spécialisé dans les troubles psychiques, neurodéveloppementaux et émotionnels chez les enfants et adolescents. Acteur central du diagnostic et de la coordination des soins." },
        { title: 'Quand consulter ?', content: [
          "Poser un diagnostic de TSA ou de troubles associés (TDAH, anxiété, retard de développement)",
          "Difficultés comportementales, de régulation émotionnelle ou troubles du sommeil",
          "Évaluer la nécessité de traitements médicamenteux",
          "Accompagner la famille face à des situations de crise",
        ]},
        { title: 'Rôle dans le parcours de soin', content: [
          "Évaluation clinique approfondie",
          "Coordination des bilans (psychologique, orthophonique, psychomoteur, neuropsychologique)",
          "Élaboration d'un projet de soins personnalisé",
          "Orientation vers des structures adaptées (IME, CAMSP, SESSAD)",
          "Suivi médical régulier et ajustement des besoins",
        ]},
        { title: 'Médication (si nécessaire)', content: "Peut réduire l'anxiété, améliorer le sommeil, diminuer les comportements auto/hétéro-agressifs et améliorer la concentration. Toujours envisagée avec prudence, en complément d'un suivi global." },
        { title: 'Où consulter ?', content: "CMP, hôpital de jour, service de pédopsychiatrie, cabinet privé, structures médico-sociales. Au Sénégal : Hôpital pour enfant Diamniadio et Hôpital Albert Royer." },
      ],
    },
    {
      key: 'Psychologue', color: '#F90021', text: 'white',
      sections: [
        { title: 'Son rôle', content: "Aide l'enfant à mieux comprendre et réguler ses émotions, à développer des compétences sociales, et à renforcer son estime de soi dans un cadre sécurisant." },
        { title: 'Ce qu\'il propose', content: [
          "Bilan psychologique",
          "Suivi individuel : émotions, angoisse, compétences sociales",
          "Jeux thérapeutiques adaptés (jeu symbolique, dessin, histoires sociales)",
          "Groupes d'habiletés sociales",
          "Guidance parentale",
        ]},
        { title: 'Où consulter ?', content: "Cabinet libéral, CMP, IME, écoles ou structures spécialisées, téléconsultation." },
      ],
    },
    {
      key: 'Orthophoniste', color: '#87ceeb', text: '#0f3d5a',
      sections: [
        { title: 'Son rôle', content: "Aide l'enfant non seulement à parler, mais à entrer en relation avec les autres, à se faire comprendre et à comprendre son environnement." },
        { title: 'Ce qu\'il propose', content: [
          "Bilan orthophonique complet",
          "Travail sur le langage oral (vocabulaire, syntaxe, prononciation)",
          "Développement de la communication non verbale (gestes, regard, tours de parole)",
          "Outils de communication alternative : PECS, pictogrammes, Makaton, tablette",
          "Histoires sociales et scénarios pour comprendre les situations sociales",
        ]},
        { title: 'Où consulter ?', content: "Cabinet libéral, CMP, IME, téléorthophonie. Sur prescription médicale." },
      ],
    },
    {
      key: 'Psychomotricien', color: '#27ae60', text: 'white',
      sections: [
        { title: 'Son rôle', content: "Aide l'enfant à se développer harmonieusement en tenant compte de ses spécificités sensorielles, motrices et affectives." },
        { title: 'Ce qu\'il propose', content: [
          "Jeux moteurs pour l'équilibre, la coordination et la précision des gestes",
          "Activités sensorielles pour mieux gérer les sensations (bruit, lumière, toucher)",
          "Techniques de relaxation pour réduire l'agitation et l'anxiété",
          "Médiations corporelles (danse, mouvement, expression corporelle)",
        ]},
        { title: 'Où consulter ?', content: "Cabinet libéral, CMP, IME, école spécialisée, hôpital. Sur prescription médicale." },
      ],
    },
    {
      key: 'Ergothérapeute', color: '#EFD010', text: '#090943',
      sections: [
        { title: 'Son rôle', content: "Favorise l'autonomie, le confort et la confiance de l'enfant dans ses activités quotidiennes." },
        { title: 'Ce qu\'il propose', content: [
          "Évaluation fonctionnelle de l'enfant et de son environnement",
          "Rééducation motrice et sensorielle",
          "Adaptations concrètes pour les gestes du quotidien (ustensiles adaptés, routines visuelles)",
          "Profil sensoriel personnalisé",
          "Conseils aux parents et à l'école",
        ]},
        { title: 'Où consulter ?', content: "Cabinet libéral, IME, CAMSP, SESSAD. Parfois à domicile ou en milieu scolaire." },
      ],
    },
    {
      key: 'Diététicien', color: '#9b59b6', text: 'white',
      sections: [
        { title: 'Son rôle', content: "Aide à reconstruire une relation sereine et équilibrée à l'alimentation, en respectant les spécificités sensorielles et comportementales de l'enfant." },
        { title: 'Problèmes fréquents', content: [
          "Sélectivités alimentaires (refus de certaines textures, couleurs, odeurs)",
          "Troubles sensoriels influençant l'acceptation des aliments",
          "Difficultés à reconnaître les signaux de faim ou de satiété",
          "Risque de carences nutritionnelles",
          "Troubles digestifs, constipation, allergies alimentaires",
        ]},
        { title: 'Ce qu\'il propose', content: [
          "Évaluation personnalisée des habitudes alimentaires",
          "Menus équilibrés et progressifs adaptés à l'enfant",
          "Stratégies de désensibilisation alimentaire douces et respectueuses",
          "Outils ludiques pour explorer les aliments autrement",
          "Soutien aux parents pour dédramatiser les repas",
        ]},
        { title: 'Où consulter ?', content: "Cabinet libéral, IME, CAMSP, SESSAD, visioconférence." },
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
