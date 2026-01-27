"use client";

import { useState } from "react";
import { toast } from "sonner";
import { validateEmail } from "@/lib/utils/validation";
import { IoMailOutline } from "react-icons/io5";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validateEmail(email);
        if (!validation.isValid) {
            toast.error(validation.error || "Invalid email");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call (replace with actual newsletter service)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success("Thanks for subscribing!");
            setEmail("");
        } catch (error) {
            toast.error("Failed to subscribe. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-black text-white py-12 px-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="flex justify-center mb-4">
                    <IoMailOutline className="text-4xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay in the Loop</h2>
                <p className="text-gray-400 mb-6">
                    Get exclusive drops, early access, and special offers delivered to your inbox
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-sm outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>

                <p className="text-xs text-gray-500 mt-4">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </div>
    );
}
