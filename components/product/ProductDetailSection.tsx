import { Product } from "@/types/product";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

interface ProductDetailSectionProps {
  product: Product;
  selectedSize?: string | null;
  selectedColor?: string | null;
  onSizeChange?: (size: string) => void;
  onColorChange?: (color: string) => void;
}

export default function ProductDetailSection({
  product,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: ProductDetailSectionProps) {
  return (
    <section className="py-6 max-w-lg mx-auto lg:flex">
      <ProductGallery images={product.images} />
      <div className="md:hidden block">
        <ProductInfo
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          onSizeChange={onSizeChange}
          onColorChange={onColorChange}
        />
      </div>
    </section>
  );
}
