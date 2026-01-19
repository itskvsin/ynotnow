"use client";

import Reveal from "@/components/effects/Reveal";
import Moment from "@/components/Moment";
import ProductShowcase from "@/components/ProductShowcase";
import Hero from "@/components/Hero";
import Navbar from "@/components/layout/Navbar";
import Slider  from "@/components/Slider";
import ReactLenis from "lenis/react";

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
      </Reveal>
    </ReactLenis>
  );
}
