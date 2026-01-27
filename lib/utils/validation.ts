/**
 * Form validation utilities
 */

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
    if (!email || !email.trim()) {
        return { isValid: false, error: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: "Please enter a valid email address" };
    }

    return { isValid: true };
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): ValidationResult {
    if (!password || !password.trim()) {
        return { isValid: false, error: "Password is required" };
    }

    if (password.length < 6) {
        return { isValid: false, error: "Password must be at least 6 characters" };
    }

    return { isValid: true };
}

/**
 * Validate required field
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
    if (!value || !value.trim()) {
        return { isValid: false, error: `${fieldName} is required` };
    }

    return { isValid: true };
}

/**
 * Validate phone number (basic validation)
 */
export function validatePhone(phone: string): ValidationResult {
    if (!phone || !phone.trim()) {
        return { isValid: true }; // Phone is optional
    }

    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");

    if (digitsOnly.length < 10) {
        return { isValid: false, error: "Phone number must be at least 10 digits" };
    }

    return { isValid: true };
}

/**
 * Validate promo code format
 */
export function validatePromoCode(code: string): ValidationResult {
    if (!code || !code.trim()) {
        return { isValid: false, error: "Please enter a promo code" };
    }

    if (code.trim().length < 3) {
        return { isValid: false, error: "Promo code is too short" };
    }

    return { isValid: true };
}
