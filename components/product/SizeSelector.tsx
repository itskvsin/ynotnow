"use client";

import { useState } from "react";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize?: string | null;
  onSizeChange?: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize: controlledSize,
  onSizeChange,
}: SizeSelectorProps) {
  const [internalSize, setInternalSize] = useState<string | null>(null);
  const selectedSize = controlledSize ?? internalSize;

  const handleClick = (size: string) => {
    if (onSizeChange) {
      onSizeChange(size);
    } else {
      setInternalSize(size);
    }
  };

  return (
    <div>
      <p className="text-md font-medium mb-2">Select Size</p>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleClick(size)}
            className={`px-4 py-1 rounded-full border text-md ${
              selectedSize === size
                ? "bg-black text-white"
                : "border-gray-300"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
