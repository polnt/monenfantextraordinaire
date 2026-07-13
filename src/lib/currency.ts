// lib/currency.ts
// Shared EUR/FCFA price formatting for display purposes across the site.
// The customer's actual charged currency (EUR via Stripe, XOF/XAF via
// PayDunya) is always re-derived from the DB at checkout time — this is
// purely for how prices are shown while browsing.

export type Currency = "EUR" | "XOF";

// CFA franc treaty peg, used as a fallback for products without a
// merchant-set priceXof (e.g. formations that haven't been priced in FCFA
// yet). Must match the rate used by getPaydunyaUnitAmount in lib/paydunya.ts
// so the displayed price always matches what the customer is actually
// charged at checkout.
export const EUR_TO_XOF_RATE = 655.957;

const eurFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
const xofFormatter = new Intl.NumberFormat("fr-FR");

/**
 * Formats a price for display. When browsing in XOF and no merchant-set
 * FCFA price is available, converts the EUR price via the treaty peg so the
 * displayed amount matches what PayDunya will actually charge.
 */
export function formatPrice(
  amountEur: number,
  amountXof: number | null | undefined,
  currency: Currency
): string {
  if (currency === "XOF") {
    const xof = amountXof ?? Math.round(amountEur * EUR_TO_XOF_RATE);
    return `${xofFormatter.format(xof)} FCFA`;
  }
  return eurFormatter.format(amountEur);
}
