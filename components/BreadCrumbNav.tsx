"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const BreadCrumbNav = () => {
  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);

  return (
    <section>
      <nav>
        <ol className="flex gap-1 text-sm capitalize">
          <li>
            <Link href="/">Home</Link>
          </li>
          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const label = segment.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
            return (
              <li key={href} className="flex gap-1">
                <span>{">"}</span>
                {index === segments.length - 1 ? (
                  <span className="font-medium">{label}</span>
                ) : (
                  <Link href={href}>{label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
};

export default BreadCrumbNav;
