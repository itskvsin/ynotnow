"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsAction } from "@/lib/actions/products";
import type { ShopifyProduct } from "@/types/shopify";

interface RelatedProductsProps {
    currentProductId: string;
    productType?: string;
    tags?: string[];
}

export default function RelatedProducts({
    currentProductId,
    productType,
    tags = [],
}: RelatedProductsProps) {
    const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRelated() {
            try {
                const { products } = await getProductsAction(50);

                // Filter related products
                const related = products
                    .filter((p) => p.id !== currentProductId) // Exclude current product
                    .filter((p) => {
                        // Match by product type or tags
                        const typeMatch = productType && p.productType === productType;
                        const tagMatch = tags.length > 0 && p.tags?.some((tag) => tags.includes(tag));
                        return typeMatch || tagMatch;
                    })
                    .slice(0, 4); // Limit to 4 products

                setRelatedProducts(related);
            } catch (error) {
                console.error("Error fetching related products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRelated();
    }, [currentProductId, productType, tags]);

    if (loading) {
        return (
            <div className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 h-60 rounded-lg mb-2" />
                                <div className="bg-gray-200 h-4 rounded mb-1" />
                                <div className="bg-gray-200 h-4 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (relatedProducts.length === 0) {
        return null;
    }

    const formatPrice = (amount: string, currencyCode: string) => {
        const symbols: { [key: string]: string } = {
            USD: "$",
            EUR: "€",
            GBP: "£",
            INR: "₹",
        };
        const symbol = symbols[currencyCode] || currencyCode;
        return `${symbol}${parseFloat(amount).toFixed(2)}`;
    };

    return (
        <div className="py-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.handle}`}
                            className="group"
                        >
                            <div>
                                {product.featuredImage?.url ? (
                                    <Image
                                        src={product.featuredImage.url}
                                        alt={product.title}
                                        width={300}
                                        height={400}
                                        className="w-full h-60 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                                    />
                                ) : (
                                    <div className="w-full h-60 bg-gray-200 rounded-lg" />
                                )}

                                <h3 className="text-sm mt-2 line-clamp-2">{product.title}</h3>
                                <p className="text-sm font-medium mt-1">
                                    {formatPrice(
                                        product.priceRange.minVariantPrice.amount,
                                        product.priceRange.minVariantPrice.currencyCode
                                    )}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
