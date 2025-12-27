"use client";

import { useState } from "react";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  onChange?: (qty: number) => void;
}

export default function QuantitySelector({
  min = 1,
  max = 99,
  onChange,
}: QuantitySelectorProps) {
  const [qty, setQty] = useState(5);

  const update = (val: number) => {
    if (val < min || val > max) return;
    setQty(val);
    onChange?.(val);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-full px-6 py-3 my-6">
      <button onClick={() => update(qty - 1)} className="text-xl">−</button>
      <span className="text-sm font-medium">{qty.toString().padStart(2, "0")}</span>
      <button onClick={() => update(qty + 1)} className="text-xl">+</button>
    </div>
  );
}
