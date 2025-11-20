/**
 * BFF API Endpoints
 * Centralized endpoint definitions for all BFF routes
 * All requests from web UI go through the BFF (Backend for Frontend)
 * Note: Base URL is already set in bffClient, so paths here are relative
 */

export const API_ENDPOINTS = {
  // Health Check
  HEALTH: '/health',

  // Home Page
  HOME: {
    TRENDING: '/api/home/trending',
    TRENDING_CATEGORIES: '/api/home/trending-categories',
    CATEGORIES: '/api/home/categories',
  },

  // Storefront
  STOREFRONT: {
    HOME: '/api/storefront/home',
    CATEGORIES: '/api/storefront/categories',
  },

  // Products
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: id => `/api/products/${id}`,
    SEARCH: '/api/products/search',
    CATEGORIES: '/api/products/categories',
    BY_CATEGORY: category => `/api/products?category=${category}`,
  },

  // Authentication (proxied through BFF)
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
    FORGOT_PASSWORD: '/api/auth/password/forgot',
    RESET_PASSWORD: '/api/auth/password/reset',
    CHANGE_PASSWORD: '/api/auth/password/change',
    VERIFY_EMAIL: '/api/auth/email/verify',
    RESEND_VERIFICATION: '/api/auth/email/resend',
  },

  // User Profile
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
    DELETE_ACCOUNT: '/api/user/profile',

    // Addresses
    ADDRESSES: '/api/user/addresses',
    ADDRESS_DETAIL: id => `/api/user/addresses/${id}`,
    SET_DEFAULT_ADDRESS: id => `/api/user/addresses/${id}/default`,

    // Payment Methods
    PAYMENT_METHODS: '/api/user/payment-methods',
    PAYMENT_METHOD_DETAIL: id => `/api/user/payment-methods/${id}`,
    SET_DEFAULT_PAYMENT: id => `/api/user/payment-methods/${id}/default`,

    // Wishlist
    WISHLIST: '/api/user/wishlist',
    WISHLIST_ITEM: id => `/api/user/wishlist/${id}`,
  },

  // Cart
  CART: {
    GET: '/api/cart',
    ADD_ITEM: '/api/cart/items',
    UPDATE_ITEM: id => `/api/cart/items/${id}`,
    REMOVE_ITEM: id => `/api/cart/items/${id}`,
    CLEAR: '/api/cart/clear',
  },

  // Orders
  ORDERS: {
    LIST: '/api/orders',
    DETAIL: id => `/api/orders/${id}`,
    CREATE: '/api/orders',
    CANCEL: id => `/api/orders/${id}/cancel`,
  },

  // Reviews
  REVIEWS: {
    BY_PRODUCT: productId => `/api/reviews/products/${productId}`,
    CREATE: '/api/reviews',
    UPDATE: id => `/api/reviews/${id}`,
    DELETE: id => `/api/reviews/${id}`,
  },

  // Inventory
  INVENTORY: {
    BATCH: '/api/inventory/batch',
  },
};
