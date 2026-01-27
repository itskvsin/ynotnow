"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-2">Something went wrong!</h1>
                    <p className="text-gray-600">We're sorry for the inconvenience</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-700">
                        {error.message || "An unexpected error occurred"}
                    </p>
                    {error.digest && (
                        <p className="text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>
                    )}
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="bg-gray-200 text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
