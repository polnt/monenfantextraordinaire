-- Replace single-file Ebook.fileKey with a multi-file Ebook.fileKeys array,
-- so one product (e.g. a pack) can deliver more than one file.

-- AddColumn
ALTER TABLE "Ebook" ADD COLUMN "fileKeys" TEXT[] NOT NULL DEFAULT '{}';

-- Backfill existing single fileKey values into the new array column
UPDATE "Ebook" SET "fileKeys" = ARRAY["fileKey"] WHERE "fileKey" IS NOT NULL;

-- DropColumn
ALTER TABLE "Ebook" DROP COLUMN "fileKey";
