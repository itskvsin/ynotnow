"use client";

import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export interface FilterState {
    priceRange: [number, number];
    categories: string[];
    tags: string[];
    vendors: string[];
    sortBy: string;
}

interface FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    availableCategories: string[];
    availableTags: string[];
    availableVendors: string[];
}

export default function FilterPanel({
    isOpen,
    onClose,
    filters,
    onFiltersChange,
    availableCategories,
    availableTags,
    availableVendors,
}: FilterPanelProps) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleApply = () => {
        onFiltersChange(localFilters);
        onClose();
    };

    const handleClear = () => {
        const clearedFilters: FilterState = {
            priceRange: [0, 10000],
            categories: [],
            tags: [],
            vendors: [],
            sortBy: "default",
        };
        setLocalFilters(clearedFilters);
        onFiltersChange(clearedFilters);
    };

    const toggleCategory = (category: string) => {
        setLocalFilters({
            ...localFilters,
            categories: localFilters.categories.includes(category)
                ? localFilters.categories.filter((c) => c !== category)
                : [...localFilters.categories, category],
        });
    };

    const toggleTag = (tag: string) => {
        setLocalFilters({
            ...localFilters,
            tags: localFilters.tags.includes(tag)
                ? localFilters.tags.filter((t) => t !== tag)
                : [...localFilters.tags, tag],
        });
    };

    const toggleVendor = (vendor: string) => {
        setLocalFilters({
            ...localFilters,
            vendors: localFilters.vendors.includes(vendor)
                ? localFilters.vendors.filter((v) => v !== vendor)
                : [...localFilters.vendors, vendor],
        });
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* Panel */}
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 right-0 bg-white z-50 max-h-[80vh] overflow-y-auto shadow-2xl"
            >
                <div className="max-w-7xl mx-auto p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                        <h2 className="text-2xl font-bold">Filter & Sort</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <IoClose className="text-2xl" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Sort By */}
                        <div>
                            <h3 className="font-semibold mb-3">Sort By</h3>
                            <div className="space-y-2">
                                {[
                                    { value: "default", label: "Default" },
                                    { value: "price-low", label: "Price: Low to High" },
                                    { value: "price-high", label: "Price: High to Low" },
                                    { value: "name-asc", label: "Name: A-Z" },
                                    { value: "name-desc", label: "Name: Z-A" },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setLocalFilters({ ...localFilters, sortBy: option.value })}
                                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${localFilters.sortBy === option.value
                                            ? "bg-black text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="font-semibold mb-3">Price Range</h3>
                            <div className="space-y-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="100"
                                    value={localFilters.priceRange[1]}
                                    onChange={(e) =>
                                        setLocalFilters({
                                            ...localFilters,
                                            priceRange: [0, parseInt(e.target.value)],
                                        })
                                    }
                                    className="w-full accent-black"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>₹0</span>
                                    <span>₹{localFilters.priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        {availableCategories.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-3">Categories</h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {availableCategories.map((category) => (
                                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={localFilters.categories.includes(category)}
                                                onChange={() => toggleCategory(category)}
                                                className="accent-black"
                                            />
                                            <span className="text-sm">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {availableTags.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-3">Tags</h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {availableTags.map((tag) => (
                                        <label key={tag} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={localFilters.tags.includes(tag)}
                                                onChange={() => toggleTag(tag)}
                                                className="accent-black"
                                            />
                                            <span className="text-sm">{tag}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Vendors */}
                    {availableVendors.length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold mb-3">Vendors</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {availableVendors.map((vendor) => (
                                    <label key={vendor} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localFilters.vendors.includes(vendor)}
                                            onChange={() => toggleVendor(vendor)}
                                            className="accent-black"
                                        />
                                        <span className="text-sm">{vendor}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4 mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={handleClear}
                            className="flex-1 bg-gray-200 text-black py-3 rounded-full font-medium hover:bg-gray-300 transition-colors"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handleApply}
                            className="flex-1 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
