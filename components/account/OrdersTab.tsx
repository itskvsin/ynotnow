import Link from "next/link";
import Image from "next/image";
import type { CustomerOrder } from "@/lib/shopify-customer";

function OrderCard({ order }: { order: CustomerOrder }) {
    const firstItem = order.lineItems.edges[0]?.node;
    const imageUrl = firstItem?.variant?.image?.url || "/images/hoodies/grayBgHoodie.jpg";
    const productHandle = firstItem?.variant?.product?.handle;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatPrice = (amount: string, currency: string) => {
        const numAmount = parseFloat(amount);
        const currencySymbols: { [key: string]: string } = {
            USD: "$",
            EUR: "€",
            GBP: "£",
            INR: "₹",
        };
        const symbol = currencySymbols[currency] || currency;
        return `${symbol}${numAmount.toFixed(2)}`;
    };

    return (
        <div className="bg-white border-b">
            <div className="flex items-center lg:max-w-full lg:justify-evenly px-4 py-6 gap-6">
                {/* Product */}
                <div className="flex items-center gap-4 flex-1">
                    <Image
                        src={imageUrl}
                        alt={firstItem?.title || "Product"}
                        height={500}
                        width={500}
                        className="w-20 h-24 rounded-lg object-cover"
                    />

                    <div className="text-start h-22">
                        <h3 className="text-sm font-medium">{order.name}</h3>
                        <div className="text-xs text-gray-500">
                            {formatDate(order.processedAt)} • {order.lineItems.edges.length} item(s)
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                            {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                        </div>
                    </div>
                </div>

                {/* Payment Status */}
                <div className="hidden md:block md:w-1/4 text-sm text-center capitalize">
                    {order.financialStatus}
                </div>

                {/* Delivery Status */}
                <div className="hidden md:block md:w-1/4 text-sm text-center capitalize">
                    <span
                        className={
                            order.fulfillmentStatus === "FULFILLED"
                                ? "text-green-600"
                                : order.fulfillmentStatus === "PARTIALLY_FULFILLED"
                                    ? "text-yellow-600"
                                    : "text-gray-600"
                        }
                    >
                        {order.fulfillmentStatus.replace("_", " ")}
                    </span>
                </div>

                {/* View Details Button */}
                <div className="flex justify-end">
                    <Link href={`/account/orders/${encodeURIComponent(order.name)}`}>
                        <button className="bg-black text-white text-xs px-6 py-2 cursor-pointer rounded-full hover:bg-gray-800">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrdersTab({ orders }: { orders: CustomerOrder[] }) {
    if (orders.length === 0) {
        return (
            <div className="px-4 py-4 font-Geist">
                <p className="text-gray-500">No orders yet.</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-4 space-y-4 font-Geist">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
}
