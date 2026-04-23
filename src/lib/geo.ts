// lib/geo.ts
// Detects the customer's country and returns the appropriate payment gateway

import type { PaymentGateway } from "@prisma/client";

// Francophone African countries supported by Flutterwave
const FLUTTERWAVE_COUNTRIES = new Set([
  "CI", // Côte d'Ivoire
  "SN", // Sénégal
  "CM", // Cameroun
  "ML", // Mali
  "TG", // Togo
  "BF", // Burkina Faso
  "BJ", // Bénin
  "GN", // Guinée
]);

/**
 * Returns the appropriate payment gateway based on the customer's country.
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g. "FR", "SN")
 * @returns PaymentGateway enum value
 */
export function getPaymentGateway(countryCode: string): PaymentGateway {
  const normalized = countryCode.toUpperCase().trim();
  return FLUTTERWAVE_COUNTRIES.has(normalized) ? "FLUTTERWAVE" : "STRIPE";
}

/**
 * Returns true if the country is served by Flutterwave.
 * @param countryCode - ISO 3166-1 alpha-2 country code
 */
export function isFlutterwaveCountry(countryCode: string): boolean {
  return FLUTTERWAVE_COUNTRIES.has(countryCode.toUpperCase().trim());
}

/**
 * Returns the full list of Flutterwave-supported country codes.
 */
export function getFlutterwaveCountries(): string[] {
  return Array.from(FLUTTERWAVE_COUNTRIES);
}
