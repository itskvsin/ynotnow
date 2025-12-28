"use client";

import { useState } from "react";
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
            <span>{openId === item.id ? "−" : "+"}</span>
          </button>

          {openId === item.id && (
            <p className="text-sm text-gray-600 pb-4">
              {item.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
