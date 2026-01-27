"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getOrderDetailsAction } from "@/lib/actions/orders";
import OrderDetailsView from "@/components/account/OrderDetailsView";

export default function OrderDetailsPage() {
    const params = useParams();
    const orderId = params.orderId as string;
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOrder() {
            try {
                setLoading(true);
                const { order: fetchedOrder, error: fetchError } = await getOrderDetailsAction(orderId);

                if (fetchError) {
                    setError(fetchError);
                    return;
                }

                setOrder(fetchedOrder);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load order");
            } finally {
                setLoading(false);
            }
        }

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading order details...</p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || "Order not found"}</p>
                    <a href="/account" className="text-blue-600 hover:underline">
                        Back to Account
                    </a>
                </div>
            </div>
        );
    }

    return <OrderDetailsView order={order} />;
}
