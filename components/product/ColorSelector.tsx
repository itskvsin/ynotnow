"use client";

interface ColorSelectorProps {
  colors: string[];
}

export default function ColorSelector({ colors }: ColorSelectorProps) {
  return (
    <div>
      <p className="text-sm mb-2">Colors</p>
      <div className="flex gap-3">
        {colors.map((color) => (
          <span
            key={color}
            className="h-6 w-6 rounded-full border cursor-pointer"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
