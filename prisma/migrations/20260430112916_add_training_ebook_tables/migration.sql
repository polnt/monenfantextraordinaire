/*
  - Removes SHIPPED, DELIVERED from OrderStatus (were dropped from schema).
  - Replaces ProductType: PHYSICAL/DIGITAL rows become EBOOK, TRAINING stays.
  - Drops columns: Order.addressCity/Line1/Line2/PostalCode, Product.moodleCourseId/stock.
  - Creates tables: Training, Ebook (table-per-type extending Product).
  Avoids ALTER TYPE ADD VALUE + immediate use (unsafe in a transaction block);
  uses CREATE TYPE_new + USING CASE instead.
*/

-- Remove SHIPPED/DELIVERED from OrderStatus
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'REFUNDED');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new"
  USING (
    CASE "status"::text
      WHEN 'SHIPPED'   THEN 'PAID'::"OrderStatus_new"
      WHEN 'DELIVERED' THEN 'PAID'::"OrderStatus_new"
      ELSE "status"::text::"OrderStatus_new"
    END
  );
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING'::"OrderStatus";

-- Replace ProductType: PHYSICAL/DIGITAL → EBOOK
CREATE TYPE "ProductType_new" AS ENUM ('TRAINING', 'EBOOK');
ALTER TABLE "Product" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "type" TYPE "ProductType_new"
  USING (
    CASE "type"::text
      WHEN 'TRAINING' THEN 'TRAINING'::"ProductType_new"
      ELSE 'EBOOK'::"ProductType_new"
    END
  );
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "ProductType_old";

-- AlterTable: Order — drop shipping address columns
ALTER TABLE "Order"
  DROP COLUMN IF EXISTS "addressCity",
  DROP COLUMN IF EXISTS "addressLine1",
  DROP COLUMN IF EXISTS "addressLine2",
  DROP COLUMN IF EXISTS "addressPostalCode",
  ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable: OrderItem
ALTER TABLE "OrderItem" ALTER COLUMN "unitPrice" SET DATA TYPE DECIMAL(65,30);

-- AlterTable: Product — drop legacy columns
ALTER TABLE "Product"
  DROP COLUMN IF EXISTS "moodleCourseId",
  DROP COLUMN IF EXISTS "stock",
  ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- CreateTable: Training (extends Product via shared PK)
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "moodleCourseId" TEXT,
    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Ebook (extends Product via shared PK)
CREATE TABLE "Ebook" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT,
    CONSTRAINT "Ebook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_type_idx" ON "Product"("type");

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ebook" ADD CONSTRAINT "Ebook_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
