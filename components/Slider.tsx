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
    
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
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
    <div className="w-full relative">
      {/* Image Comparison Container - Full Width */}
      <div className="w-full">
        <div
          ref={containerRef}
          className="relative w-full aspect-video overflow-visible cursor-ew-resize select-none touch-none bg-white"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={handleContainerClick}
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <img
              src={afterImage}
              alt="After"
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />
          </div>

          {/* Before Image (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={beforeImage}
              alt="Before"
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none transition-opacity duration-200"
            style={{ 
              left: `calc(${sliderPosition}% - 0.125rem)`,
              opacity: isDragging ? 1 : 0.9
            }}
          >
            {/* Slider Handle */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-200 ${isDragging ? 'scale-105' : 'scale-100'}`}>
              <div className="flex gap-0.5">
                <div className="w-0.5 h-5 bg-gray-400 rounded-full"></div>
                <div className="w-0.5 h-5 bg-gray-400 rounded-full"></div>
                <div className="w-0.5 h-5 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Text Section - Overlay */}
      {beforeLabel && (
        <div className="absolute left-8 lg:left-20 top-1/6 -translate-y-1/2 flex flex-col gap-6 text-start items-start max-w-sm pointer-events-none z-10">
          <div className="h-6 w-6 rounded-full bg-gray-400"></div>
          <p className="select-none text-sm lg:text-base leading-relaxed text-gray-800">
            {beforeLabel}
          </p>
        </div>
      )}

      {/* Right Text Section - Overlay */}
      {afterLabel && (
        <div className="absolute right-8 lg:right-20 top-1/6 -translate-y-1/2 flex flex-col gap-6 text-end items-end max-w-sm pointer-events-none z-10">
          <div className="h-6 w-6 rounded-full bg-gray-400"></div>
          <p className="select-none text-sm lg:text-base leading-relaxed text-gray-800">
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