import { Benefit } from "@/types/productMeta";

interface BenefitsGridProps {
  benefits: Benefit[];
}

export default function BenefitsGrid({ benefits }: BenefitsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 my-6">
      {benefits.map((b) => (
        <div
          key={b.id}
          className="border rounded-xl p-3 text-sm"
        >
          <div className="mb-2">{b.icon}</div>
          <p className="font-medium">{b.title}</p>
          <p className="text-xs text-gray-500 mt-1">{b.description}</p>
        </div>
      ))}
    </div>
  );
}
