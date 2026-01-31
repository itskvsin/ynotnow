"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import tabs from "@/data/PersonalTabs";
import AccountBreadcrumb from "@/components/account/AccountBreadcrumb";
import AccountSidebar from "@/components/account/AccountSidebar";
import {
    getCurrentCustomerAction,
    getCustomerOrdersAction,
    logoutCustomerAction,
} from "@/lib/actions/customer";
import type { Customer, CustomerOrder } from "@/lib/shopify-customer";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("profile");
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [orders, setOrders] = useState<CustomerOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const tabsRef = useRef<HTMLDivElement | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const loadCustomerData = async () => {
        setIsLoading(true);
        try {
            const { customer: customerData } = await getCurrentCustomerAction();
            setCustomer(customerData);

            if (customerData) {
                const { orders: ordersData } = await getCustomerOrdersAction(10);
                setOrders(ordersData);
            }
        } catch (error) {
            console.error("Error loading customer data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCustomerData();
    }, []);

    const handleLogout = async () => {
        await logoutCustomerAction();
        router.push("/");
        router.refresh();
    };

    const handleScroll = () => {
        if (!tabsRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
        const maxScroll = scrollWidth - clientWidth;
        setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!customer) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-lg mb-4">Please log in to view your account</p>
                    <Link
                        href="/login"
                        className="bg-black text-white px-8 py-3 rounded-full inline-block hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen flex flex-col">
            <div className="relative h-30" />

            <div className="px-4 font-Geist pl-6 flex justify-between items-center">
                <AccountBreadcrumb activeTab={activeTab} />
                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-black underline cursor-pointer transition-colors"
                >
                    Logout
                </button>
            </div>

            {/* -------- MOBILE TABS -------- */}
            <div
                ref={tabsRef}
                onScroll={handleScroll}
                className="flex md:hidden gap-8 overflow-x-auto mt-8 px-4 whitespace-nowrap scrollbar-hide"
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 flex items-center gap-2 text-sm cursor-pointer transition-colors ${activeTab === tab.id
                                ? "border-b-2 border-black font-medium"
                                : "text-gray-500 hover:text-gray-800"
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <div className="md:hidden h-0.5 mt-2 bg-gray-200">
                <div
                    className="h-full bg-black transition-all"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* -------- DESKTOP LAYOUT -------- */}
            <div className="md:flex md:gap-10 md:px-6 md:mt-6 flex-1">
                {/* Sidebar */}
                <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Content */}
                <div className="flex-1 pt-6 min-h-full">
                    {React.cloneElement(children as React.ReactElement, {
                        activeTab,
                        customer,
                        orders,
                        onUpdate: loadCustomerData,
                    })}
                </div>
            </div>

            <div className="mt-14"></div>
        </section>
    );
}
