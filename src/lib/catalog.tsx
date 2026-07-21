import React from 'react';
import { R2_IMAGES_BASE } from '@/lib/images';

// ─────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────

export interface Inclus {
  icon: string;
  text: string;
}

export interface ContentCategory {
  label: string;
  items: string[];
}

export interface PedagogieItem {
  icon: string;
  title: string;
  desc: string;
}

// ─────────────────────────────────────────────────
// Formations
// ─────────────────────────────────────────────────

export interface FormationAddon {
  slug: string;
  priceEur: number;
  priceXof?: number;
  features: string[];
  footnote?: string;
}

export interface Formation {
  slug: string;
  title: string;
  modules: string;
  hours: string;
  level: string;
  desc: string;
  priceEur: number;
  priceXof?: number;
  color: string;
  popular: boolean;
  disabled: boolean;
  img: string;
  imgPosition: string;
  imgHeight: number;
  moodleCourseId?: number;
  /** "Avec accompagnement personnalisé" upsell — undefined when no such offer exists for this formation. */
  accompagnement?: FormationAddon;
}

export const FORMATIONS: Formation[] = [
  {
    slug: 'accompagner-mon-enfant-autiste',
    title: 'Formation 1: Accompagner l\'émergence des premiers mots',
    modules: '4 modules',
    hours: '12h',
    level: 'Débutant',
    desc: "La formation phare pour faire émerger les premiers mots. Construisez les bases de son langage en 15 minutes par jour.",
    priceEur: 119,
    priceXof: 77000,
    color: '#0792dc',
    popular: true,
    disabled: false,
    img: `${R2_IMAGES_BASE}/visuel-formation.png`,
    imgPosition: 'center top',
    imgHeight: 280,
    moodleCourseId: 3,
    accompagnement: {
      slug: 'accompagner-mon-enfant-autiste-accompagne',
      priceEur: 269,
      priceXof: 174500,
      features: [
        'Tout ce qui est inclus dans la formule de base',
        '3 séances individuelles avec Laurence BUGNET, psychologue spécialiste TSA (valeur 210 €)*',
        '1 masterclass de groupe en direct',
        'Accès prioritaire par e-mail ou WhatsApp',
        'Attestation de formation',
      ],
      footnote: '* Pour garantir un accompagnement personnalisé, les séances sont proposées tous les 15 jours. Les 8 premiers inscrits pourront commencer immédiatement. Si ce créneau est complet, votre accompagnement débutera le mois suivant. Les rendez-vous sont planifiés par e-mail après votre inscription. Votre accès à la formation reste, lui, immédiat.',
    },
  },
  {
    slug: 'developper-la-communication-verbale',
    title: 'Formation 2: Développer la communication verbale',
    modules: '4 modules',
    hours: '14h',
    level: 'Débutant',
    desc: "Découvrez comment l'aider à trouver ses mots pour que chacun comprenne",
    priceEur: 67,
    priceXof: 43500,
    color: '#27ae60',
    popular: false,
    disabled: true,
    img: `${R2_IMAGES_BASE}/formation2.png`,
    imgPosition: 'center top',
    imgHeight: 280,
  },
  {
    slug: 'comprendre-le-developpement-du-langage',
    title: 'Formation 3: Comprendre le développement du langage',
    modules: '4 modules',
    hours: '5h',
    level: 'Débutant',
    desc: 'Comprendre les clés essentielles du développement du langage.',
    priceEur: 49,
    priceXof: 32000,
    color: '#F90021',
    popular: false,
    disabled: true,
    img: `${R2_IMAGES_BASE}/formation3.png`,
    imgPosition: 'center top',
    imgHeight: 280,
  },
];

// ─────────────────────────────────────────────────
// Outils
// ─────────────────────────────────────────────────

export interface OutilProduct {
  slug: string;

  // Listing card
  listingTitle: string;
  listingSubtitle: string;
  imgPosition: string;

