import { Product } from "@/types/product";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

interface ProductDetailSectionProps {
  product: Product;
}

export default function ProductDetailSection({
  product,
}: ProductDetailSectionProps) {
  return (
    <section className="px-4 py-6 max-w-md mx-auto">
      <ProductGallery images={product.images} />
      <ProductInfo product={product} />
    </section>
  );
}
