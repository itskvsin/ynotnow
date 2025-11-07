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
      <div className="overflow-x-hidden ">
        <Image
          src="/images/heroBgImage.png"
          alt="Background image"
          fill
          priority
          // quality={100}
          className="object-cover lg:object-cover hidden md:flex lg:flex  transition-opacity duration-1000"
        />
        <Image
          src="/images/bg-mobile.png"
          alt="Background image"
          fill
          priority
          // quality={100}
          className="object-auto flex md:hidden lg:hidden transition-opacity duration-1000"
        />
      </div>
      {/* border-4 border-red-700 */}
      {/* Centered text */}
      <div className="relative flex flex-col gap-2 items-center justify-center h-full text-center text-black z-10">
        <motion.h1
          initial={{
            opacity: 0.6,
            translateY: 20,
          }}
          animate={{
            opacity: 1,
            translateY: -10,
            transition: {
              duration: 1.2,
            },
          }}
          className="text-4xl md:text-7xl  tracking-tight drop-shadow-lg font-bakbak"
        >
          WISH COME TRUE
        </motion.h1>
        <motion.p
          initial={{
            translateY: -10,
            opacity: 0,
          }}
          animate={{
            translateY: 8,
            opacity: 1,
            transition: {
              duration: 0.8,
            },
          }}
          className="text-3xl text-white md:text-3xl font-bigshoulders lg:text-5xl drop-shadow-md"
        >
          Coming Soon!
        </motion.p>
      </div>

      {/* Fragile tag image */}
      <div className="absolute -bottom-6 right-16 z-10 pointer-events-none">
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
