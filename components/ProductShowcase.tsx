"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ShopifyProduct } from "@/types/shopify";

export default function ProductShowcase() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]); // Parallax depth
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch("/api/products?first=4");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const productList = data.products.edges.map(
          (edge: { node: ShopifyProduct }) => edge.node
        );
        setProducts(productList);
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

  if (error) {
    return (
      <section className="w-full pt-20 bg-white">
        <div className="max-w-8xl mx-auto px-6 my-20 text-center">
          <p className="text-red-600">Error loading products: {error}</p>
        </div>
        <Marquee />
      </section>
    );
  }

  return (
    <section className="w-full pt-20 bg-white">
      <motion.div style={{ y }} className="max-w-8xl mx-auto px-6 my-20">
        {/* PRODUCTS GRID */}
        <div className="flex sm:grid overflow-x-auto snap-x snap-mandatory sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center px-6 sm:px-20 scroll-smooth">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600">No products available</p>
            </div>
          )}
        </div>

        {/* CTA BUTTON */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center mt-12">
            <Link href="/shop">
              <button className="relative overflow-hidden px-10 py-3 border border-black rounded-full text-lg transition-all duration-300 group">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Show Now
                </span>

                <span className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"></span>
              </button>
            </Link>
          </div>
        )}
      </motion.div>

      <Marquee />
    </section>
  );
}

/* PRODUCT CARD COMPONENT */
function ProductCard({ product }: { product: ShopifyProduct }) {
  const [hover, setHover] = useState(false);
  const imageUrl = product.featuredImage?.url;
  const secondImageUrl =
    product.images?.edges?.[1]?.node?.url || product.featuredImage?.url;
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
    <div
      className="flex flex-col snap-center min-w-[80%] sm:min-w-0 h-[64vh] items-center cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/products/${product.handle}`} className="w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-cover transition-opacity duration-300 ${
                  hover ? "opacity-0" : "opacity-100"
                }`}
              />

              {secondImageUrl && (
                <Image
                  src={secondImageUrl}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
                  className={`absolute top-0 left-0 object-cover transition-opacity duration-300 ${
                    hover ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-400">No image available</p>
            </div>
          )}
        </div>
      </Link>

      <p className="mt-4 font-medium text-black text-lg">{product.title}</p>
      <p className="text-black text-base mt-1">
        {formatPrice(price, currencyCode)}
      </p>
    </div>
  );
}
