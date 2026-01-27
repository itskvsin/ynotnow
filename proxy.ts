
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    // Check if the user is accessing a protected route
    if (request.nextUrl.pathname.startsWith("/account")) {
        const customerToken = request.cookies.get("shopify_customer_token");

        // If no token exists, redirect to login page
        if (!customerToken) {
            const loginUrl = new URL("/login", request.url);
            // Optional: Add a 'next' search param to redirect back after login
            // loginUrl.searchParams.set("next", request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Continue with the request
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
