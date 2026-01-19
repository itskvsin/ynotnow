"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { getProductsAction } from "@/lib/actions/products";
import type { ShopifyProduct } from "@/types/shopify";

type SortOption = "default" | "price-low" | "price-high" | "name-asc" | "name-desc";

interface ProductShowcaseCloneProps {
  gridCols?: "2" | "4";
  sortBy?: SortOption;
}

export default function ProductShowcaseClone({
  gridCols = "4",
  sortBy = "default",
}: ProductShowcaseCloneProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { products: fetchedProducts, error: fetchError } =
          await getProductsAction(50);
        if (fetchError) {
          setError(fetchError);
        } else {
          setProducts(fetchedProducts);
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
  }, []);

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
    gridCols === "2"
      ? "grid grid-cols-2 place-items-center lg:grid-cols-2 gap-x-4"
      : "grid grid-cols-2 place-items-center lg:grid-cols-4 gap-x-4";

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

/* ---------------- CARD ---------------- */

function ProductCard({ product }: { product: ShopifyProduct }) {
  const imageUrl = product.featuredImage?.url;
  const price = product.priceRange.minVariantPrice.amount;
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;

  // Format price with currency symbol
  const formatPrice = (amount: string, currency: string) => {
    const numAmount = parseFloat(amount);
    const currencySymbols: { [key: string]: string } = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      INR: "₹",
    };
    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${numAmount.toFixed(2)}`;
  };

  return (
    <Link href={`/products/${product.handle}`} className="block">
      <div>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title || "Product image"}
            width={500}
            height={600}
            className="w-full h-60 lg:h-96 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-60 lg:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-400 text-sm">No image</p>
          </div>
        )}

        <h3 className="text-sm mt-2">{product.title}</h3>

        <div className="text-sm font-medium mt-1">
          {formatPrice(price, currencyCode)}
        </div>
      </div>
    </Link>
  );
}
