"use client";

import Reveal from "@/components/effects/Reveal";
import Moment from "@/components/Moment";
import ProductShowcase from "@/components/ProductShowcase";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LastBg from "@/components/LastBg";
import Navbar from "@/components/Navbar";
import Slider  from "@/components/Slider";
import ReactLenis from "lenis/react";
import FeaturesGrid from "@/components/FeaturesGrid";

export default function Demo() {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1.2 }}
    >
      <Reveal>
        <Navbar />
        <Hero />
        <ProductShowcase />
        <Moment />
        <Slider />
        <FeaturesGrid />
        <About /> 
        <LastBg />
        <Footer />
      </Reveal>
    </ReactLenis>
  );
}
