-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('PAID', 'FREE_DIRECT');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "accessType" "AccessType" NOT NULL DEFAULT 'PAID';
