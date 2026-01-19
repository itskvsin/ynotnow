"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RiGeminiFill } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.nav
      onMouseLeave={() => isDesktop && setOpen(false)}
      className="fixed max-h-[12vh] top-0 left-0 w-full z-50 bg-black/60 border-b border-white px-4 lg:px-24 py-2 flex items-center justify-between"
    >
      {/* LOGO LEFT */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className="shrink-0"
      >
        <Link href="/">
          <Image
            src={"/images/ynotnowLogo.png"}
            width={64}
            height={64}
            alt="logo"
            className="w-28 lg:w-32"
          />
        </Link>
      </motion.div>

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
          className="w-16 lg:w-24 hidden md:flex"
        />
      </motion.div>

      {/* RIGHT ICONS + MENU */}
      <div className="flex items-center gap-4 lg:gap-8 relative">
        <RiGeminiFill className="text-white text-3xl hidden md:flex" />
        <MdOutlineShoppingBag className="text-white hover:text-gray-200 hover:scale-95 transition-all duration-300 text-3xl hidden md:flex" />

        {/* MENU ICON */}
        <div
          onMouseEnter={() => isDesktop && setOpen(true)}
          onClick={() => !isDesktop && setOpen(!open)}
          className="cursor-pointer"
        >
          {open ? (
            <IoClose className="text-white text-3xl transition-all duration-300" />
          ) : (
            <FiMenu className="text-white text-3xl transition-all duration-300" />
          )}
        </div>

        {/* MENU DROPDOWN */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={open ? { opacity: 1, y: -10 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`${
            open ? "block" : "hidden"
          } absolute -right-25 top-20 pointer-events-none`}
        >
          <div className="pointer-events-auto bg-white text-black px-16 py-14 space-y-4">
            <Link
              href="/allProducts"
              className="text-xl uppercase cursor-pointer"
            >
              shop all
            </Link>
            <Link
              href="/account/personal-information"
              className="text-xl uppercase cursor-pointer"
            >
              hoodies
            </Link>
            <p className="text-xl uppercase cursor-pointer">t-shirt</p>
            <p className="text-xl uppercase cursor-pointer">accessories</p>
            <p className="text-xl uppercase cursor-pointer">about</p>
            <p className="text-xl uppercase cursor-pointer">account</p>

            <Link href="#">
              <button className="bg-black text-white text-xl px-12 py-3 mt-4 w-full">
                Login
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
