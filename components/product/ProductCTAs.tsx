interface ProductCTAsProps {
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function ProductCTAs({
  onAddToCart,
  onBuyNow,
  isLoading = false,
  disabled = false,
}: ProductCTAsProps) {
  return (
    <div className="space-y-3">
      <button
        onClick={onAddToCart}
        disabled={disabled || isLoading}
        className="w-full border cursor-pointer border-black font-medium rounded-full py-5 text-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Adding..." : "Add to cart"}
      </button>

      <button
        onClick={onBuyNow}
        disabled={disabled || isLoading}
        className="w-full bg-black cursor-pointer text-white rounded-full py-5 text-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Buy now
      </button>
    </div>
  );
}
