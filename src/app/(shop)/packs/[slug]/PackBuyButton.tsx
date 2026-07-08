'use client';

import React from 'react';
import { useAddToCart } from '@/hooks/useAddToCart';

interface Props {
  productSlug: string;
  price: string;
  style: React.CSSProperties;
  label?: string;
}

export function PackBuyButton({ productSlug, price, style, label }: Props): React.JSX.Element {
  const { addAndCheckout, loading, error } = useAddToCart();

  return (
    <div>
      <button
        onClick={() => void addAndCheckout(productSlug)}
        disabled={loading}
        className="mef-btn"
        style={{ ...style, opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
      >
        {loading ? 'Chargement…' : (label ?? `🔒 Acheter le pack — ${price}`)}
      </button>
      {error && (
        <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-aleo)', fontSize: 13, color: '#e74c3c' }}>
          {error}
        </p>
      )}
    </div>
  );
}