  // Shared between listing and detail
  priceEur: number;
  priceXof?: number;
  color: string;
  colorLight: string;
  img: string | null;

  // Detail page
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  description: string;
  imgWidth?: number;
  imgHeight?: number;
  isLegumes: boolean;
  duoSlug?: string;
  duoLabel?: string;
  inclus: Inclus[];
  content: ContentCategory[];
  contentTitle: string;
  pourQuiItems: Inclus[];
  pourQuiNote: React.ReactNode;
  pedagogie: { title: string; desc: React.ReactNode; items: PedagogieItem[] };
  activites: PedagogieItem[];
  productResultats: string[];
}

// ─────────────────────────────────────────────────
// Shared defaults for outils that don't need bespoke content
// ─────────────────────────────────────────────────

const DEFAULT_POUR_QUI: Inclus[] = [
  { icon: "🌱", text: "Votre enfant apprend à nommer les choses mais reste bloqué sur une seule image" },
  { icon: "🔗", text: "Vous souhaitez l'aider à faire le lien entre l'image et la réalité" },
  { icon: "🧩", text: "Votre enfant a un retard de langage, un TSA diagnostiqué ou suspecté" },
  { icon: "💡", text: "Vous cherchez des activités simples à faire à la maison ou en séance" },
  { icon: "📚", text: "Vous voulez enrichir son vocabulaire de façon ludique et structurée" },
  { icon: "🎯", text: "Vous accompagnez un enfant dans le cadre scolaire, en rééducation ou à domicile" },
];

const DEFAULT_POUR_QUI_NOTE: React.ReactNode = (
  <>
    👉 Cet outil est particulièrement adapté aux enfants <strong>avec retard de langage</strong>, avec{" "}
    <strong>TSA (diagnostiqué ou suspecté)</strong>, et à tous ceux qui ont besoin de supports visuels variés
    pour apprendre.
  </>
);

const DEFAULT_PEDAGOGIE = {
  title: "Pourquoi varier les supports visuels ?",
  desc: (
    <>
      Pour un enfant avec TSA ou retard de langage, une illustration ≠ une photo. Il peut connaître le mot «
      pomme » devant un dessin… et ne pas reconnaître la pomme sur le marché. C&apos;est la{" "}
      <strong style={{ color: "white" }}>généralisation</strong> — et c&apos;est une compétence qui
      s&apos;entraîne.
    </>
  ),
  items: [
    {
      icon: "🔓",
      title: "Il ne reste pas bloqué sur une seule image",
      desc: "Quand un enfant voit toujours la même représentation, il peut ne pas reconnaître l'objet dans un autre contexte. Varier les supports brise ce blocage.",
    },
    {
      icon: "🔗",
      title: "Il fait des liens plus facilement",
      desc: "Exposer votre enfant à différentes représentations du même mot renforce la solidité de son vocabulaire et accélère l'acquisition du langage.",
    },
    {
      icon: "🌍",
      title: "Il comprend mieux le monde autour de lui",
      desc: "La généralisation est une compétence fondamentale pour les enfants avec TSA. Ces outils entraînent spécifiquement cette capacité, de façon progressive.",
    },
  ] as PedagogieItem[],
};

const DEFAULT_ACTIVITES: PedagogieItem[] = [
  {
    icon: "🎯",
    title: "Jeux de Loto",
    desc: "Associer les cartes aux bonnes cases — pour travailler la reconnaissance visuelle et la concentration.",
  },
  {
    icon: "🔀",
    title: "Jeux d'Association",
    desc: "Relier la carte image à son nom ou à une autre représentation — pour consolider le vocabulaire.",
  },
  {
    icon: "✂️",
    title: "Fiches à découper",
    desc: "Des cartes individuelles à manipuler, classer, trier — pour une expérience sensorielle et kinesthésique.",
  },
  {
    icon: "📝",
    title: "Activités de vocabulaire",
    desc: "Nommer, catégoriser, décrire — des exercices graduels adaptés au niveau de l'enfant.",
  },
];

