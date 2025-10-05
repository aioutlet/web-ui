import axiosInstance from '../utils/axiosConfig';

const authService = {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - User data and tokens
   */
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      const { user, accessToken, refreshToken } = response.data;

      // Store tokens and user data
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return response.data;
    } catch (error) {
      // Check if it's a network error (no response from server)
      if (!error.response) {
        console.error('🚨 Network Error - Login:', {
          message: error.message,
          code: error.code,
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          timeout: error.config?.timeout,
          isNetworkError: true,
          errorType:
            error.code === 'ECONNABORTED'
              ? 'Timeout'
              : error.code === 'ERR_NETWORK'
                ? 'Network failure'
                : error.code === 'ECONNREFUSED'
                  ? 'Connection refused'
                  : 'Unknown',
        });

        const enhancedError = new Error(
          'Unable to connect to the server. Please check your internet connection or try again later.'
        );
        enhancedError.isNetworkError = true;
        enhancedError.originalError = error.code;
        throw enhancedError;
      }

      // Extract detailed error information from API response
      const errorData = error.response.data || {};
      const errorMessage = errorData.error || error.message || 'Login failed';

      // Create enhanced error object
      const enhancedError = new Error(errorMessage);
      enhancedError.validationErrors = errorData.validationErrors;
      enhancedError.statusCode = error.response.status;
      enhancedError.details = errorData.details;

      // Log detailed error in development
      if (process.env.NODE_ENV === 'development') {
        console.error('🚨 Login API Error:', {
          message: errorMessage,
          validationErrors: errorData.validationErrors,
          statusCode: error.response.status,
          details: errorData.details,
          url: error.config?.url,
        });
      }

      throw enhancedError;
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - User data and tokens
   */
  register: async userData => {
    try {
      const response = await axiosInstance.post('/api/auth/register', userData);

      const { user, accessToken, refreshToken } = response.data;

      // Store tokens and user data if provided (some systems send verification email first)
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return response.data;
    } catch (error) {
      // Check if it's a network error (no response from server)
      if (!error.response) {
        console.error('🚨 Network Error - Registration:', {
          message: error.message,
          code: error.code,
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          timeout: error.config?.timeout,
          isNetworkError: true,
          errorType:
            error.code === 'ECONNABORTED'
              ? 'Timeout'
              : error.code === 'ERR_NETWORK'
                ? 'Network failure'
                : error.code === 'ECONNREFUSED'
                  ? 'Connection refused'
                  : 'Unknown',
        });

        const enhancedError = new Error(
          'Unable to connect to the server. Please check your internet connection or try again later.'
        );
        enhancedError.isNetworkError = true;
        enhancedError.originalError = error.code;
        throw enhancedError;
      }

      // Extract detailed error information from API response
      const errorData = error.response.data || {};
      const errorMessage =
        errorData.error || error.message || 'Registration failed';

      // Create enhanced error object
      const enhancedError = new Error(errorMessage);
      enhancedError.validationErrors = errorData.validationErrors;
      enhancedError.statusCode = error.response.status;
      enhancedError.details = errorData.details;

      // Log detailed error in development
      if (process.env.NODE_ENV === 'development') {
        console.error('🚨 Registration API Error:', {
          message: errorMessage,
          validationErrors: errorData.validationErrors,
          statusCode: error.response.status,
          details: errorData.details,
          url: error.config?.url,
        });
      }

      throw enhancedError;
    }
  },

  /**
   * Logout user
   * @returns {Promise}
   */
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      // Call logout endpoint if refresh token exists
      if (refreshToken) {
        await axiosInstance.post('/api/auth/logout', { refreshToken });
      }
    } catch (error) {
      // Even if API call fails, we still want to clear local storage
      console.error('Logout error:', error);
    } finally {
      // Clear all auth data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  /**
   * Refresh access token
   * @returns {Promise} - New tokens
   */
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axiosInstance.post('/api/auth/token/refresh', {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Update stored tokens
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }

      return response.data;
    } catch (error) {
      // If refresh fails, clear everything
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get current user profile
   * @returns {Promise} - User data
   */
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/api/auth/me');

      // Update stored user data
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Verify email with token
   * @param {string} token - Verification token
   * @returns {Promise}
   */
  verifyEmail: async token => {
    try {
      const response = await axiosInstance.get('/api/auth/email/verify', {
        params: { token },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Resend verification email
   * @param {string} email - User email
   * @returns {Promise}
   */
  resendVerificationEmail: async email => {
    try {
      const response = await axiosInstance.post('/api/auth/email/resend', {
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise}
   */
  forgotPassword: async email => {
    try {
      const response = await axiosInstance.post('/api/auth/password/forgot', {
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} password - New password
   * @returns {Promise}
   */
  resetPassword: async (token, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/password/reset', {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Change password for logged-in user
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise}
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await axiosInstance.post('/api/auth/password/change', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  /**
   * Get stored user data
   * @returns {Object|null}
   */
  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Get access token
   * @returns {string|null}
   */
  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },
};

export default authService;
