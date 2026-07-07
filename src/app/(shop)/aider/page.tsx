import TabSection from '@/components/TabSection';
import { R2_IMAGES_BASE } from '@/lib/images';

const tabs = [
  {
    id: 'parents',
    label: 'Les parents',
    image: `${R2_IMAGES_BASE}/parents.png`,
    imgPosition: 'center 0%'
  },
  {
    id: 'professionnels',
    label: 'Les professionnels',
    image: `${R2_IMAGES_BASE}/pros.png`,
    imgPosition: 'center 0%'
  },
  {
    id: 'methodes',
    label: 'Les méthodes',
    image: `${R2_IMAGES_BASE}/methodes.png`,
    imgPosition: 'center 0%'
  },
  {
    id: 'outils',
    label: 'Les outils de communication',
    image: `${R2_IMAGES_BASE}/outils-com.png`,
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
        { title: 'Son rôle', content: "Aide l'enfant à mieux comprendre et réguler ses émotions, gérer  son comportement, développer des compétences sociales, renforcer son estime de soi et mieux appréhender ses apprentissages dans un cadre sécurisant. Il accompagne et aide aussi les parents dans la prise en charge quotidienne de leur enfant." },
        {
          title: 'Ce qu\'il propose', content: [
            "Bilan psychologique",
            "Suivi individuel : interaction sociale, communication, langage",
            "Gestion des crises : émotions, angoisse, comportement",
            "Jeux thérapeutiques adaptés (jeu symbolique, dessin, histoires sociales)",
            "Groupes d'habiletés sociales : apprendre les compétences sociales",
            "Guidance parentale : accompagner les parents à aider leurs enfants",

          ]
        },
        { title: 'Où consulter ?', content: "Cabinet libéral, CMP, IME, PMI, CAMS, écoles ou structures spécialisées, téléconsultation." },
      ],
    },
    {
      key: 'Pédopsychiatre',
      color: '#ff7043',
      text: 'white',
      image: `${R2_IMAGES_BASE}/pedopsy.png`,
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
      image: `${R2_IMAGES_BASE}/orthophoniste.png`,
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
      image: `${R2_IMAGES_BASE}/psychomot.png`,
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
      key: 'Généralités',
      color: '#87ceeb',
      text: '#0f3d5a',
      sections: [
        {
          title: 'Une approche personnalisée',
          content:
            "Chaque enfant est unique et possède ses propres besoins, capacités et centres d'intérêt. C'est pourquoi il n'existe pas une méthode unique adaptée à tous. L'accompagnement le plus efficace repose sur une approche individualisée, qui peut associer différentes méthodes, outils et stratégies afin de répondre au mieux au profil de chaque enfant.",
        },
        {
          title: 'Une collaboration nécessaire',
          content:
            "La réussite de cet accompagnement repose également sur une collaboration étroite entre les professionnels et la famille. Les parents occupent une place centrale dans ce parcours : leur implication au quotidien, leur connaissance de leur enfant et leur participation aux apprentissages contribuent fortement aux progrès réalisés et au bien-être de l'enfant.",
        },
        {
          title: 'À retenir',
          content:
            "Une intervention précoce, adaptée, régulière et bienveillante permet de soutenir efficacement le développement de l'enfant, de renforcer ses compétences et de favoriser son inclusion et son autonomie au quotidien.",
        },
      ],
    },
    {
      key: 'ABA',
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: 'Idée générale',
          content:
            "L'ABA est une méthode éducative basée sur l'observation des comportements et l'utilisation du renforcement positif pour favoriser les apprentissages et développer les compétences de l'enfant.",
        },
        {
          title: 'Principe de la méthode',
          content: [
            "Analyse des comportements afin de comprendre leurs causes",
            "Renforcement positif pour encourager les comportements adaptés",
            "Programme structuré avec des objectifs précis et mesurables",
            "Accompagnement personnalisé selon les besoins et le rythme de chaque enfant",
          ],
        },
        {
          title: 'Objectifs',
          content: [
            "Développer la communication et le langage",
            "Favoriser les compétences sociales",
            "Renforcer l'autonomie dans la vie quotidienne",
            "Réduire les comportements qui limitent les apprentissages",
          ],
        },
        {
          title: 'Qui enseigne ?',
          content: [
            "Psychologues spécialisés en autisme",
            "Thérapeutes comportementalistes",
            "Éducateurs spécialisés",
            "Consultants ABA",
            "Techniciens spécialisés (RBT, BHVA) sous supervision d'un analyste du comportement certifié (BCBA)",
          ],
        },
      ],
    },
    {
      key: 'TEACCH',
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: 'Idée générale',
          content:
            "La méthode TEACCH aide les personnes autistes à mieux comprendre leur environnement grâce à une organisation claire du temps, de l'espace et des activités.",
        },
        {
          title: 'Principe de la méthode',
          content: [
            "Structuration visuelle de l'environnement",
            "Utilisation de pictogrammes, plannings et supports visuels",
            "Organisation prévisible des tâches et des routines",
            "Adaptation aux besoins individuels de chaque personne",
          ],
        },
        {
          title: 'Objectifs',
          content: [
            "Développer l'autonomie",
            "Réduire l'anxiété liée aux changements et à l'imprévu",
            "Améliorer les compétences de communication et d'organisation",
            "Favoriser l'inclusion dans la vie quotidienne, scolaire et sociale",
          ],
        },
        {
          title: 'Qui enseigne ?',
          content: [
            "Psychologues",
            "Éducateurs spécialisés",
            "Ergothérapeutes formés à la méthode TEACCH",
            "Les parents, qui jouent un rôle essentiel dans la mise en œuvre des stratégies au quotidien",
          ],
        },
      ],
    },
    {
      key: 'Méthode Denver',
      color: '#EFD010',
      text: '#090943',
      sections: [
        {
          title: 'Idée générale',
          content:
            "La méthode Denver est une intervention précoce basée sur le jeu, les interactions positives et les situations naturelles d'apprentissage.",
        },
        {
          title: 'Principe de la méthode',
          content: [
            "Apprentissage par le jeu et les activités motivantes",
            "Développement des compétences sociales, cognitives et langagières",
            "Participation active des parents",
            "Utilisation du renforcement positif dans un cadre bienveillant",
          ],
        },
        {
          title: 'Objectifs',
          content: [
            "Développer la communication verbale et non verbale",
            "Favoriser les interactions sociales",
            "Renforcer les capacités cognitives",
            "Encourager l'autonomie",
            "Profiter de la plasticité cérébrale grâce à une intervention précoce",
          ],
        },
        {
          title: 'Qui enseigne ?',
          content: [
            "Éducateurs spécialisés",
            "Psychologues",
            "Orthophonistes",
            "Psychomotriciens",
            "Médecins spécialisés",
            "Parents formés à la méthode pour poursuivre les apprentissages à la maison",
          ],
        },
      ],
    },
    {
      key: 'Accompagnement individualisé',
      color: '#9b59b6',
      text: 'white',
      sections: [
        {
          title: 'Idée générale',
          content:
            "Chaque enfant étant unique, l'accompagnement doit être entièrement adapté à ses besoins, ses capacités et ses objectifs de développement.",
        },
        {
          title: 'Principe de la méthode',
          content: [
            "Évaluation personnalisée des besoins",
            "Mise en place d'objectifs adaptés",
            "Collaboration entre la famille et les professionnels",
            "Accompagnement dans les différents lieux de vie (maison, école, loisirs)",
          ],
        },
        {
          title: 'Objectifs',
          content: [
            "Développer la communication",
            "Améliorer les interactions sociales",
            "Favoriser l'autonomie au quotidien",
            "Soutenir les apprentissages scolaires",
            "Développer les habiletés sociales et la gestion des émotions",
            "Accompagner et soutenir les familles",
          ],
        },
        {
          title: 'Qui enseigne ?',
          content: [
            "Psychologues spécialisés en autisme",
            "Orthophonistes",
            "Psychomotriciens",
            "Éducateurs spécialisés",
            "AESH / accompagnants scolaires",
            "Parents et proches accompagnés par les professionnels",
          ],
        },
      ],
    },
    {
      key: 'Méthode Élan Quotidien',
      color: '#ff7043',
      text: 'white',
      sections: [
        {
          title: 'Idée générale',
          content:
            "La méthode Élan Quotidien est une approche d'accompagnement basée sur de courtes séances de 15 à 20 minutes par jour, conçue pour favoriser les apprentissages de l'enfant dans un cadre ludique, structuré et facilement intégrable au quotidien. Développée et expérimentée à l'École L'Éveil de Dakar, elle est également accessible via des espaces de formation en ligne pour les familles et les professionnels.",
        },
        {
          title: 'Principe de la méthode',
          content: [
            "Activités courtes, régulières et adaptées au rythme de l'enfant",
            "Apprentissage par le jeu, l'expérimentation et les interactions du quotidien",
            "Progression pas à pas pour favoriser les réussites et maintenir la motivation",
            "Participation active des parents et des accompagnants",
            "Supports simples et facilement réutilisables à la maison ou en milieu éducatif",
            "Développement simultané de plusieurs compétences à travers des activités variées",
          ],
        },
        {
          title: 'Objectifs',
          content: [
            "Développer le langage non verbal et verbal",
            "Améliorer la compréhension et les capacités d'écoute",
            "Favoriser l'expression orale, la communication et enrichir le vocabulaire",
            "Renforcer l'attention et la concentration",
            "Développer le graphisme et les prérequis à l'écriture",
            "Stimuler la psychomotricité fine et la coordination",
            "Encourager le développement moteur grâce à des activités sportives adaptées",
            "Développer les compétences cognitives par le jeu et la résolution de petites situations du quotidien",
            "Favoriser l'autonomie et la confiance en soi",
          ],
        },
        {
          title: 'Qui enseigne ?',
          content: [
            "Les parents et les proches, accompagnés grâce aux formations et aux outils pédagogiques",
            "Les éducateurs et enseignants",
            "Les professionnels de l'accompagnement de l'enfant (éducateurs spécialisés, orthophonistes, psychomotriciens, AESH, etc.)",
            "Toute personne souhaitant soutenir le développement de l'enfant à travers des activités simples, accessibles et structurées",
          ],
        },
        {
          title: 'Une méthode accessible au quotidien',
          content:
            "La méthode Élan Quotidien repose sur une idée simple : quelques minutes d'activités ciblées chaque jour peuvent contribuer à développer durablement les compétences de l'enfant. Grâce à son format court, ludique et flexible, elle s'intègre facilement dans la vie familiale, scolaire ou thérapeutique et permet de transformer les moments du quotidien en véritables opportunités d'apprentissage.",
        },
      ],
    },
  ],
  outils: [
    {
      key: 'Généralités',
      color: '#87ceeb',
      text: '#0f3d5a',
      sections: [
        {
          title: 'Des outils adaptés à chaque enfant',
          content:
            "Chaque enfant communique à sa manière. Il n'existe donc pas d'outil universel : le choix dépend de ses besoins, de ses capacités, de son mode de communication et de ses objectifs. Les outils de communication permettent aux enfants ayant des difficultés à s'exprimer verbalement de mieux se faire comprendre et d'interagir avec leur entourage. Ils soutiennent le développement du langage, favorisent l'autonomie et réduisent les frustrations.",
        },
        {
          title: 'Le rôle des parents et des professionnels',
          content:
            "Les outils de communication sont d'autant plus efficaces lorsqu'ils sont utilisés de manière cohérente dans tous les environnements de vie de l'enfant. En utilisant les mêmes supports, les mêmes signes ou les mêmes pictogrammes, parents, enseignants et professionnels permettent à l'enfant de développer progressivement ses compétences de communication, de gagner en confiance et de généraliser ses apprentissages dans différentes situations.",
        },
        {
          title: 'À retenir',
          content:
            "Avec des outils adaptés, un accompagnement bienveillant et l'implication des parents et des professionnels, chaque enfant peut progresser dans sa communication, ses relations sociales et son autonomie.",
        },
      ],
    },
    {
      key: 'PECS',
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: 'Principes clés',
          content: [
            "Communication par échange d'images",
            "Progression structurée en plusieurs étapes",
            "Utilisation des centres d'intérêt de l'enfant pour favoriser la motivation",
            "Développement d'une communication spontanée et fonctionnelle",
          ],
        },
        {
          title: 'Objectifs',
          content: [
            "Permettre à l'enfant d'exprimer ses besoins et ses envies",
            "Développer l'initiative de communication",
            "Favoriser l'apparition du langage oral lorsque cela est possible",
            "Réduire les comportements liés à la frustration ou à l'incompréhension",
            "Développer l'autonomie dans les interactions quotidiennes",
          ],
        },
        {
          title: 'Mise en œuvre — les 6 phases',
          content: [
            "1 — Échanger une image pour obtenir un objet désiré",
            "2 — Chercher spontanément son interlocuteur",
            "3 — Choisir entre plusieurs images",
            "4 — Construire des phrases simples à l'aide d'un bandeau phrase",
            "5 — Répondre à des questions simples",
            "6 — Développer une communication plus complexe (commentaires, questions, opinions)",
          ],
        },
        {
          title: 'Avantages',
          content: [
            "Accessible aux personnes non verbales",
            "Facilement adaptable à différents environnements",
            "Favorise la communication fonctionnelle dès les premiers apprentissages",
            "Réduit les frustrations et améliore la qualité de vie",
            "Peut servir de tremplin vers le langage oral",
          ],
        },
      ],
    },
    {
      key: 'Makaton',
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: 'Principes clés',
          content: [
            "Association du langage parlé, des signes et des symboles visuels",
            "Introduction progressive du vocabulaire utile au quotidien",
            "Adaptation aux besoins et aux capacités de chaque personne",
            "Renforcement simultané de la compréhension et de l'expression",
          ],
        },
        {
          title: 'Objectifs',
          content: [
            "Faciliter la communication au quotidien",
            "Soutenir le développement du langage oral",
            "Développer les interactions sociales",
            "Favoriser l'inclusion familiale, scolaire et sociale",
            "Réduire les difficultés liées à l'incompréhension",
          ],
        },
        {
          title: 'Mise en œuvre',
          content: [
            "À la maison avec les parents",
            "À l'école par les enseignants",
            "En séance avec les orthophonistes, éducateurs ou thérapeutes",
          ],
        },
        {
          title: 'Avantages',
          content: [
            "Facile à apprendre et à utiliser",
            "Favorise l'émergence du langage oral",
            "Réduit l'anxiété et la frustration liées aux difficultés de communication",
            "Convient à différents âges et profils",
            "Peut être utilisé dans tous les environnements de vie",
          ],
        },
      ],
    },
    {
      key: 'Langue des signes (LSF)',
      color: '#EFD010',
      text: '#090943',
      sections: [
        {
          title: 'Principes clés',
          content: [
            "Langue visuo-gestuelle complète",
            "Grammaire et vocabulaire spécifiques",
            "Utilisation des expressions du visage et du corps",
            "Communication riche et nuancée",
          ],
        },
        {
          title: 'Objectifs',
          content: [
            "Offrir un véritable moyen de communication aux personnes sourdes ou ayant des besoins spécifiques de communication",
            "Développer l'autonomie et l'accès aux échanges sociaux",
            "Favoriser l'inclusion et la participation à la vie quotidienne",
            "Permettre une expression plus précise des émotions, idées et besoins",
          ],
        },
        {
          title: 'Mise en œuvre',
          content: [
            "En cours spécialisés",
            "Dans les établissements scolaires",
            "En famille",
            "Grâce à des formations, applications et supports pédagogiques",
          ],
        },
        {
          title: 'Avantages',
          content: [
            "Langue complète permettant des échanges riches",
            "Favorise l'autonomie et l'inclusion",
            "Développe les compétences de communication et les interactions sociales",
            "Peut être utilisée par les personnes sourdes, malentendantes ou présentant certains troubles de la communication",
            "Valorise la communication visuelle et l'expression émotionnelle",
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
            Des ressources concrètes pour tous ceux qui accompagnent un enfant neurodivergent.
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
