/**
 * TypeScript types for Shopify Storefront API responses
 * Use these types throughout your application for type safety
 */

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyMoney;
  maxVariantPrice?: ShopifyMoney;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  availableForSale: boolean;
  quantityAvailable?: number;
  sku?: string;
  weight?: number;
  weightUnit?: string;
  compareAtPrice?: ShopifyMoney;
  selectedOptions?: Array<{
    name: string;
    value: string;
  }>;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  priceRange: ShopifyPriceRange;
  featuredImage: ShopifyImage | null;
  images?: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
  tags?: string[];
  vendor?: string;
  productType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  image: ShopifyImage | null;
  updatedAt?: string;
}

export interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
    pageInfo?: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface ShopifyProductResponse {
  product: ShopifyProduct | null;
}

export interface ShopifyCollectionsResponse {
  collections: {
    edges: Array<{
      node: ShopifyCollection;
    }>;
    pageInfo?: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface ShopifyCollectionProductsResponse {
  collection: {
    id: string;
    title: string;
    handle: string;
    description: string;
    products: {
      edges: Array<{
        node: ShopifyProduct;
      }>;
      pageInfo?: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
  } | null;
}

/**
 * Helper type for extracting node from edges
 */
export type ExtractNode<T> = T extends { edges: Array<{ node: infer N }> }
  ? N
  : never;

/**
 * Helper type for product list (flattened)
 */
export type ProductList = ShopifyProduct[];

/**
 * Helper type for collection list (flattened)
 */
export type CollectionList = ShopifyCollection[];

