import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
      // Store token in localStorage for persistence
      if (action.payload.token) {
        localStorage.setItem('auth_token', action.payload.token)
        localStorage.setItem('user_data', JSON.stringify(action.payload.user))
      }
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = action.payload
    },
    signUpStart: state => {
      state.loading = true
      state.error = null
    },
    signUpSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
      // Store token in localStorage for persistence
      if (action.payload.token) {
        localStorage.setItem('auth_token', action.payload.token)
        localStorage.setItem('user_data', JSON.stringify(action.payload.user))
      }
    },
    signUpFailure: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = action.payload
    },
    logout: state => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = null
      // Clear localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    },
    loadUserFromStorage: state => {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')

      if (token && userData) {
        try {
          state.isAuthenticated = true
          state.user = JSON.parse(userData)
          state.token = token
        } catch (error) {
          // Clear invalid data
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user_data')
        }
      }
    },
    clearError: state => {
      state.error = null
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  logout,
  loadUserFromStorage,
  clearError,
} = authSlice.actions

export default authSlice.reducer
