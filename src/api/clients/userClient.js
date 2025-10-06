/**
 * User Service API Client
 * Handles user profile, addresses, payment methods, wishlist
 * Service Port: 3002
 */
import axios from 'axios';
import { getToken, clearAuth } from '../../utils/storage';

const userClient = axios.create({
  baseURL: process.env.REACT_APP_USER_API_URL || 'http://localhost:3002',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
userClient.interceptors.request.use(
  config => {
    const token = getToken();

    if (process.env.NODE_ENV === 'development') {
      console.log('📤 [USER] Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        fullURL: `${config.baseURL}${config.url}`,
        hasToken: !!token,
        tokenPreview: token ? `${token.substring(0, 20)}...` : 'NONE',
      });
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('⚠️ [USER] No token found in localStorage!');
    }
    return config;
  },
  error => {
    console.error('❌ [USER] Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
userClient.interceptors.response.use(
  response => {
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ [USER] Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  error => {
    if (!error.response) {
      console.error('❌ [USER] Network Error:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        fullURL: `${error.config?.baseURL}${error.config?.url}`,
      });

      const enhancedError = new Error(
        'Unable to connect to user service. Please ensure the user-service is running on port 3002.'
      );
      enhancedError.isNetworkError = true;
      enhancedError.code = error.code;
      enhancedError.originalError = error;
      throw enhancedError;
    }

    // Handle 401 - Token expired or invalid
    if (error.response.status === 401) {
      console.log('🔒 [USER] Unauthorized - redirecting to login');
      clearAuth();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Enhance error with backend message
    const backendError = new Error(
      error.response.data?.message ||
        error.response.statusText ||
        'An error occurred'
    );
    backendError.statusCode = error.response.status;
    backendError.response = error.response;
    backendError.originalError = error;

    return Promise.reject(backendError);
  }
);

// ============================================================================
// API Methods - Profile
// ============================================================================

/**
 * Get current user's full profile
 * Backend extracts user ID from JWT automatically
 * @returns {Promise}
 */
export const getProfile = async () => {
  const response = await userClient.get('/api/users');
  return response.data;
};

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 * @returns {Promise}
 */
export const updateProfile = async profileData => {
  const response = await userClient.patch('/api/users', profileData);
  return response.data;
};

/**
 * Delete user account
 * @returns {Promise}
 */
export const deleteAccount = async () => {
  const response = await userClient.delete('/api/users');
  return response.data;
};

// ============================================================================
// API Methods - Addresses
// ============================================================================

/**
 * Get all addresses
 * @returns {Promise}
 */
export const getAddresses = async () => {
  const response = await userClient.get('/api/users/addresses');
  return response.data.addresses || [];
};

/**
 * Create new address
 * @param {Object} addressData - Address data
 * @returns {Promise}
 */
export const createAddress = async addressData => {
  const response = await userClient.post('/api/users/addresses', addressData);
  return response.data;
};

/**
 * Update address
 * @param {string} addressId - Address ID
 * @param {Object} addressData - Address data to update
 * @returns {Promise}
 */
export const updateAddress = async (addressId, addressData) => {
  const response = await userClient.patch(
    `/api/users/addresses/${addressId}`,
    addressData
  );
  return response.data;
};

/**
 * Delete address
 * @param {string} addressId - Address ID
 * @returns {Promise}
 */
export const deleteAddress = async addressId => {
  const response = await userClient.delete(`/api/users/addresses/${addressId}`);
  return response.data;
};

/**
 * Set address as default
 * @param {string} addressId - Address ID
 * @returns {Promise}
 */
export const setDefaultAddress = async addressId => {
  const response = await userClient.patch(
    `/api/users/addresses/${addressId}/default`
  );
  return response.data;
};

// ============================================================================
// API Methods - Payment Methods
// ============================================================================

/**
 * Get all payment methods
 * @returns {Promise}
 */
export const getPaymentMethods = async () => {
  const response = await userClient.get('/api/users/paymentmethods');
  return response.data.paymentMethods || [];
};

/**
 * Add new payment method
 * @param {Object} paymentData - Payment method data
 * @returns {Promise}
 */
export const createPaymentMethod = async paymentData => {
  const response = await userClient.post(
    '/api/users/paymentmethods',
    paymentData
  );
  return response.data;
};

/**
 * Update payment method
 * @param {string} paymentId - Payment method ID
 * @param {Object} paymentData - Payment data to update
 * @returns {Promise}
 */
export const updatePaymentMethod = async (paymentId, paymentData) => {
  const response = await userClient.patch(
    `/api/users/paymentmethods/${paymentId}`,
    paymentData
  );
  return response.data;
};

/**
 * Delete payment method
 * @param {string} paymentId - Payment method ID
 * @returns {Promise}
 */
export const deletePaymentMethod = async paymentId => {
  const response = await userClient.delete(
    `/api/users/paymentmethods/${paymentId}`
  );
  return response.data;
};

/**
 * Set payment method as default
 * @param {string} paymentId - Payment method ID
 * @returns {Promise}
 */
export const setDefaultPaymentMethod = async paymentId => {
  const response = await userClient.patch(
    `/api/users/paymentmethods/${paymentId}/default`
  );
  return response.data;
};

// ============================================================================
// API Methods - Wishlist
// ============================================================================

/**
 * Get wishlist items
 * @returns {Promise}
 */
export const getWishlist = async () => {
  const response = await userClient.get('/api/users/wishlist');
  return response.data;
};

/**
 * Add item to wishlist
 * @param {string} productId - Product ID
 * @returns {Promise}
 */
export const addToWishlist = async productId => {
  const response = await userClient.post('/api/users/wishlist', { productId });
  return response.data;
};

/**
 * Remove item from wishlist
 * @param {string} wishlistId - Wishlist item ID
 * @returns {Promise}
 */
export const removeFromWishlist = async wishlistId => {
  const response = await userClient.delete(`/api/users/wishlist/${wishlistId}`);
  return response.data;
};

// Export as named object for backwards compatibility
export const userAPI = {
  getProfile,
  updateProfile,
  deleteAccount,
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default userClient;
