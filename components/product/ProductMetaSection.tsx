import StockBar from "./StockBar";
import BenefitsGrid from "./BenefitsGrid";
import QuantitySelector from "./QuantitySelector";
import ProductCTAs from "./ProductCTAs";
import ProductAccordion from "./ProductAccordian";
import { Benefit, AccordionItem } from "@/types/productMeta";

interface ProductMetaSectionProps {
  inStock: boolean;
  benefits: Benefit[];
  accordionItems: AccordionItem[];
}

export default function ProductMetaSection({
  inStock,
  benefits,
  accordionItems,
}: ProductMetaSectionProps) {
  return (
    <section className="px-4">
      <StockBar inStock={inStock} />

      <BenefitsGrid benefits={benefits} />

      <QuantitySelector />

      <ProductCTAs />

      <ProductAccordion items={accordionItems} />
    </section>
  );
}
