"use client";

import { useState, useEffect } from "react";

export interface ProductReview {
    id: string;
    productId: string;
    productHandle: string;
    rating: number;
    title: string;
    comment: string;
    author: string;
    date: string;
}

const STORAGE_KEY = "ynotnow_reviews";

export function useProductReviews(productId: string) {
    const [reviews, setReviews] = useState<ProductReview[]>([]);

    useEffect(() => {
        loadReviews();
    }, [productId]);

    const loadReviews = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const allReviews: ProductReview[] = JSON.parse(stored);
                const productReviews = allReviews.filter((r) => r.productId === productId);
                setReviews(productReviews);
            }
        } catch (error) {
            console.error("Error loading reviews:", error);
        }
    };

    const addReview = (review: Omit<ProductReview, "id" | "date">) => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const allReviews: ProductReview[] = stored ? JSON.parse(stored) : [];

            const newReview: ProductReview = {
                ...review,
                id: Date.now().toString(),
                date: new Date().toISOString(),
            };

            allReviews.push(newReview);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allReviews));
            loadReviews();

            return { success: true };
        } catch (error) {
            console.error("Error adding review:", error);
            return { success: false, error: "Failed to add review" };
        }
    };

    const getAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return sum / reviews.length;
    };

    return {
        reviews,
        addReview,
        averageRating: getAverageRating(),
        reviewCount: reviews.length,
    };
}
