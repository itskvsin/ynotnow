// types/productMeta.ts
export interface StockInfo {
  inStock: boolean;
  quantityAvailable?: number;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
}

export interface StockLevel {
  total: number;
  remaining: number;
}
