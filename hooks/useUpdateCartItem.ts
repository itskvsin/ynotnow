"use client";

import { useState } from "react";
import { updateCartItemAction } from "@/lib/actions/cart";

interface UseUpdateCartItemReturn {
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useUpdateCartItem(): UseUpdateCartItemReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateItem = async (lineId: string, quantity: number) => {
    try {
      setIsLoading(true);
      setError(null);

      if (quantity < 1) {
        throw new Error("Quantity must be at least 1");
      }

      const { cart, error: actionError } = await updateCartItemAction(
        lineId,
        quantity
      );

      if (actionError || !cart) {
        throw new Error(actionError || "Failed to update cart item");
      }

      // Trigger cart refresh in other components
      window.dispatchEvent(new CustomEvent("cart-updated"));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update cart item"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateItem,
    isLoading,
    error,
  };
}

