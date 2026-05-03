import TabSection from '@/components/TabSection';

const tabs = [
  {
    id: 'developpement',
    label: 'Trouble du développement',
    image: '/uploads/trouble-developpement.jpg',
    imgPosition: 'center 30%',
  },
  {
    id: 'autisme',
    label: "L'autisme de A à Z",
    image: '/uploads/Autisme de A à Z.jpg',
    imgPosition: 'center',
  },
  {
    id: 'attention',
    label: "Trouble de l'attention",
    image: "/uploads/trouble de l'attention.jpg",
    imgPosition: 'center 30%',
  },
];

const content = {
  developpement: [
    {
      key: "Vue d'ensemble",
      color: '#87ceeb',
      text: '#0f3d5a',
      sections: [
        {
          title: 'Définition',
          content:
            "Les troubles du neurodéveloppement (TND) sont des affections qui apparaissent précocement dans la vie, souvent avant l'entrée à l'école primaire. Ils résultent d'anomalies du développement cérébral et affectent des fonctions telles que la cognition, le langage, la motricité ou le comportement social.",
        },
        {
          title: 'Les principales catégories (DSM-5)',
          content: [
            "TSA : altère la communication, les interactions sociales, avec des comportements restreints et répétitifs",
            "TDA/H : inattention persistante, hyperactivité, impulsivité",
            "Trouble du développement intellectuel (TDI) : limitations significatives du fonctionnement intellectuel",
            "Troubles de la communication : troubles du langage, de la phonation, bégaiement, communication sociale",
            "Troubles spécifiques des apprentissages : dyslexie, dysorthographie, dyscalculie, dyspraxie",
            "Troubles moteurs : dyspraxie, mouvements stéréotypés, tics",
          ],
        },
        {
          title: "Signes d'alerte généraux",
          content: [
            "Retards dans le développement moteur ou du langage",
            "Difficultés à établir des interactions sociales (absence de contact visuel, ne répond pas aux appels)",
            "Comportements répétitifs ou inhabituels (balancements, alignement d'objets)",
            "Problèmes d'attention ou d'hyperactivité",
            "Difficultés d'apprentissage malgré une intelligence normale",
          ],
        },
      ],
    },
    {
      key: 'TDA/H',
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: 'Définition',
          content:
            "Le TDA/H est un trouble neurodéveloppemental débutant dans l'enfance, pouvant persister à l'âge adulte. Trois formes : prédominance inattentive (concentration, rêvasserie, oublis), forme hyperactive-impulsive (agitation, impulsivité), forme combinée.",
        },
        {
          title: 'Symptômes — Inattention',
          content: [
            "Distrait, oublie fréquemment son matériel scolaire",
            "Difficultés à suivre des consignes, manque d'organisation",
            "Tâches laissées incomplètes",
            "Difficultés à écouter au-delà de 10 minutes",
          ],
        },
        {
          title: 'Symptômes — Hyperactivité et impulsivité',
          content: [
            "Agitation excessive (mains, pieds, déplacements constants)",
            "Incapacité à rester assis longtemps, parle beaucoup, interrompt souvent",
            "Difficultés à attendre son tour, comportements à risque sans réflexion",
            "Très sensible, difficultés à gérer ses émotions et sa colère",
          ],
        },
        {
          title: 'Causes',
          content: [
            "Génétique : forte composante héréditaire",
            "Neurologique : dysfonctionnements dans le cortex préfrontal",
            "Environnementale : exposition à l'alcool ou au tabac pendant la grossesse, stress précoce",
          ],
        },
        {
          title: 'Prise en charge',
          content: [
            "TCC (thérapies cognitivo-comportementales) et gestion des émotions",
            "Aménagements scolaires (tiers temps, consignes simplifiées, photocopie des cours)",
            "Entraînement aux habiletés sociales, coaching parental",
            "Médicaments si nécessaire : méthylphénidate, atomoxétine (sur prescription médicale)",
          ],
        },
      ],
    },
    {
      key: 'Dyslexie',
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: 'Définition',
          content:
            "Trouble spécifique du langage écrit affectant principalement la lecture (et parfois l'écriture), chez un enfant d'intelligence normale, sans trouble sensoriel ni manque d'enseignement. Détecté en début de scolarité.",
        },
        {
          title: 'Symptômes',
          content: [
            "Lecture lente, hachée ; inversions de lettres ou de syllabes (« sol » → « los »)",
            "Confusion entre lettres (« b » et « d ») ; fatigue rapide à la lecture",
            "Orthographe instable, oublis, ajouts, inversions en écriture",
            "Difficultés à répéter des mots complexes, confusion dans l'ordre des sons",
          ],
        },
        {
          title: 'Diagnostic',
          content:
            "Posé par un orthophoniste (parfois avec un neuropsychologue), à partir de 7 ans, après au moins 18 mois d'apprentissage de la lecture.",
        },
        {
          title: 'Prise en charge',
          content: [
            "Orthophonie : rééducation ciblée sur les sons, la lecture, l'écriture",
            "Aménagements scolaires : ordinateur, lecture à voix haute des consignes, adaptation des devoirs",
            "À la maison : lire avec l'enfant, valoriser ses progrès, livres audio, dictée vocale",
          ],
        },
      ],
    },
    {
      key: 'Dyspraxie',
      color: '#EFD010',
      text: '#090943',
      sections: [
        {
          title: 'Définition',
          content:
            "La dyspraxie (ou trouble développemental de la coordination — TDC) est un trouble neurologique affectant la planification et l'automatisation des gestes. Sans lien avec l'intelligence.",
        },
        {
          title: 'Symptômes',
          content: [
            "Motricité fine : écriture illisible, tenue maladroite du crayon, utilisation lente des ciseaux/règles",
            "Motricité globale : maladresse fréquente (chutes, cognements), difficultés à faire du vélo",
            "Difficultés à s'habiller (boutons, lacets), à faire son cartable, à se servir de ses couverts",
          ],
        },
        {
          title: 'Prise en charge',
          content: [
            "Psychomotricité (coordination), ergothérapie (gestes du quotidien), orthophonie si troubles associés",
            "Aménagements scolaires : ordinateur, temps supplémentaire, allègement des tâches écrites",
            "Encourager les réussites non motrices, éviter les critiques sur la lenteur",
          ],
        },
        {
          title: 'Dyscalculie',
          content:
            "Trouble spécifique des apprentissages affectant la capacité à comprendre et manipuler les nombres (équivalent de la dyslexie pour les maths). Prise en charge : bilan neuropsychologique, rééducation orthophonique, calculatrice, outils visuels et concrets (cubes, abaques).",
        },
        {
          title: 'Dysorthographie',
          content:
            "Trouble spécifique de l'acquisition de l'orthographe, souvent lié à la dyslexie (présent chez 80 % des enfants dysorthographiques). Prise en charge : orthophonie, correcteurs orthographiques, dictée vocale, allègement de l'écriture.",
        },
      ],
    },
    {
      key: 'Autres troubles',
      color: '#ff7043',
      text: 'white',
      sections: [
        {
          title: "Syndrome d'Asperger",
          content: [
            "Fait partie du TSA, sans retard de langage ni déficience intellectuelle notable",
            "Difficultés dans les interactions sociales (règles implicites, langage non verbal)",
            "Intérêts restreints et comportements répétitifs ; intelligence dans la moyenne ou supérieure",
            "Prise en charge : orthophonie, TCC, ateliers sociaux, soutien scolaire",
          ],
        },
        {
          title: 'Syndrome de Rett',
          content: [
            "Trouble grave d'origine génétique (mutation MECP2), affectant quasi exclusivement les filles",
            "Développement normal puis régression rapide entre 6 et 18 mois",
            "Perte du langage et des compétences motrices, épilepsie dans plus de 70 % des cas",
            "Rééducation motrice, orthophonie, communication alternative augmentative",
          ],
        },
        {
          title: 'Syndrome de Gilles de la Tourette',
          content: [
            "Tics moteurs et vocaux involontaires, répétés (clignements, grimaces, raclements de gorge)",
            "Souvent associé à un TDAH, des TOC ou de l'anxiété",
            "Évolue par phases, s'atténue à l'adolescence chez ~50 % des cas",
            "Prise en charge : TCC, CBIT, adaptations scolaires",
          ],
        },
        {
          title: "Syndrome de l'X fragile",
          content: [
            "Forme héréditaire la plus fréquente de déficience intellectuelle (mutation du gène FMR1)",
            "Déficience intellectuelle, retard de langage, traits autistiques, hyperactivité",
            "Touche davantage les garçons",
            "Accompagnement pluridisciplinaire : psychomotricité, orthophonie, éducation spécialisée",
          ],
        },
      ],
    },
  ],
  autisme: [
    {
      key: "L'autisme",
      color: '#87ceeb',
      text: '#0f3d5a',
      sections: [
        {
          title: "Qu'est-ce que c'est ?",
          content:
            "L'autisme est un trouble du neurodéveloppement, également appelé trouble du spectre de l'autisme (TSA). Le terme « spectre » reflète la grande variabilité des caractéristiques, des manifestations et de leur intensité d'une personne à l'autre. Ce n'est pas une maladie, mais un handicap.",
        },
        {
          title: 'Comment se manifeste-t-il ?',
          content:
            "Il se manifeste principalement par une altération des interactions sociales, des difficultés de communication, des intérêts restreints et des comportements atypiques et répétitifs. Ces manifestations ont des conséquences à différents degrés sur les sphères développementales de l'enfant, notamment le langage.",
        },
        {
          title: 'À quel âge se manifeste-t-il ?',
          content:
            "Dès la petite enfance, avant l'âge de 36 mois. Parfois, un enfant commence à parler puis perd le langage vers l'âge de deux ans.",
        },
      ],
    },
    {
      key: 'Les causes',
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: 'Causes biologiques et génétiques',
          content: [
            "Forte composante génétique (hérédité estimée entre 50 et 90 %)",
            "Plusieurs gènes liés au développement cérébral impliqués ; certains cas résultent de mutations spontanées (de novo)",
            "Différences dans la connectivité cérébrale (cortex préfrontal, amygdale, cervelet)",
            "Déséquilibres de neurotransmetteurs (sérotonine, dopamine, GABA)",
          ],
        },
        {
          title: 'Facteurs de risque environnementaux',
          content: [
            "Âge avancé des parents, exposition à des toxines (pesticides, métaux lourds)",
            "Prise de certains médicaments pendant la grossesse (acide valproïque, thalidomide)",
            "Diabète gestationnel, infections maternelles, stress important",
            "Naissance prématurée, complications à l'accouchement (hypoxie)",
          ],
        },
        {
          title: 'Conclusion',
          content:
            "L'autisme résulte d'une combinaison de prédispositions génétiques et de facteurs environnementaux influençant le développement cérébral. Il n'y a pas de cause unique.",
        },
      ],
    },
    {
      key: "Signes d'alerte",
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: "Le premier signe : l'inquiétude des parents",
          content:
            "Le premier signe d'alerte est l'inquiétude des parents. Leur vigilance et leur intuition sont précieuses pour initier une démarche diagnostique, souvent longue mais cruciale.",
        },
        {
          title: 'Avant 18 mois',
          content: [
            "Absence de babillage, ne pointe pas les objets désirés, pas d'attention conjointe",
            "Ne regarde pas dans les yeux, ne sourit pas à la personne",
            "Ne répond pas à son prénom, semble dans son monde",
            "N'imite pas (tirer la langue), ne fait pas de gestes sociaux (coucou, au revoir)",
            "Exploration inhabituelle des objets, sensibilité sensorielle particulière",
          ],
        },
        {
          title: 'Après 18 mois',
          content: [
            "Retard ou absence de langage",
            "Difficultés à entrer en contact avec les autres enfants",
            "S'intéresse uniquement à une ou deux choses (intérêts restreints)",
            "Répète les mêmes actions de façon persistante",
          ],
        },
      ],
    },
    {
      key: 'Que faire ?',
      color: '#EFD010',
      text: '#090943',
      sections: [
        {
          title: 'Démarche diagnostique',
          content:
            "Une équipe pluridisciplinaire peut poser le diagnostic : pédopsychiatre, psychologue, orthophoniste, psychomotricien. La démarche peut être longue, mais elle est cruciale pour l'évolution de l'enfant. Si l'enfant présente de nombreux traits autistiques, il est possible de commencer la prise en charge sans attendre le diagnostic final.",
        },
        {
          title: 'Existe-t-il un traitement ?',
          content:
            "Non. Cependant, une prise en charge débutant dès le plus jeune âge permet de réduire considérablement l'intensité des troubles. Certains diagnostics associés (anxiété, troubles du comportement alimentaire) peuvent faire l'objet d'une médication.",
        },
        {
          title: 'Prise en charge précoce (avant 6 ans)',
          content: [
            "Le cerveau des jeunes enfants est extrêmement malléable — idéalement entre 18 mois et 4 ans",
            "Meilleure acquisition du langage et de la communication",
            "Amélioration des compétences sociales et de l'autonomie",
            "Meilleurs résultats à long terme : langage, cognition, intégration scolaire",
          ],
        },
        {
          title: 'Méthodes validées scientifiquement',
          content: [
            "Denver (ESDM) : intervention développementale et comportementale pour les 18 mois–4 ans",
            "ABA : méthode structurée pour enseigner des compétences et réduire les comportements inadaptés",
            "TEACCH : structuration de l'environnement pour favoriser l'autonomie",
            "PECS : communication par échange d'images, première étape vers la parole",
            "Makaton / Langue des signes : supports visuels et gestuels pour l'émergence du langage",
          ],
        },
      ],
    },
    {
      key: 'Conséquences',
      color: '#ff7043',
      text: 'white',
      sections: [
        {
          title: "À l'école",
          content: [
            "Communication sociale : difficultés à comprendre les signaux sociaux (langage corporel, expressions, ton de voix)",
            "Intégration sociale : difficultés à nouer des amitiés, risque d'isolement",
            "Apprentissage : problèmes de concentration, inflexibilité cognitive, résistance aux changements de routine",
            "Sensibilité sensorielle : hypersensibilité aux bruits, lumières ou textures — anxiété et agitation",
          ],
        },
        {
          title: 'Au travail',
          content: [
            "Difficultés à interpréter les subtilités sociales et à s'intégrer dans une équipe",
            "Difficultés d'adaptation aux changements de tâches, d'horaires ou de routine",
            "Compétences spécialisées possibles (technologies, mathématiques) mais nécessitant un cadre structuré",
          ],
        },
        {
          title: 'Adaptations possibles',
          content: [
            "Supports visuels et structuration pour l'organisation du travail ou des tâches scolaires",
            "Accompagnement spécialisé pour les compétences sociales et la communication",
            "Environnement adapté aux besoins sensoriels (espace calme, aménagement de l'éclairage)",
            "Formation et sensibilisation des enseignants et employeurs",
          ],
        },
      ],
    },
    {
      key: 'Fréquences & niveaux',
      color: '#9c27b0',
      text: 'white',
      sections: [
        {
          title: 'Fréquence dans le monde',
          content:
            "Environ 1 personne sur 100 selon l'OMS. Aux États-Unis, le CDC estimait environ 1 sur 36 en 2023. L'augmentation des diagnostics s'explique par une meilleure reconnaissance du trouble et un élargissement des critères.",
        },
        {
          title: 'En France',
          content:
            "Environ 700 000 personnes avec un TSA, dont 100 000 ont moins de 20 ans. Chaque année, environ 8 000 enfants autistes naissent en France (1 sur 100). (Source : Autisme Info Service / INSERM)",
        },
        {
          title: 'Au Sénégal',
          content:
            "Prévalence estimée entre 0,8 % et 1,8 % chez les enfants. Le pays fait face à des obstacles importants : nombre limité de spécialistes, diagnostics tardifs, coûts élevés et préjugés sociaux persistants.",
        },
        {
          title: 'Les niveaux de gravité (DSM-5)',
          content: [
            "Niveau 1 : besoin de soutien léger",
            "Niveau 2 : besoin de soutien modéré",
            "Niveau 3 : besoin de soutien sévère",
            "Cette classification nuancée tient compte de la grande diversité des profils",
          ],
        },
        {
          title: 'Conclusion',
          content:
            "L'autisme est une condition neurodéveloppementale qui impacte la communication, les interactions sociales et les comportements. Ce n'est ni une maladie ni un handicap unique, mais un spectre large et complexe qui se manifeste différemment chez chaque personne.",
        },
      ],
    },
  ],
  attention: [
    {
      key: 'Le TDAH',
      color: '#87ceeb',
      text: '#0f3d5a',
      sections: [
        {
          title: 'Définition',
          content:
            "Le TDA/H est un trouble neurodéveloppemental débutant dans l'enfance, pouvant persister à l'âge adulte. Trois formes : prédominance inattentive (difficultés de concentration, rêvasserie, oublis), forme hyperactive-impulsive (agitation, impulsivité, besoin constant de bouger), forme combinée.",
        },
        {
          title: 'Ce que le TDAH n\'est pas',
          content: [
            "Ce n'est ni un caprice ni un problème d'éducation",
            "C'est un trouble neurodéveloppemental reconnu et traitable",
            "Avec une intervention précoce, l'enfant peut développer ses compétences et réussir",
          ],
        },
      ],
    },
    {
      key: 'Les symptômes',
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: 'Inattention',
          content: [
            "Distrait, oublie fréquemment son matériel scolaire",
            "Difficultés à suivre des consignes, manque d'organisation",
            "Tâches laissées incomplètes",
            "Difficultés à écouter un cours au-delà de 10 minutes",
          ],
        },
        {
          title: 'Hyperactivité',
          content: [
            "Agitation excessive (mains, pieds, déplacements constants)",
            "Incapacité à rester assis longtemps",
            "Parle beaucoup, interrompt souvent, tend à finir les phrases de l'interlocuteur",
          ],
        },
        {
          title: 'Impulsivité',
          content: [
            "Difficultés à attendre son tour",
            "Interrompt les autres dans leurs jeux ou leur discours",
            "Comportements à risque sans réflexion préalable",
          ],
        },
        {
          title: 'Gestion des émotions',
          content: [
            "Très sensible, très susceptible",
            "Difficultés à gérer ses émotions et sa colère",
          ],
        },
      ],
    },
    {
      key: 'Le diagnostic',
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: 'Comment est-il posé ?',
          content:
            "Clinique, basé sur l'observation dans au moins deux contextes différents (école, maison). Posé par un pédiatre, psychiatre ou psychologue à l'aide d'entretiens cliniques, d'échelles de cotation et de questionnaires (Conners, SNAP-IV).",
        },
        {
          title: 'Causes',
          content: [
            "Génétique : forte composante héréditaire",
            "Neurologique : dysfonctionnements dans le cortex préfrontal",
            "Environnementale : exposition à l'alcool ou au tabac pendant la grossesse, stress précoce, carence affective",
          ],
        },
        {
          title: 'Conséquences',
          content: [
            "Difficultés scolaires (résultats inconstants, perte de confiance)",
            "Problèmes relationnels (conflits, isolement)",
            "Faible estime de soi",
            "Troubles associés : anxiété, troubles du sommeil, troubles oppositionnels",
          ],
        },
      ],
    },
    {
      key: 'Traitements',
      color: '#EFD010',
      text: '#090943',
      sections: [
        {
          title: 'Approches non médicamenteuses',
          content: [
            "Thérapies cognitivo-comportementales (TCC) et gestion des émotions",
            "Aménagements scolaires (tiers temps, consignes simplifiées, photocopie des cours)",
            "Entraînement aux habiletés sociales",
            "Coaching parental / guidance éducative",
          ],
        },
        {
          title: 'Médicaments (si nécessaire)',
          content:
            "Méthylphénidate, atomoxétine — sur prescription médicale uniquement.",
        },
      ],
    },
    {
      key: "À l'école",
      color: '#ff7043',
      text: 'white',
      sections: [
        {
          title: 'Bonnes pratiques au quotidien',
          content: [
            "Mettre en place une routine structurée avec emploi du temps visuel",
            "Utiliser des supports visuels (planning, pictogrammes)",
            "Favoriser les renforcements positifs",
            "Donner des consignes claires, courtes, sans doubles consignes",
            "Proposer des pauses régulières et des exercices de Brain Gym",
          ],
        },
        {
          title: 'Aménagements scolaires',
          content: [
            "Informer et sensibiliser l'équipe enseignante",
            "Demander un PAP (Plan d'Accompagnement Personnalisé) ou PPS si nécessaire",
            "Prévoir un AESH (accompagnant) si besoin",
            "Place en avant de la classe, réduction des distracteurs visuels et sonores",
          ],
        },
      ],
    },
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
