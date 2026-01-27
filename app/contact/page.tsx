"use client";

import { useState } from "react";
import { toast } from "sonner";
import { validateEmail, validateRequired } from "@/lib/utils/validation";
import type { Metadata } from "next";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validate
        const newErrors: { [key: string]: string } = {};
        const nameValidation = validateRequired(formData.name, "Name");
        const emailValidation = validateEmail(formData.email);
        const subjectValidation = validateRequired(formData.subject, "Subject");
        const messageValidation = validateRequired(formData.message, "Message");

        if (!nameValidation.isValid) newErrors.name = nameValidation.error || "";
        if (!emailValidation.isValid) newErrors.email = emailValidation.error || "";
        if (!subjectValidation.isValid) newErrors.subject = subjectValidation.error || "";
        if (!messageValidation.isValid) newErrors.message = messageValidation.error || "";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success("Message sent successfully! We'll get back to you soon.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-gray-600">
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Name *
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 ${errors.name ? "ring-2 ring-red-500" : "focus:ring-black"
                                    }`}
                                placeholder="Your name"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 ${errors.email ? "ring-2 ring-red-500" : "focus:ring-black"
                                    }`}
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                Subject *
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                value={formData.subject}
                                onChange={handleChange}
                                className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 ${errors.subject ? "ring-2 ring-red-500" : "focus:ring-black"
                                    }`}
                                placeholder="How can we help?"
                            />
                            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 resize-none ${errors.message ? "ring-2 ring-red-500" : "focus:ring-black"
                                    }`}
                                placeholder="Your message..."
                            />
                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white rounded-full py-4 text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="mt-12 grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="font-semibold mb-2">Email</h3>
                        <p className="text-gray-600 text-sm">support@ynotnow.com</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="font-semibold mb-2">Response Time</h3>
                        <p className="text-gray-600 text-sm">Within 24-48 hours</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
