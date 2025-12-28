"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const handleColorChange = (color: string) => {
    setSelectedColor(color);

    console.log("Selected color:", color);
  };
  return (
    <div className="mt-4">
      <h1 className="text-2xl">{product.title}</h1>

      <p className="text-sm text-gray-400 mt-1">{product.description}</p>

      <p className="text-2xl border-b-2 border-gray-200 pb-8 mt-3">
        ₹{product.price.toLocaleString()}
      </p>

      <div className="mt-4">
        <SizeSelector sizes={product.sizes} />
      </div>

      <div className="mt-4">
        <ColorSelector
          colors={["#000000", "#FFFFFF", "#D6C5B8", "#0A1A4F"]}
          selectedColor={selectedColor ?? undefined}
          onChange={handleColorChange}
        />
      </div>

      {/* <div className="mt-4 text-sm text-green-600">
        {product.inStock ? "✓ In stock" : "Out of stock"}
      </div> */}
    </div>
  );
}
