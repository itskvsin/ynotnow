"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { IoArrowBack } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { MdContentCopy } from "react-icons/md";
import { motion } from "framer-motion";

interface OrderDetailsViewProps {
    order: any;
}

export default function OrderDetailsView({ order }: OrderDetailsViewProps) {
    const [isReordering, setIsReordering] = useState(false);

    const formatPrice = (amount: string, currencyCode: string) => {
        const symbols: { [key: string]: string } = {
            USD: "$",
            EUR: "€",
            GBP: "£",
            INR: "₹",
        };
        const symbol = symbols[currencyCode] || currencyCode;
        return `${symbol}${parseFloat(amount).toFixed(2)}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getStatusColor = (status: string) => {
        const statusLower = status?.toLowerCase() || "";
        if (statusLower.includes("fulfilled") || statusLower.includes("paid")) {
            return "bg-green-100 text-green-700";
        }
        if (statusLower.includes("pending") || statusLower.includes("processing")) {
            return "bg-yellow-100 text-yellow-700";
        }
        if (statusLower.includes("cancelled") || statusLower.includes("refunded")) {
            return "bg-red-100 text-red-700";
        }
        return "bg-gray-100 text-gray-700";
    };

    const handleReorder = async () => {
        setIsReordering(true);
        try {
            // Add all items to cart
            for (const edge of order.lineItems.edges) {
                const item = edge.node;
                const variantId = item.variant.id;
                const quantity = item.quantity;

                const response = await fetch("/api/cart/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ merchandiseId: variantId, quantity }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to add ${item.title}`);
                }
            }

            toast.success("All items added to cart!");
            window.location.href = "/cart";
        } catch (error) {
            console.error("Reorder error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to reorder");
        } finally {
            setIsReordering(false);
        }
    };

    const copyOrderNumber = () => {
        navigator.clipboard.writeText(order.name);
        toast.success("Order number copied!");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/account"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-4"
                    >
                        <IoArrowBack />
                        Back to Account
                    </Link>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">Order Details</h1>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-600">{order.name}</p>
                                    <button
                                        onClick={copyOrderNumber}
                                        className="p-1 hover:bg-gray-100 rounded"
                                    >
                                        <MdContentCopy className="text-gray-400" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Placed on {formatDate(order.processedAt)}
                                </p>
                            </div>

                            <button
                                onClick={handleReorder}
                                disabled={isReordering}
                                className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                            >
                                {isReordering ? "Adding..." : "Reorder"}
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    order.fulfillmentStatus
                                )}`}
                            >
                                {order.fulfillmentStatus || "Pending"}
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    order.financialStatus
                                )}`}
                            >
                                {order.financialStatus || "Pending"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Line Items */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                    <h2 className="text-lg font-semibold mb-4">Items</h2>
                    <div className="space-y-4">
                        {order.lineItems.edges.map((edge: any, index: number) => {
                            const item = edge.node;
                            return (
                                <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                                    {item.variant?.image?.url ? (
                                        <motion.div
                                            layoutId={`product-image-${item.variant.product.id}`}
                                            className="w-20 h-20 rounded-lg overflow-hidden shrink-0"
                                        >
                                            <Image
                                                src={item.variant.image.url}
                                                alt={item.title}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    ) : (
                                        <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0" />
                                    )}

                                    <div className="flex-1">
                                        <Link
                                            scroll={false}
                                            href={`/products/${item.variant?.product?.handle || "#"}`}
                                            className="font-medium hover:underline"
                                        >
                                            {item.title}
                                        </Link>
                                        {item.variant?.title && item.variant.title !== "Default Title" && (
                                            <p className="text-sm text-gray-500">{item.variant.title}</p>
                                        )}
                                        <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-medium">
                                            {formatPrice(
                                                item.variant?.price?.amount || "0",
                                                item.variant?.price?.currencyCode || "USD"
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Total:{" "}
                                            {formatPrice(
                                                (parseFloat(item.variant?.price?.amount || "0") * item.quantity).toString(),
                                                item.variant?.price?.currencyCode || "USD"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Shipping Address */}
                    {order.shippingAddress && (
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <TbTruckDelivery className="text-xl" />
                                <h2 className="font-semibold">Shipping Address</h2>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                </p>
                                <p>{order.shippingAddress.address1}</p>
                                {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                                <p>
                                    {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
                                    {order.shippingAddress.zip}
                                </p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        </div>
                    )}

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="font-semibold mb-3">Order Summary</h2>
                        <div className="space-y-2 text-sm">
                            {order.subtotalPrice && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>
                                        {formatPrice(order.subtotalPrice.amount, order.subtotalPrice.currencyCode)}
                                    </span>
                                </div>
                            )}
                            {order.totalShippingPrice && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span>
                                        {formatPrice(
                                            order.totalShippingPrice.amount,
                                            order.totalShippingPrice.currencyCode
                                        )}
                                    </span>
                                </div>
                            )}
                            {order.totalTax && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span>
                                        {formatPrice(order.totalTax.amount, order.totalTax.currencyCode)}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between pt-2 border-t font-semibold">
                                <span>Total</span>
                                <span>
                                    {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
