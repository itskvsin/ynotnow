"use client";

const CART_ID_COOKIE = "shopify_cart_id";
const CART_ID_EXPIRY_DAYS = 30;

/**
 * Get cart ID from cookies (client-side)
 */
export function getCartId(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const cartCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${CART_ID_COOKIE}=`)
  );

  if (!cartCookie) return null;

  return cartCookie.split("=")[1] || null;
}

/**
 * Set cart ID in cookies (client-side)
 */
export function setCartId(cartId: string): void {
  if (typeof document === "undefined") return;

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + CART_ID_EXPIRY_DAYS);

  document.cookie = `${CART_ID_COOKIE}=${cartId}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Clear cart ID from cookies (client-side)
 */
export function clearCartId(): void {
  if (typeof document === "undefined") return;

  document.cookie = `${CART_ID_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

