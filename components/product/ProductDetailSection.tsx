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
    <section className="py-6 max-w-lg mx-auto lg:flex">
      <ProductGallery images={product.images} />
      <div className="md:hidden block"><ProductInfo product={product} /></div>
    </section>
  );
}
