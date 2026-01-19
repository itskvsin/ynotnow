import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCart, updateCartDiscountCodes } from "@/lib/shopify";

const CART_ID_COOKIE = "shopify_cart_id";

async function getCartIdFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_ID_COOKIE)?.value || null;
}

// POST - Apply discount code
export async function POST(request: NextRequest) {
  try {
    const cartId = await getCartIdFromCookies();

    if (!cartId) {
      return NextResponse.json(
        { error: "No cart found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { discountCode } = body;

    if (!discountCode || typeof discountCode !== "string") {
      return NextResponse.json(
        { error: "Discount code is required" },
        { status: 400 }
      );
    }

    // Get current cart to check existing discount codes
    const currentCart = await getCart(cartId);
    const existingCodes = currentCart?.discountCodes?.map((dc: any) => dc.code) || [];
    
    // Add new code to existing codes
    const updatedCodes = [...existingCodes, discountCode];

    const cart = await updateCartDiscountCodes(cartId, updatedCodes);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error applying discount code:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to apply discount code" },
      { status: 500 }
    );
  }
}

// DELETE - Remove discount code
export async function DELETE(request: NextRequest) {
  try {
    const cartId = await getCartIdFromCookies();

    if (!cartId) {
      return NextResponse.json(
        { error: "No cart found" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const discountCode = searchParams.get("code");

    if (!discountCode) {
      return NextResponse.json(
        { error: "Discount code is required" },
        { status: 400 }
      );
    }

    // Get current cart to get existing discount codes
    const currentCart = await getCart(cartId);
    const existingCodes = currentCart?.discountCodes?.map((dc: any) => dc.code) || [];
    
    // Remove the specified code
    const updatedCodes = existingCodes.filter((code: string) => code !== discountCode);

    const cart = await updateCartDiscountCodes(cartId, updatedCodes);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error removing discount code:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to remove discount code" },
      { status: 500 }
    );
  }
}

