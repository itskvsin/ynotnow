"use client";

import { useState } from "react";
import { ShippingRate } from "@/types/shipping";
import { PiPackage } from "react-icons/pi";


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
        <div className="flex items-center text-2xl gap-2 mb-6">
          <span className="text-3xl"><PiPackage /></span>
          <h3 className="font-medium">
            Estimate shipping calculator
          </h3>
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-lg mb-2 px-2">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-full border px-4 py-4 text-md pr-10 outline-none"
          >
            <option>India</option>
            <option>United States</option>
          </select>
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block text-lg mb-2 px-2">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full rounded-full border px-4 py-4 text-md outline-none"
          >
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
        </div>

        {/* Zip Code */}
        <div className="mb-6">
          <label className="block text-lg mb-2 px-2">Zip Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="100-0012"
            className="w-full rounded-full border px-4 py-4 text-md outline-none"
          />
        </div>

        {/* Calculate */}
        <button
          onClick={handleCalculate}
          className="w-full bg-black text-white py-5 rounded-full text-sm"
        >
          Calculate
        </button>

        {/* Result */}
        {rate && (
          <div className="bg-black text-white rounded-xl p-6 mt-6 text-md text-center">
            <p className="mb-6">
              There is one shipping rate for your address:
            </p>
            <p className="font-normal">
              {rate.label}: <span className="font-bold text-lg">{rate.currency}  {rate.amount.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
