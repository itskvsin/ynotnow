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
        className="w-full border border-black font-medium rounded-full py-5 text-md"
      >
        Add to cart
      </button>

      <button
        onClick={onBuyNow}
        className="w-full bg-black text-white rounded-full py-5 text-md"
      >
        Buy now
      </button>
    </div>
  );
}
