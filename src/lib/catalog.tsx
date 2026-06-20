import React from 'react';

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

export interface Formation {
  slug: string;
  title: string;
  modules: string;
  hours: string;
  level: string;
  desc: string;
  price: string;
  color: string;
  popular: boolean;
  disabled: boolean;
  img: string;
  imgPosition: string;
  imgHeight: number;
}

export const FORMATIONS: Formation[] = [
  {
    slug: 'accompagner-mon-enfant-autiste',
    title: 'Formation 1: Accompagner l\'émergence des premiers mots',
    modules: '4 modules',
    hours: '12h',
    level: 'Débutant',
    desc: "La formation phare pour faire émerger les premiers mots. Construisez les bases de son langage en 15 minutes par jour.",
    price: '119 €',
    color: '#0792dc',
    popular: true,
    disabled: false,
    img: '/visuel-formation.png',
    imgPosition: 'center top',
    imgHeight: 280,
  },
  {
    slug: 'developper-la-communication-verbale',
    title: 'Formation 2: Développer la communication verbale',
    modules: '4 modules',
    hours: '14h',
    level: 'Débutant',
    desc: "Découvrez comment l'aider à trouver ses mots pour que ... comprenne",
    price: '67 €',
    color: '#27ae60',
    popular: false,
    disabled: true,
    img: '/uploads/formation2.png',
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
    price: '49 €',
    color: '#F90021',
    popular: false,
    disabled: true,
    img: '/uploads/formation3.png',
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
  price: string;
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
  contentTitle?: string;
  pourQuiItems?: Inclus[];
  pourQuiNote?: React.ReactNode;
  pedagogie?: { title: string; desc: string; items: PedagogieItem[] };
  activites?: PedagogieItem[];
  productResultats?: string[];
}

export const OUTILS: OutilProduct[] = [
  {
    slug: 'legumes-photos',
    listingTitle: 'Je découvre les fruits et légumes en photos',
    listingSubtitle: "Parce que chaque mot appris rapproche votre enfant du monde qui l'entoure.",
    imgPosition: 'center 30%',
    price: '7,90 €',
    color: '#0792dc',
    colorLight: '#e8f4fd',
    img: '/uploads/miniature_outils_legumes_photo.png',
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
  },
  {
    slug: 'legumes-illustrations',
    listingTitle: 'Je découvre les fruits et légumes en illustrations',
    listingSubtitle: "Parce que chaque mot appris rapproche votre enfant du monde qui l'entoure.",
    imgPosition: 'center 30%',
    price: '7,90 €',
    color: '#27ae60',
    colorLight: '#e8f5e9',
    img: '/uploads/miniature_outils_legume_illustration.png',
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
  },
  {
    slug: 'animaux',
    listingTitle: 'Je découvre les animaux en photos et en illustrations',
    listingSubtitle: 'Et si votre enfant comprenait enfin que les images représentent le monde réel ?',
    imgPosition: 'center 30%',
    price: '14,90 €',
    color: '#ff7043',
    colorLight: '#fff3e0',
    img: '/uploads/miniature_outils_animaux-images-photo.png',
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
  },
  {
    slug: 'bonhomme-dessin',
    listingTitle: 'Apprendre à dessiner mon premier bonhomme',
    listingSubtitle: 'Un livret progressif pour développer le schéma corporel et la confiance en soi.',
    imgPosition: 'center 30%',
    price: '12,90 €',
    color: '#9333ea',
    colorLight: '#f5f3ff',
    img: '/uploads/miniature_outils_bonhomme-dessin.png',
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
    price: '9,90 €',
    color: '#f59e0b',
    colorLight: '#fffbeb',
    img: '/uploads/miniature_outils_animaux-coloriage.png',
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
// Ressources
// ─────────────────────────────────────────────────

export interface Ressource {
  title: string;
  subtitle: string;
  tag: string;
  img: string;
  imgPosition: string;
  pdf: string;
}

export const RESSOURCES: Ressource[] = [
  {
    title: "Le développement du langage chez l'enfant",
    subtitle: 'Comprendre les grandes étapes de la naissance à 6 ans',
    tag: 'Article · PDF gratuit',
    img: '/uploads/miniature_developpement-langage.png',
    imgPosition: 'center 0%',
    pdf: '/ressources/article_developpement-langage.pdf',
  },
  {
    title: 'Différence entre retard et troubles du langage',
    subtitle: "Comprendre, distinguer et repérer les types de difficultés dans l'acquisition du langage pour adopter un accompagnement adapté",
    tag: 'Article · PDF gratuit',
    img: '/uploads/miniature_retards-troubles-langage.png',
    imgPosition: 'center 0%',
    pdf: '/ressources/article_retards-troubles-langage.pdf',
  },
  {
    title: 'La sensorialité',
    subtitle: 'Comprendre le monde avec ses 5 sens',
    tag: 'Article · PDF gratuit',
    img: '/uploads/miniature_profil-sensoriel-autiste.png',
    imgPosition: 'center 30%',
    pdf: '/ressources/article_profil-sensoriel-autiste.pdf',
  },
];
