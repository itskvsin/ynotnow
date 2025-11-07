"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <section>
      <div className="border-b border-white flex items-center bg-black/60 justify-between fixed z-50 w-screen px-8 lg:px-30">
        <div>
          {/* <h1 className="font-bold text-xl lg:text-3xl text-white font-bakbak w-1/4 lg:w-2/4 flex gap-1">
            <span>Y</span>
            <span className="flex gap-1">
              NOT <span>NOW</span>
            </span>
          </h1> */}
          <Image
            src={"/images/ynotnowLogo.png"}
            width={100}
            height={100}
            alt="image"
            className="w-30 lg:w-40"
          />
        </div>

        <motion.div
          animate={{
            rotate: 360,
            transition: {
              duration: 1,
            },
          }}
        >
          <Image
            src={"/images/logo.png"}
            width={100}
            height={100}
            alt="image"
            className="w-20 lg:w-30"
          />
        </motion.div>

        <div className="w-1/6 lg:w-1/10"></div>
      </div>
    </section>
  );
}
