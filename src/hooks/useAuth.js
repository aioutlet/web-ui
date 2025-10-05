/**
 * useAuth Hook
 * Custom hook for authentication with React Query + Zustand
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { setToken, getRefreshToken } from '../utils/storage';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser, clearUser } = useAuthStore();

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authAPI.register,
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
    mutationFn: ({ email, password }) => authAPI.login(email, password),
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
    mutationFn: () => authAPI.logout(getRefreshToken()),
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
  const { isLoading: isLoadingUser, refetch: refetchUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authAPI.getCurrentUser,
    enabled: isAuthenticated && !user, // Only fetch if authenticated but no user data
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    onSuccess: data => {
      if (data.user) {
        setUser(data.user);
      }
    },
    onError: error => {
      console.error('Failed to fetch current user:', error);
      // If fetching user fails, might be invalid token
      if (error.statusCode === 401 || error.response?.status === 401) {
        clearUser();
        navigate('/login');
      }
    },
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: authAPI.forgotPassword,
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }) => authAPI.resetPassword(token, password),
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }) =>
      authAPI.changePassword(currentPassword, newPassword),
  });

  // Verify email mutation
  const verifyEmailMutation = useMutation({
    mutationFn: authAPI.verifyEmail,
  });

  // Resend verification email mutation
  const resendVerificationMutation = useMutation({
    mutationFn: authAPI.resendVerificationEmail,
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
