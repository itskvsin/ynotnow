"use client";

import tabs from "@/data/PersonalTabs";

export default function AccountSidebar({
    activeTab,
    onTabChange,
}: {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}) {
    return (
        <div className="hidden md:block md:w-72">
            <div className="bg-white rounded-2xl border shadow-sm py-2 px-3 font-Geist sticky top-24">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 my-1 md:text-base rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${activeTab === tab.id
                                ? "bg-black text-white shadow-md transform scale-[0.98]"
                                : "hover:bg-gray-100 hover:translate-x-1"
                            }`}
                    >
                        <span
                            className={`transition-transform duration-300 ${activeTab === tab.id ? "scale-110" : ""}`}
                        >
                            {tab.icon}
                        </span>
                        <span className="font-medium">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
