'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface ProductData {
  id: string;
  name: string;
  price: number;
  currency: string;
}

interface Props {
  itemSlugs: readonly string[];
  price: string;
  style: React.CSSProperties;
  label?: string;
}

export function PackBuyButton({ itemSlugs, price, style, label }: Props): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuy = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const products = await Promise.all(
        itemSlugs.map(async (slug): Promise<ProductData | null> => {
          const res = await fetch(`/api/products/${slug}`);
          if (!res.ok) return null;
          return res.json() as Promise<ProductData>;
        })
      );

      if (products.some((p) => p === null)) {
        setError("Ce pack n'est pas disponible pour le moment.");
        return;
      }

      for (const product of products) {
        addToCart({
          productId: product!.id,
          name: product!.name,
          price: product!.price,
          currency: product!.currency,
        });
      }

      router.push('/checkout');
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => void handleBuy()}
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
