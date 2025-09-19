import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Category data
  categories: [],
  featuredCategories: [],
  trendingCategories: [],

  // Single category details
  currentCategory: null,

  // Loading and error states
  loading: false,
  error: null,

  // Category-specific filters and search
  filters: {
    searchQuery: '',
    sortBy: 'name', // 'name', 'products', 'featured'
    filterBy: 'all', // 'all', 'featured', 'trending'
  },

  // User interactions
  recentlyViewed: [],
  favoriteCategories: [],

  // Metadata
  totalProducts: 0,
  lastFetchTime: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Fetch all categories
    fetchCategoriesStart: state => {
      state.loading = true
      state.error = null
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false
      state.categories = action.payload.categories
      state.featuredCategories = action.payload.featuredCategories || []
      state.trendingCategories = action.payload.trendingCategories || []
      state.totalProducts = action.payload.totalProducts || 0
      state.lastFetchTime = Date.now()
      state.error = null
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    // Fetch single category details
    fetchCategoryStart: state => {
      state.loading = true
      state.error = null
    },
    fetchCategorySuccess: (state, action) => {
      state.loading = false
      state.currentCategory = action.payload
      state.error = null
    },
    fetchCategoryFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    // Update filters
    updateCategoryFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearCategoryFilters: state => {
      state.filters = initialState.filters
    },

    // Recently viewed categories
    addToRecentlyViewed: (state, action) => {
      const categoryId = action.payload
      // Remove if already exists
      state.recentlyViewed = state.recentlyViewed.filter(
        id => id !== categoryId
      )
      // Add to beginning
      state.recentlyViewed.unshift(categoryId)
      // Keep only last 10
      state.recentlyViewed = state.recentlyViewed.slice(0, 10)
    },
    clearRecentlyViewed: state => {
      state.recentlyViewed = []
    },

    // Favorite categories
    toggleFavoriteCategory: (state, action) => {
      const categoryId = action.payload
      const index = state.favoriteCategories.indexOf(categoryId)
      if (index === -1) {
        state.favoriteCategories.push(categoryId)
      } else {
        state.favoriteCategories.splice(index, 1)
      }
    },
    clearFavoriteCategories: state => {
      state.favoriteCategories = []
    },

    // Update category data (for real-time updates)
    updateCategoryProductCount: (state, action) => {
      const { categoryId, productCount } = action.payload
      const category = state.categories.find(cat => cat.id === categoryId)
      if (category) {
        category.productCount = productCount
      }
    },

    // Reset state
    resetCategoriesState: state => {
      return { ...initialState, favoriteCategories: state.favoriteCategories }
    },
  },
})

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
  updateCategoryFilters,
  clearCategoryFilters,
  addToRecentlyViewed,
  clearRecentlyViewed,
  toggleFavoriteCategory,
  clearFavoriteCategories,
  updateCategoryProductCount,
  resetCategoriesState,
} = categoriesSlice.actions

// Selectors
export const selectCategories = state => state.categories.categories
export const selectFeaturedCategories = state =>
  state.categories.featuredCategories
export const selectTrendingCategories = state =>
  state.categories.trendingCategories
export const selectCurrentCategory = state => state.categories.currentCategory
export const selectCategoriesLoading = state => state.categories.loading
export const selectCategoriesError = state => state.categories.error
export const selectCategoryFilters = state => state.categories.filters
export const selectRecentlyViewedCategories = state =>
  state.categories.recentlyViewed
export const selectFavoriteCategories = state =>
  state.categories.favoriteCategories
export const selectTotalProducts = state => state.categories.totalProducts

// Complex selectors
export const selectFilteredCategories = state => {
  const { categories, filters } = state.categories
  let filtered = [...categories]

  // Filter by type
  if (filters.filterBy === 'featured') {
    filtered = filtered.filter(cat => cat.featured)
  } else if (filters.filterBy === 'trending') {
    filtered = filtered.filter(cat => cat.trending)
  }

  // Search filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter(
      cat =>
        cat.name.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query) ||
        cat.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Sort
  switch (filters.sortBy) {
    case 'products':
      return filtered.sort((a, b) => b.productCount - a.productCount)
    case 'featured':
      return filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return a.name.localeCompare(b.name)
      })
    default:
      return filtered.sort((a, b) => a.name.localeCompare(b.name))
  }
}

export default categoriesSlice.reducer
