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
  active: boolean;
  moodleCourseId?: number;
};

const FORMATIONS: FormationSeed[] = [
  {
    slug: 'accompagner-mon-enfant-autiste',
    name: "Formation 1: Accompagner l'émergence des premiers mots",
    description: "La formation phare pour faire émerger les premiers mots. Construisez les bases de son langage en 15 minutes par jour.",
    price: 119,
    active: true,
    moodleCourseId: 4,
  },
  {
    slug: 'developper-la-communication-verbale',
    name: 'Formation 2: Développer la communication verbale',
    description: "Découvrez comment l'aider à trouver ses mots pour que chacun comprenne",
    price: 67,
    active: false, // disabled in catalog
  },
  {
    slug: 'comprendre-le-developpement-du-langage',
    name: 'Formation 3: Comprendre le développement du langage',
    description: 'Comprendre les clés essentielles du développement du langage.',
    price: 49,
    active: false, // disabled in catalog
  },
] as const;

const OUTILS = [
  {
    slug: 'legumes-photos',
    name: 'Je découvre les fruits et légumes en photos',
    description: "Un outil pédagogique conçu pour aider votre enfant à nommer, reconnaître et généraliser les fruits et légumes grâce à des photographies du monde réel.",
    price: 7.90,
  },
  {
    slug: 'legumes-illustrations',
    name: 'Je découvre les fruits et légumes en illustrations',
    description: "Un outil pédagogique qui permet à votre enfant de comprendre qu'une illustration et une photo représentent le même objet — une compétence clé pour le développement du langage.",
    price: 7.90,
  },
  {
    slug: 'animaux',
    name: 'Je découvre les animaux en photos et en illustrations',
    description: "Un outil complet qui combine photos réelles et illustrations pour aider votre enfant à reconnaître et nommer les animaux, quelle que soit la représentation visuelle.",
    price: 14.90,
  },
  {
    slug: 'bonhomme-dessin',
    name: 'Apprendre à dessiner mon premier bonhomme',
    description: "Un livret progressif pour apprendre à dessiner un bonhomme étape par étape — tout en développant le schéma corporel, la motricité fine et la confiance en soi.",
    price: 12.90,
  },
  {
    slug: 'cahier-coloriage',
    name: 'Cahier de coloriage éducatif et inclusif',
    description: "Un cahier de coloriage spécialement conçu pour les enfants à besoins spécifiques. Des illustrations simples d'animaux, des modèles en couleur à reproduire, et des activités adaptées au rythme de chaque enfant.",
    price: 9.90,
  },
] as const;

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
    fileKey: 'bonus/bonus-developper-langage.pdf',
  },
] as const;

async function main(): Promise<void> {
  for (const p of FORMATIONS) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        price: p.price,
        active: p.active,
        training: { update: { moodleCourseId: p.moodleCourseId ?? null } },
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        currency: 'EUR',
        type: ProductType.TRAINING,
        accessType: AccessType.PAID,
        active: p.active,
        training: { create: { moodleCourseId: p.moodleCourseId ?? null } },
      },
    });
    console.log(`  [FORMATION] slug=${product.slug}  price=${product.price} EUR  active=${product.active}`);
  }

  for (const p of OUTILS) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: { name: p.name, description: p.description, price: p.price },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        currency: 'EUR',
        type: ProductType.EBOOK,
        accessType: AccessType.PAID,
        active: true,
        ebook: { create: { fileKey: null } },
      },
    });
    console.log(`  [OUTIL]     slug=${product.slug}  price=${product.price} EUR`);
  }

  for (const p of [...RESSOURCES, ...BONUS]) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        ebook: { update: { fileKey: p.fileKey } },
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: 0,
        currency: 'EUR',
        type: ProductType.EBOOK,
        accessType: AccessType.FREE_DIRECT,
        active: true,
        ebook: { create: { fileKey: p.fileKey } },
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
