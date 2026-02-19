'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Example of a "Source Item" (e.g., a card in a list).
 * 
 * Key Requirements:
 * 1. layoutId: MUST match the ID of the target element on the destination page.
 * 2. scroll={false}: Crucial to avoid jumping before the transition starts.
 * 
 * Usage:
 * <SourceCard id="project-1" title="Example Project" />
 */
export function SourceCard({ id, title, image }: { id: string; title: string; image: string }) {
    return (
        <Link href={`/work/${id}`} scroll={false} className="group overflow-hidden rounded-xl">
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <motion.img
                    layoutId={`image-${id}`}
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            </div>
            <div className="mt-4">
                <motion.h3
                    layoutId={`title-${id}`}
                    className="text-xl font-bold text-gray-900"
                >
                    {title}
                </motion.h3>
                <p className="text-sm text-gray-500">View Project</p>
            </div>
        </Link>
    );
}

// Example usage in a list
export function SourcePage() {
    return (
        <div className="grid grid-cols-2 gap-8">
            <SourceCard
                id="1"
                title="Project Alpha"
                image="/alpha.jpg"
            />
            <SourceCard
                id="2"
                title="Project Beta"
                image="/beta.jpg"
            />
        </div>
    );
}
