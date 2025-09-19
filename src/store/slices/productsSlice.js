import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: [0, 1000],
    sortBy: 'name',
    searchQuery: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: state => {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false
      state.products = action.payload.products
      state.pagination = action.payload.pagination
      state.error = null
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    fetchFeaturedProductsSuccess: (state, action) => {
      state.featuredProducts = action.payload
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.currentPage = 1 // Reset to first page when filters change
    },
    updateCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload
    },
    clearFilters: state => {
      state.filters = initialState.filters
      state.pagination.currentPage = 1
    },
  },
})

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchFeaturedProductsSuccess,
  updateFilters,
  updateCurrentPage,
  clearFilters,
} = productsSlice.actions

export default productsSlice.reducer
