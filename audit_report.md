# Codebase Audit Report

## Executive Summary
The `ynotnow` codebase is built on a modern stack (Next.js 16, React 19, TypeScript), showing a strong foundation. However, several architectural redundancies and "best practice obliviousness" (specifically regarding performance and bundle size) were identified. The most critical issues relate to redundant library, duplicate scroll handling, and potential SEO impacts from client-side rendering of the landing page.

## 1. Architecture & Configuration

### 🔴 Critical: Redundant Dependencies (Bundle Bloat)
The project includes multiple overlapping libraries that serve the same purpose. This significantly increases the JavaScript bundle size sent to the user.
-   **Animation**: `framer-motion`, `gsap`, `motion` (Motion One), and `tw-animate-css` are ALL installed.
    -   *Recommendation*: Standardize on **one** library. Since `framer-motion` is heavily used in components (`PageTransition.tsx`, `Navbar.tsx`), remove `gsap`, `motion`, and `tw-animate-css`.
-   **Icons**: `react-icons`, `@tabler/icons-react`, and `lucide-react` are installed.
    -   *Recommendation*: Stick to `lucide-react` (standard in modern Shadcn/Next stacks) or `react-icons` (if you need variety). Remove the others.

### 🔴 Critical: Double Scroll Library Initialization
Both `app/layout.tsx` and `app/page.tsx` initialize Lenis scroll smoothing.
-   `layout.tsx` uses a custom `SmoothScrolling` component.
-   `page.tsx` uses `<ReactLenis root ...>`.
-   **Impact**: Conflicts, janky scrolling, and double event listeners.
-   *Recommendation*: Remove `ReactLenis` from `page.tsx`. Let the global provider in `layout.tsx` handle it.

### 🟡 Warning: Next.js Image Configuration
`next.config.ts` sets `qualities: [70, 75, 100]`.
-   **Impact**: Quality `100` produces extremely large files with diminishing visual returns. Default `75` is usually sufficient.
-   *Recommendation*: Remove custom qualities unless strictly necessary for a specific art direction use case.

## 2. Frontend Code Quality

### 🟠 High: `use client` Overuse
`app/page.tsx` is marked with `"use client"`.
-   **Impact**: The entire homepage and its children are rendered as Client Components. This reduces the effectiveness of Server-Side Rendering (SSR) for SEO and Time-To-First-Byte (TTFB).
-   *Recommendation*: Remove `"use client"` from `page.tsx`. Move client-specific logic (like `ReactLenis` if it were needed, or effect hooks) into smaller "island" components.

### 🟠 High: Image Optimization (Blurry Logos)
In `Navbar.tsx`, the logo is rendered with `width={64} height={64}` but displayed at `w-28` (112px) or `w-32` (128px) via CSS.
-   **Impact**: The browser/Next.js generates a small 64px image, which is then upscale-blurred by CSS.
-   *Recommendation*: Set `width` and `height` props to match or exceed the maximum display size (e.g., `width={128} height={128}`).

### 🟡 Warning: Accessibility
In `Navbar.tsx`:
```tsx
<div onClick={() => ...} className="cursor-pointer">
```
-   **Impact**: `div` elements are not focusable by default. Keyboard users cannot navigate to or activate the menu.
-   *Recommendation*: Use `<button>` elements for interactive controls.

### 🟡 Warning: Code Rot
-   `app/layout.tsx` contains commented-out font imports (`Bakbak_One`).
-   `app/globals.css` mixes `oklch` (modern) and hex codes (legacy/commented).
-   *Recommendation*: Clean up commented-out code to reduce noise.

## 3. Backend & Security

### 🟡 Weakness: Cookie Security
In `app/api/cart/route.ts`, the cart cookie is set with `httpOnly: false`.
```typescript
httpOnly: false, // Allow client-side access
```
-   **Impact**: JavaScript can access this cookie, theoretically increasing surface area for XSS attacks (though low risk for a cart ID).
-   *Recommendation*: set `httpOnly: true` if possible, and expose the Cart ID via a Context provider or dedicated API endpoint if the client needs it, rather than reading raw cookies.

## 4. Findings Summary Table

| Category        | Issue                                  | Severity   | Action                                      |
| --------------- | -------------------------------------- | ---------- | ------------------------------------------- |
| Performance     | Redundant Animation Libs               | 🔴 Critical | Uninstall `gsap`, `motion`, `tw-animate-css` |
| Performance     | Double Scroll Init                     | 🔴 Critical | Fix `app/page.tsx`                          |
| Architecture    | `use client` on Home                   | 🟠 High    | Refactor `Home` to Server Component         |
| UI/UX           | Blurry Logo Images                     | 🟠 High    | Update Next/Image dimensions                |
| Accessibility   | `div` instead of `button`              | 🟡 Medium  | Use semantic HTML                           |
| Maintainability | Redundant Icon Libs                    | 🟡 Medium  | Standardize on one icon set                 |
| Security        | Cookie `httpOnly: false`               | 🟡 Low     | Enable `httpOnly`                           |

## Next Steps
1.  **Cleanup**: Run `npm uninstall gsap motion tw-animate-css @tabler/icons-react`.
2.  **Fix Scroll**: Edit `app/page.tsx` to remove `ReactLenis`.
3.  **Refactor Home**: Remove `"use client"` from `app/page.tsx`.
4.  **Fix Navbar**: Update logo dimensions and change `div` to `button`.
