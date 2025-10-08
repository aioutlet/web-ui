/**
 * Auth Service API Client
 * Handles authentication-related requests
 * Service Port: 3001
 */
import axios from 'axios';
import { getToken, clearAuth } from '../../utils/storage';

const authClient = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_URL || 'http://localhost:3001',
  timeout: 0, // No timeout for debugging
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
authClient.interceptors.request.use(
  config => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📤 [AUTH] Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        fullURL: `${config.baseURL}${config.url}`,
      });
    }

    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('❌ [AUTH] Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
authClient.interceptors.response.use(
  response => {
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ [AUTH] Response:', {
        status: response.status,
        url: response.config.url,
      });
    }
    return response;
  },
  async error => {
    if (!error.response) {
      console.error('❌ [AUTH] Network Error:', error.message);
      const enhancedError = new Error(
        'Unable to connect to authentication service.'
      );
      enhancedError.isNetworkError = true;
      enhancedError.originalError = error;
      throw enhancedError;
    }

    // Handle 401 for auth service (logout, no retry)
    if (error.response.status === 401) {
      console.log('🔒 [AUTH] Authentication failed');
      clearAuth();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// ============================================================================
// API Methods
// ============================================================================

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Promise}
 */
export const register = async userData => {
  const response = await authClient.post('/api/auth/register', userData);
  return response.data;
};

/**
 * Login user
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export const login = async (email, password) => {
  const response = await authClient.post('/api/auth/login', {
    email,
    password,
  });
  return response.data;
};

/**
 * Logout user
 * @param {string} refreshToken
 * @returns {Promise}
 */
export const logout = async refreshToken => {
  const response = await authClient.post('/api/auth/logout', {
    refreshToken,
  });
  return response.data;
};

/**
 * Refresh access token
 * @param {string} refreshToken
 * @returns {Promise}
 */
export const refreshToken = async refreshToken => {
  const response = await authClient.post('/api/auth/token/refresh', {
    refreshToken,
  });
  return response.data;
};

/**
 * Get current user profile
 * @returns {Promise}
 */
export const getCurrentUser = async () => {
  const response = await authClient.get('/api/auth/me');
  return response.data;
};

/**
 * Verify email with token
 * @param {string} token
 * @returns {Promise}
 */
export const verifyEmail = async token => {
  const response = await authClient.get('/api/auth/email/verify', {
    params: { token },
  });
  return response.data;
};

/**
 * Resend verification email
 * @param {string} email
 * @returns {Promise}
 */
export const resendVerificationEmail = async email => {
  const response = await authClient.post('/api/auth/email/resend', {
    email,
  });
  return response.data;
};

/**
 * Request password reset
 * @param {string} email
 * @returns {Promise}
 */
export const forgotPassword = async email => {
  const response = await authClient.post('/api/auth/password/forgot', {
    email,
  });
  return response.data;
};

/**
 * Reset password with token
 * @param {string} token
 * @param {string} password
 * @returns {Promise}
 */
export const resetPassword = async (token, password) => {
  const response = await authClient.post('/api/auth/password/reset', {
    token,
    password,
  });
  return response.data;
};

/**
 * Change password for logged-in user
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {Promise}
 */
export const changePassword = async (currentPassword, newPassword) => {
  const response = await authClient.post('/api/auth/password/change', {
    currentPassword,
    newPassword,
  });
  return response.data;
};

// Export as named object for backwards compatibility
export const authAPI = {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  changePassword,
};

export default authClient;
