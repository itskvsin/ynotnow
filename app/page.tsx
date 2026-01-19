"use client";
import Hero from "@/components/Hero";
import { ReactLenis } from "lenis/react";
import Reveal from "@/components/effects/Reveal";

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1.2 }}>
      <Reveal>
        {/* <Navbar /> */}
        <Hero />
      </Reveal>
    </ReactLenis>
  );
}
