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
  {
    slug: 'pate-a-modeler',
    listingTitle: 'Je découvre et crée en pâte à modeler',
    listingSubtitle: '14 créations guidées, pas à pas, pour développer la motricité fine en s\'amusant.',
    imgPosition: 'center 30%',
    priceEur: 8.90,
    priceXof: 5800,
    color: '#ec4899',
    colorLight: '#fdf2f8',
    img: `${R2_IMAGES_BASE}/miniature_outils_pate-a-modeler.png`,
    title: "Je découvre et crée",
    subtitle: "en pâte à modeler",
    tagline: "Une petite boule de pâte, quelques gestes simples… et la fierté de voir sa création prendre forme.",
    badge: "🖐️ Livret Pâte à modeler",
    description: "14 créations guidées, expliquées pas à pas en 58 étapes illustrées, pour apprendre à rouler, aplatir, assembler et modeler — tout en développant la motricité fine, l'attention et l'autonomie.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "📄", text: "Fichier PDF de 61 pages en haute définition" },
      { icon: "🖼️", text: "Format A4 paysage, adapté à l'affichage devant l'enfant" },
      { icon: "🖨️", text: "14 créations guidées en 58 étapes illustrées" },
      { icon: "♾️", text: "Accès illimité — réimprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après achat" },
      { icon: "📋", text: "Conseils pour accompagner l'enfant sans faire à sa place" },
    ],
    content: [
      {
        label: "🖐️ Construire et modeler",
        items: ["Bonhomme", "Fleur", "Chien", "Maison", "Nourriture", "Formes géométriques", "Objets du quotidien"],
      },
      {
        label: "🔤 Former des lettres",
        items: ["Observer le sens et la disposition des traits", "Reproduire la forme de la lettre", "Préparer les premiers apprentissages de l'écriture"],
      },
    ],
    contentTitle: "Un cahier complet — 14 créations et 58 étapes illustrées",
    pourQuiItems: [
      { icon: "🖐️", text: "Votre enfant aime manipuler, toucher et construire" },
      { icon: "💪", text: "Il a besoin de renforcer ses doigts et de gagner en précision" },
      { icon: "🧩", text: "Il rencontre des difficultés dans les activités de motricité fine" },
      { icon: "👀", text: "Il a besoin de consignes visuelles, courtes et décomposées" },
      { icon: "📐", text: "Vous souhaitez travailler les formes et les premières lettres autrement que sur une feuille" },
      { icon: "🎯", text: "Vous accompagnez un enfant avec un TSA, un TDL, un TDA/H ou d'autres besoins particuliers" },
    ],
    pourQuiNote: (
      <>
        👉 Cet outil est particulièrement adapté aux enfants ayant besoin de <strong>renforcer leur motricité
        fine</strong>, avec <strong>TSA, TDL ou TDA/H</strong>, ou présentant des{" "}
        <strong>difficultés à suivre une consigne décomposée en plusieurs étapes</strong>.
      </>
    ),
    pedagogie: {
      title: "Pourquoi apprendre avec les mains ?",
      desc: "La manipulation permet à l'enfant de découvrir concrètement les formes, les volumes et les relations entre les parties d'un objet. Pour créer un modèle, il doit observer, préparer les éléments, les organiser puis les assembler — il apprend ainsi à transformer une consigne en une succession de petites actions réalisables.",
      items: [
        {
          icon: "👁️",
          title: "Observer puis reproduire",
          desc: "Chaque création part de l'observation du modèle terminé, pour que l'enfant comprenne ce qu'il doit construire avant d'agir.",
        },
        {
          icon: "🧩",
          title: "Décomposer une consigne complexe",
          desc: "Transformer une consigne globale en une succession de petites actions réalisables réduit la charge cognitive et facilite la réussite.",
        },
        {
          icon: "✋",
          title: "Comprendre par la manipulation",
          desc: "Rouler, aplatir, assembler : l'enfant découvre concrètement les formes, les volumes et les relations entre les parties d'un objet.",
        },
      ],
    },
    activites: [
      {
        icon: "🧍",
        title: "Construire des personnages et des animaux",
        desc: "Bonhomme, fleur, chien, maison — préparer et assembler plusieurs éléments pour reproduire un modèle complet.",
      },
      {
        icon: "🔺",
        title: "Travailler les formes",
        desc: "Rouler, aplatir, étirer ou courber la pâte pour reproduire des formes géométriques simples.",
      },
      {
        icon: "🔤",
        title: "Former des lettres",
        desc: "Observer le sens des traits avant de les reproduire en pâte à modeler — une étape clé avant l'écriture.",
      },
      {
        icon: "🎨",
        title: "Personnaliser sa création",
        desc: "Une fois le modèle reproduit, l'enfant est invité à explorer librement et à personnaliser le résultat.",
      },
    ],
    productResultats: [
      "Renforcer les muscles des doigts et des mains",
      "Améliorer la motricité fine et la coordination œil-main",
      "Apprendre à doser et contrôler ses gestes",
      "Suivre une activité composée de plusieurs étapes",
      "Découvrir les formes et les premières lettres par la manipulation",
      "Développer son attention, sa persévérance et son autonomie",
    ],
  },
  {
    slug: 'filles-garcons',
    listingTitle: 'Je découvre les filles et les garçons',
    listingSubtitle: "75 pages d'activités pour mieux se connaître, reconnaître les autres et respecter les différences.",
    imgPosition: 'center 30%',
    priceEur: 9.90,
    priceXof: 6500,
    color: '#0d9488',
    colorLight: '#f0fdfa',
    img: `${R2_IMAGES_BASE}/miniature_outils_filles-garcons.png`,
    title: "Je découvre les filles",
    subtitle: "et les garçons",
    tagline: "Pour apprendre à se reconnaître, comprendre les autres et respecter chaque différence.",
    badge: "👦👧 Cahier d'activités",
    description: "Un cahier d'activités de 75 pages pour mieux se connaître, reconnaître les autres et respecter les différences — à travers coloriages, découpages et jeux d'association.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "📄", text: "Fichier PDF de 75 pages en haute définition" },
      { icon: "🖨️", text: "Format A4 facile à imprimer" },
      { icon: "✂️", text: "Personnages et éléments du visage à découper et manipuler" },
      { icon: "🎨", text: "Illustrations et photographies en couleur" },
      { icon: "♾️", text: "Accès illimité — réimprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après achat" },
    ],
    content: [
      {
        label: "🧑 Se présenter et se reconnaître",
        items: ["Je me présente", "Reconnaître et désigner les filles et les garçons", "Trier et classer les personnages"],
      },
      {
        label: "👀 Observer le visage et le corps",
        items: ["Observer les vêtements et accessoires", "Reconstituer les visages", "Reconnaître les parties du visage", "Nommer les parties du corps", "Associer les mots et les images"],
      },
      {
        label: "🌍 Grandir et découvrir le monde",
        items: ["Dessiner en suivant un modèle", "Découvrir les étapes de la vie", "Découvrir la diversité du monde", "Colorier en suivant une consigne"],
      },
    ],
    contentTitle: "Un cahier complet — 75 pages et 12 activités",
    pourQuiItems: [
      { icon: "🧒", text: "Votre enfant commence à s'interroger sur les filles, les garçons et les différences entre les personnes" },
      { icon: "👁️", text: "Il a besoin de supports visuels pour comprendre les catégories et les caractéristiques humaines" },
      { icon: "🧩", text: "Il rencontre des difficultés pour identifier ou comparer les personnes" },
      { icon: "🗣️", text: "Vous souhaitez l'aider à mieux se connaître et à parler de lui" },
      { icon: "🌍", text: "Vous cherchez un support valorisant la diversité culturelle et physique" },
      { icon: "🎯", text: "Vous accompagnez un enfant avec un TSA, un TDL ou d'autres besoins particuliers" },
    ],
    pourQuiNote: (
      <>
        👉 Cet outil est particulièrement adapté aux enfants ayant besoin de <strong>repères concrets</strong> pour
        se connaître et comprendre les autres, avec <strong>TSA, TDL ou retard de langage</strong>, ou pour
        aborder les différences de manière <strong>simple, concrète et respectueuse</strong>.
      </>
    ),
    pedagogie: {
      title: "Comprendre les différences pour mieux vivre ensemble",
      desc: "Reconnaître les personnes, identifier certaines caractéristiques physiques et comprendre que chacun évolue avec l'âge font partie des apprentissages sociaux de l'enfant. Ces notions peuvent rester abstraites, notamment pour les enfants qui ont besoin d'un enseignement explicite et de supports visuels concrets.",
      items: [
        {
          icon: "👁️",
          title: "Observer avant de nommer",
          desc: "Chaque notion part de l'observation de personnages illustrés ou de photographies, pour que l'enfant construise ses repères avant de les mettre en mots.",
        },
        {
          icon: "🧩",
          title: "Trier, catégoriser et associer",
          desc: "Découper, classer et associer des images travaillent la compréhension des consignes et la catégorisation — des compétences clés du développement social.",
        },
        {
          icon: "🌍",
          title: "Découvrir la diversité avec bienveillance",
          desc: "Présenter des personnes d'âges, de cultures et d'apparences variées aide l'enfant à comprendre que chacun est différent et mérite d'être respecté.",
        },
      ],
    },
    activites: [
      {
        icon: "✂️",
        title: "Trier et classer les personnages",
        desc: "Découper puis placer les personnages dans les colonnes correspondantes — pour travailler la compréhension des consignes et la catégorisation.",
      },
      {
        icon: "🧑‍🎨",
        title: "Reconstituer les visages",
        desc: "Compléter un visage à partir d'éléments à découper — yeux, nez, bouche, sourcils — pour développer le schéma corporel et l'organisation spatiale.",
      },
      {
        icon: "📅",
        title: "Découvrir les étapes de la vie",
        desc: "Observer des frises illustrant l'évolution d'une personne — bébé, enfant, adolescent, adulte — pour construire ses premiers repères temporels.",
      },
      {
        icon: "🌍",
        title: "Découvrir la diversité du monde",
        desc: "Observer des femmes et des hommes d'origines variées pour s'ouvrir à la diversité des visages, des coiffures et des cultures.",
      },
    ],
    productResultats: [
      "Mieux parler de lui et exprimer ses préférences",
      "Reconnaître et comparer différentes personnes",
      "Enrichir son vocabulaire autour du corps, du visage et des vêtements",
      "Développer son schéma corporel",
      "Comprendre les principales étapes de la vie",
      "Améliorer son observation et sa discrimination visuelle",
      "Apprendre à respecter les goûts, les choix et les particularités de chacun",
    ],
  },
  {
    slug: 'contraires',
    listingTitle: 'Je découvre les contraires',
    listingSubtitle: "Un imagier photo de 52 pages pour comprendre, nommer et utiliser les notions opposées.",
    imgPosition: 'center 30%',
    priceEur: 6.90,
    priceXof: 4500,
    color: '#6366f1',
    colorLight: '#eef2ff',
    img: `${R2_IMAGES_BASE}/miniature_outils_contraires.png`,
    title: "Je découvre",
    subtitle: "les contraires",
    tagline: "Grand et petit, chaud et froid, ouvert et fermé… des photographies concrètes pour comprendre et nommer les notions opposées.",
    badge: "🔄 Imagier des contraires",
    description: "Un livre de 52 pages qui présente les opposés à travers des photographies concrètes, variées et faciles à comparer — pour enrichir le vocabulaire et développer la compréhension.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "📄", text: "Fichier PDF de 52 pages en haute définition" },
      { icon: "🖨️", text: "Format A4 facile à imprimer" },
      { icon: "📷", text: "49 planches visuelles en couleur, avec photographies réelles" },
      { icon: "🔗", text: "Plus de 45 paires de notions opposées" },
      { icon: "♾️", text: "Accès illimité — réimprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après achat" },
    ],
    content: [
      {
        label: "📏 Propriétés des objets",
        items: ["Grand / petit", "Lourd / léger", "Chaud / froid", "Plein / vide", "Propre / sale"],
      },
      {
        label: "🧭 Notions spatiales",
        items: ["Devant / derrière", "Dessus / dessous", "Ouvert / fermé", "Près / loin", "À gauche / à droite"],
      },
      {
        label: "🏃 Actions et émotions",
        items: ["Rapide / lent", "Monter / descendre", "Content / triste", "Jour / nuit"],
      },
    ],
    contentTitle: "Un livre complet — 49 planches et plus de 45 paires de contraires",
    pourQuiItems: [
      { icon: "🌱", text: "Votre enfant commence à découvrir les notions opposées" },
      { icon: "🔗", text: "Il connaît certains mots, mais ne comprend pas encore leur contraire" },
      { icon: "📷", text: "Il a besoin d'images concrètes pour comprendre une notion abstraite" },
      { icon: "🧩", text: "Il rencontre des difficultés à comparer deux objets ou deux situations" },
      { icon: "🧭", text: "Il a besoin de renforcer son repérage dans l'espace" },
      { icon: "🎯", text: "Vous accompagnez un enfant avec un retard de langage, un TSA, un TDL ou d'autres besoins particuliers" },
    ],
    pourQuiNote: (
      <>
        👉 Cet outil est particulièrement adapté aux enfants ayant besoin de <strong>photographies concrètes</strong> pour
        comprendre une notion abstraite, avec <strong>TSA, TDL ou retard de langage</strong>, ou pour{" "}
        <strong>travailler les consignes simples et le repérage dans l&apos;espace</strong>.
      </>
    ),
    pedagogie: {
      title: "Rendre les notions abstraites visibles et concrètes",
      desc: "Les contraires permettent à l'enfant d'organiser sa compréhension du monde : un objet peut être lourd ou léger, une personne peut entrer ou sortir. Apprendre un contraire ne consiste pas uniquement à mémoriser deux mots — l'enfant doit comprendre la relation qui les oppose et reconnaître cette relation dans plusieurs situations.",
      items: [
        {
          icon: "👁️",
          title: "Observer avant de nommer",
          desc: "Chaque planche présente deux notions opposées placées côte à côte, avec plusieurs exemples photographiques, pour que l'enfant observe les différences avant de les mettre en mots.",
        },
        {
          icon: "🔗",
          title: "Associer les deux mots opposés",
          desc: "Des représentations variées favorisent la généralisation : l'enfant apprend à reconnaître la même notion dans plusieurs situations du quotidien.",
        },
        {
          icon: "🗣️",
          title: "Réutiliser dans des phrases simples",
          desc: "Une fois les contraires reconnus et nommés, l'enfant est encouragé à les retrouver dans son environnement et à les réutiliser dans de petites phrases.",
        },
      ],
    },
    activites: [
      {
        icon: "👁️",
        title: "Observer et comparer",
        desc: "Repérer les différences entre deux images pour construire la relation entre les deux notions opposées.",
      },
      {
        icon: "👉",
        title: "Montrer la notion demandée",
        desc: "Pointer la bonne image parmi les deux pour travailler la compréhension et l'attention visuelle.",
      },
      {
        icon: "🧑‍🤝‍🧑",
        title: "Mimer les actions",
        desc: "Reproduire une action opposée (monter / descendre, ouvrir / fermer) pour mieux comprendre et mémoriser les mots.",
      },
      {
        icon: "🏠",
        title: "Retrouver les notions au quotidien",
        desc: "Repérer les contraires dans son environnement proche, avec des jouets ou des objets familiers, pour généraliser les apprentissages.",
      },
    ],
    productResultats: [
      "Comprendre les principales notions opposées",
      "Enrichir son vocabulaire",
      "Mieux comprendre les consignes",
      "Comparer deux objets ou deux situations",
      "Améliorer sa discrimination visuelle",
      "Renforcer ses repères dans l'espace",
      "Reconnaître certaines émotions et certains états",
      "Réutiliser les mots dans les situations du quotidien",
    ],
  },
  {
    slug: 'couleurs',
    listingTitle: 'Je découvre les couleurs',
    listingSubtitle: "Un livret de 80 pages pour apprendre à reconnaître, nommer et retrouver 11 couleurs dans le quotidien.",
    imgPosition: 'center 30%',
    priceEur: 9.90,
    priceXof: 6500,
    color: '#db2777',
    colorLight: '#fdf2f8',
    img: `${R2_IMAGES_BASE}/miniature_outils_couleurs.png`,
    title: "Je découvre",
    subtitle: "les couleurs",
    tagline: "Un support ludique et progressif pour apprendre à reconnaître, nommer et retrouver les couleurs dans le quotidien.",
    badge: "🎨 Imagier des couleurs",
    description: "Un livret de 80 pages pour apprendre à reconnaître, nommer et retrouver 11 couleurs dans le quotidien — à travers photographies, illustrations, jeux d'association et cartes à manipuler.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "📄", text: "Fichier PDF de 80 pages en haute définition" },
      { icon: "🖨️", text: "Format A4 facile à imprimer" },
      { icon: "🎨", text: "11 couleurs à découvrir, avec photographies réelles et illustrations" },
      { icon: "✂️", text: "Cartes individuelles à découper et à manipuler" },
      { icon: "♾️", text: "Accès illimité — réimprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après achat" },
    ],
    content: [
      {
        label: "🔍 Découvrir et associer",
        items: ["Découverte sensorielle des couleurs", "Association image-image", "Cartes avec le vocabulaire écrit"],
      },
      {
        label: "🎲 Jouer et reconnaître",
        items: ["Jeu des couleurs", "Jeu des associations", "Tri et catégorisation"],
      },
      {
        label: "🏠 Nommer et généraliser",
        items: ["Rappel et expression", "Chasse aux couleurs dans le quotidien"],
      },
    ],
    contentTitle: "Un livret complet — 80 pages et 11 couleurs à découvrir",
    pourQuiItems: [
      { icon: "🌱", text: "Votre enfant commence à découvrir les couleurs, mais a encore du mal à les reconnaître ou à les nommer" },
      { icon: "🔗", text: "Il reconnaît une couleur sur une carte, mais pas toujours sur un autre objet ou dans son environnement" },
      { icon: "📷", text: "Il apprend plus facilement grâce aux images, à la manipulation et à la répétition" },
      { icon: "🗣️", text: "Vous souhaitez enrichir son vocabulaire à partir d'objets familiers" },
      { icon: "💡", text: "Vous cherchez des activités courtes, simples et ludiques à réaliser à la maison ou en séance" },
      { icon: "🎯", text: "Vous accompagnez un enfant avec un retard de langage, un TSA, un TDL ou d'autres besoins particuliers" },
    ],
    pourQuiNote: (
      <>
        👉 Cet outil est particulièrement adapté aux enfants ayant besoin de <strong>supports structurés et
        concrets</strong> pour apprendre à leur rythme, avec <strong>TSA, TDL ou retard de langage</strong>, ou pour{" "}
        <strong>généraliser une couleur apprise sur une carte à des objets du quotidien</strong>.
      </>
    ),
    pedagogie: {
      title: "Apprendre une couleur, c'est bien plus que mémoriser son nom",
      desc: "Un enfant peut reconnaître le rouge sur une carte sans forcément comprendre qu'une fraise, un ballon et un vêtement peuvent tous être rouges. Pour maîtriser réellement une couleur, il doit apprendre à la retrouver sur des objets différents, dans des contextes variés et sous plusieurs représentations visuelles — c'est la généralisation des apprentissages.",
      items: [
        {
          icon: "👁️",
          title: "Découvrir par l'observation",
          desc: "Chaque couleur est d'abord explorée par l'observation et la manipulation sensorielle, pour construire une première représentation concrète.",
        },
        {
          icon: "🔗",
          title: "Associer la couleur à son nom",
          desc: "Le langage et les supports visuels permettent ensuite d'associer chaque couleur à son nom, puis de la reconnaître parmi plusieurs propositions.",
        },
        {
          icon: "🏠",
          title: "Retrouver la couleur au quotidien",
          desc: "Photographies et illustrations sont volontairement associées pour aider l'enfant à comprendre qu'un même objet peut être représenté de différentes façons, puis à retrouver la couleur sur ses vêtements, ses jouets ou ses aliments.",
        },
      ],
    },
    activites: [
      {
        icon: "👁️",
        title: "La découverte sensorielle",
        desc: "Observer, toucher, trier ou manipuler des objets colorés pour éveiller l'attention et la curiosité de l'enfant.",
      },
      {
        icon: "🔗",
        title: "L'association image-image",
        desc: "Associer deux représentations d'un même objet ou rechercher les éléments appartenant à la même couleur, pour développer la discrimination visuelle.",
      },
      {
        icon: "🧩",
        title: "Le tri et la catégorisation",
        desc: "Rassembler les éléments ayant une couleur commune, en faisant abstraction de leur forme, leur taille ou leur fonction.",
      },
      {
        icon: "🏠",
        title: "La chasse aux couleurs",
        desc: "Rechercher les couleurs autour de soi — vêtements, jouets, aliments, maison ou promenade — pour transférer les apprentissages dans la vie quotidienne.",
      },
    ],
    productResultats: [
      "Reconnaître et différencier les principales couleurs",
      "Associer une couleur à son nom",
      "Retrouver une même couleur sur des objets très différents",
      "Comprendre qu'une photographie et une illustration peuvent représenter le même objet",
      "Enrichir son vocabulaire",
      "Développer son attention et sa discrimination visuelle",
      "Améliorer ses capacités de tri, d'association et de catégorisation",
      "Réutiliser ses apprentissages dans son quotidien",
    ],
  },
  {
    slug: 'couleurs-coloriage',
    listingTitle: 'Je découvre les couleurs en coloriage',
    listingSubtitle: "Un cahier de coloriage ludique et progressif pour apprendre les couleurs à partir de ce que l'enfant connaît déjà.",
    imgPosition: 'center 30%',
    priceEur: 5.30,
    priceXof: 3500,
    color: '#06b6d4',
    colorLight: '#ecfeff',
    img: `${R2_IMAGES_BASE}/miniature_outils_couleurs-coloriage.png`,
    title: "Je découvre les couleurs",
    subtitle: "en coloriage",
    tagline: "Chaque page associe un modèle en couleurs à un dessin à colorier, pour observer, reconnaître puis reproduire.",
    badge: "🖍️ Cahier de coloriage",
    description: "Un cahier de coloriage ludique et progressif pour apprendre les couleurs à partir de ce que l'enfant connaît déjà, à travers 5 univers familiers du quotidien.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "📄", text: "Cahier de coloriage progressif en haute définition" },
      { icon: "🖼️", text: "Un modèle en couleur associé à chaque dessin à colorier" },
      { icon: "🖨️", text: "Format PDF imprimable — A4" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après achat" },
      { icon: "📋", text: "Guide d'utilisation et idées d'activités inclus" },
    ],
    content: [
      {
        label: "🍎 Les aliments",
        items: ["Fruits et plats aux couleurs variées", "Aliments du quotidien"],
      },
      {
        label: "🧸 Les jouets",
        items: ["Ballon", "Poupée", "Train", "Xylophone", "Voiture", "Cubes", "Figurines"],
      },
      {
        label: "👕 Les vêtements",
        items: ["Pull", "Pantalon", "Bottes", "Robe", "Uniforme", "Tenues traditionnelles"],
      },
      {
        label: "🌳 Les arbres",
        items: ["Différentes espèces", "Nouvelles associations de couleurs"],
      },
      {
        label: "🌍 Les couleurs du monde",
        items: ["Taj Mahal", "Maroc", "Forêt équatoriale", "Paris", "Sénégal"],
      },
    ],
    contentTitle: "5 univers — un cahier de coloriage progressif",
    pourQuiItems: [
      { icon: "🌱", text: "Votre enfant commence à découvrir ou à consolider les couleurs" },
      { icon: "🖼️", text: "Il aime apprendre avec des supports visuels" },
      { icon: "🧩", text: "Il a besoin d'activités simples et structurées" },
      { icon: "🖍️", text: "Il apprécie particulièrement le coloriage" },
      { icon: "🔁", text: "Les pages peuvent être proposées progressivement et répétées autant que nécessaire" },
      { icon: "🎯", text: "Vous accompagnez un enfant dans le cadre scolaire, en rééducation ou à domicile" },
    ],
    pourQuiNote: (
      <>
        👉 Ce cahier est particulièrement adapté aux enfants qui <strong>découvrent ou consolident les
        couleurs</strong>, qui ont besoin de <strong>supports visuels simples et structurés</strong>, et à tous
        ceux qui apprécient particulièrement le coloriage.
      </>
    ),
    pedagogie: {
      title: "Observer, reconnaître, reproduire, nommer, retrouver",
      desc: "L'enfant ne colorie pas simplement « comme il veut » : il observe le modèle, repère les différentes zones, associe chaque couleur à la bonne partie du dessin puis la reproduit. Cela permet de travailler simultanément les couleurs, le vocabulaire, l'attention visuelle, l'observation et la motricité fine.",
      items: [
        {
          icon: "🎨",
          title: "La reconnaissance et la mémorisation des couleurs",
          desc: "Chaque page associe un modèle en couleurs à un dessin à colorier, pour ancrer progressivement chaque couleur.",
        },
        {
          icon: "👁️",
          title: "L'observation et l'attention visuelle",
          desc: "Des indications visuelles simples aident l'enfant à repérer les zones à colorier avant de reproduire le modèle.",
        },
        {
          icon: "🧩",
          title: "L'association entre un modèle et sa reproduction",
          desc: "L'enfant apprend à associer chaque couleur à la bonne partie du dessin, une compétence clé avant de nommer et de généraliser.",
        },
      ],
    },
    activites: [
      {
        icon: "👁️",
        title: "Observer le modèle",
        desc: "Regarder ensemble les couleurs du modèle et les nommer avant de commencer à colorier.",
      },
      {
        icon: "🔍",
        title: "Chercher les couleurs",
        desc: "« Où vois-tu du rouge ? », « Quelle couleur a le tronc ? » — pour aiguiser l'observation.",
      },
      {
        icon: "🖍️",
        title: "Colorier en suivant le modèle",
        desc: "L'enfant retrouve les zones indiquées par les flèches et reproduit les couleurs du modèle.",
      },
      {
        icon: "🏠",
        title: "Faire le lien avec la vraie vie",
        desc: "« Est-ce que tu vois quelque chose de jaune autour de toi ? », « Ton pantalon est de quelle couleur ? »",
      },
    ],
    productResultats: [
      "Renforcer la reconnaissance et la mémorisation des couleurs",
      "Développer l'observation et l'attention visuelle",
      "Améliorer la motricité fine et la précision du geste",
      "Enrichir le vocabulaire et le langage",
      "Associer un modèle à sa reproduction",
      "Découvrir des objets, des végétaux, des vêtements et différents environnements",
    ],
  },
  {
    slug: 'transports',
    listingTitle: 'Je découvre les transports',
    listingSubtitle: 'Un cahier de coloriage pour reconnaître, nommer et explorer les moyens de transport.',
    imgPosition: 'center 30%',
    priceEur: 7.90,
    priceXof: 5200,
    color: '#f97316',
    colorLight: '#fff7ed',
    img: `${R2_IMAGES_BASE}/miniature_outils_transports.png`,
    title: "Je découvre",
    subtitle: "les transports",
    tagline: "Voiture, avion, bateau, train, moto… chaque véhicule devient une nouvelle occasion de reconnaître, nommer et progresser.",
    badge: "🚗 Cahier Transports",
    description: "Un cahier de coloriage et d'activités de 65 pages pour reconnaître, nommer et explorer les moyens de transport, et développer le vocabulaire, l'attention et la motricité fine.",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "📄", text: "Fichier PDF de 65 pages en haute définition" },
      { icon: "🖼️", text: "35 modèles de coloriage, en couleur et à compléter" },
      { icon: "📷", text: "24 photographies de moyens de transport avec leur nom" },
      { icon: "🗺️", text: "16 décors pour classer et mettre les véhicules en contexte" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après achat" },
    ],
    content: [
      {
        label: "🚗 Véhicules du quotidien",
        items: ["Voiture", "Bus", "Moto", "Avion", "Bateau", "Train", "Ambulance", "Camion de pompier", "Tracteur", "Tramway"],
      },
      {
        label: "🦸 Véhicules de héros et imaginaires",
        items: ["Voitures de super-héros", "Voiture dragon", "Voiture cosmique", "Navette stellaire", "Île volante", "Dirigeable fantastique"],
      },
      {
        label: "🌍 Transports d'Afrique",
        items: ["Car rapide", "Taxi-moto", "Pirogue traditionnelle", "Camion de marchandises", "Train transsaharien"],
      },
    ],
    contentTitle: "65 pages — coloriages, photographies et décors",
    pourQuiItems: [
      { icon: "🚙", text: "Votre enfant aime particulièrement les voitures, trains, avions ou autres moyens de transport" },
      { icon: "🔤", text: "Il commence à reconnaître certains véhicules, mais ne connaît pas encore leur nom" },
      { icon: "🧩", text: "Votre enfant a un retard de langage, un TSA, un TDL ou un TDA/H" },
      { icon: "✋", text: "Il a besoin d'améliorer sa motricité fine et la précision de ses gestes" },
      { icon: "🎯", text: "Il rencontre des difficultés pour rester concentré sur une activité" },
      { icon: "💬", text: "Vous cherchez un support simple pour encourager la communication et les échanges" },
    ],
    pourQuiNote: (
      <>
        👉 Cet outil est particulièrement adapté aux enfants <strong>passionnés de véhicules</strong>, avec{" "}
        <strong>retard de langage, TSA, TDL ou TDA/H</strong>, et à tous ceux qui ont besoin de supports
        ludiques pour enrichir leur vocabulaire.
      </>
    ),
    pedagogie: {
      title: "S'appuyer sur les centres d'intérêt pour donner envie d'apprendre",
      desc: "De nombreux enfants manifestent un intérêt particulier pour les véhicules. Le coloriage attire leur attention sur les caractéristiques du transport — forme, roues, couleurs, environnement — et le mot écrit les aide progressivement à relier l'image, le mot et sa signification.",
      items: [
        {
          icon: "🖍️",
          title: "Observer, colorier, nommer",
          desc: "Chaque véhicule est d'abord observé puis colorié en suivant son modèle, avant d'être nommé pour enrichir le vocabulaire.",
        },
        {
          icon: "🗺️",
          title: "Classer et associer à un environnement",
          desc: "L'enfant associe chaque véhicule au décor dans lequel il se déplace — route, port, aéroport, voie ferrée.",
        },
        {
          icon: "💬",
          title: "Imaginer et raconter",
          desc: "Les véhicules et décors servent de point de départ pour inventer de petites histoires et favoriser les échanges.",
        },
      ],
    },
    activites: [
      {
        icon: "🖍️",
        title: "Le coloriage avec modèle",
        desc: "Reproduire les couleurs d'un véhicule déjà colorié pour développer la coordination œil-main et l'attention aux détails.",
      },
      {
        icon: "🔀",
        title: "Le classement des moyens de transport",
        desc: "Regrouper les véhicules selon qu'ils roulent, volent, naviguent, ou interviennent en cas d'urgence.",
      },
      {
        icon: "🗺️",
        title: "L'association véhicule-environnement",
        desc: "Associer chaque véhicule au décor qui lui correspond — route, voie ferrée, port, aéroport, ciel ou mer.",
      },
      {
        icon: "❓",
        title: "Les devinettes",
        desc: "« Il vole dans le ciel et transporte des passagers. Qui est-ce ? » — pour travailler la compréhension et l'expression orale.",
      },
    ],
    productResultats: [
      "Reconnaître et nommer différents moyens de transport",
      "Enrichir son vocabulaire",
      "Développer sa motricité fine et sa coordination œil-main",
      "Améliorer sa concentration sur une activité",
      "Trier et catégoriser les véhicules",
      "Associer chaque transport à son environnement",
      "Participer plus facilement à un échange avec l'adulte",
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
  {
    slug: 'article_trisomie-21',
    title: 'La trisomie 21',
    subtitle: "Comprendre et accompagner la trisomie 21, de l'enfance à l'âge adulte, afin de favoriser l'autonomie à chaque étape de la vie.",
    tag: 'Article · PDF gratuit',
    img: `${R2_IMAGES_BASE}/miniature_trisomie-21.png`,
    imgPosition: 'center 0%',
    fileKey: 'ressources/article_trisomie-21.pdf',
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
