import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCart, getShippingRates, ShippingAddress } from "@/lib/shopify";

const CART_ID_COOKIE = "shopify_cart_id";

async function getCartIdFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_ID_COOKIE)?.value || null;
}

// POST - Get shipping rates
export async function POST(request: NextRequest) {
  try {
    const cartId = await getCartIdFromCookies();

    if (!cartId) {
      return NextResponse.json(
        { error: "No cart found. Please add items to cart first." },
        { status: 404 }
      );
    }

    // Verify cart has items
    const cart = await getCart(cartId);
    if (!cart || cart.totalQuantity === 0) {
      return NextResponse.json(
        { error: "Cart is empty. Please add items to cart first." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { country, state, city, zipCode } = body;

    if (!country) {
      return NextResponse.json(
        { error: "Country is required" },
        { status: 400 }
      );
    }

    const address: ShippingAddress = {
      country,
      province: state || undefined,
      city: city || undefined,
      zip: zipCode || undefined,
    };

    const rates = await getShippingRates(cartId, address);
    return NextResponse.json({ rates });
  } catch (error) {
    console.error("Error getting shipping rates:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get shipping rates" },
      { status: 500 }
    );
  }
}

