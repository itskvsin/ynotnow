"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AccordionItem } from "@/types/productMeta";

interface ProductAccordionProps {
  items: AccordionItem[];
}

export default function ProductAccordion({ items }: ProductAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mt-6 border-t">
      {items.map((item) => (
        <div key={item.id} className="border-b">
          <button
            onClick={() =>
              setOpenId(openId === item.id ? null : item.id)
            }
            className="w-full flex justify-between items-center py-4 text-sm"
          >
            <span className="flex items-center gap-2 text-lg">{item.icon}{item.title}</span>
            <motion.span
              animate={{ rotate: openId === item.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {openId === item.id ? "−" : "+"}
            </motion.span>
          </button>

          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <p className="text-sm text-gray-600 pb-4">
                  {item.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
