// lib/currency.ts
// Shared EUR/FCFA price formatting for display purposes across the site.
// The customer's actual charged currency (EUR via Stripe, XOF/XAF via
// PayDunya) is always re-derived from the DB at checkout time — this is
// purely for how prices are shown while browsing.

export type Currency = "EUR" | "XOF";

const eurFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
const xofFormatter = new Intl.NumberFormat("fr-FR");

/**
 * Formats a price for display. Falls back to EUR whenever the FCFA amount
 * isn't available for a given product (e.g. formations without a set price).
 */
export function formatPrice(
  amountEur: number,
  amountXof: number | null | undefined,
  currency: Currency
): string {
  if (currency === "XOF" && amountXof !== null && amountXof !== undefined) {
    return `${xofFormatter.format(amountXof)} FCFA`;
  }
  return eurFormatter.format(amountEur);
}
