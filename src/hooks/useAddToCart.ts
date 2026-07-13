"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

interface ProductData {
  id: string;
  name: string;
  priceEur: number;
  priceXof: number | null;
}

interface UseAddToCartReturn {
  loading: boolean;
  error: string | null;
  addAndCheckout: (slug: string) => Promise<void>;
  addToCart: (slug: string) => Promise<void>;
}

export function useAddToCart(): UseAddToCartReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart: ctxAdd } = useCart();
  const router = useRouter();

  const fetchProduct = useCallback(async (slug: string): Promise<ProductData | null> => {
    const res = await fetch(`/api/products/${slug}`);
    if (!res.ok) return null;
    return res.json() as Promise<ProductData>;
  }, []);

  const addAndCheckout = useCallback(async (slug: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const product = await fetchProduct(slug);
      if (!product) {
        setError("Ce produit n'est pas disponible.");
        return;
      }
      ctxAdd({ productId: product.id, name: product.name, priceEur: product.priceEur, priceXof: product.priceXof });
      router.push("/checkout");
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }, [fetchProduct, ctxAdd, router]);

  const addToCart = useCallback(async (slug: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const product = await fetchProduct(slug);
      if (!product) {
        setError("Ce produit n'est pas disponible.");
        return;
      }
      ctxAdd({ productId: product.id, name: product.name, priceEur: product.priceEur, priceXof: product.priceXof });
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }, [fetchProduct, ctxAdd]);

  return { loading, error, addAndCheckout, addToCart };
}
