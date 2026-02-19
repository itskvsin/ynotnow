"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { getProductsAction } from "@/lib/actions/products";
import type { ShopifyProduct } from "@/types/shopify";
import ProductCard from "@/components/product/ProductCard";

type SortOption = "default" | "price-low" | "price-high" | "name-asc" | "name-desc";

interface ProductShowcaseCloneProps {
  gridCols?: "3" | "4";
  sortBy?: SortOption;
  searchQuery?: string;
  products?: ShopifyProduct[]; // Accept pre-filtered products
}

export default function ProductShowcaseClone({
  gridCols = "3",
  sortBy = "default",
  searchQuery = "",
  products: propProducts,
}: ProductShowcaseCloneProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If products are provided as prop, use them instead of fetching
    if (propProducts) {
      setProducts(propProducts);
      setLoading(false);
      return;
    }

    async function fetchProducts() {
      try {
        setLoading(true);

        // Use search API if there's a search query
        if (searchQuery.trim()) {
          const response = await fetch(
            `/api/products/search?query=${encodeURIComponent(searchQuery)}&first=50`
          );
          const data = await response.json();
          if (data.error) {
            setError(data.error);
            setProducts([]);
          } else {
            const fetchedProducts = data.products.edges.map((edge: any) => edge.node);
            setProducts(fetchedProducts);
          }
        } else {
          const { products: fetchedProducts, error: fetchError } =
            await getProductsAction(50);
          if (fetchError) {
            setError(fetchError);
          } else {
            setProducts(fetchedProducts);
          }
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [searchQuery]);

  const displayProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case "price-low":
        return sorted.sort(
          (a, b) =>
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
        );
      case "price-high":
        return sorted.sort(
          (a, b) =>
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
        );
      case "name-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const gridClass =
    gridCols === "3"
      ? "grid grid-cols-1 sm:grid-cols-2 place-items-center lg:grid-cols-3 gap-x-4 transition-all duration-300"
      : "grid grid-cols-2 sm:grid-cols-2 place-items-center lg:grid-cols-4 gap-x-4 transition-all duration-300";

  if (loading) {
    return (
      <section className="px-4 py-6">
        <div className="p-3">
          <div className="text-center py-20">
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-6">
        <div className="p-3">
          <div className="text-center py-20">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!loading && displayProducts.length === 0) {
    return (
      <section className="px-4 py-6">
        <div className="p-3">
          <div className="text-center py-20">
            <p className="text-gray-600">No products available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="p-3">
        {/* Grid */}
        <div className={gridClass}>
          {displayProducts.map((product) => (
            <div key={product.id} className="pb-6">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


