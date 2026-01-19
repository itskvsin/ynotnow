"use client";

import { useState } from "react";
import { CartSummary } from "@/types/cart";
import { GoTag } from "react-icons/go";
import { PiPackage } from "react-icons/pi";

interface OrderSummaryProps {
  summary: CartSummary;
  checkoutUrl?: string | null;
  discountCodes?: Array<{ code: string; applicable: boolean }>;
  onDiscountCodeApplied?: () => void;
}

export default function OrderSummary({ 
  summary, 
  checkoutUrl,
  discountCodes = [],
  onDiscountCodeApplied 
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      alert("Checkout URL not available. Please try again.");
    }
  };

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      setError("Please enter a promo code");
      return;
    }

    setIsApplying(true);
    setError(null);

    try {
      const response = await fetch("/api/cart/discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discountCode: promoCode.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to apply discount code");
      }

      setPromoCode("");
      if (onDiscountCodeApplied) {
        onDiscountCodeApplied();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply discount code");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="lg:w-2/4 bg-gray-100 rounded-xl p-4 mt-6">
      <h3 className="text-lg font-medium mb-3">Order Summary</h3>

      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-black">₹{summary.subtotal}</span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-red-500">-₹{summary.discount}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="text-black">₹{summary.deliveryFee}</span>
        </div>

        <div className="border-t pt-2 flex justify-between text-black font-medium">
          <span>Total</span>
          <span className="text-lg">₹{summary.total}</span>
        </div>
      </div>

      {/* Applied Discount Codes */}
      {discountCodes.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Applied Codes:</p>
          {discountCodes.map((dc, index) => (
            <div key={index} className="flex items-center justify-between text-sm bg-green-50 px-3 py-2 rounded">
              <span className={dc.applicable ? "text-green-700" : "text-gray-500"}>
                {dc.code}
              </span>
              {!dc.applicable && (
                <span className="text-xs text-red-500">Not applicable</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => {
            setPromoCode(e.target.value);
            setError(null);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleApplyPromoCode();
            }
          }}
          placeholder="Add promo code"
          className="flex-1 bg-gray-200 rounded-full px-4 py-3 text-sm outline-none"
          disabled={isApplying}
        />
        <button
          onClick={handleApplyPromoCode}
          disabled={isApplying || !promoCode.trim()}
          className="bg-black text-white rounded-full px-7 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isApplying ? "Applying..." : "Apply"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}

      <button
        onClick={handleCheckout}
        disabled={!checkoutUrl}
        className="w-full bg-black text-white rounded-full py-4 mt-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Go to Checkout →
      </button>
    </div>
  );
}
