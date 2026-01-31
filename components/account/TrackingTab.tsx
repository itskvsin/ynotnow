"use client";

import React, { useState } from "react";
import { getCustomerOrdersAction } from "@/lib/actions/customer";
import type { CustomerOrder } from "@/lib/shopify-customer";

export default function TrackingTab() {
    const [trackingId, setTrackingId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState<CustomerOrder | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTrack = async () => {
        if (!trackingId.trim()) {
            setError("Please enter a tracking ID");
            return;
        }

        setIsLoading(true);
        setError(null);
        setOrder(null);

        try {
            // Get all orders and find the one matching the tracking ID
            const { orders, error: ordersError } = await getCustomerOrdersAction(50);

            if (ordersError) {
                throw new Error(ordersError);
            }

            // Try to find order by order number or name
            const foundOrder = orders.find(
                (o) => o.orderNumber.toString() === trackingId || o.name === trackingId
            );

            if (!foundOrder) {
                setError("Order not found. Please check your tracking ID.");
                return;
            }

            setOrder(foundOrder);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to track order");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-sm lg:max-w-full mx-auto px-4 py-6 font-Geist">
            <label className="block text-lg lg:text-2xl mb-2">Tracking ID</label>
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => {
                        setTrackingId(e.target.value);
                        setError(null);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleTrack();
                        }
                    }}
                    placeholder="Enter Order Number"
                    className="flex-1 lg:max-w-3/4 rounded-full border px-4 py-3 text-sm outline-none"
                />
                <button
                    onClick={handleTrack}
                    disabled={isLoading}
                    className="lg:w-2/12 bg-black text-white py-3 px-6 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Tracking..." : "Track"}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {order && (
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Order: {order.name}</h3>
                        <p className="text-sm text-gray-600">
                            Status: <span className="capitalize">{order.fulfillmentStatus.replace("_", " ")}</span>
                        </p>
                    </div>
                    {order.trackingInformation && order.trackingInformation.length > 0 && (
                        <div>
                            <h4 className="font-medium mb-2">Tracking Information:</h4>
                            {order.trackingInformation.map((tracking, index) => (
                                <div key={index} className="text-sm">
                                    <p>
                                        <strong>Tracking #:</strong> {tracking.number}
                                    </p>
                                    {tracking.company && <p>Carrier: {tracking.company}</p>}
                                    {tracking.url && (
                                        <a
                                            href={tracking.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Track Package
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
