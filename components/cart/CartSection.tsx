"use client";

import { useState, useEffect } from "react";
import { CartItem, CartSummary } from "@/types/cart";
import CartItemRow from "./CartItemRow";
import OrderSummary from "./OrderSummary";
import { useUpdateCartItem } from "@/hooks/useUpdateCartItem";
import { useRemoveCartItem } from "@/hooks/useRemoveCartItem";
import { useCart } from "@/hooks/useCart";

interface CartSectionProps {
  items: CartItem[];
  summary: CartSummary;
  checkoutUrl?: string | null;
}

export default function CartSection({ items: initialItems, summary, checkoutUrl }: CartSectionProps) {
  const [cartItems, setCartItems] = useState(initialItems);
  const { refresh } = useCart();
  const { updateItem, isLoading: isUpdating } = useUpdateCartItem();
  const { removeItem, isLoading: isRemoving } = useRemoveCartItem();

  // Sync with cart updates
  useEffect(() => {
    setCartItems(initialItems);
  }, [initialItems]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      refresh();
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, [refresh]);

  const toggleItem = (id: string) => {
    // UI-only selection state
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const updateQty = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await updateItem(id, newQuantity);
      // Cart will refresh via event listener
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm("Remove this item from cart?")) return;

    try {
      await removeItem(id);
      // Cart will refresh via event listener
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item");
    }
  };

  const allSelected = cartItems.every((i) => i.selected);

  return (
    <section className="px-4 py-6 w-full ">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 lg:max-w-7xl mx-auto">
        <label className="flex items-center gap-2 text-xl">
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

        <button
          onClick={() => {
            const selectedItems = cartItems.filter((i) => i.selected);
            if (selectedItems.length > 0) {
              if (confirm(`Remove ${selectedItems.length} item(s) from cart?`)) {
                selectedItems.forEach((item) => handleRemove(item.id));
              }
            }
          }}
          className="text-red-500 text-lg disabled:opacity-50"
          disabled={isRemoving || cartItems.filter((i) => i.selected).length === 0}
        >
          Remove
        </button>
      </div>

      <div className="lg:flex lg:items-start lg:justify-between lg:max-w-7xl mx-auto lg:gap-10">
        {/* Items */}
        <div className="space-y-4 lg:w-3/4">
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onToggle={() => toggleItem(item.id)}
              onIncrease={() => updateQty(item.id, item.quantity + 1)}
              onDecrease={() => updateQty(item.id, item.quantity - 1)}
              onRemove={() => handleRemove(item.id)}
              isLoading={isUpdating || isRemoving}
            />
          ))}
        </div>

        {/* <div className="w-1/4"> */}
          {/* Summary */}
          <OrderSummary summary={summary} checkoutUrl={checkoutUrl} />
        {/* </div> */}
      </div>
    </section>
  );
}
