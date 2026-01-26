/**
 * BFF (Backend for Frontend) API Client
 * Single HTTP client for all backend communication through BFF
 */
import axios from 'axios';
import { getToken, setToken, clearAuth } from '../utils/storage';

// BFF Configuration
// In production, use relative URL (nginx proxies /api to web-bff)
// In development, use REACT_APP_BFF_URL or localhost
export const BFF_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '' // Empty string = relative URL, nginx handles proxying
    : process.env.REACT_APP_BFF_URL || 'http://localhost:3100';
const BFF_TIMEOUT = 10000; // 10 seconds

const bffClient = axios.create({
  baseURL: BFF_BASE_URL,
  timeout: BFF_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token and correlation ID
bffClient.interceptors.request.use(
  config => {
    // Add auth token
    const token = getToken();
    console.log('🔑 bffClient interceptor:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'none',
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add correlation ID for request tracing
    const correlationId = `customer-ui-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    config.headers['x-correlation-id'] = correlationId;

    // Log in development
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('📤 BFF Request:', {
    //     method: config.method?.toUpperCase(),
    //     url: config.url,
    //     fullURL: `${config.baseURL}${config.url}`,
    //     correlationId,
    //     hasToken: !!token,
    //   });
    // }

    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token refresh
bffClient.interceptors.response.use(
  response => {
    // Log successful response in development
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('✅ BFF Response:', {
    //     status: response.status,
    //     url: response.config.url,
    //     correlationId: response.headers['x-correlation-id'],
    //   });
    // }
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // Network error - BFF is down or unreachable
    if (!error.response) {
      console.error('❌ Network Error:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
      });

      const enhancedError = new Error(
        'Unable to connect to the server. Please check your internet connection or try again later.'
      );
      enhancedError.isNetworkError = true;
      enhancedError.code = error.code;
      enhancedError.originalError = error;
      throw enhancedError;
    }

    // Handle 401 Unauthorized - Token refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      console.warn('⚠️ 401 Unauthorized:', {
        url: originalRequest.url,
        hasRefreshToken: !!localStorage.getItem('refreshToken'),
      });

      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          console.error('❌ No refresh token available, clearing auth');
          clearAuth();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        console.log('🔄 Attempting token refresh...');

        // Refresh token through BFF
        const response = await axios.post(`${BFF_BASE_URL}/api/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        console.log('✅ Token refreshed successfully');

        // Store new tokens
        setToken(accessToken, newRefreshToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return bffClient(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Enhance error with backend message
    const backendError = new Error(
      error.response.data?.error?.message ||
        error.response.data?.message ||
        error.response.statusText ||
        'An error occurred'
    );
    backendError.statusCode = error.response.status;
    backendError.response = error.response;
    backendError.correlationId = error.response.headers['x-correlation-id'];

    console.error('❌ BFF Error:', {
      message: backendError.message,
      statusCode: backendError.statusCode,
      correlationId: backendError.correlationId,
    });

    return Promise.reject(backendError);
  }
);

export default bffClient;
