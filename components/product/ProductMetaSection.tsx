"use client";

import { useState } from "react";
import StockBar from "./StockBar";
import BenefitsGrid from "./BenefitsGrid";
import QuantitySelector from "./QuantitySelector";
import ProductCTAs from "./ProductCTAs";
import ProductAccordion from "./ProductAccordian";
import { Benefit, AccordionItem } from "@/types/productMeta";
import { StockLevel } from "@/types/productMeta";

interface ProductMetaSectionProps {
  stock: StockLevel;
  benefits: Benefit[];
  accordionItems: AccordionItem[];
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  quantity?: number;
  onQuantityChange?: (qty: number) => void;
}

export default function ProductMetaSection({
  stock,
  benefits,
  accordionItems,
  onAddToCart,
  onBuyNow,
  isLoading,
  disabled,
  quantity: controlledQuantity,
  onQuantityChange,
}: ProductMetaSectionProps) {
  const [internalQuantity, setInternalQuantity] = useState(1);
  const quantity = controlledQuantity ?? internalQuantity;

  const handleQuantityChange = (qty: number) => {
    if (onQuantityChange) {
      onQuantityChange(qty);
    } else {
      setInternalQuantity(qty);
    }
  };

  return (
    <section className="px-4 lg:px-0 lg:mt-4">
      <StockBar stock={stock} />

      <BenefitsGrid benefits={benefits} />

      <QuantitySelector
        onChange={handleQuantityChange}
        value={quantity}
        min={1}
        max={99}
      />

      <ProductCTAs
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        isLoading={isLoading}
        disabled={disabled}
      />

      <ProductAccordion items={accordionItems} />
    </section>
  );
}
