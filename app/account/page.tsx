"use client";

import ProfileTab from "@/components/account/ProfileTab";
import OrdersTab from "@/components/account/OrdersTab";
import TrackingTab from "@/components/account/TrackingTab";
import WishlistTab from "@/components/account/WishlistTab";
import type { Customer, CustomerOrder } from "@/lib/shopify-customer";

interface AccountPageProps {
  activeTab?: string;
  customer?: Customer | null;
  orders?: CustomerOrder[];
  onUpdate?: () => void;
}

export default function AccountPage({
  activeTab = "profile",
  customer = null,
  orders = [],
  onUpdate = () => { },
}: AccountPageProps) {
  return (
    <>
      {activeTab === "profile" && <ProfileTab customer={customer} onUpdate={onUpdate} />}
      {activeTab === "orders" && <OrdersTab orders={orders} />}
      {activeTab === "tracking" && <TrackingTab />}
      {activeTab === "wishlist" && <WishlistTab />}
    </>
  );
}
