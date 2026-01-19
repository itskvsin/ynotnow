"use server";

import { cookies } from "next/headers";
import {
  createCustomer,
  createCustomerAccessToken,
  getCustomer,
  updateCustomer,
  getCustomerOrders,
} from "@/lib/shopify-customer";

const CUSTOMER_TOKEN_COOKIE = "shopify_customer_token";
const CUSTOMER_TOKEN_EXPIRY_DAYS = 30;

/**
 * Get customer access token from cookies
 */
async function getCustomerTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CUSTOMER_TOKEN_COOKIE)?.value || null;
}

/**
 * Set customer access token in cookies
 */
async function setCustomerTokenInCookies(token: string, expiresAt: string): Promise<void> {
  const cookieStore = await cookies();
  const expiryDate = new Date(expiresAt);
  
  cookieStore.set(CUSTOMER_TOKEN_COOKIE, token, {
    expires: expiryDate,
    path: "/",
    sameSite: "lax",
    httpOnly: true, // Secure token storage
  });
}

/**
 * Clear customer access token from cookies
 */
async function clearCustomerTokenFromCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CUSTOMER_TOKEN_COOKIE);
}

/**
 * Server Action: Register new customer
 */
export async function registerCustomerAction(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}) {
  try {
    const customer = await createCustomer(input);
    
    // Auto-login after registration
    const { accessToken, expiresAt } = await createCustomerAccessToken(
      input.email,
      input.password
    );
    
    await setCustomerTokenInCookies(accessToken, expiresAt);
    
    return { customer, error: null };
  } catch (error) {
    console.error("Error registering customer:", error);
    return {
      customer: null,
      error: error instanceof Error ? error.message : "Failed to register customer",
    };
  }
}

/**
 * Server Action: Login customer
 */
export async function loginCustomerAction(email: string, password: string) {
  try {
    const { accessToken, expiresAt } = await createCustomerAccessToken(email, password);
    await setCustomerTokenInCookies(accessToken, expiresAt);
    
    const customer = await getCustomer(accessToken);
    
    return { customer, error: null };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      customer: null,
      error: error instanceof Error ? error.message : "Invalid email or password",
    };
  }
}

/**
 * Server Action: Logout customer
 */
export async function logoutCustomerAction() {
  try {
    await clearCustomerTokenFromCookies();
    return { success: true, error: null };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, error: "Failed to logout" };
  }
}

/**
 * Server Action: Get current customer
 */
export async function getCurrentCustomerAction() {
  try {
    const token = await getCustomerTokenFromCookies();
    
    if (!token) {
      return { customer: null, error: null };
    }
    
    const customer = await getCustomer(token);
    return { customer, error: null };
  } catch (error) {
    console.error("Error fetching customer:", error);
    // Clear invalid token
    await clearCustomerTokenFromCookies();
    return { customer: null, error: "Session expired" };
  }
}

/**
 * Server Action: Update customer profile
 */
export async function updateCustomerProfileAction(customer: {
  firstName?: string;
  lastName?: string;
  phone?: string;
}) {
  try {
    const token = await getCustomerTokenFromCookies();
    
    if (!token) {
      return { customer: null, error: "Not authenticated" };
    }
    
    const updatedCustomer = await updateCustomer(token, customer);
    return { customer: updatedCustomer, error: null };
  } catch (error) {
    console.error("Error updating customer:", error);
    return {
      customer: null,
      error: error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}

/**
 * Server Action: Get customer orders
 */
export async function getCustomerOrdersAction(first: number = 10) {
  try {
    const token = await getCustomerTokenFromCookies();
    
    if (!token) {
      return { orders: [], error: "Not authenticated" };
    }
    
    const orders = await getCustomerOrders(token, first);
    return { orders, error: null };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      orders: [],
      error: error instanceof Error ? error.message : "Failed to fetch orders",
    };
  }
}

