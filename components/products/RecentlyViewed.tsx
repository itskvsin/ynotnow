"use client";

import Image from "next/image";
import Link from "next/link";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { IoTimeOutline } from "react-icons/io5";
import { motion } from "framer-motion";

export default function RecentlyViewed() {
    const { products } = useRecentlyViewed();

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="px-4 py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <IoTimeOutline className="text-2xl" />
                    <h2 className="text-2xl font-bold">Recently Viewed</h2>
                </div>

                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-4" style={{ width: "max-content" }}>
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.handle}`}
                                className="block w-48 flex-shrink-0"
                                scroll={false}
                            >
                                <div className="group">
                                    {product.image ? (
                                        <motion.div
                                            layoutId={`product-image-${product.id}`}
                                            className="w-full h-60 rounded-lg overflow-hidden"
                                        >
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                width={200}
                                                height={250}
                                                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                                            />
                                        </motion.div>
                                    ) : (
                                        <div className="w-full h-60 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <p className="text-gray-400 text-sm">No image</p>
                                        </div>
                                    )}

                                    <h3 className="text-sm mt-2 line-clamp-2">{product.title}</h3>
                                    <p className="text-sm font-medium mt-1">{product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
