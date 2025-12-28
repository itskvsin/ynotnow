"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface OrderSuccessModalProps {
  open: boolean;
  onClose: () => void;
  onViewOrder?: () => void;
}

export default function OrderSuccessfull({
  open,
  onClose,
  onViewOrder,
}: OrderSuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="relative bg-white w-[95%] max-w-6xl h-[65vh] flex flex-col items-center justify-center text-center px-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-black"
        >
          <X size={28} />
        </button>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-brigends uppercase font-bold tracking-tight mb-3">
          YOU ORDERED SUCCESSFULLY!
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-gray-700 mb-14">
          Now Sit Back. Your Drip Is Coming.....
        </p>

        {/* Brand / Icon */}
        <div className="mb-16">
              <Image
      src="/images/orderLogo.png"
      width={10000}
      height={10000}
      alt="Picture of the author"
      className="h-40 w-40"
    />
        </div>

        {/* CTA */}
        <button
          onClick={onViewOrder}
          className="border border-black rounded-full px-10 py-4 text-lg font-medium hover:bg-black hover:text-white transition"
        >
          Order Details
        </button>
      </div>
    </div>
  );
}
