-- DropIndex
DROP INDEX "Order_paymentId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "Order"("paymentId");
