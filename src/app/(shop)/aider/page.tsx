import TabSection from '@/components/TabSection';

const tabs = [
  {
    id: 'parents',
    label: 'Les parents',
    image: '/uploads/parents.png',
    imgPosition: 'center 0%'
  },
  {
    id: 'professionnels',
    label: 'Les professionnels',
    image: '/uploads/pros.png',
    imgPosition: 'center 0%'
  },
  {
    id: 'methodes',
    label: 'Les méthodes',
    image: '/uploads/methodes.png',
    imgPosition: 'center 0%'
  },
  {
    id: 'outils',
    label: 'Les outils de communication',
    image: '/uploads/outils-com.png',
    imgPosition: 'center 0%'
  },
];

const content = {
  parents: [
    {
      key: 'Les premiers doutes',
      color: '#87ceeb',
      text: '#0f3d5a',
      sections: [
        {
          title: "Quand l'inquiétude s'installe",
          content:
            "Pour de nombreux parents, tout commence par une petite inquiétude. Un enfant qui ne parle pas comme les autres, qui semble vivre dans son propre monde, qui ne joue pas comme les enfants de son âge ou qui présente des comportements inhabituels. Certains proches rassurent en disant « Chaque enfant évolue à son rythme », tandis que d'autres minimisent les préoccupations. Pourtant, au fond d'eux, beaucoup de parents sentent que quelque chose est différent. Cette période est souvent marquée par l'angoisse, l'incertitude et de nombreuses questions sur l'avenir.",
        },
        {
          title: "L'importance de consulter et d'obtenir un diagnostic",
          content:
            "Face aux premiers signes, il est essentiel de consulter des professionnels compétents. Le diagnostic n'est pas une étiquette destinée à enfermer l'enfant. Au contraire, il constitue une clé de compréhension qui permet de mieux identifier ses besoins et de mettre en place un accompagnement adapté. Un diagnostic précoce favorise la mise en œuvre d'interventions ciblées et améliore les perspectives de développement. Plus tôt les difficultés sont identifiées, plus tôt des solutions peuvent être mises en place.",
        },
      ],
    },
    {
      key: 'Le choc du diagnostic',
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: 'Un tsunami émotionnel',
          content:
            "Recevoir un diagnostic bouleverse profondément une famille. Même lorsque les parents s'y attendaient, l'annonce provoque souvent un véritable séisme émotionnel. La tristesse, la colère, l'incompréhension, la peur, le soulagement, la culpabilité ou encore le sentiment d'injustice peuvent se succéder. Chaque parent réagit différemment. Il n'existe pas de bonne ou de mauvaise manière de traverser cette étape.",
        },
        {
          title: 'La culpabilité : un poids souvent porté en silence',
          content:
            "Après l'annonce, de nombreux parents cherchent une explication et se demandent s'ils ont commis une erreur. Les mères sont particulièrement exposées à ce sentiment. Pourtant, les troubles du neurodéveloppement ne sont pas causés par un manque d'amour, une erreur éducative ou un défaut parental. Aucun parent n'est responsable du handicap ou des particularités de son enfant.",
        },
        {
          title: 'Le déni : une étape naturelle',
          content:
            "Face à une réalité difficile à accepter, certains parents traversent une phase de déni — ils espèrent une erreur de diagnostic ou refusent de croire aux conclusions des professionnels. Cette réaction est humaine : elle constitue souvent un mécanisme de protection face à une souffrance trop importante. Avec le temps, l'information et l'accompagnement permettent généralement d'avancer progressivement.",
        },
        {
          title: "Le deuil de l'enfant imaginé",
          content:
            "Chaque parent construit inconsciemment des rêves pour son enfant avant même sa naissance. Lorsqu'un diagnostic est posé, beaucoup doivent faire le deuil de cet enfant imaginé. Ce processus est douloureux mais nécessaire. L'acceptation ne signifie pas renoncer aux progrès ou aux espoirs. Elle signifie aimer et accompagner son enfant pour ce qu'il est, avec ses forces, ses talents, ses défis et son potentiel unique.",
        },
      ],
    },
    {
      key: "L'entourage et la société",
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: 'Quand la famille ne comprend pas',
          content:
            "Certains membres de la famille refusent d'accepter le diagnostic, minimisent les difficultés ou considèrent que l'enfant est simplement mal élevé. Les parents se retrouvent à devoir justifier les comportements de leur enfant et défendre continuellement leurs choix éducatifs. Cette incompréhension peut créer des tensions familiales et un sentiment profond d'isolement.",
        },
        {
          title: 'Le regard de la société',
          content:
            "Les crises en public, les comportements atypiques ou les difficultés de communication attirent parfois les regards, les jugements ou les remarques déplacées. Le handicap invisible est particulièrement difficile à faire comprendre. De nombreux parents ont progressivement cessé certaines sorties ou limité leurs activités sociales par peur d'être jugés.",
        },
        {
          title: 'Les croyances et les superstitions en Afrique',
          content:
            "Dans de nombreux pays africains, le handicap et les troubles du neurodéveloppement restent entourés de croyances traditionnelles. Certaines familles attribuent l'autisme à la sorcellerie, à un djinn ou à une malédiction familiale. Ces croyances peuvent conduire à l'isolement et à la stigmatisation. Il est essentiel de sensibiliser : l'autisme, le TDAH ou les troubles dys ne sont ni une punition ni une manifestation surnaturelle.",
        },
        {
          title: 'L\'impact sur le couple et la fratrie',
          content: [
            "Couple : les rendez-vous médicaux, les inquiétudes permanentes et la fatigue peuvent générer stress et tensions. Les parents n'avancent pas toujours au même rythme dans l'acceptation du diagnostic.",
            "Fratrie : les frères et sœurs peuvent éprouver jalousie ou frustration, ou au contraire un fort instinct protecteur. Il est important de leur offrir des espaces d'écoute et des moments privilégiés pour qu'ils trouvent leur propre place.",
          ],
        },
      ],
    },
    {
      key: "Le quotidien et l'avenir",
      color: '#EFD010',
      text: '#090943',
      sections: [
        {
          title: 'Une vie quotidienne entièrement réorganisée',
          content:
            "Les journées s'organisent autour des séances de rééducation, des rendez-vous médicaux, des activités thérapeutiques et des besoins spécifiques de l'enfant. Les parents deviennent progressivement experts de leur enfant. Ils apprennent à anticiper les difficultés, à adapter leur environnement et à célébrer chaque progrès, même lorsqu'il semble minime aux yeux des autres.",
        },
        {
          title: 'Vie professionnelle et difficultés financières',
          content:
            "Certains parents réduisent leur temps de travail, refusent des promotions ou interrompent leur carrière. La prise en charge spécialisée représente souvent un coût important : consultations, thérapies, matériel pédagogique. Dans de nombreux pays africains, l'absence de couverture adaptée oblige les familles à assumer seules la majorité des dépenses.",
        },
        {
          title: "L'épuisement des aidants",
          content:
            "Les nuits difficiles, les inquiétudes constantes, les démarches administratives et la vigilance permanente peuvent conduire à un épuisement physique et émotionnel important. Prendre soin de soi n'est pas un acte égoïste. C'est une nécessité. Un parent qui va bien est davantage en capacité d'accompagner son enfant dans la durée.",
        },
        {
          title: "L'importance des groupes de soutien",
          content:
            "Les associations, groupes de parole et réseaux de parents permettent de partager ses expériences, ses difficultés mais aussi ses réussites. Ils offrent un espace où chacun peut être compris sans jugement. Rencontrer d'autres familles aide souvent à rompre l'isolement, à trouver des solutions concrètes et à retrouver de l'espoir.",
        },
        {
          title: 'Les parents : acteurs essentiels de la prise en charge',
          content:
            "Les professionnels jouent un rôle important, mais les parents demeurent les principaux acteurs du développement de leur enfant. Les apprentissages réalisés lors des séances doivent souvent être poursuivis à la maison. La répétition, la patience, l'encouragement et la cohérence entre les différents environnements favorisent les progrès de l'enfant.",
        },
        {
          title: 'Un parcours difficile, mais rempli d\'espoir',
          content:
            "Être parent d'un enfant extraordinaire est un chemin exigeant, parfois épuisant, souvent bouleversant. Mais c'est également un parcours riche d'enseignements, de rencontres et de victoires. Chaque enfant possède ses propres talents, sa propre personnalité et sa propre trajectoire. Avec de l'amour, de la patience, un accompagnement adapté et une société plus inclusive, il peut développer son potentiel et trouver pleinement sa place dans le monde.",
        },
      ],
    },
  ],
  professionnels: [
    {
      key: 'Psychologue', color: '#F90021', text: 'white',
      sections: [
        { title: 'Son rôle', content: "Aide l'enfant à mieux comprendre et réguler ses émotions, à développer des compétences sociales, et à renforcer son estime de soi dans un cadre sécurisant." },
        {
          title: 'Ce qu\'il propose', content: [
            "Bilan psychologique",
            "Suivi individuel : émotions, angoisse, compétences sociales",
            "Jeux thérapeutiques adaptés (jeu symbolique, dessin, histoires sociales)",
            "Groupes d'habiletés sociales",
            "Guidance parentale",
          ]
        },
        { title: 'Où consulter ?', content: "Cabinet libéral, CMP, IME, écoles ou structures spécialisées, téléconsultation." },
      ],
    },
    {
      key: 'Pédopsychiatre',
      color: '#ff7043',
      text: 'white',
      image: '/uploads/pedopsy.png',
      imgPosition: 'center 0%',
      sections: [
        { title: 'Son rôle', content: "Médecin spécialisé dans les troubles psychiques, neurodéveloppementaux et émotionnels chez les enfants et adolescents. Acteur central du diagnostic et de la coordination des soins." },
        {
          title: 'Quand consulter ?', content: [
            "Poser un diagnostic de TSA ou de troubles associés (TDAH, anxiété, retard de développement)",
            "Difficultés comportementales, de régulation émotionnelle ou troubles du sommeil",
            "Évaluer la nécessité de traitements médicamenteux",
            "Accompagner la famille face à des situations de crise",
          ]
        },
        {
          title: 'Rôle dans le parcours de soin', content: [
            "Évaluation clinique approfondie",
            "Coordination des bilans (psychologique, orthophonique, psychomoteur, neuropsychologique)",
            "Élaboration d'un projet de soins personnalisé",
            "Orientation vers des structures adaptées (IME, CAMSP, SESSAD)",
            "Suivi médical régulier et ajustement des besoins",
          ]
        },
        { title: 'Médication (si nécessaire)', content: "Peut réduire l'anxiété, améliorer le sommeil, diminuer les comportements auto/hétéro-agressifs et améliorer la concentration. Toujours envisagée avec prudence, en complément d'un suivi global." },
        { title: 'Où consulter ?', content: "CMP, hôpital de jour, service de pédopsychiatrie, cabinet privé, structures médico-sociales. Au Sénégal : Hôpital pour enfant Diamniadio et Hôpital Albert Royer." },
      ],
    },
    {
      key: 'Orthophoniste',
      color: '#87ceeb',
      text: '#0f3d5a',
      image: '/uploads/orthophoniste.png',
      imgPosition: 'center 0%',
      sections: [
        { title: 'Son rôle', content: "Aide l'enfant non seulement à parler, mais à entrer en relation avec les autres, à se faire comprendre et à comprendre son environnement." },
        {
          title: 'Ce qu\'il propose', content: [
            "Bilan orthophonique complet",
            "Travail sur le langage oral (vocabulaire, syntaxe, prononciation)",
            "Développement de la communication non verbale (gestes, regard, tours de parole)",
            "Outils de communication alternative : PECS, pictogrammes, Makaton, tablette",
            "Histoires sociales et scénarios pour comprendre les situations sociales",
          ]
        },
        { title: 'Où consulter ?', content: "Cabinet libéral, CMP, IME, téléorthophonie. Sur prescription médicale." },
      ],
    },
    {
      key: 'Psychomotricien',
      color: '#27ae60', text: 'white',
      image: '/uploads/psychomot.png',
      imgPosition: 'center 0%',
      sections: [
        { title: 'Son rôle', content: "Aide l'enfant à se développer harmonieusement en tenant compte de ses spécificités sensorielles, motrices et affectives." },
        {
          title: 'Ce qu\'il propose', content: [
            "Jeux moteurs pour l'équilibre, la coordination et la précision des gestes",
            "Activités sensorielles pour mieux gérer les sensations (bruit, lumière, toucher)",
            "Techniques de relaxation pour réduire l'agitation et l'anxiété",
            "Médiations corporelles (danse, mouvement, expression corporelle)",
          ]
        },
        { title: 'Où consulter ?', content: "Cabinet libéral, CMP, IME, école spécialisée, hôpital. Sur prescription médicale." },
      ],
    },
    {
      key: 'Ergothérapeute', color: '#EFD010', text: '#090943',
      sections: [
        { title: 'Son rôle', content: "Favorise l'autonomie, le confort et la confiance de l'enfant dans ses activités quotidiennes." },
        {
          title: 'Ce qu\'il propose', content: [
            "Évaluation fonctionnelle de l'enfant et de son environnement",
            "Rééducation motrice et sensorielle",
            "Adaptations concrètes pour les gestes du quotidien (ustensiles adaptés, routines visuelles)",
            "Profil sensoriel personnalisé",
            "Conseils aux parents et à l'école",
          ]
        },
        { title: 'Où consulter ?', content: "Cabinet libéral, IME, CAMSP, SESSAD. Parfois à domicile ou en milieu scolaire." },
      ],
    },
    {
      key: 'Diététicien', color: '#9b59b6', text: 'white',
      sections: [
        { title: 'Son rôle', content: "Aide à reconstruire une relation sereine et équilibrée à l'alimentation, en respectant les spécificités sensorielles et comportementales de l'enfant." },
        {
          title: 'Problèmes fréquents', content: [
            "Sélectivités alimentaires (refus de certaines textures, couleurs, odeurs)",
            "Troubles sensoriels influençant l'acceptation des aliments",
            "Difficultés à reconnaître les signaux de faim ou de satiété",
            "Risque de carences nutritionnelles",
            "Troubles digestifs, constipation, allergies alimentaires",
          ]
        },
        {
          title: 'Ce qu\'il propose', content: [
            "Évaluation personnalisée des habitudes alimentaires",
            "Menus équilibrés et progressifs adaptés à l'enfant",
            "Stratégies de désensibilisation alimentaire douces et respectueuses",
            "Outils ludiques pour explorer les aliments autrement",
            "Soutien aux parents pour dédramatiser les repas",
          ]
        },
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
          <TabSection tabs={tabs} content={content} accentColor="#F90021" imageHeight={360} />
        </div>
      </section>
    </div>
  );
}
