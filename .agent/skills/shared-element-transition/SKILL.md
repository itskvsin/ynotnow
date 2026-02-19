---
name: Shared Element Page Transition
description: A complete guide and component set for implementing seamless page-to-page shared element transitions using Framer Motion and Next.js App Router.
---

# Shared Element Page Transition

This skill provides a drop-in solution for creating "app-like" transitions where elements morph from one page to another. This is particularly effective for lists to details transitions (e.g., clicking a card to open a full project page).

## 📦 1. Dependencies

You must install these dependencies first:

```bash
npm install framer-motion lenis
# or
yarn add framer-motion lenis
# or
pnpm add framer-motion lenis
```

## 🚀 2. Create Core Components

If these components do not already exist in your project, create them now.

### 2.1 Create `components/PageTransition.tsx`

This component orchestrates the transition logic, keeping the old page mounted while the new one enters.

```tsx
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
 * Wrap your application's children in this component (e.g., inside app/layout.tsx).
 * 
 * It manages the transitions between pages.
 * - During standard navigation, it uses "wait" mode (fade out -> fade in).
 * - During shared element transitions (e.g., to /work), it switches to "popLayout"
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
```

### 2.2 Create `components/SmoothScrolling.tsx`

This component sets up Lenis scrolling, which is required to manually handle scroll restoration without the browser's native jump.

```tsx
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
```

## 🛠️ 3. Implementation Steps

### 3.1 Setup the Provider (`app/layout.tsx`)

Wrap your application in the `SmoothScrolling` provider and the `PageTransition` component.

```tsx
import { SmoothScrolling } from './components/SmoothScrolling';
import { PageTransition } from './components/PageTransition';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScrolling>
      </body>
    </html>
  );
}
```

### 3.2 Create the Source Component

In your listing page (e.g., `app/page.tsx`), use the `Link` component with `scroll={false}` and wrap the shared element in `motion.div` with a unique `layoutId`.

**Crucial:** You must use `scroll={false}` on the Next.js Link, otherwise the browser will jump to the top before the animation starts, breaking the effect.

```tsx
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Card({ id, title, image }) {
  return (
    <Link href={`/work/${id}`} scroll={false}>
      <motion.div 
        layoutId={`card-image-${id}`}
        className="relative aspect-video"
      >
        <img src={image} alt={title} />
      </motion.div>
      <motion.h3 layoutId={`card-title-${id}`}>
        {title}
      </motion.h3>
    </Link>
  );
}
```

### 3.3 Create the Destination Page

In your details page (e.g., `app/work/[id]/page.tsx`), use the **exact same** `layoutId` on the corresponding elements.

You must also manually handle the scroll-to-top behavior using Lenis, because we disabled native scrolling in step 2.

```tsx
'use client';
import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { motion } from 'framer-motion';

export default function WorkPage({ params }) {
  const lenis = useLenis();

  // 1. Lock functionality is CRITICAL.
  // We lock the scroll so the user cannot disrupt the shared element trajectory 
  // by scrolling while the animation is playing.
  // 
  // 2. We animate the scroll to 0 (top) over 1.5s to match the visual transition
  // of the elements flying into place.
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.5,
        lock: true, // Prevents user scrolling during transition
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
        onComplete: () => {
             // Optional: Validation or unlock logic
        }
      });
    }
  }, [lenis]);

  return (
    <main>
      <motion.div 
        layoutId={`card-image-${params.id}`}
        className="w-full h-[50vh]"
        // Use a custom transition for the "snap" feel
        transition={{
            layout: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <img src="..." />
      </motion.div>
      <motion.h1 layoutId={`card-title-${params.id}`}>
        Title
      </motion.h1>
    </main>
  );
}
```
