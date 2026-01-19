"use client";

import CartSection from "@/components/cart/CartSection";
import ShippingCalculator from "@/components/cart/ShippingCalculator";
import ShippingInfoBanner from "@/components/cart/ShippinhInfoBanner";
import BreadCrumbNav from "@/components/BreadCrumbNav";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

export default function CartPage() {
  const { items, summary, isLoading, error, checkoutUrl } = useCart();

  if (isLoading) {
    return (
      <div>
        <div className="pl-4 lg:pl-10">
          <BreadCrumbNav />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="pl-4 lg:pl-10">
          <BreadCrumbNav />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <div className="pl-4 lg:pl-10">
          <BreadCrumbNav />
        </div>
        <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to get started</p>
          <Link
            href="/products"
            className="bg-black text-white px-6 py-3 rounded-full"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pl-4 lg:pl-10">
        <BreadCrumbNav />
      </div>
      {/* Cart Items + Order Summary */}
      <CartSection items={items} summary={summary} checkoutUrl={checkoutUrl} />

      {/* Shipping Calculator */}
      <ShippingCalculator />
      <div>
        <div>
        </div>
      </div>
    </div>
  );
}
