"use client";

import { useState, useEffect, useCallback } from "react";

export interface RecentlyViewedProduct {
    id: string;
    handle: string;
    title: string;
    image: string;
    price: string;
    viewedAt: number;
}

const STORAGE_KEY = "ynotnow_recently_viewed";
const MAX_ITEMS = 20;

export function useRecentlyViewed() {
    const [products, setProducts] = useState<RecentlyViewedProduct[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setProducts(parsed);
            }
        } catch (error) {
            console.error("Error loading recently viewed:", error);
        }
    }, []);

    // Add a product to recently viewed - wrapped in useCallback to prevent infinite loops
    const addProduct = useCallback((product: Omit<RecentlyViewedProduct, "viewedAt">) => {
        try {
            setProducts((currentProducts) => {
                const newProduct: RecentlyViewedProduct = {
                    ...product,
                    viewedAt: Date.now(),
                };

                // Remove duplicate if exists, then add to front
                const filtered = currentProducts.filter((p) => p.id !== product.id);
                const updated = [newProduct, ...filtered].slice(0, MAX_ITEMS);

                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                return updated;
            });
        } catch (error) {
            console.error("Error adding to recently viewed:", error);
        }
    }, []);

    // Clear all recently viewed
    const clearAll = useCallback(() => {
        setProducts([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        products,
        addProduct,
        clearAll,
    };
}
