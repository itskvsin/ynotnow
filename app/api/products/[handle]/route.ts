import { NextRequest, NextResponse } from "next/server";
import { getProductByHandle } from "@/lib/shopify";

export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const { handle } = params;

    if (!handle) {
      return NextResponse.json(
        { error: "Product handle is required" },
        { status: 400 }
      );
    }

    const data = await getProductByHandle(handle);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

