-- Rename Product.price -> Product.priceEur, drop the vestigial Product.currency
-- column (was always "EUR"), and add the new merchant-set Product.priceXof.
ALTER TABLE "Product" RENAME COLUMN "price" TO "priceEur";
ALTER TABLE "Product" DROP COLUMN "currency";
ALTER TABLE "Product" ADD COLUMN "priceXof" DECIMAL(65,30);
