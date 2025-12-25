"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const marqueeItems = [
  { text: "Built for comfort", image: "/images/hoodies/blueHoodie.png" },
  { text: "Wear your mindset", image: "/images/hoodies/grayHoodie.png" },
  { text: "Made with love", image: "/images/hoodies/blueHoodie.png" },
  { text: "Crafted to move", image: "/images/hoodies/grayHoodie.png" },
];

export default function Marquee() {
  return (
    <section className="w-full overflow-hidden my-20">
      <div className="bg-gray-300">

      <div className="flex whitespace-nowrap ">
        <motion.div
          className="flex items-center gap-16"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="relative flex items-center">
              {/* IMAGE FLOATING */}
              <div className="w-20 h-20 rounded-full overflow-hidden my-2">
                <Image
                  src={item.image}
                  alt={item.text}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TEXT PILL */}
              <div className=" text-white rounded-full px-10">
                <p className="text-2xl font-medium whitespace-nowrap">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* DUPLICATE STRIP FOR SEAMLESS LOOP */}
        <motion.div
          className="flex items-center gap-16"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={`dup-${index}`} className="relative flex items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden my-2">
                <Image
                  src={item.image}
                  alt={item.text}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-300 text-white rounded-full px-10 py-4">
                <p className="text-2xl font-medium whitespace-nowrap">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      </div>

    </section>
  );
}