-- Replace FLUTTERWAVE with PAYDUNIA in the PaymentGateway enum

ALTER TYPE "PaymentGateway" RENAME VALUE 'FLUTTERWAVE' TO 'PAYDUNIA';
