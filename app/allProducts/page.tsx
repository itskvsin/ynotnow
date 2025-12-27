"use client"

import Image from "next/image";
import React from "react";
import { RiFilter3Fill } from "react-icons/ri";
import { BsFillGridFill } from "react-icons/bs";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import ProductShowcase from "@/components/ProductShowcase";
import FeaturesGrid from "@/components/commonDetail/FeaturesGrid";
import About from "@/components/commonDetail/About";
import LastBg from "@/components/commonDetail/LastBg";
import Footer from "@/components/layout/Footer";
import ProductShowcaseClone from "@/components/ProductShowcaseClone";

const Hero = () => {
  return (
    <div className="bg-[url('/images/collectionHoodie.png')] flex flex-col gap-4 py-6 px-6 items-start justify-end bg-center bg-cover h-80 w-full lg:h-[60vh] lg:bg-cover lg:bg-[35%_65%]">
      {" "}
      <h1 className="text-3xl text-white font-bold font-Geist">Shop All</h1>
      <p className="text-white/50 font-Geist text-sm">
        Every drop. Every vibe. Find your next favorite look all in one place.
      </p>{" "}
    </div>
  );
};

const page = () => {
  return (
    <section>
      <div className="relative">
        <Hero />
      </div>
      <div className="h-18 border-b w-full flex justify-between px-4 lg:items-center lg:justify-end lg:gap-10">
        <div className="leftSection flex gap-4 items-center"><BsFillGridFill className="text-black/50 text-2xl" /><TfiLayoutGrid3Alt className="text-xl" /></div>
        <div className="rightSection flex items-center text-xl gap-2"><RiFilter3Fill /><p>FIlter & Sort</p></div>
      </div>
      <div>
        {/* <ProductShowcase /> */}
        <ProductShowcaseClone />
      </div>
      <FeaturesGrid />
      <About />
      <LastBg />
      <Footer />
    </section>
  );
};
export default page;
