/**
 * Authentication API
 * Centralized auth-related API calls
 */
import apiClient from './client';

export const authAPI = {
  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise}
   */
  register: async userData => {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  },

  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {Promise}
   */
  login: async (email, password) => {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Logout user
   * @param {string} refreshToken
   * @returns {Promise}
   */
  logout: async refreshToken => {
    const response = await apiClient.post('/api/auth/logout', {
      refreshToken,
    });
    return response.data;
  },

  /**
   * Refresh access token
   * @param {string} refreshToken
   * @returns {Promise}
   */
  refreshToken: async refreshToken => {
    const response = await apiClient.post('/api/auth/token/refresh', {
      refreshToken,
    });
    return response.data;
  },

  /**
   * Get current user profile
   * @returns {Promise}
   */
  getCurrentUser: async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  /**
   * Verify email with token
   * @param {string} token
   * @returns {Promise}
   */
  verifyEmail: async token => {
    const response = await apiClient.get('/api/auth/email/verify', {
      params: { token },
    });
    return response.data;
  },

  /**
   * Resend verification email
   * @param {string} email
   * @returns {Promise}
   */
  resendVerificationEmail: async email => {
    const response = await apiClient.post('/api/auth/email/resend', {
      email,
    });
    return response.data;
  },

  /**
   * Request password reset
   * @param {string} email
   * @returns {Promise}
   */
  forgotPassword: async email => {
    const response = await apiClient.post('/api/auth/password/forgot', {
      email,
    });
    return response.data;
  },

  /**
   * Reset password with token
   * @param {string} token
   * @param {string} password
   * @returns {Promise}
   */
  resetPassword: async (token, password) => {
    const response = await apiClient.post('/api/auth/password/reset', {
      token,
      password,
    });
    return response.data;
  },

  /**
   * Change password for logged-in user
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {Promise}
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await apiClient.post('/api/auth/password/change', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};
