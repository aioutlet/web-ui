// Categories API service
import {
  categories,
  featuredCategories,
  trendingCategories,
  getTotalProductCount,
  getCategoryBySlug,
} from '../data/categories'
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
  addToRecentlyViewed,
} from '../store/slices/categoriesSlice'

/**
 * Categories API Service
 *
 * This service handles all category-related API calls and state management.
 * Currently uses static data but can be easily adapted for real API calls.
 */

// Simulate API delay for realistic UX
const simulateApiDelay = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * Fetch all categories with featured and trending lists
 */
export const fetchCategories = () => async dispatch => {
  try {
    dispatch(fetchCategoriesStart())

    // Simulate API call delay
    await simulateApiDelay(300)

    // In a real app, this would be an API call:
    // const response = await fetch('/api/categories')
    // const data = await response.json()

    const data = {
      categories,
      featuredCategories,
      trendingCategories,
      totalProducts: getTotalProductCount(),
    }

    dispatch(fetchCategoriesSuccess(data))
    return data
  } catch (error) {
    const errorMessage = error.message || 'Failed to fetch categories'
    dispatch(fetchCategoriesFailure(errorMessage))
    throw error
  }
}

/**
 * Fetch a single category by slug
 */
export const fetchCategoryBySlug = slug => async dispatch => {
  try {
    dispatch(fetchCategoryStart())

    // Simulate API call delay
    await simulateApiDelay(200)

    // In a real app, this would be an API call:
    // const response = await fetch(`/api/categories/${slug}`)
    // const data = await response.json()

    const category = getCategoryBySlug(slug)

    if (!category) {
      throw new Error(`Category with slug "${slug}" not found`)
    }

    dispatch(fetchCategorySuccess(category))
    dispatch(addToRecentlyViewed(category.id))

    return category
  } catch (error) {
    const errorMessage = error.message || 'Failed to fetch category'
    dispatch(fetchCategoryFailure(errorMessage))
    throw error
  }
}

/**
 * Search categories by query
 */
export const searchCategories = query => async (dispatch, getState) => {
  try {
    dispatch(fetchCategoriesStart())

    // Simulate API call delay
    await simulateApiDelay(200)

    // In a real app, this would be an API call:
    // const response = await fetch(`/api/categories/search?q=${query}`)
    // const data = await response.json()

    const lowerQuery = query.toLowerCase()
    const filtered = categories.filter(
      category =>
        category.name.toLowerCase().includes(lowerQuery) ||
        category.description.toLowerCase().includes(lowerQuery) ||
        category.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )

    const data = {
      categories: filtered,
      featuredCategories: filtered.filter(cat => cat.featured),
      trendingCategories: filtered.filter(cat => cat.trending),
      totalProducts: filtered.reduce((sum, cat) => sum + cat.productCount, 0),
    }

    dispatch(fetchCategoriesSuccess(data))
    return data
  } catch (error) {
    const errorMessage = error.message || 'Failed to search categories'
    dispatch(fetchCategoriesFailure(errorMessage))
    throw error
  }
}

/**
 * Refresh categories data (useful for cache invalidation)
 */
export const refreshCategories = () => async dispatch => {
  // Force a fresh fetch
  return dispatch(fetchCategories())
}

/**
 * Preload categories if not already loaded or if data is stale
 */
export const preloadCategories =
  (maxAge = 5 * 60 * 1000) =>
  async (dispatch, getState) => {
    const state = getState()
    const { categories, lastFetchTime, loading } = state.categories

    // Don't fetch if already loading
    if (loading) return

    // Don't fetch if we have recent data
    if (
      categories.length > 0 &&
      lastFetchTime &&
      Date.now() - lastFetchTime < maxAge
    ) {
      return state.categories
    }

    // Fetch fresh data
    return dispatch(fetchCategories())
  }

// Export for direct use in components
export const categoriesApi = {
  fetchCategories,
  fetchCategoryBySlug,
  searchCategories,
  refreshCategories,
  preloadCategories,
}
