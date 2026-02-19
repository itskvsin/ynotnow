"use client";

import { useState, useEffect, useMemo } from "react";
import { transformCart } from "@/lib/commerce-adapters";
import type { ShopifyCart } from "@/lib/shopify";
import type { CartItem, CartSummary } from "@/types/cart";

interface UseCartReturn {
  items: CartItem[];
  summary: CartSummary;
  cartId: string | null;
  checkoutUrl: string | null;
  discountCodes?: Array<{ code: string; applicable: boolean }>;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { getCartAction } = await import("@/lib/actions/cart");
      const { cart: cartData, error: actionError } = await getCartAction();

      if (actionError) {
        throw new Error(actionError);
      }

      setCart(cartData);
      setCheckoutUrl(cartData?.checkoutUrl || null);
      setCartId(cartData?.id || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cart");
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();

    // Listen for cart update events
    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  // Memoize the transformation to avoid recalculating on every render
  const { items, summary } = useMemo(
    () => transformCart(cart),
    [cart]
  );

  return {
    items,
    summary,
    cartId,
    checkoutUrl,
    discountCodes: cart?.discountCodes || [],
    isLoading,
    error,
    refresh: fetchCart,
  };
}

