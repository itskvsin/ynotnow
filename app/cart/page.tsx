"use client";

import CartSection from "@/components/cart/CartSection";
import ShippingCalculator from "@/components/cart/ShippingCalculator";
import ShippingInfoBanner from "@/components/cart/ShippinhInfoBanner";
import { CartItem, CartSummary } from "@/types/cart";
import FeaturesGrid from "@/components/commonDetail/FeaturesGrid";
import About from "@/components/commonDetail/About";
import LastBg from "@/components/commonDetail/LastBg";
import Footer from "@/components/layout/Footer";
import BreadCrumbNav from "@/components/BreadCrumbNav";

const mockCartItems: CartItem[] = [
  {
    id: "1",
    title: "Momentum Hoodie",
    size: "XXL",
    price: 2299,
    imageUrl: "/images/hoodies/blueHoodie.png",
    inStock: true,
    quantity: 1,
    selected: true,
  },
  {
    id: "2",
    title: "Momentum Hoodie",
    size: "XXL",
    price: 2299,
    imageUrl: "/images/hoodies/grayHoodie.png",
    inStock: true,
    quantity: 1,
    selected: true,
  },
    {
    id: "3",
    title: "Momentum Hoodie",
    size: "XXL",
    price: 2299,
    imageUrl: "/images/hoodies/grayBgHoodie.jpg",
    inStock: true,
    quantity: 1,
    selected: true,
  },
];

const mockCartSummary: CartSummary = {
  subtotal: 6299,
  discount: 29,
  deliveryFee: 299,
  total: 7499,
};

export default function CartPage() {
  return (
    <div className="pb-28">
      <div className="pl-4">
        <BreadCrumbNav />
      </div>
      {/* Cart Items + Order Summary */}
      <CartSection items={mockCartItems} summary={mockCartSummary} />

      {/* Shipping Calculator */}
      <ShippingCalculator />
      <div>
        <div>
          {" "}
          <FeaturesGrid />
          <About />
          <LastBg />
          <Footer />
        </div>
      </div>
    </div>
  );
}
