import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return 'light'
}

const initialState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  notifications: [],
  theme: getInitialTheme(),
  loading: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.sidebarOpen = !state.sidebarOpen
    },
    closeSidebar: state => {
      state.sidebarOpen = false
    },
    toggleMobileMenu: state => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    closeMobileMenu: state => {
      state.mobileMenuOpen = false
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        ...action.payload,
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme)
        document.documentElement.classList.toggle(
          'dark',
          state.theme === 'dark'
        )
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme)
        document.documentElement.classList.toggle(
          'dark',
          state.theme === 'dark'
        )
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const {
  toggleSidebar,
  closeSidebar,
  toggleMobileMenu,
  closeMobileMenu,
  addNotification,
  removeNotification,
  toggleTheme,
  setTheme,
  setLoading,
} = uiSlice.actions

export default uiSlice.reducer
