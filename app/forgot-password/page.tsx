
"use client";

import { useState } from "react";
import Link from "next/link";
import { recoverCustomerPasswordAction } from "@/lib/actions/customer";
import { validateEmail } from "@/lib/utils/validation";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setEmailError(null);
        setSuccess(false);

        // Validate email
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setEmailError(emailValidation.error || null);
            return;
        }

        setIsLoading(true);

        try {
            const { success, error: actionError } = await recoverCustomerPasswordAction(email);

            if (!success) {
                setError(actionError || "Failed to send recovery email");
                return;
            }

            setSuccess(true);
            setEmail("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                    <p className="text-gray-600">Enter your email to receive recovery instructions</p>
                </div>

                {success ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-xl text-center">
                        <h3 className="text-lg font-medium mb-2">Check your email</h3>
                        <p className="mb-6">
                            If an account exists for {email}, we have sent password reset instructions.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm cursor-pointer hover:bg-gray-800 transition-colors"
                        >
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError(null);
                                }}
                                className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 ${emailError ? "ring-2 ring-red-500" : "focus:ring-black"
                                    }`}
                                placeholder="your@email.com"
                            />
                            {emailError && (
                                <p className="text-red-500 text-xs mt-1">{emailError}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white rounded-full py-4 text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Sending..." : "Send Recovery Email"}
                        </button>

                        <div className="text-center mt-4">
                            <Link href="/login" className="text-sm text-gray-500 hover:text-black">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
