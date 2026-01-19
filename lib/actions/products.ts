"use server";

import { getProductByHandle, getProducts } from "@/lib/shopify";

/**
 * Server Action: Fetch product by handle
 */
export async function getProductByHandleAction(handle: string) {
  try {
    if (!handle) {
      return { product: null, error: "Product handle is required" };
    }

    const data = await getProductByHandle(handle);
    return { product: data.product, error: null };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      product: null,
      error: error instanceof Error ? error.message : "Failed to fetch product",
    };
  }
}

/**
 * Server Action: Fetch products list
 */
export async function getProductsAction(first: number = 50) {
  try {
    if (first < 1 || first > 250) {
      return { products: [], error: "first must be between 1 and 250" };
    }

    const data = await getProducts(first);
    const products = data.products.edges.map((edge) => edge.node);
    return { products, error: null };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      error: error instanceof Error ? error.message : "Failed to fetch products",
    };
  }
}

