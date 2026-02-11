/**
 * User-friendly error messages for common backend error codes
 * Maps error codes to actionable messages for customers
 */

const ERROR_MESSAGES = {
  // Authentication & Authorization
  EMAIL_NOT_VERIFIED:
    'Please verify your email address. Check your inbox for the verification link.',
  ACCOUNT_SUSPENDED:
    'Your account has been suspended. Please contact support@xshopai.com for assistance.',
  INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: "You don't have permission to access this resource.",
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',

  // User Management
  USER_NOT_FOUND: 'User account not found.',
  EMAIL_EXISTS:
    'An account with this email already exists. Try logging in or use a different email.',
  WEAK_PASSWORD:
    'Password is too weak. Use at least 8 characters with uppercase, lowercase, and numbers.',
  PASSWORD_MISMATCH: 'Passwords do not match. Please try again.',

  // Validation
  VALIDATION_ERROR: 'Please check your input and try again.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  REQUIRED_FIELD: 'This field is required.',

  // Address Management
  ADDRESS_NOT_FOUND: 'Address not found.',
  INVALID_ADDRESS: 'Please provide a valid address.',
  MAX_ADDRESSES_REACHED:
    'You have reached the maximum number of saved addresses (10).',

  // Payment Methods
  PAYMENT_METHOD_NOT_FOUND: 'Payment method not found.',
  INVALID_CARD: 'Invalid card details. Please check and try again.',
  CARD_DECLINED:
    'Your card was declined. Please try a different payment method.',

  // Order Management
  ORDER_NOT_FOUND: 'Order not found.',
  ORDER_CANNOT_BE_CANCELLED:
    'This order cannot be cancelled. It may have already been shipped.',
  INSUFFICIENT_STOCK: 'Some items in your cart are out of stock.',

  // Cart Management
  CART_NOT_FOUND: 'Your cart is empty or has expired.',
  PRODUCT_OUT_OF_STOCK: 'This product is currently out of stock.',
  MAX_QUANTITY_EXCEEDED: 'You have reached the maximum quantity for this item.',

  // Network & Server Errors
  NETWORK_ERROR:
    'Unable to connect to the server. Please check your internet connection and try again.',
  SERVER_ERROR:
    'Something went wrong on our end. Please try again in a few moments.',
  SERVICE_UNAVAILABLE:
    'The service is temporarily unavailable. Please try again later.',
  TIMEOUT: 'Request timed out. Please try again.',

  // Rate Limiting
  RATE_LIMIT_EXCEEDED:
    'Too many requests. Please wait a moment before trying again.',

  // Generic Fallback
  UNKNOWN_ERROR:
    'An unexpected error occurred. Please try again or contact support if the problem persists.',
};

/**
 * Get user-friendly error message from error code
 * @param {string} errorCode - Backend error code
 * @param {string} defaultMessage - Fallback message if code not found
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(errorCode, defaultMessage = null) {
  if (!errorCode) {
    return defaultMessage || ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  return (
    ERROR_MESSAGES[errorCode] || defaultMessage || ERROR_MESSAGES.UNKNOWN_ERROR
  );
}

/**
 * Extract error information from API error response
 * @param {Error} error - Axios error object
 * @returns {Object} Structured error information
 */
export function parseApiError(error) {
  // Network error (no response from server)
  if (!error.response) {
    return {
      code: 'NETWORK_ERROR',
      message: ERROR_MESSAGES.NETWORK_ERROR,
      statusCode: null,
    };
  }

  const { status, data } = error.response;

  // Extract error code and message from backend response
  const errorCode = data?.code || data?.errorCode || data?.error?.code;
  const backendMessage = data?.message || data?.error?.message;

  // Get user-friendly message
  const userMessage = getErrorMessage(errorCode, backendMessage);

  return {
    code: errorCode || `HTTP_${status}`,
    message: userMessage,
    statusCode: status,
    details: data?.details,
  };
}

/**
 * Check if error requires re-authentication
 * @param {Object} errorInfo - Parsed error information
 * @returns {boolean} True if user should be redirected to login
 */
export function requiresReAuth(errorInfo) {
  return (
    errorInfo.statusCode === 401 ||
    errorInfo.code === 'TOKEN_EXPIRED' ||
    errorInfo.code === 'UNAUTHORIZED'
  );
}

/**
 * Check if error is a validation error
 * @param {Object} errorInfo - Parsed error information
 * @returns {boolean} True if error is a validation error
 */
export function isValidationError(errorInfo) {
  return (
    errorInfo.statusCode === 400 ||
    errorInfo.code?.includes('VALIDATION') ||
    errorInfo.code?.includes('INVALID')
  );
}

export default ERROR_MESSAGES;
