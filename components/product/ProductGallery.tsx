"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <section className="w-full">
      {/* ================= MOBILE ================= */}
      <div className="lg:hidden">
        {/* Main Image */}
        <div className="flex justify-center items-center w-screen h-105">
          <Image
            src={activeImage.url}
            alt={activeImage.alt || "Product image"}
            width={600}
            height={600}
            className="object-contain w-full h-full"
            draggable={false}
          />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1 mt-2">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                activeIndex === i ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 rounded-xl border ${
                activeIndex === i ? "border-black" : "border-gray-300"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || "Thumbnail"}
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded-xl"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:grid grid-cols-[1.2fr_1fr] gap-6">
        {/* BIG IMAGE */}
        <div className="rounded-2xl w-[18vw] h-[70vh] overflow-hidden bg-gray-100">
          <Image
            src={activeImage.url}
            alt={activeImage.alt || "Product image"}
            width={900}
            height={900}
            className="object-cover w-full h-full"
            draggable={false}
          />
        </div>

        {/* GRID IMAGES */}
        <div className="grid grid-cols-2 grid-rows-3 gap-4">
          {images.slice(1, 5).map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i + 1)}
              className="rounded-2xl overflow-hidden bg-gray-100"
            >
              <Image
                src={img.url}
                alt={img.alt || "Grid image"}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </button>
          ))}

          {/* COLOR / PLACEHOLDER BLOCK */}
          <div className="col-span-2 rounded-2xl bg-[#d6c5b8]" />
        </div>
      </div>
    </section>
  );
}
