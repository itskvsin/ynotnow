import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import type {
  ShopifyProductsResponse,
  ShopifyProductResponse,
  ShopifyCollectionsResponse,
} from "@/types/shopify";

// Get Shopify credentials from environment variables
const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN;
const shopifyToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = "2025-01";

console.log("shopify domain : ", shopifyDomain, shopifyToken);

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
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
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
