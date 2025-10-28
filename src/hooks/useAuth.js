import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import bffClient from '../api/bffClient';
import { useAuthStore } from '../store/authStore';
import { setToken, getRefreshToken } from '../utils/storage';
import { transferCartAsync } from '../store/slices/cartSlice';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, setUser, clearUser } = useAuthStore();

  // ============================================
  // QUERIES
  // ============================================

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

  // ============================================
  // MUTATIONS - Authentication
  // ============================================

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async userData => {
      const response = await bffClient.post('/api/auth/register', userData);
      return response.data;
    },
    onSuccess: async data => {
      // DO NOT automatically log in user after registration
      // User must verify email before they can log in
      console.log('Registration successful:', data);

      // Note: We intentionally do NOT call setToken() or setUser() here
      // This ensures the user must verify their email and log in manually
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
    onSuccess: async data => {
      // Backend returns { jwt, user } - map to expected format
      const accessToken = data.jwt || data.accessToken;
      const refreshToken = data.refreshToken; // May be undefined if using cookies

      if (accessToken) {
        setToken(accessToken, refreshToken);
      }
      setUser(data.user);

      // Transfer guest cart to user account if exists
      try {
        const guestId = localStorage.getItem('guestId');
        if (guestId) {
          console.log('Transferring guest cart to user account...');
          await dispatch(transferCartAsync()).unwrap();
          console.log('Cart transfer completed successfully');
        }
      } catch (error) {
        console.error('Cart transfer failed:', error);
        // Don't fail login if cart transfer fails
      }

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

  // ============================================
  // MUTATIONS - Password Management
  // ============================================

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

  // ============================================
  // MUTATIONS - Email Verification
  // ============================================

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

  // ============================================
  // SIDE EFFECTS
  // ============================================

  // Handle currentUser data changes (React Query v5 pattern)
  useEffect(() => {
    if (currentUserData?.user) {
      setUser(currentUserData.user);
    }
  }, [currentUserData, setUser]);

  // Handle currentUser error (React Query v5 pattern)
  useEffect(() => {
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

  // ============================================
  // RETURN API
  // ============================================

  return {
    // State
    user,
    isAuthenticated,
    isLoading:
      registerMutation.isPending ||
      loginMutation.isPending ||
      logoutMutation.isPending ||
      isLoadingUser,

    // Register (async/await pattern)
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,

    // Login (async/await pattern)
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,

    // Logout (async/await pattern)
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    // User profile
    refetchUser,
    isLoadingUser,

    // Password operations (async/await pattern)
    forgotPasswordAsync: forgotPasswordMutation.mutateAsync,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,

    resetPasswordAsync: resetPasswordMutation.mutateAsync,
    isResetPasswordLoading: resetPasswordMutation.isPending,

    changePasswordAsync: changePasswordMutation.mutateAsync,
    isChangePasswordLoading: changePasswordMutation.isPending,

    // Email verification (async/await pattern)
    verifyEmailAsync: verifyEmailMutation.mutateAsync,
    isVerifyingEmail: verifyEmailMutation.isPending,

    resendVerificationAsync: resendVerificationMutation.mutateAsync,
    isResendingVerification: resendVerificationMutation.isPending,
  };
};
