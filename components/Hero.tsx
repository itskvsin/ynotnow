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
    <section className="relative h-screen md:h-screen lg:h-[130vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-screen">
        {/* Desktop / Tablet */}
        <Image
          src="/images/desktopBgImage1.png"
          alt="Background image"
          fill
          priority
          quality={100}
          className="hidden md:block object-cover transition-opacity duration-1000"
        />

        {/* Mobile */}
        <Image
          src="/images/mobileBgImage.png"
          alt="Background image"
          fill
          priority
          quality={100}
          className="block md:hidden min-h-screen object-cover transition-opacity duration-1000"
        />
      </div>

      {/* Center Text */}
      <div className="relative z-10 flex flex-col gap-3 items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0.6, translateY: 20 }}
          animate={{
            opacity: 1,
            translateY: -10,
            transition: { duration: 1.2 },
          }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bakbak tracking-tight drop-shadow-lg text-black"
        >
          WISH COME TRUE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, translateY: -10 }}
          animate={{
            opacity: 1,
            translateY: 8,
            transition: { duration: 0.8 },
          }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bigshoulders capitalize drop-shadow-md text-white"
        >
          launching soon!
        </motion.p>
      </div>
    </section>
  );
}
