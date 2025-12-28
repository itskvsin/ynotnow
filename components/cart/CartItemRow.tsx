"use client";

import Image from "next/image";
import { CartItem } from "@/types/cart";
import { HiOutlineTrash } from "react-icons/hi2";


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
    <div className="border rounded-xl flex gap-3 items-start">
      <input
        type="checkbox"
        checked={item.selected}
        onChange={onToggle}
        className="absolute accent-black m-2"
      />

      <Image
        src={item.imageUrl}
        alt={item.title}
        width={120}
        height={160}
        className="rounded-l-lg object-cover"
      />

<div className="flex justify-between w-full h-32 pr-4 items-end">
        <div className="flex-1">
        <h3 className="text-sm font-medium">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.size}</p>
        <p className="text-xs text-green-600">In Stock</p>
        <p className="text-sm font-medium mt-1">
          ₹{item.price.toLocaleString()}
        </p>
      </div>

      <div className="flex flex-col justify-center items-end gap-8">
        <button className="text-gray-400 text-sm"><HiOutlineTrash className="text-lg" /></button>

        <div className="flex gap-2 bg-gray-100 items-end rounded-full px-3 py-1 text-sm">
          <button onClick={onDecrease}>−</button>
          <span>{item.quantity}</span>
          <button onClick={onIncrease}>+</button>
        </div>
      </div>
</div>
    </div>
  );
}
