"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { MdGridView } from "react-icons/md";
import ProductShowcaseClone from "@/components/ProductShowcaseClone";
import FilterCloudBar from "@/components/products/FilterCloudBar";
import FilterPanel, { FilterState } from "@/components/products/FilterPanel";
import { getProductsAction } from "@/lib/actions/products";
import type { ShopifyProduct } from "@/types/shopify";

const Hero = () => {
  return (
    <div className="bg-[url('/images/collectionHoodie.png')] flex flex-col gap-4 py-6 px-6 items-start justify-end bg-center bg-cover h-80 w-full lg:h-[60vh] lg:bg-cover lg:bg-[35%_65%]">
      <h1 className="text-3xl text-white font-bold font-Geist">Shop All</h1>
      <p className="text-white/50 font-Geist text-sm">
        Every drop. Every vibe. Find your next favorite look all in one place.
      </p>
    </div>
  );
};

type SortOption = "default" | "price-low" | "price-high" | "name-asc" | "name-desc";

export default function ProductsPage() {
  const [gridView, setGridView] = useState<"3" | "4">("3");
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    categories: [],
    tags: [],
    vendors: [],
    sortBy: "default",
  });

  // Fetch products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { products: fetchedProducts } = await getProductsAction(50);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Extract unique categories, tags, vendors from products
  const { availableCategories, availableTags, availableVendors } = useMemo(() => {
    const categories = new Set<string>();
    const tags = new Set<string>();
    const vendors = new Set<string>();

    products.forEach((product) => {
      if (product.productType) categories.add(product.productType);
      if (product.vendor) vendors.add(product.vendor);
      product.tags?.forEach((tag) => tags.add(tag));
    });

    return {
      availableCategories: Array.from(categories),
      availableTags: Array.from(tags),
      availableVendors: Array.from(vendors),
    };
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply price filter
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.priceRange.minVariantPrice.amount);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.productType || "")
      );
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter((product) =>
        product.tags?.some((tag) => filters.tags.includes(tag))
      );
    }

    // Apply vendor filter
    if (filters.vendors.length > 0) {
      filtered = filtered.filter((product) =>
        filters.vendors.includes(product.vendor || "")
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) =>
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) =>
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
        );
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  }, [products, filters]);

  // Count active filters
  const activeFiltersCount =
    filters.categories.length +
    filters.tags.length +
    filters.vendors.length +
    (filters.priceRange[1] < 10000 ? 1 : 0) +
    (filters.sortBy !== "default" ? 1 : 0);

  return (
    <section>
      <div className="relative">
        <Hero />
      </div>

      {/* Filter Bar and Grid Toggle - Inline */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Filter Button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex-1 flex items-center justify-center gap-3 bg-black hover:bg-gray-800 text-white rounded-full py-3 px-6 transition-all duration-300 group"
          >
            <span className="font-medium">Filter & Sort</span>
            {activeFiltersCount > 0 && (
              <span className="bg-white text-black text-xs px-2 py-1 rounded-full font-semibold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Grid View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setGridView("3")}
              className={`p-2 transition-all duration-300 ${gridView === "3" ? "text-black scale-110" : "text-black/50"
                }`}
              aria-label="3 column grid view"
            >
              <BsFillGrid3X3GapFill className="text-2xl" />
            </button>
            <button
              onClick={() => setGridView("4")}
              className={`p-2 transition-all duration-300 ${gridView === "4" ? "text-black scale-110" : "text-black/50"
                }`}
              aria-label="4 column grid view"
            >
              <MdGridView className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilter && (
          <FilterPanel
            isOpen={showFilter}
            onClose={() => setShowFilter(false)}
            filters={filters}
            onFiltersChange={setFilters}
            availableCategories={availableCategories}
            availableTags={availableTags}
            availableVendors={availableVendors}
          />
        )}
      </AnimatePresence>

      {/* Spacer removed - grid starts immediately */}
      <div className="w-full px-4">
      </div>

      {/* Products Grid */}
      <motion.div
        key={`${gridView}-${activeFiltersCount}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">No products match your filters</p>
            <button
              onClick={() =>
                setFilters({
                  priceRange: [0, 10000],
                  categories: [],
                  tags: [],
                  vendors: [],
                  sortBy: "default",
                })
              }
              className="mt-4 bg-black text-white px-6 py-2 rounded-full text-sm cursor-pointer hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <ProductShowcaseClone
            gridCols={gridView}
            sortBy={filters.sortBy as SortOption}
            products={filteredProducts}
          />
        )}
      </motion.div>
    </section>
  );
}
