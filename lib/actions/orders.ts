"use server";

import { cookies } from "next/headers";
import { getCustomerOrderByName } from "@/lib/shopify-customer";

export async function getOrderDetailsAction(orderName: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("shopify_customer_token")?.value;

        if (!token) {
            return { order: null, error: "Not authenticated" };
        }

        const order = await getCustomerOrderByName(token, orderName);

        if (!order) {
            return { order: null, error: "Order not found" };
        }

        return { order, error: null };
    } catch (error) {
        console.error("Error fetching order details:", error);
        return {
            order: null,
            error: error instanceof Error ? error.message : "Failed to fetch order",
        };
    }
}
