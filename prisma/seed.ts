import 'dotenv/config';
import { PrismaClient, ProductType, AccessType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

// Mirrored from src/lib/catalog.tsx — keep in sync manually
type FormationSeed = {
  slug: string;
  name: string;
  description: string;
  price: number;
  priceXof?: number;
  active: boolean;
  moodleCourseId?: number;
};

const FORMATIONS: FormationSeed[] = [
  {
    slug: 'accompagner-mon-enfant-autiste',
    name: "Formation 1: Accompagner l'émergence des premiers mots",
    description: "La formation phare pour faire émerger les premiers mots. Construisez les bases de son langage en 15 minutes par jour.",
    price: 119,
    priceXof: 77000,
    active: true,
    moodleCourseId: 4,
  },
  {
    slug: 'developper-la-communication-verbale',
    name: 'Formation 2: Développer la communication verbale',
    description: "Découvrez comment l'aider à trouver ses mots pour que chacun comprenne",
    price: 67,
    priceXof: 43500,
    active: false, // disabled in catalog
  },
  {
    slug: 'comprendre-le-developpement-du-langage',
    name: 'Formation 3: Comprendre le développement du langage',
    description: 'Comprendre les clés essentielles du développement du langage.',
    price: 49,
    priceXof: 32000,
    active: false, // disabled in catalog
  },
] as const;

// The "avec accompagnement personnalisé" upsell for a formation — a real,
// purchasable Product in its own right (not a discount on the base formation).
type FormationAddonSeed = {
  slug: string;
  name: string;
  description: string;
  price: number;
  priceXof?: number;
  moodleCourseId?: number;
};

const FORMATION_ADDONS: FormationAddonSeed[] = [
  {
    slug: 'accompagner-mon-enfant-autiste-accompagne',
    name: "Formation 1 avec accompagnement personnalisé",
    description: "La formation complète, accompagnée de séances individuelles et d'une masterclass en direct avec Laurence Bugnet, psychologue spécialiste TSA.",
    price: 269,
    priceXof: 174500,
    moodleCourseId: 4,
  },
];

type OutilSeed = {
  slug: string;
  name: string;
  description: string;
  price: number;
  priceXof?: number;
  // R2 object keys for this outil's own file(s) — empty until the PDF is uploaded.
  // Packs derive their fileKeys from their constituent outils, so filling this
  // in here also equips any pack that bundles this outil.
  fileKeys: string[];
};

const OUTILS: OutilSeed[] = [
  {
    slug: 'legumes-photos',
    name: 'Je découvre les fruits et légumes en photos',
    description: "Un outil pédagogique conçu pour aider votre enfant à nommer, reconnaître et généraliser les fruits et légumes grâce à des photographies du monde réel.",
    price: 7.90,
    priceXof: 5000,
    fileKeys: ['outils/outils_legume-photos.pdf'],
  },
  {
    slug: 'legumes-illustrations',
    name: 'Je découvre les fruits et légumes en illustrations',
    description: "Un outil pédagogique qui permet à votre enfant de comprendre qu'une illustration et une photo représentent le même objet — une compétence clé pour le développement du langage.",
    price: 7.90,
    priceXof: 5000,
    fileKeys: ['outils/outils_legumes-illustrations.pdf'],
  },
  {
    slug: 'animaux',
    name: 'Je découvre les animaux en photos et en illustrations',
    description: "Un outil complet qui combine photos réelles et illustrations pour aider votre enfant à reconnaître et nommer les animaux, quelle que soit la représentation visuelle.",
    price: 14.90,
    priceXof: 10000,
    fileKeys: ['outils/outils_animaux.pdf'],
  },
  {
    slug: 'bonhomme-dessin',
    name: 'Apprendre à dessiner mon premier bonhomme',
    description: "Un livret progressif pour apprendre à dessiner un bonhomme étape par étape — tout en développant le schéma corporel, la motricité fine et la confiance en soi.",
    price: 12.90,
    priceXof: 8500,
    fileKeys: ['outils/outils_bonhomme-dessin.pdf'],
  },
  {
    slug: 'cahier-coloriage',
    name: 'Cahier de coloriage éducatif et inclusif',
    description: "Un cahier de coloriage spécialement conçu pour les enfants à besoins spécifiques. Des illustrations simples d'animaux, des modèles en couleur à reproduire, et des activités adaptées au rythme de chaque enfant.",
    price: 5.90,
    priceXof: 3500,
    fileKeys: ['outils/outils_animaux-coloriage.pdf'],
  },
];

// Bundles of 2 outils sold together at a reduced price — mirrored from PACKS in
// src/lib/catalog.tsx. fileKeys are derived from the constituent outils above,
// so a pack automatically picks up both files once each outil's fileKeys is set.
type PackSeed = {
  slug: string;
  name: string;
  description: string;
  price: number;
  priceXof?: number;
  itemSlugs: [string, string];
};

const PACKS: PackSeed[] = [
  {
    slug: 'pack-legumes',
    name: 'Je découvre les fruits et légumes — Pack Photos + Illustrations',
    description: "Les deux formats réunis pour ancrer chaque mot dans la vraie vie — et dans l'imaginaire.",
    price: 11.90,
    priceXof: 8000,
    itemSlugs: ['legumes-photos', 'legumes-illustrations'],
  },
  {
    slug: 'pack-animaux',
    name: 'Je découvre les animaux — Pack Complet + Coloriage',
    description: "Reconnaître, nommer et colorier les animaux — pour ancrer le vocabulaire par le jeu et la manipulation.",
    price: 17.90,
    priceXof: 12000,
    itemSlugs: ['animaux', 'cahier-coloriage'],
  },
];

const RESSOURCES = [
  {
    slug: 'article_developpement-langage',
    name: "Le développement du langage chez l'enfant",
    description: 'Comprendre les grandes étapes de la naissance à 6 ans',
    fileKey: 'ressources/article_developpement-langage.pdf',
  },
  {
    slug: 'article_retards-troubles-langage',
    name: 'Différence entre retard et troubles du langage',
    description: "Comprendre, distinguer et repérer les types de difficultés dans l'acquisition du langage pour adopter un accompagnement adapté",
    fileKey: 'ressources/article_retards-troubles-langage.pdf',
  },
  {
    slug: 'article_profil-sensoriel-autiste',
    name: 'La sensorialité',
    description: 'Comprendre le monde avec ses 5 sens',
    fileKey: 'ressources/article_profil-sensoriel-autiste.pdf',
  },
] as const;

// Lead magnet — delivered by email via LeadMagnet component
const BONUS = [
  {
    slug: 'bonus-mini-astuces',
    name: 'Mini astuces pour développer le langage',
    description: 'Astuces concrètes, rapides et efficaces pour stimuler le langage au quotidien.',
    fileKey: 'bonus/bonus_developper-langage.pdf',
  },
] as const;

async function main(): Promise<void> {
  for (const p of FORMATIONS) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        priceEur: p.price,
        priceXof: p.priceXof ?? null,
        active: p.active,
        training: { update: { moodleCourseId: p.moodleCourseId ?? null } },
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        priceEur: p.price,
        priceXof: p.priceXof ?? null,
        type: ProductType.TRAINING,
        accessType: AccessType.PAID,
        active: p.active,
        training: { create: { moodleCourseId: p.moodleCourseId ?? null } },
      },
    });
    console.log(`  [FORMATION] slug=${product.slug}  price=${product.priceEur} EUR / ${product.priceXof ?? '—'} FCFA  active=${product.active}`);
  }

  for (const p of FORMATION_ADDONS) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        priceEur: p.price,
        priceXof: p.priceXof ?? null,
        training: { update: { moodleCourseId: p.moodleCourseId ?? null } },
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        priceEur: p.price,
        priceXof: p.priceXof ?? null,
        type: ProductType.TRAINING,
        accessType: AccessType.PAID,
        active: true,
        training: { create: { moodleCourseId: p.moodleCourseId ?? null } },
      },
    });
    console.log(`  [ADDON]     slug=${product.slug}  price=${product.priceEur} EUR / ${product.priceXof ?? '—'} FCFA`);
  }

  for (const p of OUTILS) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        priceEur: p.price,
        priceXof: p.priceXof ?? null,
        ebook: { update: { fileKeys: p.fileKeys } },
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        priceEur: p.price,
        priceXof: p.priceXof ?? null,
        type: ProductType.EBOOK,
        accessType: AccessType.PAID,
        active: true,
        ebook: { create: { fileKeys: p.fileKeys } },
      },
    });
    console.log(`  [OUTIL]     slug=${product.slug}  price=${product.priceEur} EUR / ${product.priceXof ?? '—'} FCFA`);
  }

  for (const p of PACKS) {
    const fileKeys = p.itemSlugs.flatMap(
      (slug) => OUTILS.find((o) => o.slug === slug)?.fileKeys ?? []
    );
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        priceEur: p.price,
        priceXof: p.priceXof ?? null,
        ebook: { update: { fileKeys } },
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        priceEur: p.price,
        priceXof: p.priceXof ?? null,
        type: ProductType.EBOOK,
        accessType: AccessType.PAID,
        active: true,
        ebook: { create: { fileKeys } },
      },
    });
    console.log(`  [PACK]      slug=${product.slug}  price=${product.priceEur} EUR / ${product.priceXof ?? '—'} FCFA  files=${fileKeys.length}`);
  }

  for (const p of [...RESSOURCES, ...BONUS]) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        ebook: { update: { fileKeys: [p.fileKey] } },
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        priceEur: 0,
        type: ProductType.EBOOK,
        accessType: AccessType.FREE_DIRECT,
        active: true,
        ebook: { create: { fileKeys: [p.fileKey] } },
      },
    });
    console.log(`  [GRATUIT]   slug=${product.slug}  fileKey=${p.fileKey}`);
  }

  console.log('\nSeed OK');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
