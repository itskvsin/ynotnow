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

/* -------------------- TAB CONTENTS -------------------- */

function Profile() {
  return (
    <section>
      <div className="px-4 font-Geist">
        <div className="max-w-sm mx-auto lg:mx-0 lg:max-w-lg">
          {/* User Name */}
          <div className="mb-6">
            <label className="block text-sm mb-2">User Name</label>
            <input
              type="text"
              defaultValue="Ynotnow"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              defaultValue="ynotnow@gmail.com"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              defaultValue="********"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* Reset Password */}
          <div className="text-right mb-8">
            <button className="text-sm underline text-gray-600 cursor-pointer">
              Reset Password
            </button>
          </div>

          {/* Save Button */}
          <Link href="#">
            <button className="bg-black text-white px-10 py-3 rounded-full text-sm font-medium cursor-pointer">
              Save Edits
            </button>
          </Link>
        </div>
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
    <div className="bg-white border-b">
      <div className="flex items-center lg:max-w-full lg:justify-evenly px-4 py-6 gap-6">
        {/* Product */}
        <div className="flex items-center gap-4 flex-1">
          <Image
            src="/images/hoodies/grayBgHoodie.jpg"
            alt="Momentum Hoodie"
            height={500}
            width={500}
            className="w-20 h-24 rounded-lg object-cover"
          />

          <div className="text-start h-22">
            <h3 className="text-sm font-medium">Momentum Hoodie</h3>
            <div className="text-xs text-gray-500">XXL</div>
            <div className="text-xs text-green-600">In Stock</div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="hidden md:block md:w-1/4 text-sm text-center">Paid</div>

        {/* Delivery Status */}
        <div className="hidden md:block md:w-1/4 text-sm text-green-600 text-center">
          Delivered
        </div>

        {/* Repeat Button */}
        <div className=" flex justify-end">
          <button className="bg-black text-white text-xs px-6 py-2 cursor-pointer rounded-full">
            Repeat
          </button>
        </div>
      </div>
    </div>
  );
}

function Tracking() {
  return (
    <div className="max-w-sm lg:max-w-full mx-auto px-4 py-6 font-Geist">
      <label className="block text-lg lg:text-2xl mb-2">Tracking ID</label>
      <input
        type="text"
        placeholder="Enter Tracking Id"
        className="w-full lg:max-w-3/4 rounded-full border px-4 py-3 text-sm outline-none mb-6"
      />
      <br />
      <button className="w-full lg:w-2/12 bg-black text-white py-4 rounded-full text-sm font-medium">
        Track order
      </button>
    </div>
  );
}

function WishList() {
  return (
    <div className="px-4 py-4 space-y-8 font-Geist">
      <WishlistCard />
      <WishlistCard />
      <WishlistCard />
    </div>
  );
}

function WishlistCard() {
  return (
    <div className="bg-white border-b pb-3">
      <div className="relative flex items-center lg:items-start py-4  gap-6">
        {/* Remove */}
        <button className="absolute top-4 left-1 lg:top-4 lg:left-1 text-lg font-bold cursor-pointer">
          ×
        </button>

        {/* Product */}
        <div className="flex items-center lg:items-start gap-4 flex-1">
          <Image
            src="/images/hoodies/grayBgHoodie.jpg"
            alt="Momentum Hoodie"
            height={500}
            width={500}
            className="w-20 h-20 rounded-lg object-cover object-top"
          />

          <div className="flex flex-col items-start lg:items-end">
            <div>
              {" "}
              <h3 className="text-sm font-medium">Momentum Hoodie</h3>
              <p className="text-xs text-gray-500">XXL</p>
            </div>
            {/* Stock Status */}
            <div className="text-sm  text-green-600">
              <p className="md:absolute md:right-[30vw] md:top-2/4">In Stock</p>
            </div>
          </div>
        </div>

        {/* Add to cart */}
        <div className="w-32 flex justify-center">
          <button className="bg-black text-white text-xs px-6 py-2 rounded-full whitespace-nowrap">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

const tabLabels: Record<string, string> = {
  profile: "Personal Information",
  orders: "Order History",
  tracking: "Order Tracking",
  wishlist: "Wishlist",
};

function AccountBreadcrumb({ activeTab }: { activeTab: string }) {
  return (
    <div className="px-4 font-Geist text-sm text-gray-500">
      <span>Account</span>
      <span className="mx-2">{">"}</span>
      <span className="text-black font-medium">{tabLabels[activeTab]}</span>
    </div>
  );
}

/* -------------------- MAIN PAGE -------------------- */

const page = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!tabsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  };

  return (
    <section>
      <div className="relative h-30" />

      <div className="px-4 font-Geist pl-6">
        <AccountBreadcrumb activeTab={activeTab} />
      </div>

      {/* -------- MOBILE TABS (unchanged) -------- */}
      <div
        ref={tabsRef}
        onScroll={handleScroll}
        className="flex md:hidden gap-8 overflow-x-auto mt-8 px-4 whitespace-nowrap scrollbar-hide"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 flex items-center gap-2 text-sm cursor-pointer ${
              activeTab === tab.id
                ? "border-b-2 border-black font-medium"
                : "text-gray-500"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="md:hidden h-0.5 mt-2 bg-gray-200">
        <div
          className="h-full bg-black transition-all"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* -------- DESKTOP LAYOUT -------- */}
      <div className="md:flex md:gap-10 md:px-6 md:mt-6">
        {/* Sidebar */}
        <div className="hidden md:block md:w-72">
          <div className="bg-white rounded-2xl border shadow-sm py-2 px-5 font-Geist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-2 py-3 m-2 border-b md:text-lg rounded-lg transition-none duration-200 ${
                  activeTab === tab.id
                    ? "bg-black text-white scale-90"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-6">
          {activeTab === "profile" && <Profile />}
          {activeTab === "orders" && <Orders />}
          {activeTab === "tracking" && <Tracking />}
          {activeTab === "wishlist" && <WishList />}
        </div>
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
