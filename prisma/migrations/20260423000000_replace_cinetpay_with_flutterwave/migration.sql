-- Replace CINETPAY with FLUTTERWAVE in the PaymentGateway enum

ALTER TYPE "PaymentGateway" RENAME VALUE 'CINETPAY' TO 'FLUTTERWAVE';
