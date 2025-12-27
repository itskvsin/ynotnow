interface ProductCTAsProps {
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

export default function ProductCTAs({
  onAddToCart,
  onBuyNow,
}: ProductCTAsProps) {
  return (
    <div className="space-y-3">
      <button
        onClick={onAddToCart}
        className="w-full border rounded-full py-4 text-sm"
      >
        Add to cart
      </button>

      <button
        onClick={onBuyNow}
        className="w-full bg-black text-white rounded-full py-4 text-sm"
      >
        Buy now
      </button>
    </div>
  );
}
