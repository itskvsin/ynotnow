import { NextResponse } from "next/server";
import { getProducts } from "@/lib/shopify";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const first = parseInt(searchParams.get("first") || "20", 10);

    const data = await getProducts(first);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
