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
}

export default function ProductMetaSection({
  stock,
  benefits,
  accordionItems,
}: ProductMetaSectionProps) {
  return (
    <section className="px-4">
      <StockBar stock={stock} />

      <BenefitsGrid benefits={benefits} />

      <QuantitySelector />

      <ProductCTAs />

      <ProductAccordion items={accordionItems} />
    </section>
  );
}
