export interface CartItem {
  id: string;
  title: string;
  size: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  quantity: number;
  selected: boolean;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}
