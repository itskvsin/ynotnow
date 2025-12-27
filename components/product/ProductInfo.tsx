import { Product } from "@/types/product";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="mt-4">
      <h1 className="text-lg font-medium">{product.title}</h1>

      <p className="text-sm text-gray-600 mt-1">
        {product.description}
      </p>

      <p className="text-lg font-medium mt-3">
        ₹{product.price.toLocaleString()}
      </p>

      <div className="mt-4">
        <SizeSelector sizes={product.sizes} />
      </div>

      <div className="mt-4">
        <ColorSelector colors={product.colors} />
      </div>

      <div className="mt-4 text-sm text-green-600">
        {product.inStock ? "✓ In stock" : "Out of stock"}
      </div>
    </div>
  );
}
