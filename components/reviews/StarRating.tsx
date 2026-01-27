"use client";

import { IoStar, IoStarOutline, IoStarHalf } from "react-icons/io5";

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: "sm" | "md" | "lg";
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
}

export default function StarRating({
    rating,
    maxRating = 5,
    size = "md",
    interactive = false,
    onRatingChange,
}: StarRatingProps) {
    const sizeClasses = {
        sm: "text-sm",
        md: "text-lg",
        lg: "text-2xl",
    };

    const handleClick = (value: number) => {
        if (interactive && onRatingChange) {
            onRatingChange(value);
        }
    };

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: maxRating }, (_, i) => {
                const starValue = i + 1;
                const filled = rating >= starValue;
                const halfFilled = rating >= starValue - 0.5 && rating < starValue;

                return (
                    <button
                        key={i}
                        type="button"
                        onClick={() => handleClick(starValue)}
                        disabled={!interactive}
                        className={`${sizeClasses[size]} ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"
                            }`}
                    >
                        {filled ? (
                            <IoStar className="text-yellow-400" />
                        ) : halfFilled ? (
                            <IoStarHalf className="text-yellow-400" />
                        ) : (
                            <IoStarOutline className="text-gray-300" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
