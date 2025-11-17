/**
 * BFF API Endpoints
 * Centralized endpoint definitions for all BFF routes
 * All requests from web UI go through the BFF (Backend for Frontend)
 */
import { BFF_BASE_URL } from './bffClient';

export const API_ENDPOINTS = {
  // Health Check
  HEALTH: `${BFF_BASE_URL}/health`,

  // Home Page
  HOME: {
    TRENDING: `${BFF_BASE_URL}/api/home/trending`,
    TRENDING_CATEGORIES: `${BFF_BASE_URL}/api/home/trending-categories`,
    CATEGORIES: `${BFF_BASE_URL}/api/home/categories`,
  },

  // Storefront
  STOREFRONT: {
    HOME: `${BFF_BASE_URL}/api/storefront/home`,
    CATEGORIES: `${BFF_BASE_URL}/api/storefront/categories`,
  },

  // Products
  PRODUCTS: {
    LIST: `${BFF_BASE_URL}/api/products`,
    DETAIL: id => `${BFF_BASE_URL}/api/products/${id}`,
    SEARCH: `${BFF_BASE_URL}/api/products/search`,
    CATEGORIES: `${BFF_BASE_URL}/api/products/categories`,
    BY_CATEGORY: category =>
      `${BFF_BASE_URL}/api/products?category=${category}`,
  },

  // Authentication (proxied through BFF)
  AUTH: {
    LOGIN: `${BFF_BASE_URL}/api/auth/login`,
    REGISTER: `${BFF_BASE_URL}/api/auth/register`,
    LOGOUT: `${BFF_BASE_URL}/api/auth/logout`,
    REFRESH: `${BFF_BASE_URL}/api/auth/refresh`,
    ME: `${BFF_BASE_URL}/api/auth/me`,
    FORGOT_PASSWORD: `${BFF_BASE_URL}/api/auth/password/forgot`,
    RESET_PASSWORD: `${BFF_BASE_URL}/api/auth/password/reset`,
    CHANGE_PASSWORD: `${BFF_BASE_URL}/api/auth/password/change`,
    VERIFY_EMAIL: `${BFF_BASE_URL}/api/auth/email/verify`,
    RESEND_VERIFICATION: `${BFF_BASE_URL}/api/auth/email/resend`,
  },

  // User Profile
  USER: {
    PROFILE: `${BFF_BASE_URL}/api/user/profile`,
    UPDATE_PROFILE: `${BFF_BASE_URL}/api/user/profile`,
    DELETE_ACCOUNT: `${BFF_BASE_URL}/api/user/profile`,

    // Addresses
    ADDRESSES: `${BFF_BASE_URL}/api/user/addresses`,
    ADDRESS_DETAIL: id => `${BFF_BASE_URL}/api/user/addresses/${id}`,
    SET_DEFAULT_ADDRESS: id =>
      `${BFF_BASE_URL}/api/user/addresses/${id}/default`,

    // Payment Methods
    PAYMENT_METHODS: `${BFF_BASE_URL}/api/user/payment-methods`,
    PAYMENT_METHOD_DETAIL: id =>
      `${BFF_BASE_URL}/api/user/payment-methods/${id}`,
    SET_DEFAULT_PAYMENT: id =>
      `${BFF_BASE_URL}/api/user/payment-methods/${id}/default`,

    // Wishlist
    WISHLIST: `${BFF_BASE_URL}/api/user/wishlist`,
    WISHLIST_ITEM: id => `${BFF_BASE_URL}/api/user/wishlist/${id}`,
  },

  // Cart
  CART: {
    GET: `${BFF_BASE_URL}/api/cart`,
    ADD_ITEM: `${BFF_BASE_URL}/api/cart/items`,
    UPDATE_ITEM: id => `${BFF_BASE_URL}/api/cart/items/${id}`,
    REMOVE_ITEM: id => `${BFF_BASE_URL}/api/cart/items/${id}`,
    CLEAR: `${BFF_BASE_URL}/api/cart/clear`,
  },

  // Orders
  ORDERS: {
    LIST: `${BFF_BASE_URL}/api/orders`,
    DETAIL: id => `${BFF_BASE_URL}/api/orders/${id}`,
    CREATE: `${BFF_BASE_URL}/api/orders`,
    CANCEL: id => `${BFF_BASE_URL}/api/orders/${id}/cancel`,
  },

  // Reviews
  REVIEWS: {
    BY_PRODUCT: productId =>
      `${BFF_BASE_URL}/api/reviews/products/${productId}`,
    CREATE: `${BFF_BASE_URL}/api/reviews`,
    UPDATE: id => `${BFF_BASE_URL}/api/reviews/${id}`,
    DELETE: id => `${BFF_BASE_URL}/api/reviews/${id}`,
  },
};
