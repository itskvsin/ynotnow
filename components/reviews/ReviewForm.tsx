"use client";

import { useState } from "react";
import { toast } from "sonner";
import StarRating from "./StarRating";
import { validateRequired } from "@/lib/utils/validation";

interface ReviewFormProps {
    productId: string;
    productHandle: string;
    onReviewSubmit: (review: {
        productId: string;
        productHandle: string;
        rating: number;
        title: string;
        comment: string;
        author: string;
    }) => void;
}

export default function ReviewForm({ productId, productHandle, onReviewSubmit }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [author, setAuthor] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validate
        const newErrors: { [key: string]: string } = {};
        if (rating === 0) newErrors.rating = "Please select a rating";
        const titleValidation = validateRequired(title, "Title");
        const commentValidation = validateRequired(comment, "Review");
        const authorValidation = validateRequired(author, "Name");

        if (!titleValidation.isValid) newErrors.title = titleValidation.error || "";
        if (!commentValidation.isValid) newErrors.comment = commentValidation.error || "";
        if (!authorValidation.isValid) newErrors.author = authorValidation.error || "";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Submit
        onReviewSubmit({
            productId,
            productHandle,
            rating,
            title,
            comment,
            author,
        });

        // Reset form
        setRating(0);
        setTitle("");
        setComment("");
        setAuthor("");
        toast.success("Review submitted successfully!");
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Rating *</label>
                    <StarRating rating={rating} interactive onRatingChange={setRating} size="lg" />
                    {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                </div>

                <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-2">
                        Your Name *
                    </label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 ${errors.author ? "ring-2 ring-red-500" : "focus:ring-black"
                            }`}
                        placeholder="John Doe"
                    />
                    {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Review Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 ${errors.title ? "ring-2 ring-red-500" : "focus:ring-black"
                            }`}
                        placeholder="Great product!"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label htmlFor="comment" className="block text-sm font-medium mb-2">
                        Your Review *
                    </label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 resize-none ${errors.comment ? "ring-2 ring-red-500" : "focus:ring-black"
                            }`}
                        placeholder="Share your thoughts about this product..."
                    />
                    {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white rounded-full py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
}
