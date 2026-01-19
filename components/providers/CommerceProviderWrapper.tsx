"use client";

import { CommerceProvider } from "@/lib/commerce";

export function CommerceProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CommerceProvider>{children}</CommerceProvider>;
}

