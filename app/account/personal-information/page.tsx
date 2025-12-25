"use client";

import BreadCrumbNav from "@/components/BreadCrumbNav";
import tabs from "@/data/PersonalTabs";

import React, { useState, useRef } from "react";

const page = () => {
  const [activeTab, setActiveTab] = useState("profile");

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
        className="flex gap-8 border-b overflow-x-auto whitespace-nowrap scrollbar-hide"
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
      <div className="h-[2px] bg-gray-200 relative">
        <div
          className="h-full bg-black transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </section>
  );
};

export default page;
