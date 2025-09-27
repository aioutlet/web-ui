import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  featuredProducts: [],
  products: [],
  filters: {
    category: '',
    priceRange: [0, 1000],
    sortBy: 'newest',
  },
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload
    },
    
    setProducts: (state, action) => {
      state.products = action.payload
    },
    
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: [0, 1000],
        sortBy: 'newest',
      }
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setCategories,
  setFeaturedProducts,
  setProducts,
  updateFilters,
  clearFilters,
  setLoading,
  setError,
  clearError,
} = productSlice.actions

export default productSlice.reducer