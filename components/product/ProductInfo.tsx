"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";

interface ProductInfoProps {
  product: Product;
  onSizeChange?: (size: string) => void;
  onColorChange?: (color: string) => void;
  selectedSize?: string | null;
  selectedColor?: string | null;
  hasSizeOption?: boolean;
  hasColorOption?: boolean;
}

export default function ProductInfo({
  product,
  onSizeChange,
  onColorChange,
  selectedSize: controlledSize,
  selectedColor: controlledColor,
  hasSizeOption = true,
  hasColorOption = true,
}: ProductInfoProps) {
  const [internalSize, setInternalSize] = useState<string | null>(null);
  const [internalColor, setInternalColor] = useState<string | null>(null);

  const selectedSize = controlledSize ?? internalSize;
  const selectedColor = controlledColor ?? internalColor;

  const handleSizeChange = (size: string) => {
    if (onSizeChange) {
      onSizeChange(size);
    } else {
      setInternalSize(size);
    }
  };

  const handleColorChange = (color: string) => {
    if (onColorChange) {
      onColorChange(color);
    } else {
      setInternalColor(color);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl lg:text-4xl">{product.title}</h1>

      <p className="text-sm lg:text-md text-gray-400 mt-1">{product.description}</p>

      <p className="text-2xl border-b-2 border-gray-200 pb-8 mt-3">
        ₹{product.price.toLocaleString()}
      </p>

      {hasSizeOption && product.sizes && product.sizes.length > 0 && (
        <div className="mt-4">
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSizeChange={handleSizeChange}
          />
        </div>
      )}

      {hasColorOption && product.colors && product.colors.length > 0 && (
        <div className="mt-4">
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor ?? undefined}
            onChange={handleColorChange}
          />
        </div>
      )}

      {/* <div className="mt-4 text-sm text-green-600">
        {product.inStock ? "✓ In stock" : "Out of stock"}
      </div> */}
    </div>
  );
}
