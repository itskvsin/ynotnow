"use client";

import React, { useState } from "react";
import { updateCustomerProfileAction } from "@/lib/actions/customer";
import type { Customer } from "@/lib/shopify-customer";

export default function ProfileTab({
    customer,
    onUpdate,
}: {
    customer: Customer | null;
    onUpdate: () => void;
}) {
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
