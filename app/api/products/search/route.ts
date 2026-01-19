import { NextRequest, NextResponse } from "next/server";
import { getProductsWithFilters, ProductSortKeys } from "@/lib/shopify";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const first = parseInt(searchParams.get("first") || "20", 10);
    const query = searchParams.get("query") || undefined;
    const collection = searchParams.get("collection") || undefined;
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || undefined;
    const vendor = searchParams.get("vendor") || undefined;
    const productType = searchParams.get("productType") || undefined;
    const priceMin = searchParams.get("priceMin") ? parseFloat(searchParams.get("priceMin")!) : undefined;
    const priceMax = searchParams.get("priceMax") ? parseFloat(searchParams.get("priceMax")!) : undefined;
    const sortKey = searchParams.get("sortKey") as ProductSortKeys | null;

    const filters = {
      query,
      collection,
      tags,
      vendor,
      productType,
      priceMin,
      priceMax,
      sortKey: sortKey || undefined,
    };

    const data = await getProductsWithFilters(first, filters);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}

