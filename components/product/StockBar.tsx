interface StockBarProps {
  inStock: boolean;
}

export default function StockBar({ inStock }: StockBarProps) {
  if (!inStock) return null;

  return (
    <div className="text-sm pb-8 border-b-2 border-gray-200 text-green-600 mb-2">
      • 7 in stock
      <div className="h-0.5 bg-green-600 mt-1" />
    </div>
  );
}
