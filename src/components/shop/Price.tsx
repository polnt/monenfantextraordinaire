"use client";

import { useCurrency } from "@/contexts/CurrencyContext";
import { formatPrice } from "@/lib/currency";

interface PriceProps {
  eur: number;
  xof?: number;
}

export function Price({ eur, xof }: PriceProps): React.JSX.Element {
  const { currency } = useCurrency();
  return <>{formatPrice(eur, xof ?? null, currency)}</>;
}
