import { CartSummary } from "@/types/cart";
import { GoTag } from "react-icons/go";
import { PiPackage } from "react-icons/pi";


interface OrderSummaryProps {
  summary: CartSummary;
  checkoutUrl?: string | null;
}

export default function OrderSummary({ summary, checkoutUrl }: OrderSummaryProps) {
  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      alert("Checkout URL not available. Please try again.");
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

        <div className="flex justify-between">
          <span>Discount (-20%)</span>
          <span className="text-red-500">₹{summary.discount}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="text-black">₹{summary.deliveryFee}</span>
        </div>

        <div className="border-t pt-2 flex justify-between text-black font-medium">
          <span>Total</span>
          <span className="text-lg">₹{summary.total}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder={`Add promo code `}
          className="flex-1 bg-gray-200 rounded-full px-4 py-3 text-sm outline-none"
        />
        <button className="bg-black text-white rounded-full px-7 py-3 text-sm">
          Apply
        </button>
      </div>

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
