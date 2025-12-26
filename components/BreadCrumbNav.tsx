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
        <ol className="flex gap-1 text-md capitalize font-Geist">
          {/* <li>
            <Link href="/">Home</Link>
          </li> */}
          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const label = segment.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
            return (
              <li key={href} className="flex gap-1">
                {index === segments.length - 1 ? (
                 <span className="font-normal"><span>{"> "} </span>{label}</span>
                ) : (
                  <p>{label}</p>
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
