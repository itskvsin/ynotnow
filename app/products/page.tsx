"use client";

import { useState } from "react";
import { RiFilter3Fill } from "react-icons/ri";
import { BsFillGridFill } from "react-icons/bs";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import ProductShowcaseClone from "@/components/ProductShowcaseClone";

const Hero = () => {
  return (
    <div className="bg-[url('/images/collectionHoodie.png')] flex flex-col gap-4 py-6 px-6 items-start justify-end bg-center bg-cover h-80 w-full lg:h-[60vh] lg:bg-cover lg:bg-[35%_65%]">
      {" "}
      <h1 className="text-3xl text-white font-bold font-Geist">Shop All</h1>
      <p className="text-white/50 font-Geist text-sm">
        Every drop. Every vibe. Find your next favorite look all in one place.
      </p>{" "}
    </div>
  );
};

type SortOption = "default" | "price-low" | "price-high" | "name-asc" | "name-desc";

const page = () => {
  const [gridView, setGridView] = useState<"2" | "4">("4");
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    setShowFilter(false);
  };

  return (
    <section>
      <div className="relative">
        <Hero />
      </div>
      <div className="h-18 border-b w-full flex justify-between px-4 lg:items-center lg:justify-end lg:gap-10">
        <div className="leftSection flex gap-4 items-center">
          <button
            onClick={() => setGridView("2")}
            className={`p-2 transition-colors ${
              gridView === "2" ? "text-black" : "text-black/50"
            }`}
            aria-label="2 column grid view"
          >
            <BsFillGridFill className="text-2xl" />
          </button>
          <button
            onClick={() => setGridView("4")}
            className={`p-2 transition-colors ${
              gridView === "4" ? "text-black" : "text-black/50"
            }`}
            aria-label="4 column grid view"
          >
            <TfiLayoutGrid3Alt className="text-xl" />
          </button>
        </div>
        <div className="rightSection flex items-center text-xl gap-2">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <RiFilter3Fill />
            <p>Filter & Sort</p>
          </button>
        </div>
      </div>

      {/* Filter & Sort Modal */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end"
          onClick={() => setShowFilter(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Filter & Sort</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close filter"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Sort By</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleSort("default")}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      sortBy === "default"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Default
                  </button>
                  <button
                    onClick={() => handleSort("price-low")}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      sortBy === "price-low"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => handleSort("price-high")}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      sortBy === "price-high"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => handleSort("name-asc")}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      sortBy === "name-asc"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Name: A to Z
                  </button>
                  <button
                    onClick={() => handleSort("name-desc")}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      sortBy === "name-desc"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Name: Z to A
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <ProductShowcaseClone gridCols={gridView} sortBy={sortBy} />
      </div>
    </section>
  );
};
export default page;
