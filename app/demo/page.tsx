"use client";

import Reveal from "@/components/effects/Reveal";
import Moment from "@/components/Moment";
import ProductShowcase from "@/components/ProductShowcase";
import ReactLenis from "lenis/react";

export default function Demo() {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1.2 }}
    >
      <Reveal>
        <ProductShowcase />
        <Moment />
      </Reveal>
    </ReactLenis>
  );
}
