"use server";

import { cookies } from "next/headers";
import {
  createCart,
  getCart,
  addToCart,
  updateCartItems,
  removeFromCart,
  type CartLineInput,
  type CartLineUpdateInput,
} from "@/lib/shopify";

const CART_ID_COOKIE = "shopify_cart_id";
const CART_ID_EXPIRY_DAYS = 30;

/**
 * Get cart ID from server-side cookies
 */
async function getCartIdFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_ID_COOKIE)?.value || null;
}

/**
 * Set cart ID in server-side cookies
 */
async function setCartIdInCookies(cartId: string): Promise<void> {
  const cookieStore = await cookies();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + CART_ID_EXPIRY_DAYS);

  cookieStore.set(CART_ID_COOKIE, cartId, {
    expires: expiryDate,
    path: "/",
    sameSite: "lax",
    httpOnly: true, // Secure cookie, server-only access
  });
}

/**
 * Clear cart ID from server-side cookies
 */
async function clearCartIdFromCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CART_ID_COOKIE);
}

/**
 * Server Action: Fetch cart
 */
export async function getCartAction() {
  try {
    const cartId = await getCartIdFromCookies();

    if (!cartId) {
      return { cart: null };
    }

    const cart = await getCart(cartId);

    if (!cart) {
      // Cart doesn't exist, clear the cookie
      await clearCartIdFromCookies();
      return { cart: null };
    }

    return { cart };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { cart: null, error: "Failed to fetch cart" };
  }
}

/**
 * Server Action: Create cart
 */
export async function createCartAction() {
  try {
    const cartId = await createCart();
    await setCartIdInCookies(cartId);
    const cart = await getCart(cartId);
    return { cart, error: null };
  } catch (error) {
    console.error("Error creating cart:", error);
    return { cart: null, error: "Failed to create cart" };
  }
}

/**
 * Server Action: Add items to cart
 */
export async function addToCartAction(
  variantId: string,
  quantity: number = 1
) {
  try {
    let cartId = await getCartIdFromCookies();

    if (!cartId) {
      // Create new cart if none exists
      cartId = await createCart();
      await setCartIdInCookies(cartId);
    }

    const lines: CartLineInput[] = [
      {
        merchandiseId: variantId,
        quantity,
      },
    ];

    const cart = await addToCart(cartId, lines);
    return { cart, error: null };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { cart: null, error: "Failed to add item to cart" };
  }
}

/**
 * Server Action: Update cart item quantity
 */
export async function updateCartItemAction(lineId: string, quantity: number) {
  try {
    const cartId = await getCartIdFromCookies();

    if (!cartId) {
      return { cart: null, error: "No cart found" };
    }

    if (quantity < 1) {
      return { cart: null, error: "Quantity must be at least 1" };
    }

    const lines: CartLineUpdateInput[] = [{ id: lineId, quantity }];
    const cart = await updateCartItems(cartId, lines);
    return { cart, error: null };
  } catch (error) {
    console.error("Error updating cart:", error);
    return { cart: null, error: "Failed to update cart item" };
  }
}

/**
 * Server Action: Remove item from cart
 */
export async function removeCartItemAction(lineId: string) {
  try {
    const cartId = await getCartIdFromCookies();

    if (!cartId) {
      return { cart: null, error: "No cart found" };
    }

    const cart = await removeFromCart(cartId, [lineId]);

    // If cart is empty, clear the cookie
    if (cart.totalQuantity === 0) {
      await clearCartIdFromCookies();
    }

    return { cart, error: null };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { cart: null, error: "Failed to remove item from cart" };
  }
}

