const tabLabels: Record<string, string> = {
    profile: "Personal Information",
    orders: "Order History",
    tracking: "Order Tracking",
    wishlist: "Wishlist",
};

export default function AccountBreadcrumb({ activeTab }: { activeTab: string }) {
    return (
        <div className="px-4 font-Geist text-sm text-gray-500">
            <span>Account</span>
            <span className="mx-2">{">"}</span>
            <span className="text-black font-medium">{tabLabels[activeTab]}</span>
        </div>
    );
}
