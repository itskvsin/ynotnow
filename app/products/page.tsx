"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiFilter3Fill } from "react-icons/ri";
import { BsFillGridFill } from "react-icons/bs";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
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
  const [gridView, setGridView] = useState<"2" | "3">("3");
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    setShowFilter(false);
  };

  return (
    <section>
      <div className="relative">
        <Hero />
      </div>
      <div className="h-18 border-b w-full flex flex-col lg:flex-row justify-between px-4 lg:items-center lg:justify-between lg:gap-10 gap-4 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-full text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="leftSection flex gap-4 items-center">
            <button
              onClick={() => setGridView("2")}
              className={`p-2 transition-all duration-300 ${
                gridView === "2" ? "text-black scale-110" : "text-black/50"
              }`}
              aria-label="2 column grid view"
            >
              <BsFillGridFill className="text-2xl" />
            </button>
            <button
              onClick={() => setGridView("3")}
              className={`p-2 transition-all duration-300 ${
                gridView === "3" ? "text-black scale-110" : "text-black/50"
              }`}
              aria-label="3 column grid view"
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
      </div>

      {/* Filter & Sort Modal */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end"
            onClick={() => setShowFilter(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
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
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={gridView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ProductShowcaseClone gridCols={gridView} sortBy={sortBy} searchQuery={searchQuery} />
      </motion.div>
    </section>
  );
};
export default page;
