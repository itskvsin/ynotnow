"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const ImageCompare: React.FC<ImageCompareProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(percentage, -5), 105));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  }, [handleMove]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  }, [handleMove]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'IMG') {
      handleMove(e.clientX);
    }
  }, [handleMove]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ew-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

return (
  <div
    className="
      w-full relative 
      flex flex-col sm:flex-col md:flex-col lg:flex-row 
      items-center lg:items-start 
      justify-center 
      gap-10 lg:gap-20 
      px-4 sm:px-10 lg:px-20 
      py-10
      min-h-screen
    "
  >

    {/* LEFT TEXT */}
    {beforeLabel && (
      <div className="
        order-1 
        flex flex-col gap-4
        text-start lg:text-start 
        items-start lg:items-start
        max-w-sm
        max-h-screen
        pointer-events-none
      ">
        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-400"></div>
        <p className="select-none text-sm sm:text-base leading-relaxed text-gray-800">
          {beforeLabel}
        </p>
      </div>
    )}

    {/* SLIDER CENTER */}
    <div className="order-2 w-full max-w-[90vw] lg:max-w-[45vw]">
      <div
        ref={containerRef}
        className="relative w-full h-[65vh] sm:h-[70vh] lg:h-[80vh]  cursor-ew-resize select-none touch-none bg-white"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleContainerClick}
      >
        {/* After Image */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <img
            src={afterImage}
            alt="After"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>

        {/* Before Image */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Before"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>

        {/* Divider + Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none transition-opacity duration-200"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 
            bg-white rounded-full shadow-lg flex items-center justify-center
            transition-transform duration-200 ${isDragging ? "scale-105" : "scale-100"}`}
          >
            <div className="flex gap-1">
              <div className="w-[3px] h-5 bg-gray-400 rounded-md"></div>
              <div className="w-[3px] h-5 bg-gray-400 rounded-md"></div>
              <div className="w-[3px] h-5 bg-gray-400 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT TEXT */}
    {afterLabel && (
      <div className="
        order-3
        flex flex-col gap-4
        text-end lg:text-end
        items-end lg:items-end
        max-w-sm
        pointer-events-none
      ">
        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-400"></div>
        <p className="select-none text-sm sm:text-base leading-relaxed text-gray-800">
          {afterLabel}
        </p>
      </div>
    )}

  </div>
);

};

export default function App() {
  const beforeImg = "/images/hoodies/blueHoodie.png";
  const afterImg = "/images/hoodies/grayHoodie.png";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-14">
      <ImageCompare
        beforeImage={beforeImg}
        afterImage={afterImg}
        beforeLabel="With bold silhouettes and confident design, we craft apparel for those who act before they're ready. Unapologetically present."
        afterLabel="With bold silhouettes and confident design, we craft apparel for those who act before they're ready. Unapologetically present."
      />
    </div>
  );
}