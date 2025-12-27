
export interface ShippingAddress {
  country: string;
  state: string;
  zipCode: string;
}

export interface ShippingRate {
  label: string;
  amount: number;
  currency: string;
}

/**
 * Shipping-related informational banner
 * (Free shipping, delivery guarantees, etc.)
 */
export interface ShippingInfo {
  id: string;
  title: string;
  description: string;
  shippingCost: string;
  icon?: React.ReactNode;
  minOrderAmount?: number; // e.g. 4999
}
