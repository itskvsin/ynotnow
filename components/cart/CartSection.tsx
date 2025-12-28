"use client";

import { useState } from "react";
import { CartItem, CartSummary } from "@/types/cart";
import CartItemRow from "./CartItemRow";
import OrderSummary from "./OrderSummary";

interface CartSectionProps {
  items: CartItem[];
  summary: CartSummary;
}

export default function CartSection({ items, summary }: CartSectionProps) {
  const [cartItems, setCartItems] = useState(items);

  const toggleItem = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const allSelected = cartItems.every((i) => i.selected);

  return (
    <section className="px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() =>
              setCartItems((prev) =>
                prev.map((i) => ({ ...i, selected: !allSelected }))
              )
            }
            className="accent-black"
          />
          Select all
        </label>

        <button className="text-red-500 text-sm">Remove</button>
      </div>

      <div className="lg:flex lg:items-start lg:justify-between">
        {/* Items */}
        <div className="space-y-4 lg:w-2/4">
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onToggle={() => toggleItem(item.id)}
              onIncrease={() => updateQty(item.id, 1)}
              onDecrease={() => updateQty(item.id, -1)}
            />
          ))}
        </div>

        {/* <div className="w-1/4"> */}
          {/* Summary */}
          <OrderSummary summary={summary} />
        {/* </div> */}
      </div>
    </section>
  );
}
