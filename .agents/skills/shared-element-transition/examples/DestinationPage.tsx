'use client';

import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { motion } from 'framer-motion';

/**
 * Example of a "Destination Page" (e.g., the detail view linked from a list).
 * 
 * Key Requirements:
 * 1. layoutId: MUST match the ID of the source element.
 * 2. Manual Scroll Management: Using Lenis to force scroll to top since we disabled native scroll.
 * 3. Staggered Content Entry: Other content (like text description) should fade in AFTER the transition.
 */
export default function WorkPage({ params }: { params: { id: string } }) {
    const lenis = useLenis();

    // CUSTOMIZE THIS LOGIC:
    // Scroll to top immediately on mount, using a lock to prevent user interference.
    useEffect(() => {
        if (!lenis) return;

        lenis.scrollTo(0, {
            immediate: true,
            lock: true, // Optional: Lock scroll during transition if needed
            onComplete: () => {
                // Scroll complete
            }
        });
    }, [lenis]);

    return (
        <main className="min-h-screen bg-gray-900 text-white pt-24 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    {/* The Shared Element Target */}
                    <motion.div
                        layoutId={`image-${params.id}`}
                        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-800"
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Ideally import from data store or reproduce image */}
                        <img src="..." className="w-full h-full object-cover" />
                    </motion.div>

                    <motion.h1
                        layoutId={`title-${params.id}`}
                        className="text-6xl font-bold mt-8"
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        Project Title
                    </motion.h1>
                </header>

                {/* Staggered entry for new content to preserve visual flow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <p className="text-xl leading-relaxed text-gray-300 max-w-2xl">
                        This content fades in seamlessly after the shared element transition completes.
                    </p>
                </motion.div>
            </div>
        </main>
    );
}

// NOTE: Ensure your global layout component uses the PageTransition wrapper for this to work.
