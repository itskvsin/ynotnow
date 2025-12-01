"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
// import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconDotsVertical } from "@tabler/icons-react";
import Image from "next/image";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
}
export const Compare = ({
  firstImage = "",
  secondImage = "",
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress =
        (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;

      setSliderXPercent(percentage);
      autoplayRef.current = setTimeout(animate, 16); // ~60fps
    };

    animate();
  }, [autoplay, autoplayDuration]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  function mouseEnterHandler() {
    setIsMouseOver(true);
    stopAutoplay();
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
    }
    if (slideMode === "drag") {
      setIsDragging(false);
    }
    startAutoplay();
  }

  const handleStart = useCallback(
    (clientX: number) => {
      if (slideMode === "drag") {
        setIsDragging(true);
      }
    },
    [slideMode]
  );

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(-5, Math.min(105, percent)));
        });
      }
    },
    [slideMode, isDragging]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => handleStart(e.clientX),
    [handleStart]
  );
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!autoplay) {
        handleStart(e.touches[0].clientX);
      }
    },
    [handleStart, autoplay]
  );

  const handleTouchEnd = useCallback(() => {
    if (!autoplay) {
      handleEnd();
    }
  }, [handleEnd, autoplay]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!autoplay) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove, autoplay]
  );

return (
  <div
    ref={sliderRef}
    className={cn(
      "relative w-[90vw] h-[90vh] overflow-hidden rounded-none",
      className
    )}
    style={{
      cursor: slideMode === "drag" ? "grab" : "col-resize",
    }}
    onMouseMove={handleMouseMove}
    onMouseLeave={mouseLeaveHandler}
    onMouseEnter={mouseEnterHandler}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
    onTouchMove={handleTouchMove}
  >
    {/* Split Line (center divider) */}
    <motion.div
      className="absolute top-0 bottom-0 w-1 bg-[#f8f8f8] z-30"
      style={{
        left: `${sliderXPercent}%`,
      }}
    />

    {/* Handle Button */}
    {showHandlebar && (
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center z-40 border border-gray-300"
        style={{ left: `${sliderXPercent}%` }}
      >
        <div className="flex flex-col items-center gap-[3px]">
          <span className="w-[3px] h-2.5 bg-black rounded-md"></span>
          <span className="w-[3px] h-2.5 bg-black rounded-md"></span>
          <span className="w-[3px] h-2.5 bg-black rounded-md"></span>
        </div>
      </motion.div>
    )}

    {/* First Image */}
    <motion.div
      className={cn(
        "absolute inset-0 z-20 select-none pointer-events-none",
        firstImageClassName
      )}
      style={{
        clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
      }}
    >
      <Image
        src={firstImage}
        alt="first image"
        className="absolute inset-0 w-screen h-full object-cover select-none"
        fill
        draggable={false}
      />
    </motion.div>

    {/* Second Image */}
    <Image
      src={secondImage}
      alt="second image"
      fill
      className={cn(
        "absolute inset-0 w-screen h-full object-cover z-10 select-none",
        secondImageClassname
      )}
      draggable={false}
    />
  </div>
);

};