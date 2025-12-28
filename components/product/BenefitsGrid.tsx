import { Benefit } from "@/types/productMeta";

interface BenefitsGridProps {
  benefits: Benefit[];
}

export default function BenefitsGrid({ benefits }: BenefitsGridProps) {
  return (
    <div className="lg:border-b-2 lg:pb-10 grid grid-cols-2 lg:flex lg:gap-4 gap-3 my-6">
      {benefits.map((b) => (
        <div
          key={b.id}
          className="border rounded-xl p-3 lg:w-1/4 text-sm"
        >
          <div className="mb-2 text-3xl">{b.icon}</div>
          <p className="font-medium text-lg lg:text-sm">{b.title}</p>
          <p className="text-xs text-gray-500 mt-1 lg:text-xs">{b.description}</p>
        </div>
      ))}
    </div>
  );
}
