"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct } from "@/types/shopify";

interface ProductCardProps {
    product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
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
        <Link href={`/products/${product.handle}`} className="block group" scroll={false}>
            <div className="relative">
                {imageUrl ? (
                    <div className="w-full h-60 lg:h-96 rounded-lg overflow-hidden bg-gray-100">
                        <motion.div
                            layoutId={`product-image-${product.id}`}
                            className="w-full h-full relative"
                            initial={false} // Avoid initial layout animation on mount for grid
                            transition={{
                                layout: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
                            }}
                            animate={{ opacity: 1 }} // Ensure visibility without forcing layout recalculation
                        >
                            <Image
                                src={imageUrl}
                                alt={product.title || "Product image"}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </motion.div>
                    </div>
                ) : (
                    <div className="w-full h-60 lg:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400 text-sm">No image</p>
                    </div>
                )}

                <div className="mt-3 space-y-1">
                    <motion.h3
                        layoutId={`product-title-${product.id}`}
                        className="text-sm font-medium text-gray-900"
                    >
                        {product.title}
                    </motion.h3>

                    <p className="text-sm text-gray-500">
                        {formatPrice(price, currencyCode)}
                    </p>
                </div>
            </div>
        </Link >
    );
}
