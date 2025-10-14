/**
 * useAuth Hook
 * Custom hook for authentication with React Query + Zustand
 * Updated for React Query v5 best practices
 * Now uses BFF client for all auth operations
 */
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import bffClient from '../api/bffClient';
import { useAuthStore } from '../store/authStore';
import { setToken, getRefreshToken } from '../utils/storage';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser, clearUser } = useAuthStore();

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async userData => {
      const response = await bffClient.post('/api/auth/register', userData);
      return response.data;
    },
    onSuccess: data => {
      if (data.user) {
        // Backend returns { jwt, user } - map to expected format
        const accessToken = data.jwt || data.accessToken;
        const refreshToken = data.refreshToken; // May be undefined if using cookies

        if (accessToken) {
          setToken(accessToken, refreshToken);
        }
        setUser(data.user);
      }
    },
    onError: error => {
      console.error('Registration failed:', error);
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await bffClient.post('/api/auth/login', {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: data => {
      // Backend returns { jwt, user } - map to expected format
      const accessToken = data.jwt || data.accessToken;
      const refreshToken = data.refreshToken; // May be undefined if using cookies

      if (accessToken) {
        setToken(accessToken, refreshToken);
      }
      setUser(data.user);

      // Don't invalidate - we already have fresh user data from login
      // queryClient.invalidateQueries(['currentUser']);
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await bffClient.post('/api/auth/logout', {
        refreshToken: getRefreshToken(),
      });
      return response.data;
    },
    onSuccess: () => {
      clearUser();
      queryClient.clear(); // Clear all cached queries
      navigate('/login');
    },
    onError: error => {
      // Even if API fails, clear local state
      console.error('Logout error:', error);
      clearUser();
      queryClient.clear();
      navigate('/login');
    },
  });

  // Get current user query
  // Only enable if authenticated AND we don't already have user data
  // This prevents unnecessary refetch after login/register
  const {
    data: currentUserData,
    isLoading: isLoadingUser,
    error: currentUserError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await bffClient.get('/api/auth/me');
      return response.data;
    },
    enabled: isAuthenticated && !user, // Only fetch if authenticated but no user data
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 1, // Only retry once on failure
  });

  // Handle currentUser data changes (React Query v5 pattern)
  React.useEffect(() => {
    if (currentUserData?.user) {
      setUser(currentUserData.user);
    }
  }, [currentUserData, setUser]);

  // Handle currentUser error (React Query v5 pattern)
  React.useEffect(() => {
    if (currentUserError) {
      console.error('Failed to fetch current user:', currentUserError);
      // If fetching user fails, might be invalid token
      if (
        currentUserError.statusCode === 401 ||
        currentUserError.response?.status === 401
      ) {
        clearUser();
        navigate('/login');
      }
    }
  }, [currentUserError, clearUser, navigate]);

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: async email => {
      const response = await bffClient.post('/api/auth/password/forgot', {
        email,
      });
      return response.data;
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async ({ token, password }) => {
      const response = await bffClient.post('/api/auth/password/reset', {
        token,
        password,
      });
      return response.data;
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const response = await bffClient.post('/api/auth/password/change', {
        currentPassword,
        newPassword,
      });
      return response.data;
    },
  });

  // Verify email mutation
  const verifyEmailMutation = useMutation({
    mutationFn: async token => {
      const response = await bffClient.get(
        `/api/auth/email/verify?token=${token}`
      );
      return response.data;
    },
  });

  // Resend verification email mutation
  const resendVerificationMutation = useMutation({
    mutationFn: async email => {
      const response = await bffClient.post('/api/auth/email/resend', {
        email,
      });
      return response.data;
    },
  });

  return {
    // State
    user,
    isAuthenticated,
    isLoading:
      registerMutation.isPending ||
      loginMutation.isPending ||
      logoutMutation.isPending ||
      isLoadingUser,

    // Register
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    registerSuccess: registerMutation.isSuccess,

    // Login
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    loginSuccess: loginMutation.isSuccess,

    // Logout
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,

    // User profile
    refetchUser,
    isLoadingUser,

    // Password operations
    forgotPassword: forgotPasswordMutation.mutate,
    forgotPasswordAsync: forgotPasswordMutation.mutateAsync,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
    forgotPasswordError: forgotPasswordMutation.error,
    forgotPasswordSuccess: forgotPasswordMutation.isSuccess,

    resetPassword: resetPasswordMutation.mutate,
    resetPasswordAsync: resetPasswordMutation.mutateAsync,
    isResetPasswordLoading: resetPasswordMutation.isPending,
    resetPasswordError: resetPasswordMutation.error,
    resetPasswordSuccess: resetPasswordMutation.isSuccess,

    changePassword: changePasswordMutation.mutate,
    changePasswordAsync: changePasswordMutation.mutateAsync,
    isChangePasswordLoading: changePasswordMutation.isPending,
    changePasswordError: changePasswordMutation.error,
    changePasswordSuccess: changePasswordMutation.isSuccess,

    // Email verification
    verifyEmail: verifyEmailMutation.mutate,
    verifyEmailAsync: verifyEmailMutation.mutateAsync,
    isVerifyingEmail: verifyEmailMutation.isPending,
    verifyEmailError: verifyEmailMutation.error,
    verifyEmailSuccess: verifyEmailMutation.isSuccess,

    resendVerification: resendVerificationMutation.mutate,
    resendVerificationAsync: resendVerificationMutation.mutateAsync,
    isResendingVerification: resendVerificationMutation.isPending,
    resendVerificationError: resendVerificationMutation.error,
    resendVerificationSuccess: resendVerificationMutation.isSuccess,
  };
};
