"use client";

import { ReactLenis } from "lenis/react";

/**
 * Provides smooth scrolling using Lenis.
 * 
 * Wrap your entire app (layout.tsx) with this component.
 * 
 * WHY IS THIS NEEDED?
 * - Shared element links MUST use scroll={false} to avoid jumpy transitions.
 * - This component lets you imperatively control the scroll position after navigation
 *   (e.g., lenis.scrollTo(0)) more cleanly than window.scrollTo.
 */
function SmoothScrolling({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;
