"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";
import { useLenis } from "lenis/react";

/**
 * A "Frozen" router context provider that prevents the router from updating
 * its state while the exit animation is playing.
 */
function FrozenRouter(props: { children: React.ReactNode }) {
    const context = useContext(LayoutRouterContext ?? {});
    const frozen = useRef(context).current;

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {props.children}
        </LayoutRouterContext.Provider>
    );
}

/**
 * The Page Transition Container.
 * 
 * Wrap your application's children in this component (e.g., inside app/layout.tsx).
 * 
 * It manages the transitions between pages.
 * - During standard navigation, it uses "wait" mode (fade out -> fade in).
 * - During shared element transitions (e.g., to /products), it switches to "popLayout"
 *   to allow source and destination elements to exist simultaneously, enabling the morph.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Determine which routes should use the shared element transition ("popLayout").
    // Typically, this is when navigating TO a detail page or FROM a detail page.
    // In this case, navigating between /products (list) and /products/[id] (detail).
    const isSharedTransition = pathname.startsWith("/products");

    const lenis = useLenis();

    return (
        <AnimatePresence
            mode={isSharedTransition ? "popLayout" : "wait"}
            custom={{ y: typeof window !== "undefined" ? window.scrollY : 0 }}
            onExitComplete={() => {
                // Redundant safety: ensure scroll is reset if we exited a non-shared route cleanup
                if (!isSharedTransition && typeof window !== "undefined") {
                    window.scrollTo(0, 0);
                }
            }}
        >
            <motion.div
                key={pathname}
                initial={{ opacity: isSharedTransition ? 1 : 0, y: 0 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeInOut" }
                }}
                exit={{
                    opacity: isSharedTransition ? 1 : 0,
                    transition: { duration: 0.5, ease: "easeInOut" }
                }}
                className="w-full"
                onAnimationStart={() => {
                    // Standard behavior: Scroll to top on navigation.
                    if (!isSharedTransition && typeof window !== "undefined") {
                        window.scrollTo(0, 0);
                        if (lenis) {
                            lenis.scrollTo(0, { immediate: true });
                        }
                    }
                }}
            >
                <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
        </AnimatePresence>
    );
}
