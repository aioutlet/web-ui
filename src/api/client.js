/**
 * Centralized Axios Client
 * Single source of truth for all HTTP requests
 */
import axios from 'axios';
import { getToken, setToken, clearAuth } from '../utils/storage';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to requests
apiClient.interceptors.request.use(
  config => {
    // Log request details for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('📤 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
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
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token refresh
apiClient.interceptors.response.use(
  response => {
    // Log successful response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        method: response.config.method?.toUpperCase(),
        data: response.data,
      });
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // Log error details for debugging
    console.error('❌ Response Interceptor Error:', {
      hasResponse: !!error.response,
      hasConfig: !!error.config,
      message: error.message,
      code: error.code,
      response: error.response
        ? {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
          }
        : null,
    });

    // Network error - request didn't reach the server OR no response received
    if (!error.response) {
      console.error('❌ Network Error Details:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL + error.config?.url,
        errorType:
          error.code === 'ECONNABORTED'
            ? 'Timeout'
            : error.code === 'ERR_NETWORK'
              ? 'Network failure'
              : error.code === 'ECONNREFUSED'
                ? 'Connection refused'
                : 'Unknown',
      });

      // Throw user-friendly error
      const enhancedError = new Error(
        'Unable to connect to the server. Please check your internet connection.'
      );
      enhancedError.isNetworkError = true;
      enhancedError.code = error.code;
      enhancedError.originalError = error;
      throw enhancedError;
    }

    // API error - server responded with error status
    console.error('❌ API Error Response:', {
      status: error.response.status,
      statusText: error.response.statusText,
      url: error.config.url,
      method: error.config.method,
      data: error.response.data,
    });

    // Handle 401 Unauthorized - Token refresh logic
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          // No refresh token, clear auth and redirect
          clearAuth();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        console.log('🔄 Attempting token refresh...');

        // Try to refresh the token (direct axios call to avoid interceptor loop)
        const response = await axios.post(
          `${apiClient.defaults.baseURL}/api/auth/refresh`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        console.log('✅ Token refreshed successfully');

        // Store new tokens
        setToken(accessToken, newRefreshToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // For other error status codes, enhance the error with backend message
    if (error.response?.data) {
      // Create enhanced error with backend data
      const backendError = new Error(
        error.response.data.message ||
          error.response.statusText ||
          'An error occurred'
      );
      backendError.statusCode = error.response.status;
      backendError.validationErrors = error.response.data.validationErrors;
      backendError.response = error.response;
      backendError.originalError = error;

      console.error('❌ Throwing enhanced error:', {
        message: backendError.message,
        statusCode: backendError.statusCode,
        validationErrors: backendError.validationErrors,
      });

      return Promise.reject(backendError);
    }

    // Return original error if no enhancement possible
    return Promise.reject(error);
  }
);

export default apiClient;
