"use client";

import { useState, useEffect } from "react";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  onChange?: (qty: number) => void;
  value?: number;
}

export default function QuantitySelector({
  min = 1,
  max = 99,
  onChange,
  value: controlledValue,
}: QuantitySelectorProps) {
  const [internalQty, setInternalQty] = useState(1);
  const qty = controlledValue ?? internalQty;

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalQty(controlledValue);
    }
  }, [controlledValue]);

  const update = (val: number) => {
    if (val < min || val > max) return;
    if (controlledValue === undefined) {
      setInternalQty(val);
    }
    onChange?.(val);
  };

  return (
    <div className="flex items-center justify-between lg:flex  bg-gray-100 rounded-full px-6 py-4 my-6">
      <button
        onClick={() => update(qty - 1)}
        disabled={qty <= min}
        className="text-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        −
      </button>
      <span className="text-lg font-medium">{qty.toString().padStart(2, "0")}</span>
      <button
        onClick={() => update(qty + 1)}
        disabled={qty >= max}
        className="text-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}
