'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useContext, useRef } from 'react';

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
 * Wrap your application's `children` in this component (e.g., inside `app/layout.tsx`).
 * 
 * It manages the transitions between pages.
 * - During standard navigation, it uses "wait" mode (fade out -> fade in).
 * - During shared element transitions (e.g., to `/work`), it switches to "popLayout"
 *   to allow source and destination elements to exist simultaneously, enabling the morph.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // CUSTOMIZE THIS LOGIC:
    // Determine which routes should use the shared element transition ("popLayout").
    // Typically, this is when navigating TO a detail page.
    const isSharedTransition = pathname.startsWith('/work') || pathname.startsWith('/project');

    return (
        <AnimatePresence
            mode={isSharedTransition ? "popLayout" : "wait"}
            onExitComplete={() => {
                // If exiting a route that WASN'T a shared transition, reset scroll immediately.
                // For shared transitions, the destination page handles scroll via Lenis.
                if (!isSharedTransition) {
                    window.scrollTo(0, 0);
                }
            }}
        >
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
            >
                <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
        </AnimatePresence>
    );
}
