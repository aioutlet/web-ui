import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = authService.getStoredUser();
        const token = authService.getAccessToken();

        if (storedUser && token) {
          setUser(storedUser);
          setIsAuthenticated(true);

          // Optionally verify token with backend
          try {
            const response = await authService.getCurrentUser();
            if (response.user) {
              setUser(response.user);
            }
          } catch (error) {
            // If token verification fails, clear auth state
            console.error('Token verification failed:', error);
            await handleLogout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async userData => {
    try {
      const response = await authService.register(userData);

      // Some systems require email verification before login
      if (response.user && response.accessToken) {
        setUser(response.user);
        setIsAuthenticated(true);
      }

      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      handleLogout();
    }
  };

  // Helper to clear auth state
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  // Update user profile
  const updateUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.user) {
        setUser(response.user);
        return response.user;
      }
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  // Forgot password
  const forgotPassword = async email => {
    try {
      const response = await authService.forgotPassword(email);
      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      const response = await authService.resetPassword(token, password);
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authService.changePassword(
        currentPassword,
        newPassword
      );
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  };

  // Verify email
  const verifyEmail = async token => {
    try {
      const response = await authService.verifyEmail(token);
      return response;
    } catch (error) {
      console.error('Verify email error:', error);
      throw error;
    }
  };

  // Resend verification email
  const resendVerificationEmail = async email => {
    try {
      const response = await authService.resendVerificationEmail(email);
      return response;
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    forgotPassword,
    resetPassword,
    changePassword,
    verifyEmail,
    resendVerificationEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
