"use client";

import { useState } from "react";
import { addToCartAction } from "@/lib/actions/cart";

interface UseAddToCartReturn {
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useAddToCart(): UseAddToCartReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = async (variantId: string, quantity: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const { cart, error: actionError } = await addToCartAction(
        variantId,
        quantity
      );

      if (actionError || !cart) {
        throw new Error(actionError || "Failed to add item to cart");
      }

      // Trigger cart refresh in other components
      window.dispatchEvent(new CustomEvent("cart-updated"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to cart");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addItem,
    isLoading,
    error,
  };
}

