import { escapeHtml } from "@/lib/escapeHtml";

// XOF/XAF (CFA francs) have no minor unit — show whole amounts, unlike EUR.
export function formatAmount(amount: number, currency: string): string {
  const isZeroDecimal = currency === "XOF" || currency === "XAF";
  return `${amount.toFixed(isZeroDecimal ? 0 : 2)} ${escapeHtml(currency)}`;
}
