"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RiFilter3Fill } from "react-icons/ri";
import { IoCloudOutline } from "react-icons/io5";

interface FilterCloudBarProps {
    isOpen: boolean;
    onToggle: () => void;
    activeFiltersCount?: number;
}

export default function FilterCloudBar({ isOpen, onToggle, activeFiltersCount = 0 }: FilterCloudBarProps) {
    return (
        <motion.div
            className="sticky top-0 z-40 bg-white border-b border-gray-200"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 20 }}
        >
            <div className="max-w-7xl mx-auto px-4 py-3">
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-800 text-white rounded-full py-3 px-6 transition-all duration-300 group"
                >
                    <IoCloudOutline className="text-2xl group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Filter & Sort Products</span>
                    <RiFilter3Fill className="text-xl" />
                    {activeFiltersCount > 0 && (
                        <span className="bg-white text-black text-xs px-2 py-1 rounded-full font-semibold">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
