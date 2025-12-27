"use client";

import { useState } from "react";
import { ShippingRate } from "@/types/shipping";

export default function ShippingCalculator() {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [zipCode, setZipCode] = useState("");
  const [rate, setRate] = useState<ShippingRate | null>(null);

  const handleCalculate = () => {
    // 🔁 Replace with backend API call later
    setRate({
      label: "Standard Shipping",
      amount: 299,
      currency: "INR",
    });
  };

  return (
    <section className="px-4 py-6">
      <div className="border rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📦</span>
          <h3 className="text-sm font-medium">
            Estimate shipping calculator
          </h3>
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-full border px-4 py-3 text-sm outline-none"
          >
            <option>India</option>
            <option>United States</option>
          </select>
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block text-sm mb-2">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full rounded-full border px-4 py-3 text-sm outline-none"
          >
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
        </div>

        {/* Zip Code */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Zip Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="100-0012"
            className="w-full rounded-full border px-4 py-3 text-sm outline-none"
          />
        </div>

        {/* Calculate */}
        <button
          onClick={handleCalculate}
          className="w-full bg-black text-white py-4 rounded-full text-sm"
        >
          Calculate
        </button>

        {/* Result */}
        {rate && (
          <div className="bg-black text-white rounded-xl p-4 mt-6 text-sm">
            <p className="mb-2">
              There is one shipping rate for your address:
            </p>
            <p className="font-medium">
              {rate.label}: {rate.currency} {rate.amount.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
