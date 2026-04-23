import 'dotenv/config';
import { PrismaClient, ProductType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

async function main(): Promise<void> {
  const physical = await db.product.upsert({
    where: { slug: "test-produit-physique" },
    update: {},
    create: {
      slug: "test-produit-physique",
      name: "Produit Test (Physique)",
      description: "Produit physique pour tester le flux Stripe.",
      price: 19.99,
      currency: "EUR",
      type: ProductType.PHYSICAL,
      stock: 100,
      active: true,
    },
  });

  const digital = await db.product.upsert({
    where: { slug: "test-produit-digital" },
    update: {},
    create: {
      slug: "test-produit-digital",
      name: "Produit Test (Digital)",
      description: "Produit digital pour tester le flux Stripe.",
      price: 9.99,
      currency: "EUR",
      type: ProductType.DIGITAL,
      stock: null,
      active: true,
    },
  });

  console.log("Seed OK:");
  console.log(`  [PHYSICAL] id=${physical.id}  price=${physical.price} EUR`);
  console.log(`  [DIGITAL]  id=${digital.id}  price=${digital.price} EUR`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
