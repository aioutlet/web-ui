/**
 * Auth Store (Zustand)
 * Global authentication state management
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  getUser,
  setUser as saveUser,
  clearAuth,
  getToken,
} from '../utils/storage';

export const useAuthStore = create(
  devtools(
    (set, get) => ({
      // State
      user: getUser(),
      isAuthenticated: !!(getToken() && getUser()),
      isLoading: false,

      // Actions
      setUser: user => {
        saveUser(user);
        set({ user, isAuthenticated: true });
      },

      clearUser: () => {
        clearAuth();
        set({ user: null, isAuthenticated: false });
      },

      setLoading: isLoading => {
        set({ isLoading });
      },

      updateUser: userData => {
        const currentUser = get().user;
        const updatedUser = { ...currentUser, ...userData };
        saveUser(updatedUser);
        set({ user: updatedUser });
      },

      // Helper to check auth status
      checkAuth: () => {
        const token = getToken();
        const user = getUser();
        const isAuth = !!(token && user);
        set({ user, isAuthenticated: isAuth });
        return isAuth;
      },
    }),
    { name: 'AuthStore' }
  )
);
