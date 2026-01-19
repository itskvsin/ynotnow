import type { ShopifyCart } from "@/lib/shopify";
import type { CartItem, CartSummary } from "@/types/cart";

/**
 * Cached currency formatter
 */
const currencyFormatters = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(currencyCode: string): Intl.NumberFormat {
  if (!currencyFormatters.has(currencyCode)) {
    currencyFormatters.set(
      currencyCode,
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    );
  }
  return currencyFormatters.get(currencyCode)!;
}

/**
 * Format price amount to number (removes currency formatting, returns raw number)
 */
export function formatPrice(amount: string, currencyCode: string): number {
  return parseFloat(amount);
}

/**
 * Format price for display
 */
export function formatPriceDisplay(amount: string, currencyCode: string): string {
  const formatter = getCurrencyFormatter(currencyCode);
  return formatter.format(parseFloat(amount));
}

/**
 * Map Shopify cart line item to CartItem
 */
function mapLineItemToCartItem(
  lineItem: ShopifyCart["lines"]["edges"][0]["node"]
): CartItem {
  const variant = lineItem.merchandise;
  const sizeOption =
    variant.selectedOptions.find((opt) => opt.name.toLowerCase() === "size")
      ?.value || "";
  const imageUrl = variant.product.featuredImage?.url || "";

  return {
    id: lineItem.id,
    title: variant.product.title,
    size: sizeOption,
    price: formatPrice(variant.price.amount, variant.price.currencyCode),
    imageUrl,
    inStock: true, // Shopify doesn't provide stock status in cart, assume true
    quantity: lineItem.quantity,
    selected: true, // Default to selected
  };
}

/**
 * Single transformation function - processes Commerce cart once and returns both items and summary
 * This is more efficient than separate functions as it only iterates once
 */
export function transformCart(commerceCart: ShopifyCart | null): {
  items: CartItem[];
  summary: CartSummary;
} {
  if (!commerceCart) {
    return {
      items: [],
      summary: {
        subtotal: 0,
        discount: 0,
        deliveryFee: 0,
        total: 0,
      },
    };
  }

  const items: CartItem[] = [];
  let subtotal = 0;

  // Single pass through cart items
  commerceCart.lines.edges.forEach(({ node }) => {
    const item = mapLineItemToCartItem(node);
    items.push(item);
    subtotal += formatPrice(node.merchandise.price.amount, node.merchandise.price.currencyCode) * node.quantity;
  });

  const totalAmount = formatPrice(
    commerceCart.cost.totalAmount.amount,
    commerceCart.cost.totalAmount.currencyCode
  );
  const subtotalAmount = formatPrice(
    commerceCart.cost.subtotalAmount.amount,
    commerceCart.cost.subtotalAmount.currencyCode
  );

  // Calculate discount (if any)
  const discount = Math.max(0, subtotalAmount - totalAmount);

  return {
    items,
    summary: {
      subtotal: subtotalAmount,
      discount,
      deliveryFee: 0, // Shipping calculated separately if needed
      total: totalAmount,
    },
  };
}

/**
 * Map Shopify variant to cart item format (for preview before adding)
 */
export function mapVariantToCartItem(
  variant: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      id: string;
      title: string;
      featuredImage: {
        url: string;
        altText: string | null;
      } | null;
    };
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  },
  quantity: number = 1
): Omit<CartItem, "id" | "selected"> {
  const sizeOption =
    variant.selectedOptions.find((opt) => opt.name.toLowerCase() === "size")
      ?.value || "";

  return {
    title: variant.product.title,
    size: sizeOption,
    price: formatPrice(variant.price.amount, variant.price.currencyCode),
    imageUrl: variant.product.featuredImage?.url || "",
    inStock: true,
    quantity,
  };
}

