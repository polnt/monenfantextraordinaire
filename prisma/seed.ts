import 'dotenv/config';
import { PrismaClient, ProductType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

async function main(): Promise<void> {
  // Ebook product
  const ebookProduct = await db.product.upsert({
    where: { slug: "test-ebook" },
    update: {},
    create: {
      slug: "test-ebook",
      name: "Ebook Test",
      description: "Ebook PDF pour tester le flux Stripe.",
      price: 9.99,
      currency: "EUR",
      type: ProductType.EBOOK,
      active: true,
      ebook: { create: { fileUrl: null } },
    },
  });
  await db.ebook.upsert({
    where: { id: ebookProduct.id },
    update: {},
    create: { id: ebookProduct.id, fileUrl: null },
  });

  // Cahier de coloriage
  const coloringProduct = await db.product.upsert({
    where: { slug: "cahier-coloriage" },
    update: {},
    create: {
      slug: "cahier-coloriage",
      name: "Cahier de coloriage éducatif et inclusif",
      description: "Un cahier de coloriage avec modèles en couleur, adapté aux enfants à besoins spécifiques.",
      price: 9.90,
      currency: "EUR",
      type: ProductType.EBOOK,
      active: true,
      ebook: { create: { fileUrl: null } },
    },
  });
  await db.ebook.upsert({
    where: { id: coloringProduct.id },
    update: {},
    create: { id: coloringProduct.id, fileUrl: null },
  });

  // Training product
  const trainingProduct = await db.product.upsert({
    where: { slug: "test-formation" },
    update: {},
    create: {
      slug: "test-formation",
      name: "Formation Test",
      description: "Formation pour tester le flux Moodle.",
      price: 49.99,
      currency: "EUR",
      type: ProductType.TRAINING,
      active: true,
      training: { create: { moodleCourseId: null } },
    },
  });
  await db.training.upsert({
    where: { id: trainingProduct.id },
    update: {},
    create: { id: trainingProduct.id, moodleCourseId: null },
  });

  console.log("Seed OK:");
  console.log(`  [EBOOK]    id=${ebookProduct.id}    price=${ebookProduct.price} EUR`);
  console.log(`  [EBOOK]    id=${coloringProduct.id} price=${coloringProduct.price} EUR  (cahier-coloriage)`);
  console.log(`  [TRAINING] id=${trainingProduct.id} price=${trainingProduct.price} EUR`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