const DEFAULT_RESULTATS: string[] = [
  "Enrichir le vocabulaire de votre enfant de façon ciblée",
  "Développer la capacité de généralisation, compétence clé pour les enfants avec TSA",
  "Favoriser les échanges et les interactions autour de supports visuels motivants",
  "Proposer des activités autonomes ou en séance, faciles à mettre en place",
  "Créer des occasions naturelles de communication et d'apprentissage au quotidien",
];

export const OUTILS: OutilProduct[] = [
  {
    slug: 'legumes-photos',
    listingTitle: 'Je découvre les fruits et légumes en photos',
    listingSubtitle: "Parce que chaque mot appris rapproche votre enfant du monde qui l'entoure.",
    imgPosition: 'center 30%',
    priceEur: 7.90,
    priceXof: 5000,
    color: '#0792dc',
    colorLight: '#e8f4fd',
    img: `${R2_IMAGES_BASE}/miniature_outils_legumes_photo.png`,
    title: "Je découvre les fruits et légumes",
    subtitle: "en photos",
    tagline: "Parce que chaque mot appris rapproche votre enfant du monde qui l'entoure.",
    badge: "📷 Version Photos",
    description: "Un outil pédagogique conçu pour aider votre enfant à nommer, reconnaître et généraliser les fruits et légumes grâce à des photographies du monde réel.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: true,
    duoSlug: "legumes-illustrations",
    duoLabel: "Voir la version illustrations →",
    inclus: [
      { icon: "📄", text: "24 fiches en haute définition" },
      { icon: "🖨️", text: "Format PDF imprimable — A4 et cartes individuelles" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après paiement" },
      { icon: "🎨", text: "Photos réelles haute résolution" },
      { icon: "📋", text: "Guide d'utilisation et idées d'activités inclus" },
    ],
    content: [
      {
        label: "🍎 Fruits",
        items: ["Pomme verte", "Pomme rouge", "Banane", "Orange", "Clémentine", "Citron", "Fraise", "Melon", "Pastèque", "Papaye", "Mangue", "Ananas"],
      },
      {
        label: "🥕 Légumes",
        items: ["Carotte", "Tomate", "Brocoli", "Courgette", "Poivron rouge", "Poivron jaune", "Poivron vert", "Cerise", "Champignon", "Salade", "Haricots verts", "Oignon"],
      },
    ],
    contentTitle: "24 cartes — fruits et légumes",
    pourQuiItems: DEFAULT_POUR_QUI,
    pourQuiNote: DEFAULT_POUR_QUI_NOTE,
    pedagogie: DEFAULT_PEDAGOGIE,
    activites: DEFAULT_ACTIVITES,
    productResultats: DEFAULT_RESULTATS,
  },
  {
    slug: 'legumes-illustrations',
    listingTitle: 'Je découvre les fruits et légumes en illustrations',
    listingSubtitle: "Parce que chaque mot appris rapproche votre enfant du monde qui l'entoure.",
    imgPosition: 'center 30%',
    priceEur: 7.90,
    priceXof: 5000,
    color: '#27ae60',
    colorLight: '#e8f5e9',
    img: `${R2_IMAGES_BASE}/miniature_outils_legume_illustration.png`,
    title: "Je découvre les fruits et légumes",
    subtitle: "en illustrations",
    tagline: "Parce que chaque mot appris rapproche votre enfant du monde qui l'entoure.",
    badge: "🎨 Version Illustrations",
    description: "Un outil pédagogique qui permet à votre enfant de comprendre qu'une illustration et une photo représentent le même objet — une compétence clé pour le développement du langage.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: true,
    duoSlug: "legumes-photos",
    duoLabel: "Voir la version photos →",
    inclus: [
      { icon: "📄", text: "24 fiches en haute définition" },
      { icon: "🖨️", text: "Format PDF imprimable — A4 et cartes individuelles" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après paiement" },
      { icon: "🎨", text: "Illustrations colorées et attractives" },
      { icon: "📋", text: "Guide d'utilisation et idées d'activités inclus" },
    ],
    content: [
      {
        label: "🍎 Fruits",
        items: ["Pomme verte", "Pomme rouge", "Banane", "Orange", "Clémentine", "Citron", "Fraise", "Melon", "Pastèque", "Papaye", "Mangue", "Ananas"],
      },
      {
        label: "🥕 Légumes",
        items: ["Carotte", "Tomate", "Brocoli", "Courgette", "Poivron rouge", "Poivron jaune", "Poivron vert", "Cerise", "Champignon", "Salade", "Haricots verts", "Oignon"],
      },
    ],
    contentTitle: "24 cartes — fruits et légumes",
    pourQuiItems: DEFAULT_POUR_QUI,
    pourQuiNote: DEFAULT_POUR_QUI_NOTE,
    pedagogie: DEFAULT_PEDAGOGIE,
    activites: DEFAULT_ACTIVITES,
    productResultats: DEFAULT_RESULTATS,
  },
  {
    slug: 'animaux',
    listingTitle: 'Je découvre les animaux en photos et en illustrations',
    listingSubtitle: 'Et si votre enfant comprenait enfin que les images représentent le monde réel ?',
    imgPosition: 'center 30%',
    priceEur: 14.90,
    priceXof: 10000,
    color: '#ff7043',
    colorLight: '#fff3e0',
    img: `${R2_IMAGES_BASE}/miniature_outils_animaux-images-photo.png`,
    title: "Je découvre les animaux",
    subtitle: "en photos et en illustrations",
    tagline: "Et si votre enfant comprenait enfin que les images représentent le monde réel ?",
    badge: "📷🎨 Photos + Illustrations",
    description: "Un outil complet qui combine photos réelles et illustrations pour aider votre enfant à reconnaître et nommer les animaux, quelle que soit la représentation visuelle.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "📄", text: "40 fiches en haute définition" },
      { icon: "🖨️", text: "Format PDF imprimable — A4 et cartes individuelles" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après paiement" },
      { icon: "🎨", text: "Photos réelles + illustrations colorées" },
      { icon: "📋", text: "Guide d'utilisation et idées d'activités inclus" },
    ],
    content: [
      {
        label: "🐄 Animaux de la ferme",
        items: ["Vache", "Cheval", "Cochon", "Poule", "Mouton", "Lapin", "Canard", "Âne"],
      },
      {
        label: "🦁 Animaux sauvages",
        items: ["Lion", "Éléphant", "Girafe", "Singe", "Zèbre", "Tigre", "Ours", "Crocodile"],
      },
      {
        label: "🐶 Animaux de compagnie",
        items: ["Chien", "Chat", "Poisson", "Tortue", "Hamster", "Perroquet"],
      },
    ],
    contentTitle: "40+ cartes — animaux du monde entier",
    pourQuiItems: DEFAULT_POUR_QUI,
    pourQuiNote: DEFAULT_POUR_QUI_NOTE,
    pedagogie: DEFAULT_PEDAGOGIE,
    activites: DEFAULT_ACTIVITES,
    productResultats: DEFAULT_RESULTATS,
  },
  {
    slug: 'bonhomme-dessin',
    listingTitle: 'Apprendre à dessiner mon premier bonhomme',
    listingSubtitle: 'Un livret progressif pour développer le schéma corporel et la confiance en soi.',
    imgPosition: 'center 30%',
    priceEur: 12.90,
    priceXof: 8500,
    color: '#9333ea',
    colorLight: '#f5f3ff',
    img: `${R2_IMAGES_BASE}/miniature_outils_bonhomme-dessin.png`,
    title: "Apprendre à dessiner",
    subtitle: "mon premier bonhomme",
    tagline: "Dessiner un bonhomme, c'est apprendre à se comprendre.",
    badge: "✏️ Livret Dessin",
    description: "Un livret progressif pour apprendre à dessiner un bonhomme étape par étape — tout en développant le schéma corporel, la motricité fine et la confiance en soi.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "📄", text: "Fiches progressives en haute définition" },
      { icon: "🖨️", text: "Format PDF imprimable — A4" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après paiement" },
      { icon: "✂️", text: "Activités de découpage et reconstitution incluses" },
      { icon: "📋", text: "Guide d'utilisation et progression étape par étape" },
    ],
    content: [
      {
        label: "🧍 Les parties du corps",
        items: ["La tête", "Le visage", "Le corps", "Les bras", "Les mains", "Les jambes", "Les pieds", "Les détails (cheveux, yeux, bouche…)"],
      },
      {
        label: "✂️ Découpage et reconstitution",
        items: ["Assembler les parties du corps", "Reconstituer un personnage complet", "Identifier les éléments manquants", "Manipuler pour mieux mémoriser"],
      },
      {
        label: "👧👦 Fille et garçon",
        items: ["Observer les différences", "Reconnaître les vêtements", "Reproduire les détails physiques", "Dessiner sa version à soi"],
      },
    ],
    contentTitle: "Un livret progressif — apprendre à dessiner",
    pourQuiItems: [
      { icon: "🌱", text: "Votre enfant commence à dessiner mais ne sait pas encore représenter le corps humain" },
      { icon: "🧠", text: "Vous souhaitez l'aider à mieux connaître et comprendre son corps" },
      { icon: "🧩", text: "Votre enfant a un retard de développement, un TSA diagnostiqué ou des difficultés motrices" },
      { icon: "💡", text: "Vous cherchez des activités de dessin progressives à faire à la maison ou en séance" },
      { icon: "✂️", text: "Vous voulez renforcer sa motricité fine grâce au découpage et à la manipulation" },
      { icon: "🎯", text: "Vous accompagnez un enfant dans le cadre scolaire, en rééducation ou à domicile" },
    ],
    pourQuiNote: (
      <>
        👉 Cet outil est particulièrement adapté aux enfants <strong>dès 3 ans</strong>, avec{" "}
        <strong>retard de développement</strong>, avec <strong>TSA</strong>, ou présentant{" "}
        <strong>des difficultés de repérage corporel</strong> et de motricité fine.
      </>
    ),
    pedagogie: {
      title: "Pourquoi dessiner un bonhomme ?",
      desc: "Dessiner un bonhomme, ce n'est pas seulement un exercice graphique : c'est apprendre à se connaître, à organiser l'espace, et à représenter ce que l'on ressent. Pour les enfants avec TSA ou retard de développement, c'est une étape clé pour construire le schéma corporel.",
      items: [
        {
          icon: "🧍",
          title: "Un outil de schéma corporel",
          desc: "Représenter son corps sur papier aide l'enfant à mieux le comprendre et à en intégrer l'organisation — tête, tronc, membres, détails.",
        },
        {
          icon: "✏️",
          title: "Une progression pas à pas",
          desc: "Chaque étape est construite sur la précédente, pour que l'enfant avance à son rythme sans se sentir dépassé ni découragé.",
        },
        {
          icon: "✂️",
          title: "Apprendre en manipulant",
          desc: "Les activités de découpage et de reconstitution renforcent la mémorisation par le geste — l'enfant construit sa compréhension en agissant.",
        },
      ],
    },
    activites: [
      {
        icon: "🎨",
        title: "Dessiner étape par étape",
        desc: "Suivre les étapes progressives pour construire un bonhomme complet — de la tête aux pieds, avec de plus en plus de détails.",
      },
      {
        icon: "✂️",
        title: "Découper et reconstituer",
        desc: "Assembler les parties du corps découpées pour reconstituer un personnage — apprendre en manipulant, pour mieux mémoriser.",
      },
      {
        icon: "👧👦",
        title: "Différencier fille et garçon",
        desc: "Observer et reproduire les différences entre une fille et un garçon — vêtements, coiffure, détails physiques.",
      },
      {
        icon: "🧩",
        title: "Identifier les parties du corps",
        desc: "Nommer, pointer et placer les différentes parties du corps — pour construire un schéma corporel solide et précis.",
      },
    ],
    productResultats: [
      "Apprendre à dessiner un bonhomme étape par étape, de façon progressive",
      "Développer le schéma corporel et mieux connaître son corps",
      "Améliorer la motricité fine grâce au découpage et à la manipulation",
      "Différencier fille et garçon et enrichir la compréhension de l'identité",
      "Gagner en confiance et en autonomie dans les activités graphiques",
    ],
  },
  {
    slug: 'cahier-coloriage',
    listingTitle: 'Cahier de coloriage éducatif et inclusif',
    listingSubtitle: 'Des illustrations simples avec modèles en couleur, adaptées au rythme de chaque enfant.',
    imgPosition: 'center 30%',
    priceEur: 5.90,
    priceXof: 3500,
    color: '#f59e0b',
    colorLight: '#fffbeb',
    img: `${R2_IMAGES_BASE}/miniature_outils_animaux-coloriage.png`,
    title: "Cahier de coloriage éducatif et inclusif",
    subtitle: "avec modèle",
    tagline: "Parce que chaque enfant mérite de grandir, d'apprendre et de s'épanouir à son propre rythme.",
    badge: "🖍️ Cahier de coloriage",
    description: "Un cahier de coloriage spécialement conçu pour les enfants à besoins spécifiques. Des illustrations simples d'animaux, des modèles en couleur à reproduire, et des activités adaptées au rythme de chaque enfant.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "🎨", text: "Cahier de coloriage en haute définition" },
      { icon: "🖼️", text: "Modèles en couleur pour guider et motiver l'enfant" },
      { icon: "🖨️", text: "Format PDF imprimable — A4" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après paiement" },
      { icon: "📋", text: "Guide d'utilisation et idées d'activités inclus" },
    ],
    content: [
      {
        label: "🖍️ Coloriages d'animaux",
        items: [
          "Illustrations simples aux contours bien définis",
          "Modèle en couleur pour chaque page",
          "Animaux familiers et attractifs",
          "Présentation épurée, peu chargée visuellement",
          "Dessins adaptés aux particularités sensorielles et cognitives",
        ],
      },
      {
        label: "📚 Compétences travaillées",
        items: [
          "Motricité fine et coordination œil-main",
          "Concentration et attention",
          "Vocabulaire et communication",
          "Prérequis à l'écriture",
          "Autonomie et confiance en soi",
        ],
      },
    ],
    contentTitle: "Un cahier complet — coloriage et apprentissage",
    pourQuiItems: [
      { icon: "🧩", text: "Votre enfant présente un TSA, un TDA/H ou une trisomie 21" },
      { icon: "✍️", text: "Votre enfant a une dysgraphie ou des difficultés motrices" },
      { icon: "💬", text: "Votre enfant a des difficultés de langage ou de communication" },
      { icon: "🌱", text: "Vous cherchez des activités adaptées, structurées et rassurantes" },
      { icon: "🎯", text: "Vous travaillez en IME, ULIS, en séance d'orthophonie ou en psychomotricité" },
      { icon: "🏠", text: "Vous souhaitez des activités simples à faire à la maison ou en accompagnement" },
    ],
    pourQuiNote: (
      <>
        👉 Ce cahier est particulièrement adapté aux enfants <strong>dès 3 ans</strong> présentant un{" "}
        <strong>TSA</strong>, un <strong>TDA/H</strong>, une <strong>trisomie 21</strong>, une{" "}
        <strong>dysgraphie</strong> ou tout besoin d&apos;un cadre rassurant, structuré et prévisible.
      </>
    ),
    pedagogie: {
      title: "Pourquoi le coloriage pour les enfants à besoins spécifiques ?",
      desc: "Le coloriage n'est pas qu'une activité créative : pour les enfants à besoins spécifiques, c'est un outil thérapeutique puissant. Il développe la motricité fine, l'attention et la concentration, tout en offrant un cadre rassurant et prévisible.",
      items: [
        {
          icon: "🤲",
          title: "Un outil de motricité fine",
          desc: "Tenir le crayon, colorier dans les contours, respecter les limites — chaque geste renforce les capacités motrices nécessaires à l'écriture et au développement graphomoteur.",
        },
        {
          icon: "🧘",
          title: "Un espace de calme et d'apaisement",
          desc: "Le coloriage offre à l'enfant un moment de pause agréable et sécurisant. Il réduit le stress, l'agitation et favorise le retour au calme dans un cadre structuré.",
        },
        {
          icon: "🎯",
          title: "Observer et reproduire",
          desc: "Le modèle en couleur guide l'enfant sans le contraindre — il observe, choisit, reproduit à son rythme, développant son autonomie et sa confiance en soi.",
        },
      ],
    },
    activites: [
      {
        icon: "🔍",
        title: "Observation et reproduction",
        desc: "L'enfant observe un modèle en couleur puis tente de le reproduire à sa façon — une activité structurée qui valorise l'initiative et renforce l'estime de soi.",
      },
      {
        icon: "🖍️",
        title: "Coloriage guidé",
        desc: "Des illustrations adaptées pour travailler la précision du geste, la coordination œil-main et le contrôle du crayon.",
      },
      {
        icon: "💬",
        title: "Découverte du vocabulaire",
        desc: "Les dessins servent de support pour nommer, décrire et échanger autour des animaux représentés — stimulant le langage et la communication.",
      },
      {
        icon: "🌿",
        title: "Moment de détente et d'apaisement",
        desc: "Le coloriage favorise le retour au calme et offre un temps de pause agréable et sécurisant pour l'enfant.",
      },
    ],
    productResultats: [
      "Développer la motricité fine et la coordination œil-main",
      "Renforcer les capacités motrices nécessaires à l'écriture",
      "Améliorer l'attention, la concentration et la persévérance",
      "Stimuler le langage, le vocabulaire et les capacités de communication",
      "Renforcer la confiance en soi grâce à des réussites adaptées",
      "Mieux gérer les émotions dans un cadre rassurant et prévisible",
      "Réduire le stress et l'agitation grâce à une activité apaisante",
    ],
  },
];

// ─────────────────────────────────────────────────
// Packs (bundles of 2 outils sold together at a reduced price)
// ─────────────────────────────────────────────────

export interface Pack {
  slug: string;
  /** DB Product.slug for cart/checkout — distinct from the route slug to avoid clashing with outil slugs (e.g. 'animaux'). */
  productSlug: string;
  title: string;
  subtitle: string;
  tagline: string;
  color: string;
  color2: string;
  colorLight: string;
  img: string;
  imgPosition: string;
  priceEur: number;
  priceXof?: number;
  priceBarreEur: number;
  priceBarreXof?: number;
  economieEur: number;
  economieXof?: number;
  badge: string;
  itemSlugs: [string, string];
}

export const PACKS: Pack[] = [
  {
    slug: 'legumes',
    productSlug: 'pack-legumes',
    title: 'Je découvre les fruits et légumes',
    subtitle: 'Pack Photos + Illustrations',
    tagline: "Les deux formats réunis pour ancrer chaque mot dans la vraie vie — et dans l'imaginaire.",
    color: '#0792dc',
    color2: '#27ae60',
    colorLight: '#e8f4fd',
    img: `${R2_IMAGES_BASE}/miniature_outils_legumes_photo.png`,
    imgPosition: 'center 30%',
    priceEur: 11.90,
    priceXof: 8000,
    priceBarreEur: 15.80,
    priceBarreXof: 10000,
    economieEur: 3.90,
    economieXof: 2000,
    badge: '📦 Pack — 2 outils',
    itemSlugs: ['legumes-photos', 'legumes-illustrations'],
  },
  {
    slug: 'animaux',
    productSlug: 'pack-animaux',
    title: 'Je découvre les animaux',
    subtitle: 'Pack Complet + Coloriage',
    tagline: "Reconnaître, nommer et colorier les animaux — pour ancrer le vocabulaire par le jeu et la manipulation.",
    color: '#ff7043',
    color2: '#f59e0b',
    colorLight: '#fff3e0',
    img: `${R2_IMAGES_BASE}/miniature_outils_animaux-images-photo.png`,
    imgPosition: 'center 30%',
    priceEur: 17.90,
    priceXof: 12000,
    priceBarreEur: 20.80,
    priceBarreXof: 13500,
    economieEur: 2.90,
    economieXof: 1500,
    badge: '📦 Pack — 2 outils',
    itemSlugs: ['animaux', 'cahier-coloriage'],
  },
];

export function getPackItems(pack: Pack): OutilProduct[] {
  return pack.itemSlugs
    .map((slug) => OUTILS.find((o) => o.slug === slug))
    .filter((o): o is OutilProduct => o !== undefined);
}

export function findPackForOutil(outilSlug: string): Pack | undefined {
  return PACKS.find((pack) => (pack.itemSlugs as readonly string[]).includes(outilSlug));
}

// ─────────────────────────────────────────────────
// Ressources
// ─────────────────────────────────────────────────

export interface Ressource {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  img: string;
  imgPosition: string;
  fileKey: string;
}

export const RESSOURCES: Ressource[] = [
  {
    slug: 'article_developpement-langage',
    title: "Le développement du langage chez l'enfant",
    subtitle: 'Comprendre les grandes étapes de la naissance à 6 ans',
    tag: 'Article · PDF gratuit',
    img: `${R2_IMAGES_BASE}/miniature_developpement-langage.png`,
    imgPosition: 'center 0%',
    fileKey: 'ressources/article_developpement-langage.pdf',
  },
  {
    slug: 'article_retards-troubles-langage',
    title: 'Différence entre retard et troubles du langage',
    subtitle: "Comprendre, distinguer et repérer les types de difficultés dans l'acquisition du langage pour adopter un accompagnement adapté",
    tag: 'Article · PDF gratuit',
    img: `${R2_IMAGES_BASE}/miniature_retards-troubles-langage.png`,
    imgPosition: 'center 0%',
    fileKey: 'ressources/article_retards-troubles-langage.pdf',
  },
  {
    slug: 'article_profil-sensoriel-autiste',
    title: 'La sensorialité',
    subtitle: 'Comprendre le monde avec ses 5 sens',
    tag: 'Article · PDF gratuit',
    img: `${R2_IMAGES_BASE}/miniature_profil-sensoriel-autiste.png`,
    imgPosition: 'center 30%',
    fileKey: 'ressources/article_profil-sensoriel-autiste.pdf',
  },
];

// ─────────────────────────────────────────────────
// Bonus
// ─────────────────────────────────────────────────

export interface Bonus {
  title: string;
  tag: string;
  img: string;
  imgPosition: string;
  fileKey: string;
}

export const BONUS: Bonus[] = [
  {
    title: 'Mini-astuces pour développer le langage',
    tag: 'Bonus - PDF gratuit',
    img: `${R2_IMAGES_BASE}/bonus-mini-astuces.png`,
    imgPosition: 'center 30%',
    fileKey: 'bonus/bonus_developper-langage.pdf',
  },
];
