"use client";

import BreadCrumbNav from "@/components/BreadCrumbNav";
import tabs from "@/data/PersonalTabs";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import {
  getCurrentCustomerAction,
  updateCustomerProfileAction,
  getCustomerOrdersAction,
  logoutCustomerAction,
} from "@/lib/actions/customer";
import type { Customer, CustomerOrder } from "@/lib/shopify-customer";

/* -------------------- TAB CONTENTS -------------------- */

function Profile({ customer, onUpdate }: { customer: Customer | null; onUpdate: () => void }) {
  const [formData, setFormData] = useState({
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: updateError } = await updateCustomerProfileAction({
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        phone: formData.phone || undefined,
      });

      if (updateError) {
        setError(updateError);
        return;
      }

      setSuccess(true);
      onUpdate();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  if (!customer) {
    return (
      <div className="px-4 py-6">
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="px-4 font-Geist">
        <div className="max-w-sm mx-auto lg:mx-0 lg:max-w-lg">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              Profile updated successfully!
            </div>
          )}

          {/* First Name */}
          <div className="mb-6">
            <label className="block text-sm mb-2">First Name</label>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* Last Name */}
          <div className="mb-6">
            <label className="block text-sm mb-2">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              disabled
              className="w-full bg-gray-200 rounded-lg px-4 py-3 text-sm outline-none cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-sm mb-2">Phone</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-black text-white px-10 py-3 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Edits"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Orders({ orders }: { orders: CustomerOrder[] }) {
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

function Tracking() {
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

function WishList() {
  return (
    <div className="px-4 py-4 space-y-8 font-Geist">
      <p className="text-gray-500">Wishlist feature coming soon.</p>
    </div>
  );
}

const tabLabels: Record<string, string> = {
  profile: "Personal Information",
  orders: "Order History",
  tracking: "Order Tracking",
  wishlist: "Wishlist",
};

function AccountBreadcrumb({ activeTab }: { activeTab: string }) {
  return (
    <div className="px-4 font-Geist text-sm text-gray-500">
      <span>Account</span>
      <span className="mx-2">{">"}</span>
      <span className="text-black font-medium">{tabLabels[activeTab]}</span>
    </div>
  );
}

/* -------------------- MAIN PAGE -------------------- */

const page = () => {
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
    <section>
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
      <div className="md:flex md:gap-10 md:px-6 md:mt-6">
        {/* Sidebar */}
        <div className="hidden md:block md:w-72">
          <div className="bg-white rounded-2xl border shadow-sm py-2 px-3 font-Geist sticky top-24">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 my-1 md:text-base rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${activeTab === tab.id
                  ? "bg-black text-white shadow-md transform scale-[0.98]"
                  : "hover:bg-gray-100 hover:translate-x-1"
                  }`}
              >
                <span className={`transition-transform duration-300 ${activeTab === tab.id ? "scale-110" : ""}`}>
                  {tab.icon}
                </span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-6">
          {activeTab === "profile" && (
            <Profile customer={customer} onUpdate={loadCustomerData} />
          )}
          {activeTab === "orders" && <Orders orders={orders} />}
          {activeTab === "tracking" && <Tracking />}
          {activeTab === "wishlist" && <WishList />}
        </div>
      </div>

      <div className="mt-14"></div>
    </section>
  );
};

export default page;
