import { escapeHtml } from "@/lib/escapeHtml";

const eurFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
const xofFormatter = new Intl.NumberFormat("fr-FR");

// XOF/XAF (CFA francs) have no minor unit — show whole amounts, unlike EUR.
// Matches the "fr-FR" + "FCFA" convention used for price display in lib/currency.ts.
export function formatAmount(amount: number, currency: string): string {
  if (currency === "XOF" || currency === "XAF") {
    return `${xofFormatter.format(amount)} FCFA`;
  }
  if (currency === "EUR") {
    return eurFormatter.format(amount);
  }
  return `${amount.toFixed(2)} ${escapeHtml(currency)}`;
}
