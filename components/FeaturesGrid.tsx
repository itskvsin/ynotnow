"use client";

import { motion } from "framer-motion";
import { Globe, Box, Headset, ArrowUpDown } from "lucide-react";

const items = [
  "Enjoy Free Shipping on Orders Over ₹4999!",
  "10% with the code GET10",
  "Don't wait. Wear now.",
];

<div className="flex whitespace-nowrap ">
  <motion.div className="flex items-center gap-16"></motion.div>

  {/* DUPLICATE STRIP FOR SEAMLESS LOOP */}
  <motion.div className="flex items-center gap-16"></motion.div>
</div>;

export function MarqueeBar() {
  return (
    <div className="w-full bg-black flex gap-14 text-white py-2 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap text-sm gap-10"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...items, ...items].map((txt, i) => (
          <span key={i} className="flex items-center gap-4">
            <span>{txt}</span>
            <span className="text-white">•</span>
          </span>
        ))}
      </motion.div>

      <motion.div
        className="flex whitespace-nowrap text-sm gap-10"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...items, ...items].map((txt, i) => (
          <span key={i} className="flex items-center gap-4">
            <span>{txt}</span>
            <span className="text-white">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function FeaturesGrid() {
  return (
    <section className="w-full border-t border-b border-black bg-white">
      <MarqueeBar />
      <div className="grid grid-cols-2 lg:grid-cols-4 text-center">
        <div className="py-10 border-r border-black flex flex-col items-center gap-3">
          <Globe size={32} />
          <h3 className="text-lg font-semibold">Free Global Shipping</h3>
          <p className="text-sm text-black/70">
            Free Delivery On All Orders Over ₹4999.
          </p>
        </div>

        <div className="py-10 border-r border-black flex flex-col items-center gap-3">
          <ArrowUpDown size={32} />
          <h3 className="text-lg font-semibold">Easy Returns</h3>
          <p className="text-sm text-black/70 w-3/4">
            7-Day Easy Returns. Love It Or Return It.
          </p>
        </div>

        <div className="py-10 border-r border-black flex flex-col items-center gap-3">
          <Box size={32} />
          <h3 className="text-lg font-semibold">Secure Packaging</h3>
          <p className="text-sm text-black/70 w-3/4">
            Carefully Packed To Keep Your Products Safe And Fresh.
          </p>
        </div>

        <div className="py-10 flex flex-col items-center gap-3">
          <Headset size={32} />
          <h3 className="text-lg font-semibold">Customer Support</h3>
          <p className="text-sm text-black/70 w-3/4">
            Reach Us Anytime At. We're Happy To Help.
          </p>
        </div>
      </div>
    </section>
  );
}
