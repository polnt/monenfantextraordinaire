'use client';

import React from 'react';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatPrice } from '@/lib/currency';

interface Props {
  productSlug: string;
  priceEur: number;
  priceXof?: number;
  style: React.CSSProperties;
  label?: string;
}

export function PackBuyButton({ productSlug, priceEur, priceXof, style, label }: Props): React.JSX.Element {
  const { addAndCheckout, loading, error } = useAddToCart();
  const { currency } = useCurrency();

  return (
    <div>
      <button
        onClick={() => void addAndCheckout(productSlug)}
        disabled={loading}
        className="mef-btn"
        style={{ ...style, opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
      >
        {loading ? 'Chargement…' : (label ?? `🔒 Acheter le pack — ${formatPrice(priceEur, priceXof ?? null, currency)}`)}
      </button>
      {error && (
        <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-aleo)', fontSize: 13, color: '#e74c3c' }}>
          {error}
        </p>
      )}
    </div>
  );
}
