"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const BreadCrumbNav = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatLabel = (segment: string) =>
    segment
      .split("-")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");

  return (
    <nav
      aria-label="Breadcrumb"
      className="h-20 lg:h-40 flex items-end"
    >
      <ol className="flex items-center gap-1 text-md font-Geist text-gray-600">
        {/* Home */}
        <li>
          <Link href="/" className="hover:text-black">
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href =
            "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const label = formatLabel(segment);

          return (
            <li key={href} className="flex items-center gap-1">
              <span className="text-gray-400">{">"}</span>

              {isLast ? (
                <span
                  className="text-black font-normal"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-black"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbNav;
