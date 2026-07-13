-- Fix the "Paydunia" typo (correct spelling is "Paydunya") in the PaymentGateway enum

ALTER TYPE "PaymentGateway" RENAME VALUE 'PAYDUNIA' TO 'PAYDUNYA';
