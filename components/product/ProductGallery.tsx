"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex];

  return (
    <div>
      {/* Main Image */}
      <div
        className="flex justify-center items-center
                   w-full h-105 overflow-hidden"
      >
        <Image
          src={activeImage.url}
          alt={activeImage.alt || "Product image"}
          width={10000}
          height={10000}
          className="object-contain w-90 h-100"
          draggable={false}
        />
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1 mt-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition ${
              activeIndex === i ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Thumbnails */}
<div className="mt-4 overflow-x-auto">
  <div
    className="flex flex-nowrap gap-2"
    style={{ maxWidth: "300px" }}
  >
    {images.map((img, i) => (
      <button
        key={img.id}
        onClick={() => setActiveIndex(i)}
        className={`border rounded-2xl shrink-0 ${
          activeIndex === i ? "border-black" : "border-gray-300"
        }`}
      >
        <Image
          src={img.url}
          alt={img.alt || "Thumbnail"}
          width={80}
          height={80}
          className="object-cover w-28 h-28 rounded-2xl"
        />
      </button>
    ))}
  </div>
</div>

    </div>
  );
}
