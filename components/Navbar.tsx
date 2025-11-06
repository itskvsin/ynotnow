"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <section>
      <div className="border-b border-white flex items-center bg-black/60 justify-between fixed z-50 w-screen px-30">
        <div>
          <h1 className="font-bold text-3xl text-white font-bakbak">YNOTNOW</h1>
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
          />
        </motion.div>

        <div className="w-1/10"></div>
      </div>
    </section>
  );
}
