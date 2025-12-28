interface StockBarProps {
  stock: {
    total: number;
    remaining: number;
  };
}

export default function StockBar({ stock }: StockBarProps) {
  const percentage =
    stock.total > 0
      ? Math.min((stock.remaining / stock.total) * 100, 100)
      : 0;

  return (
    <div className="mb-4">
      {/* Label */}
      <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
        <span className="h-2 w-2 rounded-full bg-green-600" />
        {stock.remaining} in stock
      </div>

      {/* Progress Bar */}
      <div className="h-0.75 w-full bg-green-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
