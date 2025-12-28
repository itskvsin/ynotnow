"use client";

import { useState } from "react";

interface ColorSelectorProps {
  colors: string[];
  selectedColor?: string;
  onChange?: (color: string) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onChange,
}: ColorSelectorProps) {
  const [activeColor, setActiveColor] = useState<string | undefined>(
    selectedColor
  );

  const handleSelect = (color: string) => {
    setActiveColor(color);
    onChange?.(color);
  };

  return (
    <div>
      <p className="text-md font-medium mb-2">Colors</p>

      <div className="flex gap-3">
        {colors.map((color) => {
          const isActive = activeColor === color;

          return (
            <button
              key={color}
              onClick={() => handleSelect(color)}
              className={`h-6 w-6 rounded-full flex items-center justify-center
                ${isActive ? "ring-2 ring-black" : "ring-1 ring-gray-300"}
              `}
              aria-label={`Select color ${color}`}
            >
              <span
                className="h-5 w-5 rounded-full"
                style={{ backgroundColor: color }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
