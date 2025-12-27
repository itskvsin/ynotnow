// components/cart/ShippingInfoBanner.tsx
import { ShippingInfo }  from "../../types/shipping";

interface ShippingInfoBannerProps {
  data: ShippingInfo;
}

export default function ShippingInfoBanner({
  data,
}: ShippingInfoBannerProps) {
  return (
    <div className="px-4 py-6">
      <div className="border bg-black text-white rounded-xl p-6 flex flex-col items-center text-center">

        <h3 className="text-md mb-8">
          {data.title}
        </h3>

        <p className="text-sm">
          {data.description} <span className="text-lg font-bold">{data.shippingCost}</span>
        </p>
      </div>
    </div>
  );
}
