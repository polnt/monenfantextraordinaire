/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Ebook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ebook" DROP COLUMN "fileUrl",
ADD COLUMN     "fileKey" TEXT;
