// lib/geo.ts
// Detects the customer's country and returns the appropriate payment gateway

import type { PaymentGateway } from "@prisma/client";

// Francophone African countries supported by PayDunia
const PAYDUNIA_COUNTRIES = new Set([
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
  return PAYDUNIA_COUNTRIES.has(normalized) ? "PAYDUNIA" : "STRIPE";
}

/**
 * Returns true if the country is served by PayDunia.
 * @param countryCode - ISO 3166-1 alpha-2 country code
 */
export function isPayduniaCountry(countryCode: string): boolean {
  return PAYDUNIA_COUNTRIES.has(countryCode.toUpperCase().trim());
}

/**
 * Returns the full list of PayDunia-supported country codes.
 */
export function getPayduniaCountries(): string[] {
  return Array.from(PAYDUNIA_COUNTRIES);
}
