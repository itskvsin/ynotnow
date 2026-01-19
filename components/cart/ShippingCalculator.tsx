"use client";

import { useState } from "react";
import { ShippingRate } from "@/types/shipping";
import { PiPackage } from "react-icons/pi";

export default function ShippingCalculator() {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    if (!country) {
      setError("Please select a country");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRates([]);

    try {
      const response = await fetch("/api/cart/shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country,
          state: state || undefined,
          city: city || undefined,
          zipCode: zipCode || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to calculate shipping");
      }

      if (data.rates && data.rates.length > 0) {
        // Transform Shopify rates to our format
        const transformedRates: ShippingRate[] = data.rates.map((rate: any) => ({
          label: rate.title,
          amount: parseFloat(rate.cost.amount),
          currency: rate.cost.currencyCode,
        }));
        setRates(transformedRates);
      } else {
        setError("No shipping rates available for this address");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate shipping");
    } finally {
      setIsLoading(false);
    }
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
          {/* City */}
          <div className="mb-4 lg:w-1/3">
            <label className="block text-lg mb-2 px-2">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Mumbai"
              className="w-full rounded-full border px-4 py-4 text-md outline-none"
            />
          </div>
          {/* Zip Code */}
          <div className="mb-6 lg:w-1/3">
            <label className="block text-lg mb-2 px-2">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="400001"
              className="w-full rounded-full border px-4 py-4 text-md outline-none"
            />
          </div>
        </div>

        <div>
          {/* Calculate */}
          <button
            onClick={handleCalculate}
            disabled={isLoading}
            className="w-full lg:w-1/12 bg-black text-white py-5 lg:py-6 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Calculating..." : "Calculate"}
          </button>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 rounded-xl p-4 mt-6 text-sm">
              {error}
            </div>
          )}

          {/* Results */}
          {rates.length > 0 && (
            <div className="bg-black text-white rounded-xl p-6 mt-6">
              <p className="mb-4 text-md text-center">
                {rates.length === 1 
                  ? "Available shipping rate:" 
                  : `Available shipping rates (${rates.length}):`}
              </p>
              <div className="space-y-3">
                {rates.map((rate, index) => (
                  <div key={index} className="text-center">
                    <p className="font-normal">
                      {rate.label}:{" "}
                      <span className="font-bold text-lg">
                        {rate.currency} {rate.amount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
