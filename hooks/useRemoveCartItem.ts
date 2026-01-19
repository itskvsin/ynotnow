"use client";

import { useState } from "react";
import { removeCartItemAction } from "@/lib/actions/cart";

interface UseRemoveCartItemReturn {
  removeItem: (lineId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useRemoveCartItem(): UseRemoveCartItemReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeItem = async (lineId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { cart, error: actionError } = await removeCartItemAction(lineId);

      if (actionError || !cart) {
        throw new Error(actionError || "Failed to remove item from cart");
      }

      // Trigger cart refresh in other components
      window.dispatchEvent(new CustomEvent("cart-updated"));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to remove item from cart"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    removeItem,
    isLoading,
    error,
  };
}

