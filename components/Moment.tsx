"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Moment() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(sectionRef.current, {
      backgroundPositionY: "120%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative min-h-screen 
        bg-[url('/images/momentImg.png')] bg-center bg-cover
        p-6 sm:p-12 lg:p-20
        mx-0 sm:mx-8 lg:mx-16
      "
    >
      <div
        className="
          text-white 
          absolute bottom-6 sm:bottom-10 lg:-bottom-30
          left-4 sm:left-8 lg:left-0
          space-y-8 sm:space-y-10 lg:space-y-12
          font-normal font-geist
          text-3xl sm:text-4xl lg:text-5xl
          px-4 sm:px-10 lg:px-50
          pb-6 sm:pb-16 lg:pb-50
        "
      >
        <div>
          <p>Don’t wait for the right</p>
          <p>moment. Create it.</p>
        </div>

        <Link href="#">
          <button
            className="
              relative overflow-hidden
              px-6 py-2 sm:px-8 sm:py-3
              border border-white rounded-full
              text-base sm:text-lg
              transition-all duration-300 group
            "
          >
            <span className="relative z-10 group-hover:text-white transition-colors font-semibold duration-300">
              Show Now
            </span>
            <span className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"></span>
          </button>
        </Link>
      </div>
    </section>
  );
}
