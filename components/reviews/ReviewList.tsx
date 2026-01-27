"use client";

import StarRating from "./StarRating";
import type { ProductReview } from "@/hooks/useProductReviews";

interface ReviewListProps {
    reviews: ProductReview[];
    averageRating: number;
    reviewCount: number;
}

export default function ReviewList({ reviews, averageRating, reviewCount }: ReviewListProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
                        <StarRating rating={averageRating} size="md" />
                        <div className="text-sm text-gray-500 mt-1">{reviewCount} reviews</div>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 shadow-sm text-center">
                        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <StarRating rating={review.rating} size="sm" />
                                    </div>
                                    <h4 className="font-semibold">{review.title}</h4>
                                </div>
                                <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
                            </div>

                            <p className="text-gray-700 mb-3">{review.comment}</p>

                            <div className="text-sm text-gray-500">
                                <span className="font-medium">{review.author}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
