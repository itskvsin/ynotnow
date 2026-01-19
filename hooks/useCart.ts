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

      // Get cart ID from cookie
      if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";");
        const cartCookie = cookies.find((cookie) =>
          cookie.trim().startsWith("shopify_cart_id=")
        );
        if (cartCookie) {
          setCartId(cartCookie.split("=")[1] || null);
        }
      }
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
    isLoading,
    error,
    refresh: fetchCart,
  };
}

