import { NextRequest, NextResponse } from "next/server";
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
function getCartIdFromCookies(): string | null {
  const cookieStore = cookies();
  return cookieStore.get(CART_ID_COOKIE)?.value || null;
}

/**
 * Set cart ID in server-side cookies
 */
function setCartIdInCookies(cartId: string): void {
  const cookieStore = cookies();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + CART_ID_EXPIRY_DAYS);

  cookieStore.set(CART_ID_COOKIE, cartId, {
    expires: expiryDate,
    path: "/",
    sameSite: "lax",
    httpOnly: false, // Allow client-side access
  });
}

/**
 * Clear cart ID from server-side cookies
 */
function clearCartIdFromCookies(): void {
  const cookieStore = cookies();
  cookieStore.delete(CART_ID_COOKIE);
}

// GET - Fetch cart
export async function GET() {
  try {
    const cartId = getCartIdFromCookies();

    if (!cartId) {
      return NextResponse.json({ cart: null });
    }

    const cart = await getCart(cartId);

    if (!cart) {
      // Cart doesn't exist, clear the cookie
      clearCartIdFromCookies();
      return NextResponse.json({ cart: null });
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// POST - Create cart or add items
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, lines } = body;

    if (action === "create") {
      const cartId = await createCart();
      setCartIdInCookies(cartId);
      const cart = await getCart(cartId);
      return NextResponse.json({ cart });
    }

    if (action === "add") {
      const cartId = getCartIdFromCookies();

      if (!cartId) {
        // Create new cart if none exists
        const newCartId = await createCart();
        setCartIdInCookies(newCartId);
        const cart = await addToCart(newCartId, lines as CartLineInput[]);
        return NextResponse.json({ cart });
      }

      const cart = await addToCart(cartId, lines as CartLineInput[]);
      return NextResponse.json({ cart });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in cart POST:", error);
    return NextResponse.json(
      { error: "Failed to process cart request" },
      { status: 500 }
    );
  }
}

// PUT - Update cart items
export async function PUT(request: NextRequest) {
  try {
    const cartId = getCartIdFromCookies();

    if (!cartId) {
      return NextResponse.json({ error: "No cart found" }, { status: 404 });
    }

    const body = await request.json();
    const { lines } = body;

    const cart = await updateCartItems(cartId, lines as CartLineUpdateInput[]);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

// DELETE - Remove cart items
export async function DELETE(request: NextRequest) {
  try {
    const cartId = getCartIdFromCookies();

    if (!cartId) {
      return NextResponse.json({ error: "No cart found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const lineIds = searchParams.get("lineIds");

    if (!lineIds) {
      return NextResponse.json(
        { error: "lineIds parameter required" },
        { status: 400 }
      );
    }

    const lineIdsArray = lineIds.split(",");
    const cart = await removeFromCart(cartId, lineIdsArray);

    // If cart is empty, clear the cookie
    if (cart.totalQuantity === 0) {
      clearCartIdFromCookies();
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove items from cart" },
      { status: 500 }
    );
  }
}

