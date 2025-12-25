"use client";

import BreadCrumbNav from "@/components/BreadCrumbNav";
import tabs from "@/data/PersonalTabs";
import Link from "next/link";
import FeaturesGrid from "@/components/FeaturesGrid";
import About from "@/components/About";
import LastBg from "@/components/LastBg";
import Footer from "@/components/Footer";
import Image from "next/image";

import React, { useState, useRef } from "react";

function Profile() {
  return (
    <section>
      <div className="max-w-sm mx-auto px-4 font-Geist">
        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm mb-1">User Name</label>
          <input
            type="text"
            defaultValue="Ynotnow"
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            defaultValue="ynotnow@gmail.com"
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            defaultValue="********"
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none"
          />
        </div>

        {/* Reset Password */}
        <div className="text-right mb-6">
          <button className="text-sm underline cursor-pointer text-gray-600">
            Reset Password
          </button>
        </div>

        {/* Save Button */}
        <Link href="#">
          {" "}
          <button className="w-full bg-black cursor-pointer text-white py-4 rounded-full text-sm font-medium">
            Save Edits
          </button>
        </Link>
      </div>
    </section>
  );
}

function Orders() {
  return (
    <div className="px-4 py-4 space-y-4 font-Geist">
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  );
}

function OrderCard() {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl pr-4 shadow-sm border">
      {/* Product Image */}
      <Image
        src="/images/hoodies/grayBgHoodie.jpg"
        alt="Momentum Hoodie"
        height={500}
        width={500}
        className="w-24 h-30 rounded-l-lg object-cover bg-gray-600"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-sm font-medium">Momentum Hoodie</h3>

        <div className="text-xs text-gray-500 mt-1">Paid</div>

        <div className="text-xs text-green-600">Delivered</div>

        <div className="text-sm font-medium mt-2">₹2,299</div>
      </div>

      {/* Repeat Button */}
      <button className="bg-black text-white text-xs px-4 py-2 rounded-full">
        Repeat
      </button>
    </div>
  );
}

function Tracking() {
  return (
    <div className="max-w-sm mx-auto px-4 py-6 font-Geist">
      {/* Label */}
      <label className="block text-lg mb-2">Tracking ID</label>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter Tracking Id"
        className="w-full rounded-full border px-4 py-3 text-sm outline-none mb-6"
      />

      {/* Button */}
      <button className="w-full bg-black text-white py-4 rounded-full text-sm font-medium">
        Track order
      </button>
    </div>
  );
}

function WishList() {
  return (
    <div className="px-4 py-4 space-y-4 font-Geist">
      <WishlistCard />
      <WishlistCard />
      <WishlistCard />
    </div>
  );
}
function WishlistCard() {
  return (
    <div className="relative flex items-center gap-4 bg-white rounded-xl pr-4 border shadow-sm">
      {/* Remove icon */}
      <button className="absolute top-3 cursor-pointer left-3 text-lg font-bold">
        ×
      </button>

      {/* Product Image */}
      <Image
        src="/images/hoodies/grayBgHoodie.jpg"
        alt="Momentum Hoodie"
        height={500}
        width={500}
        className="w-24 h-30 rounded-l-lg object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-sm font-medium">Momentum Hoodie</h3>

        <div className="text-xs text-gray-500 mt-1">XXL</div>

        <div className="text-xs text-green-600">In stock</div>

        <div className="text-sm font-medium mt-2">₹2,299</div>
      </div>

      {/* Add to cart */}
      <button className="bg-black text-white text-xs px-4 py-2 rounded-full whitespace-nowrap">
        Add to cart
      </button>
    </div>
  );
}

const page = () => {
  const [activeTab, setActiveTab] = useState("wishlist");

  // NEW: refs & state for scroll indicator
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // NEW: scroll handler
  const handleScroll = () => {
    if (!tabsRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
    const maxScroll = scrollWidth - clientWidth;

    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
  };

  return (
    <section>
      <div className="relative h-15" />

      <div className="px-4 font-Geist">
        <BreadCrumbNav />
      </div>

      {/* Tabs */}
      <div
        ref={tabsRef}
        onScroll={handleScroll}
        className="flex gap-8 overflow-x-auto mt-8 px-4 whitespace-nowrap scrollbar-hide"
      >
        {tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
              }}
              className={`pb-3 flex items-center justify-evenly text-sm gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? "border-b-2 border-black font-medium"
                  : "text-gray-500"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          );
        })}
      </div>

      {/* Custom scroll indicator (black line) */}
      <div className="h-0.5 mt-2 bg-gray-200 relative">
        <div
          className="h-full bg-black transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="pt-6">
        {activeTab === "profile" && <Profile />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "tracking" && <Tracking />}
        {activeTab === "wishlist" && <WishList />}
      </div>

      <div className="mt-14">
        <FeaturesGrid />
        <About />
        <LastBg />
        <Footer />
      </div>
    </section>
  );
};

export default page;
