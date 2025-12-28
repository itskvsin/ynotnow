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
      {/* Header */}
      <div className="flex items-center text-2xl gap-2 px-10 mb-6">
        <span className="text-3xl">
          <PiPackage />
        </span>
        <h3 className="font-medium">Estimate shipping calculator</h3>
      </div>
      <div className="border lg:border-0 px-10 rounded-xl p-4 lg:flex lg:flex-col">
        <div className="lg:flex lg:items-center lg:justify-evenly gap-2">
          {" "}
          {/* Country */}
          <div className="mb-4 lg:w-1/3">
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
          <div className="mb-4 lg:w-1/3">
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
          <div className="mb-6 lg:w-1/3">
            <label className="block text-lg mb-2 px-2">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="100-0012"
              className="w-full rounded-full border px-4 py-4 text-md outline-none"
            />
          </div>
        </div>

        <div>
          {/* Calculate */}
          <button
            onClick={handleCalculate}
            className="w-full lg:w-1/12 bg-black text-white py-5 lg:py-6 rounded-full text-sm"
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
                {rate.label}:{" "}
                <span className="font-bold text-lg">
                  {rate.currency} {rate.amount.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
