import TabSection from '@/components/TabSection';

const tabs = [
  { id: 'parents', label: 'Les parents' },
  { id: 'professionnels', label: 'Les professionnels' },
  { id: 'methodes', label: 'Les méthodes' },
  { id: 'outils', label: 'Les outils de communication' },
];

const content = {
  parents: [
    {
      key: 'Les premiers signes',
      color: '#87ceeb',
      text: '#0f3d5a',
      sections: [
        {
          title: "Le premier rôle : détecter",
          content:
            "Être parent d'un enfant atypique exige une implication intense, constante et profondément humaine. Dès les premiers signes de différence, les parents sont souvent les premiers à percevoir ce qui échappe à l'entourage. Leur vigilance et leur intuition sont précieuses.",
        },
        {
          title: 'La démarche diagnostique',
          content:
            "Initier une démarche diagnostique est souvent long et complexe, mais cruciale pour accéder aux aides adaptées. Ne pas attendre : si plusieurs signes sont présents, consulter rapidement un pédopsychiatre ou un médecin spécialisé.",
        },
      ],
    },
    {
      key: 'Après le diagnostic',
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: "Un rôle qui s'amplifie",
          content:
            "Une fois le diagnostic posé, le rôle des parents s'amplifie. Ils deviennent des piliers du quotidien de leur enfant, ses premiers accompagnateurs dans les soins, l'éducation et la construction d'une vie sociale.",
        },
        {
          title: 'Un soutien à trois niveaux',
          content: [
            "Affectif : maintenir un climat d'amour, de sécurité et de bienveillance",
            "Logistique : organiser les rendez-vous médicaux, rencontrer les enseignants, adapter le domicile",
            "Éducatif : comprendre le fonctionnement de l'enfant, ses besoins spécifiques, ses droits",
          ],
        },
        {
          title: "Se former",
          content:
            "La formation devient indispensable : comprendre les méthodes éducatives et thérapeutiques efficaces, connaître les droits de l'enfant (MDPH, AEEH, AESH), et s'appuyer sur des professionnels de confiance.",
        },
      ],
    },
    {
      key: 'La disponibilité',
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: 'Être là',
          content:
            "Être là, dans les moments de crise comme dans les petites victoires, demande une énergie et une présence inestimables. Malgré l'épuisement, les parents cherchent sans relâche à maintenir une communication ouverte avec leur enfant.",
        },
        {
          title: 'Une communication à réinventer',
          content:
            "Cette communication, parfois non verbale, exige écoute, patience et adaptation constante. Créer des ponts entre le monde de l'enfant et celui des autres est un travail quotidien, exigeant et profondément précieux.",
        },
      ],
    },
    {
      key: "L'inclusion sociale",
      color: '#EFD010',
      text: '#090943',
      sections: [
        {
          title: 'Porte-parole et médiateur',
          content:
            "Les parents jouent un rôle déterminant dans l'inclusion sociale de leur enfant. Ils œuvrent pour qu'il ne soit pas isolé, qu'il soit compris et accepté dans les écoles, les activités, les lieux de vie. Ils sont souvent ses porte-paroles, ses défenseurs, ses médiateurs.",
        },
        {
          title: "S'appuyer sur un réseau",
          content:
            "Les échanges avec les professionnels, les proches et d'autres parents d'enfants atypiques deviennent des occasions de partager, d'apprendre et de se sentir moins seuls.",
        },
        {
          title: 'Conclusion',
          content:
            "Les parents sont un véritable socle pour l'enfant atypique. Leur présence, leur engagement et leur amour lui permettent de grandir dans la dignité, la confiance et la reconnaissance de sa singularité.",
        },
      ],
    },
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
    {
      key: 'Méthode ABA',
      color: '#87ceeb',
      text: '#0f3d5a',
      sections: [
        {
          title: 'Principes',
          content: [
            "Renforcement positif : récompenser les comportements appropriés pour les encourager à se reproduire",
            "Analyse des comportements : observer et comprendre leurs causes pour mettre en place des stratégies adaptées",
          ],
        },
        {
          title: 'Objectifs',
          content: [
            "Fixer des objectifs clairs et mesurables (parole, compétences sociales, tâches quotidiennes)",
            "Programmes personnalisés et structurés avec suivi des progrès",
          ],
        },
        {
          title: 'Qui l\'enseigne ?',
          content:
            "Psychologues spécialisés, thérapeutes comportementalistes, éducateurs spécialisés, consultants ABA (certifications BCBA, RBT).",
        },
      ],
    },
    {
      key: 'Méthode TEACCH',
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: 'Principes clés',
          content: [
            "Structuration de l'espace et du temps (organisation claire des lieux et activités)",
            "Aides visuelles (pictogrammes, plannings, schémas)",
            "Apprentissage individualisé",
            "Autonomie et développement des compétences",
          ],
        },
        {
          title: 'Objectif final',
          content:
            "Favoriser l'autonomie et l'inclusion des personnes autistes en adaptant leur environnement à leurs besoins spécifiques.",
        },
        {
          title: 'Pour qui ?',
          content:
            "Personnes autistes de tous âges, particulièrement celles ayant des difficultés de communication verbale, des comportements répétitifs ou de l'anxiété.",
        },
        {
          title: 'Qui l\'enseigne ?',
          content:
            "Psychologues, éducateurs, ergothérapeutes spécialisés. Les parents jouent également un rôle central en tant que co-thérapeutes.",
        },
      ],
    },
    {
      key: 'Méthode Denver',
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: 'Principes (ESDM)',
          content: [
            "Approche développementale : adaptée au stade de développement de l'enfant",
            "Approche relationnelle : interactions chaleureuses et positives",
            "Apprentissage par le jeu dans des contextes naturels",
          ],
        },
        {
          title: 'Objectifs',
          content: [
            "Développer la communication verbale et non verbale",
            "Améliorer les interactions sociales",
            "Renforcer les compétences cognitives et promouvoir l'autonomie",
          ],
        },
        {
          title: 'Comment ?',
          content:
            "Environ 20 heures par semaine d'intervention structurée, réparties entre professionnels et activités à domicile. Les parents sont formés pour appliquer les principes au quotidien.",
        },
        {
          title: 'Avantages',
          content: [
            "Intervention précoce (maximise la plasticité cérébrale)",
            "Approche globale (social, émotionnel, langagier, moteur)",
            "Approche ludique et motivante, soutenue par des preuves scientifiques",
          ],
        },
      ],
    },
    {
      key: 'Accompagnement individualisé',
      color: '#EFD010',
      text: '#090943',
      sections: [
        {
          title: 'Objectifs',
          content: [
            "Développer la communication verbale et non verbale",
            "Améliorer les interactions sociales et favoriser l'autonomie (habillage, repas, hygiène)",
            "Réduire les comportements problématiques",
            "Soutenir les apprentissages scolaires et extrascolaires",
            "Développer les habiletés sociales et la gestion des émotions",
          ],
        },
        {
          title: 'Professionnels impliqués',
          content: [
            "Psychologue spécialisé",
            "Orthophoniste",
            "Psychomotricien",
            "AVS / AESH",
          ],
        },
        {
          title: 'Soutien familial',
          content: [
            "Guidance parentale",
            "Aménagement du domicile",
            "Activités adaptées (équithérapie, musicothérapie, art-thérapie)",
          ],
        },
      ],
    },
  ],
  outils: [
    {
      key: 'PECS',
      color: '#87ceeb',
      text: '#0f3d5a',
      sections: [
        {
          title: 'Principes clés',
          content: [
            "L'utilisateur donne une image pour demander un objet, une action ou exprimer un besoin",
            "Progression structurée en 6 phases",
            "Images basées sur les intérêts de l'utilisateur",
            "Objectif : communication spontanée et autonome",
          ],
        },
        {
          title: 'Les 6 phases',
          content: [
            "1 — Initiation à l'échange",
            "2 — Augmentation de la spontanéité (recherche active d'un interlocuteur)",
            "3 — Discrimination d'images (choisir parmi plusieurs images)",
            "4 — Structure des phrases (« Je veux la voiture »)",
            "5 — Réponses aux questions simples (« Que veux-tu ? »)",
            "6 — Communication avancée (phrases complexes, opinions, questions)",
          ],
        },
        {
          title: 'Avantages et limites',
          content: [
            "Accessible aux personnes non verbales, développe l'autonomie",
            "Réduit les comportements problématiques liés à la frustration",
            "Nécessite un accompagnement professionnel",
          ],
        },
      ],
    },
    {
      key: 'Makaton',
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: 'Qu\'est-ce que c\'est ?',
          content:
            "Combinaison de trois modes : signes (inspirés de la langue des signes nationale), symboles visuels et langage parlé. Adapté à chaque utilisateur selon ses besoins.",
        },
        {
          title: 'Objectifs',
          content: [
            "Offrir un moyen de s'exprimer aux personnes ayant des difficultés avec le langage parlé",
            "Faciliter l'apprentissage du langage (lien mots / significations)",
            "Améliorer l'inclusion et les interactions sociales",
          ],
        },
        {
          title: 'Avantages',
          content: [
            "Accessible à tous les âges et niveaux",
            "Facile à apprendre, flexible",
            "Utilisable à la maison, à l'école et en institution",
            "Ce n'est pas une langue complète — c'est un outil de soutien simplifié",
          ],
        },
      ],
    },
    {
      key: 'Langue des signes',
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: 'Caractéristiques',
          content: [
            "Langue visio-gestuelle : mains, expressions faciales, regard, posture",
            "Langue naturelle, propre à chaque communauté sourde (LSF, ASL, LSQ…)",
            "Grammaire spécifique, différente des langues orales",
          ],
        },
        {
          title: 'Avantages',
          content: [
            "Communication riche et nuancée",
            "Favorise l'inclusion et l'autonomie",
            "Peut être apprise par des personnes entendantes",
          ],
        },
        {
          title: 'Différences avec le langage parlé',
          content: [
            "Spatialité : les signes se déroulent dans un espace tridimensionnel",
            "Simultanéité : plusieurs informations transmises en même temps",
            "Étroitement liée à la culture sourde",
          ],
        },
      ],
    },
    {
      key: 'La CAA',
      color: '#EFD010',
      text: '#090943',
      sections: [
        {
          title: "Qu'est-ce que la CAA ?",
          content:
            "La Communication Améliorée et Alternative (CAA) regroupe tous les outils et stratégies qui permettent à une personne ayant des difficultés d'expression de communiquer autrement que par la parole.",
        },
        {
          title: 'Les outils CAA',
          content: [
            "Systèmes d'images et pictogrammes (PECS, Boardmaker, Symwriter…)",
            "Signes et gestes (Makaton, langue des signes)",
            "Appareils de génération de parole (tablettes, AAC apps)",
            "Plannings visuels, tableaux de communication",
          ],
        },
        {
          title: 'Pour qui ?',
          content: [
            "Enfants non verbaux ou ayant des difficultés de communication",
            "Personnes avec TSA, paralysie cérébrale, déficience intellectuelle, apraxie",
            "Tout âge, tout niveau de fonctionnement",
          ],
        },
      ],
    },
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
