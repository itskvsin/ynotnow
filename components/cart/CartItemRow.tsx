"use client";

import Image from "next/image";
import { CartItem } from "@/types/cart";

interface CartItemRowProps {
  item: CartItem;
  onToggle: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function CartItemRow({
  item,
  onToggle,
  onIncrease,
  onDecrease,
}: CartItemRowProps) {
  return (
    <div className="border rounded-xl p-3 flex gap-3 items-center">
      <input
        type="checkbox"
        checked={item.selected}
        onChange={onToggle}
      />

      <Image
        src={item.imageUrl}
        alt={item.title}
        width={90}
        height={120}
        className="rounded-lg object-cover"
      />

      <div className="flex-1">
        <h3 className="text-sm font-medium">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.size}</p>
        <p className="text-xs text-green-600">In Stock</p>
        <p className="text-sm font-medium mt-1">
          ₹{item.price.toLocaleString()}
        </p>
      </div>

      <div className="flex flex-col justify-between h-24 items-end gap-2">
        <button className="text-gray-400 text-sm">🗑</button>

        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-sm">
          <button onClick={onDecrease}>−</button>
          <span>{item.quantity}</span>
          <button onClick={onIncrease}>+</button>
        </div>
      </div>
    </div>
  );
}
