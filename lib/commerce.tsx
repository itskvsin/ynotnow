"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Commerce Provider Context
 * This provides a simple context for cart operations
 * Currently minimal - cart operations are handled via direct hooks
 */
interface CommerceContextType {
  // Future: Can add global cart state, config, etc. here
}

const CommerceContext = createContext<CommerceContextType | undefined>(
  undefined
);

export function CommerceProvider({ children }: { children: ReactNode }) {
  // Empty context for now - hooks handle their own state
  // This provider is here for future extensibility
  const value: CommerceContextType = {};
  
  return (
    <CommerceContext.Provider value={value}>
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (context === undefined) {
    throw new Error("useCommerce must be used within a CommerceProvider");
  }
  return context;
}

