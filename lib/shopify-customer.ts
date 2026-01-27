/**
 * Shopify Customer Account API functions
 * These functions handle customer authentication, profile, and orders
 */

import { shopifyClient } from "./shopify";

// ==================== CUSTOMER ACCOUNT API ====================

export const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
        phone
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_QUERY = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      defaultAddress {
        id
        address1
        address2
        city
        province
        country
        zip
        phone
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            country
            zip
            phone
          }
        }
      }
    }
  }
`;

export const CUSTOMER_UPDATE_MUTATION = `
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id
        email
        firstName
        lastName
        phone
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ORDERS_QUERY = `
  query getCustomerOrders($customerAccessToken: String!, $first: Int!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: $first) {
        edges {
          node {
            id
            name
            orderNumber
            processedAt
            totalPrice {
              amount
              currencyCode
            }
            fulfillmentStatus
            financialStatus
            lineItems(first: 50) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                    product {
                      handle
                    }
                  }
                }
              }
            }
            shippingAddress {
              address1
              address2
              city
              province
              country
              zip
            }
          }
        }
      }
    }
  }
`;

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface CustomerAddress {
  id?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country: string;
  zip?: string;
  phone?: string;
}

export interface CustomerOrder {
  id: string;
  name: string;
  orderNumber: number;
  processedAt: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  fulfillmentStatus: string;
  financialStatus: string;
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        variant: {
          id: string;
          title: string;
          image: {
            url: string;
            altText: string | null;
          } | null;
          product: {
            handle: string;
          };
        } | null;
        originalUnitPrice: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
  shippingAddress: CustomerAddress | null;
  trackingInformation: Array<{
    number: string;
    url: string | null;
    company: string | null;
  }>;
}

/**
 * Creates a new customer account
 */
export async function createCustomer(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}): Promise<Customer> {
  try {
    const response = await shopifyClient.request(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: {
          email: input.email,
          password: input.password,
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
        },
      },
    }) as any;

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    const { customer, customerUserErrors } = response.data.customerCreate;

    if (customerUserErrors && customerUserErrors.length > 0) {
      throw new Error(
        `Customer creation errors: ${customerUserErrors.map((e: { field: string[]; message: string }) => e.message).join(", ")}`
      );
    }

    if (!customer) {
      throw new Error("Failed to create customer");
    }

    return customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
}

/**
 * Creates a customer access token (login)
 */
export async function createCustomerAccessToken(
  email: string,
  password: string
): Promise<{ accessToken: string; expiresAt: string }> {
  try {
    const response = await shopifyClient.request(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, {
      variables: {
        input: {
          email,
          password,
        },
      },
    }) as any;

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    const { customerAccessToken, customerUserErrors } =
      response.data.customerAccessTokenCreate;

    if (customerUserErrors && customerUserErrors.length > 0) {
      throw new Error(
        `Login errors: ${customerUserErrors.map((e: { field: string[]; message: string }) => e.message).join(", ")}`
      );
    }

    if (!customerAccessToken) {
      throw new Error("Failed to create access token");
    }

    return {
      accessToken: customerAccessToken.accessToken,
      expiresAt: customerAccessToken.expiresAt,
    };
  } catch (error) {
    console.error("Error creating customer access token:", error);
    throw error;
  }
}

/**
 * Gets customer information
 */
export async function getCustomer(
  customerAccessToken: string
): Promise<Customer & { addresses: CustomerAddress[] }> {
  try {
    const response = await shopifyClient.request(CUSTOMER_QUERY, {
      variables: {
        customerAccessToken,
      },
    }) as any;

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    const customer = response.data.customer;

    if (!customer) {
      throw new Error("Customer not found");
    }

    return {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName || undefined,
      lastName: customer.lastName || undefined,
      phone: customer.phone || undefined,
      addresses: customer.addresses?.edges.map((edge: { node: CustomerAddress }) => edge.node) || [],
    };
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
}

/**
 * Updates customer information
 */
export async function updateCustomer(
  customerAccessToken: string,
  customer: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }
): Promise<Customer> {
  try {
    const response = await shopifyClient.request(CUSTOMER_UPDATE_MUTATION, {
      variables: {
        customerAccessToken,
        customer,
      },
    }) as any;

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    const { customer: updatedCustomer, customerUserErrors } = response.data.customerUpdate;

    if (customerUserErrors && customerUserErrors.length > 0) {
      throw new Error(
        `Update errors: ${customerUserErrors.map((e: { field: string[]; message: string }) => e.message).join(", ")}`
      );
    }

    if (!updatedCustomer) {
      throw new Error("Failed to update customer");
    }

    return updatedCustomer;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
}

/**
 * Gets customer orders
 */
export async function getCustomerOrders(
  customerAccessToken: string,
  first: number = 10
): Promise<CustomerOrder[]> {
  try {
    const response = await shopifyClient.request(CUSTOMER_ORDERS_QUERY, {
      variables: {
        customerAccessToken,
        first,
      },
    }) as any;

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    const customer = response.data.customer;

    if (!customer) {
      throw new Error("Customer not found");
    }

    return customer.orders.edges.map((edge: { node: CustomerOrder }) => edge.node);
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    throw error;
  }
}


export const CUSTOMER_RECOVER_MUTATION = `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        field
        message
      }
    }
  }
`;

/**
 * Sends a password recovery email
 */
export async function recoverCustomer(email: string): Promise<void> {
  try {
    const response = await shopifyClient.request(CUSTOMER_RECOVER_MUTATION, {
      variables: {
        email,
      },
    }) as any;

    if (response.errors) {
      throw new Error(`Shopify API errors: ${JSON.stringify(response.errors)}`);
    }

    const { customerUserErrors } = response.data.customerRecover;

    if (customerUserErrors && customerUserErrors.length > 0) {
      throw new Error(
        `Recovery errors: ${customerUserErrors.map((e: { field: string[]; message: string }) => e.message).join(", ")}`
      );
    }
  } catch (error) {
    console.error("Error sending recovery email:", error);
    throw error;
  }
}

/**
 * Get a single order by name (order number)
 */
export async function getCustomerOrderByName(
  customerAccessToken: string,
  orderName: string
): Promise<any> {
  try {
    const orders = await getCustomerOrders(customerAccessToken, 100);
    const order = orders.find((o: any) => o.name === orderName);
    return order || null;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}

