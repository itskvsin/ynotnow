import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import type {
  ShopifyProductsResponse,
  ShopifyProductResponse,
  ShopifyCollectionsResponse,
} from "@/types/shopify";

// Get Shopify credentials from environment variables
// This only runs on the server, so it's safe
const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN;
const shopifyToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = "2026-01";

if (!shopifyDomain || !shopifyToken) {
  throw new Error(
    "Missing Shopify environment variables. Please set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN"
  );
}

// Create Shopify Storefront API client
export const shopifyClient = createStorefrontApiClient({
  storeDomain: shopifyDomain,
  apiVersion: apiVersion,
  publicAccessToken: shopifyToken,
});

// GraphQL query for fetching products
export const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL query for fetching a single product by handle
export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      tags
      vendor
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            quantityAvailable
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

// GraphQL query for fetching collections
export const GET_COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

/**
 * Fetches products from Shopify Storefront API
 * @param first - Number of products to fetch (default: 20, max: 250)
 * @returns Promise resolving to ShopifyProductsResponse
 * @throws Error if the request fails
 */
export async function getProducts(
  first: number = 20
): Promise<ShopifyProductsResponse> {
  try {
    // Validate input
    if (first < 1 || first > 250) {
      throw new Error("first must be between 1 and 250");
    }

    const response = await shopifyClient.request(GET_PRODUCTS_QUERY, {
      variables: { first },
    });

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    return response.data as ShopifyProductsResponse;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Fetches a single product by handle from Shopify Storefront API
 * @param handle - Product handle (URL-friendly identifier)
 * @returns Promise resolving to ShopifyProductResponse
 * @throws Error if the request fails
 */
export async function getProductByHandle(
  handle: string
): Promise<ShopifyProductResponse> {
  try {
    if (!handle || typeof handle !== "string") {
      throw new Error("handle must be a non-empty string");
    }

    const response = await shopifyClient.request(GET_PRODUCT_BY_HANDLE_QUERY, {
      variables: { handle },
    });

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    return response.data as ShopifyProductResponse;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

/**
 * Fetches collections from Shopify Storefront API
 * @param first - Number of collections to fetch (default: 20, max: 250)
 * @returns Promise resolving to ShopifyCollectionsResponse
 * @throws Error if the request fails
 */
export async function getCollections(
  first: number = 20
): Promise<ShopifyCollectionsResponse> {
  try {
    // Validate input
    if (first < 1 || first > 250) {
      throw new Error("first must be between 1 and 250");
    }

    const response = await shopifyClient.request(GET_COLLECTIONS_QUERY, {
      variables: { first },
    });

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    return response.data as ShopifyCollectionsResponse;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
}

// Cart-related GraphQL mutations and queries

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_GET_QUERY = `
  query getCart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 250) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  handle
                  featuredImage {
                    url
                    altText
                  }
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
      deliveryGroups {
        deliveryAddress {
          address1
          address2
          city
          province
          country
          zip
        }
        deliveryOptions {
          handle
          title
          cost {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Cart API functions

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  attributes?: Array<{ key: string; value: string }>;
}

export interface CartLineUpdateInput {
  id: string;
  quantity: number;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  discountCodes?: Array<{
    code: string;
    applicable: boolean;
  }>;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          product: {
            id: string;
            title: string;
            handle: string;
            featuredImage: {
              url: string;
              altText: string | null;
            } | null;
          };
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      };
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  deliveryGroups?: Array<{
    deliveryAddress: {
      address1: string | null;
      address2: string | null;
      city: string | null;
      province: string | null;
      country: string | null;
      zip: string | null;
    };
    deliveryOptions: Array<{
      handle: string;
      title: string;
      cost: {
        amount: string;
        currencyCode: string;
      };
    }>;
  }>;
}

export interface CartCreateResponse {
  cartCreate: {
    cart: ShopifyCart | null;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export interface CartGetResponse {
  cart: ShopifyCart | null;
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: ShopifyCart | null;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: ShopifyCart | null;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: ShopifyCart | null;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

/**
 * Creates a new cart
 * @returns Promise resolving to cart ID
 */
export async function createCart(): Promise<string> {
  try {
    const response = await shopifyClient.request<CartCreateResponse>(
      CART_CREATE_MUTATION,
      {
        variables: {
          input: {},
        },
      }
    );

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    if (!response.data) {
      throw new Error("No data returned from Shopify API");
    }

    const { cart, userErrors } = response.data.cartCreate;

    if (userErrors && userErrors.length > 0) {
      throw new Error(
        `Cart creation errors: ${userErrors.map((e) => e.message).join(", ")}`
      );
    }

    if (!cart) {
      throw new Error("Failed to create cart");
    }

    return cart.id;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}

/**
 * Fetches cart data by ID
 * @param cartId - Cart ID
 * @returns Promise resolving to ShopifyCart
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    if (!cartId) {
      return null;
    }

    const response = await shopifyClient.request<CartGetResponse>(
      CART_GET_QUERY,
      {
        variables: { id: cartId },
      }
    );

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    if (!response.data) {
      return null;
    }

    return response.data.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

/**
 * Adds items to cart
 * @param cartId - Cart ID
 * @param lines - Array of cart line items to add
 * @returns Promise resolving to updated cart
 */
export async function addToCart(
  cartId: string,
  lines: CartLineInput[]
): Promise<ShopifyCart> {
  try {
    const response = await shopifyClient.request<CartLinesAddResponse>(
      CART_LINES_ADD_MUTATION,
      {
        variables: {
          cartId,
          lines,
        },
      }
    );

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    if (!response.data) {
      throw new Error("No data returned from Shopify API");
    }

    const { cart, userErrors } = response.data.cartLinesAdd;

    if (userErrors && userErrors.length > 0) {
      throw new Error(
        `Add to cart errors: ${userErrors.map((e) => e.message).join(", ")}`
      );
    }

    if (!cart) {
      throw new Error("Failed to add items to cart");
    }

    return cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

/**
 * Updates cart line items
 * @param cartId - Cart ID
 * @param lines - Array of cart line updates
 * @returns Promise resolving to updated cart
 */
export async function updateCartItems(
  cartId: string,
  lines: CartLineUpdateInput[]
): Promise<ShopifyCart> {
  try {
    const response = await shopifyClient.request<CartLinesUpdateResponse>(
      CART_LINES_UPDATE_MUTATION,
      {
        variables: {
          cartId,
          lines,
        },
      }
    );

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    if (!response.data) {
      throw new Error("No data returned from Shopify API");
    }

    const { cart, userErrors } = response.data.cartLinesUpdate;

    if (userErrors && userErrors.length > 0) {
      throw new Error(
        `Update cart errors: ${userErrors.map((e) => e.message).join(", ")}`
      );
    }

    if (!cart) {
      throw new Error("Failed to update cart");
    }

    return cart;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}

/**
 * Removes items from cart
 * @param cartId - Cart ID
 * @param lineIds - Array of line item IDs to remove
 * @returns Promise resolving to updated cart
 */
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  try {
    const response = await shopifyClient.request<CartLinesRemoveResponse>(
      CART_LINES_REMOVE_MUTATION,
      {
        variables: {
          cartId,
          lineIds,
        },
      }
    );

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    if (!response.data) {
      throw new Error("No data returned from Shopify API");
    }

    const { cart, userErrors } = response.data.cartLinesRemove;

    if (userErrors && userErrors.length > 0) {
      throw new Error(
        `Remove from cart errors: ${userErrors.map((e) => e.message).join(", ")}`
      );
    }

    if (!cart) {
      throw new Error("Failed to remove items from cart");
    }

    return cart;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
}

// ==================== CART DISCOUNT CODES ====================

export const CART_DISCOUNT_CODES_UPDATE_MUTATION = `
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        id
        checkoutUrl
        totalQuantity
        discountCodes {
          code
          applicable
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export interface CartDiscountCodesUpdateResponse {
  cartDiscountCodesUpdate: {
    cart: ShopifyCart | null;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

/**
 * Updates discount codes on a cart
 * @param cartId - Cart ID
 * @param discountCodes - Array of discount codes (empty array to remove all)
 * @returns Promise resolving to updated cart
 */
export async function updateCartDiscountCodes(
  cartId: string,
  discountCodes: string[]
): Promise<ShopifyCart> {
  try {
    const response = await shopifyClient.request<CartDiscountCodesUpdateResponse>(
      CART_DISCOUNT_CODES_UPDATE_MUTATION,
      {
        variables: {
          cartId,
          discountCodes: discountCodes.length > 0 ? discountCodes : [],
        },
      }
    );

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    if (!response.data) {
      throw new Error("No data returned from Shopify API");
    }

    const { cart, userErrors } = response.data.cartDiscountCodesUpdate;

    if (userErrors && userErrors.length > 0) {
      throw new Error(
        `Discount code errors: ${userErrors.map((e) => e.message).join(", ")}`
      );
    }

    if (!cart) {
      throw new Error("Failed to update discount codes");
    }

    return cart;
  } catch (error) {
    console.error("Error updating discount codes:", error);
    throw error;
  }
}

// ==================== SHIPPING RATES ====================

export const CART_BUYER_IDENTITY_UPDATE_MUTATION = `
  mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
        deliveryGroups {
          deliveryAddress {
            address1
            address2
            city
            province
            country
            zip
          }
          deliveryOptions {
            handle
            title
            cost {
              amount
              currencyCode
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export interface CartBuyerIdentityUpdateResponse {
  cartBuyerIdentityUpdate: {
    cart: {
      id: string;
      deliveryGroups: Array<{
        deliveryAddress: {
          address1: string | null;
          address2: string | null;
          city: string | null;
          province: string | null;
          country: string | null;
          zip: string | null;
        };
        deliveryOptions: Array<{
          handle: string;
          title: string;
          cost: {
            amount: string;
            currencyCode: string;
          };
        }>;
      }>;
    } | null;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export interface ShippingAddress {
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country: string;
  zip?: string;
}

export interface ShippingRate {
  handle: string;
  title: string;
  cost: {
    amount: string;
    currencyCode: string;
  };
}

/**
 * Gets shipping rates for a cart with delivery address
 * Uses cartBuyerIdentityUpdate to set the delivery address, then queries the cart to get shipping rates
 * @param cartId - Cart ID
 * @param address - Shipping address
 * @returns Promise resolving to array of shipping rates
 */
export async function getShippingRates(
  cartId: string,
  address: ShippingAddress
): Promise<ShippingRate[]> {
  try {
    // First, update the cart buyer identity with the delivery address
    const updateResponse = await shopifyClient.request<CartBuyerIdentityUpdateResponse>(
      CART_BUYER_IDENTITY_UPDATE_MUTATION,
      {
        variables: {
          cartId,
          buyerIdentity: {
            deliveryAddressPreferences: [
              {
                deliveryAddress: {
                  address1: address.address1 || null,
                  address2: address.address2 || null,
                  city: address.city || null,
                  province: address.province || null,
                  countryCode: address.country.toUpperCase(),
                  zip: address.zip || null,
                },
              },
            ],
          },
        },
      }
    );

    if (updateResponse.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(updateResponse.errors)}`);
    }

    if (!updateResponse.data) {
      throw new Error("No data returned from Shopify API");
    }

    const { userErrors } = updateResponse.data.cartBuyerIdentityUpdate;

    if (userErrors && userErrors.length > 0) {
      throw new Error(
        `Shipping rate errors: ${userErrors.map((e) => e.message).join(", ")}`
      );
    }

    // Now query the cart to get delivery groups with shipping rates
    const cartResponse = await shopifyClient.request<CartGetResponse>(
      CART_GET_QUERY,
      {
        variables: { id: cartId },
      }
    );

    if (cartResponse.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(cartResponse.errors)}`);
    }

    if (!cartResponse.data || !cartResponse.data.cart) {
      return [];
    }

    const cart = cartResponse.data.cart;

    if (!cart.deliveryGroups || cart.deliveryGroups.length === 0) {
      return [];
    }

    return cart.deliveryGroups[0].deliveryOptions || [];
  } catch (error) {
    console.error("Error getting shipping rates:", error);
    throw error;
  }
}

// ==================== PRODUCT SEARCH & FILTERING ====================

export const GET_PRODUCTS_WITH_FILTERS_QUERY = `
  query getProducts($first: Int!, $query: String, $sortKey: ProductSortKeys) {
    products(first: $first, query: $query, sortKey: $sortKey) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          tags
          vendor
          productType
        }
      }
    }
  }
`;

export enum ProductSortKeys {
  TITLE = "TITLE",
  PRICE = "PRICE",
  CREATED_AT = "CREATED_AT",
  BEST_SELLING = "BEST_SELLING",
  RELEVANCE = "RELEVANCE",
}

export interface ProductFilters {
  query?: string; // Search query
  sortKey?: ProductSortKeys;
  collection?: string; // Collection handle
  tags?: string[]; // Product tags
  vendor?: string;
  productType?: string;
  priceMin?: number;
  priceMax?: number;
}

/**
 * Fetches products with search and filtering
 * @param first - Number of products to fetch
 * @param filters - Filter options
 * @returns Promise resolving to ShopifyProductsResponse
 */
export async function getProductsWithFilters(
  first: number = 20,
  filters?: ProductFilters
): Promise<ShopifyProductsResponse> {
  try {
    if (first < 1 || first > 250) {
      throw new Error("first must be between 1 and 250");
    }

    // Build query string
    let queryParts: string[] = [];
    
    if (filters?.query) {
      queryParts.push(filters.query);
    }
    
    if (filters?.collection) {
      queryParts.push(`collection:${filters.collection}`);
    }
    
    if (filters?.tags && filters.tags.length > 0) {
      queryParts.push(`tag:${filters.tags.join(" OR tag:")}`);
    }
    
    if (filters?.vendor) {
      queryParts.push(`vendor:${filters.vendor}`);
    }
    
    if (filters?.productType) {
      queryParts.push(`product_type:${filters.productType}`);
    }
    
    if (filters?.priceMin !== undefined) {
      queryParts.push(`variants.price:>=${filters.priceMin}`);
    }
    
    if (filters?.priceMax !== undefined) {
      queryParts.push(`variants.price:<=${filters.priceMax}`);
    }

    const queryString = queryParts.length > 0 ? queryParts.join(" AND ") : undefined;

    const response = await shopifyClient.request(GET_PRODUCTS_WITH_FILTERS_QUERY, {
      variables: {
        first,
        query: queryString,
        sortKey: filters?.sortKey || ProductSortKeys.RELEVANCE,
      },
    });

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    return response.data as ShopifyProductsResponse;
  } catch (error) {
    console.error("Error fetching products with filters:", error);
    throw error;
  }
}