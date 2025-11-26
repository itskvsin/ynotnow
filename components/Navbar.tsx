"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RiGeminiFill } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      onMouseLeave={() => setOpen(false)}
      className="fixed top-0 left-0 w-full z-50 bg-black/60 border-b border-white px-8 lg:px-24 py-4 flex items-center justify-between"
    >
      {/* LOGO LEFT */}
      <div className="shrink-0">
        <Image
          src={"/images/ynotnowLogo.png"}
          width={100}
          height={100}
          alt="logo"
          className="w-28 lg:w-40"
        />
      </div>

      {/* ROTATING LOGO CENTER */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 2.5,
        }}
      >
        <Image
          src={"/images/logo.png"}
          width={100}
          height={100}
          alt="logo"
          className="w-16 lg:w-24"
        />
      </motion.div>

      {/* RIGHT ICONS + MENU */}
      <div className="flex items-center gap-4 lg:gap-6 relative">
        <RiGeminiFill className="text-white text-3xl" />
        <MdOutlineShoppingBag className="text-white text-4xl" />

        {/* Hamburger Icon */}
        <FiMenu
          className="text-white text-3xl cursor-pointer"
          onMouseEnter={() => setOpen(true)}
        />

        {/* MENU DROPDOWN */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute -right-25 top-20 pointer-events-none"
        >
          <div className="pointer-events-auto bg-white text-black px-18 py-16 space-y-6 space-x-25">
            <p className="text-2xl uppercase cursor-pointer">shop all</p>
            <p className="text-2xl uppercase cursor-pointer">hoodies</p>
            <p className="text-2xl uppercase cursor-pointer">t-shirt</p>
            <p className="text-2xl uppercase cursor-pointer">accessories</p>
            <p className="text-2xl uppercase cursor-pointer">about</p>
            <p className="text-2xl uppercase cursor-pointer">account</p>

            <Link href="#">
              <button className="bg-black text-white text-xl px-12 py-3 mt-4">
                Login
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
