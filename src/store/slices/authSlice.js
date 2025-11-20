/**
 * Auth Slice (Redux Toolkit)
 * Centralized authentication state management
 */
import { createSlice } from '@reduxjs/toolkit';
import {
  getUser,
  getToken,
  setUser as saveUser,
  setToken as saveToken,
  clearAuth,
} from '../../utils/storage';

// Initialize state from localStorage
const initialState = {
  user: getUser(),
  isAuthenticated: !!(getToken() && getUser()),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.isLoading = false;
      state.error = null;

      // Persist to localStorage
      saveUser(user);
      saveToken(token, refreshToken);
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },

    // Set user (for updates or token refresh)
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveUser(action.payload);
    },

    // Update user (partial update)
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveUser(state.user);
    },

    // Logout
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      clearAuth();
    },

    // Clear error
    clearError: state => {
      state.error = null;
    },

    // Set loading
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Check and restore auth from storage (for app initialization)
    checkAuth: state => {
      const token = getToken();
      const user = getUser();
      const isAuth = !!(token && user);

      state.user = user;
      state.isAuthenticated = isAuth;

      if (!isAuth) {
        clearAuth();
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  setUser,
  updateUser,
  logout,
  clearError,
  setLoading,
  checkAuth,
} = authSlice.actions;

export default authSlice.reducer;
