"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Ynotnow Origin Hoodie",
    price: "₹2,299",
    image: "/images/hoodies/blueHoodie.png",
    hoverImage: "/images/signature.png",
  },
  {
    id: 2,
    name: "Momentum Hoodie",
    price: "₹2,299",
    image: "/images/hoodies/grayHoodie.png",
    hoverImage: "/images/signature.png",
  },
  {
    id: 3,
    name: "Ynotnow Origin Hoodie",
    price: "₹2,299",
    image: "/images/hoodies/blueHoodie.png",
    hoverImage: "/images/signature.png",
  },
  {
    id: 4,
    name: "Momentum Hoodie",
    price: "₹2,299",
    image: "/images/hoodies/grayHoodie.png",
    hoverImage: "/images/signature.png",
  },
];

export default function ProductShowcase() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]); // Parallax scroll depth

  return (
    <section className="w-full pt-20 bg-white">
      <motion.div style={{ y }} className="max-w-8xl mx-auto px-6 my-20">

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center px-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mt-12">
          <Link href="#">
            <button className="relative overflow-hidden px-10 py-3 border border-black rounded-full text-lg transition-all duration-300 group">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Show Now
              </span>

              <span className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"></span>
            </button>
          </Link>
        </div>
      </motion.div>

      <Marquee />
    </section>
  );
}

/* PRODUCT CARD COMPONENT */
function ProductCard({ product }: any) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-300 ${
            hover ? "opacity-0" : "opacity-100"
          }`}
        />

        <Image
          src={product.hoverImage}
          alt={product.name}
          fill
          className={`absolute top-0 left-0 object-contain transition-opacity duration-300 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <p className="mt-4 font-medium text-black text-lg">{product.name}</p>
      <p className="text-black text-base mt-1">{product.price}</p>
    </div>
  );
}
