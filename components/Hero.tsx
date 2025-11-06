"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative h-[130vh] w-full overflow-visible">
      {/* Background image */}
      <div className="absolute inset-0 -z-10 overflow-x-hidden">
        <Image
          src="/images/heroBgImage.png"
          alt="Background image"
          fill
          priority
          quality={100}
          className={`object-cover transition-opacity duration-1000`}
        />
      </div>

      {/* Centered text */}
      <div className="relative flex flex-col  items-center justify-center h-full text-center text-black z-10">
        <motion.h1
          initial={{
            opacity: 0.6,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
          className="text-6xl md:text-7xl  tracking-tight drop-shadow-lg font-bakbak"
        >
          WISH COME TRUE
        </motion.h1>
        <motion.p
          initial={{
            translateY: -10,
          }}
          animate={{
            translateY: 10,
            transition: {
              duration: 1,
            },
          }}
          className="text-lg text-white md:text-2xl lg:text-4xl drop-shadow-md"
        >
          Coming Soon!
        </motion.p>
      </div>

      {/* Fragile tag image */}
      <div className="absolute -bottom-6 right-16 z-100 pointer-events-none">
        <Image
          src="/images/fragileTag.png"
          width={160}
          height={160}
          alt="Fragile tag"
          className="object-contain"
        />
      </div>
    </section>
  );
}
