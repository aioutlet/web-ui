import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect } from 'react'
import {
  selectCategories,
  selectFeaturedCategories,
  selectTrendingCategories,
  selectCurrentCategory,
  selectCategoriesLoading,
  selectCategoriesError,
  selectCategoryFilters,
  selectFilteredCategories,
  selectRecentlyViewedCategories,
  selectFavoriteCategories,
  selectTotalProducts,
  updateCategoryFilters,
  clearCategoryFilters,
  toggleFavoriteCategory,
  addToRecentlyViewed,
} from '../store/slices/categoriesSlice'
import {
  fetchCategories,
  fetchCategoryBySlug,
  searchCategories,
  preloadCategories,
} from '../services/categoriesApi'

/**
 * Custom hook for managing categories state and operations
 *
 * Provides easy access to categories data and common operations
 * with built-in loading states and error handling.
 */
export const useCategories = () => {
  const dispatch = useDispatch()

  // Selectors
  const categories = useSelector(selectCategories)
  const featuredCategories = useSelector(selectFeaturedCategories)
  const trendingCategories = useSelector(selectTrendingCategories)
  const filteredCategories = useSelector(selectFilteredCategories)
  const loading = useSelector(selectCategoriesLoading)
  const error = useSelector(selectCategoriesError)
  const filters = useSelector(selectCategoryFilters)
  const totalProducts = useSelector(selectTotalProducts)

  // Actions
  const loadCategories = useCallback(() => {
    return dispatch(fetchCategories())
  }, [dispatch])

  const searchCategoriesAction = useCallback(
    query => {
      return dispatch(searchCategories(query))
    },
    [dispatch]
  )

  const updateFilters = useCallback(
    newFilters => {
      dispatch(updateCategoryFilters(newFilters))
    },
    [dispatch]
  )

  const clearFilters = useCallback(() => {
    dispatch(clearCategoryFilters())
  }, [dispatch])

  const preload = useCallback(
    maxAge => {
      return dispatch(preloadCategories(maxAge))
    },
    [dispatch]
  )

  // Auto-load categories on mount if not already loaded
  useEffect(() => {
    if (categories.length === 0 && !loading && !error) {
      dispatch(preloadCategories())
    }
  }, [categories.length, loading, error, dispatch])

  return {
    // Data
    categories,
    featuredCategories,
    trendingCategories,
    filteredCategories,
    totalProducts,

    // State
    loading,
    error,
    filters,

    // Actions
    loadCategories,
    searchCategories: searchCategoriesAction,
    updateFilters,
    clearFilters,
    preload,

    // Computed
    hasCategories: categories.length > 0,
    isEmpty: !loading && categories.length === 0,
    isError: !!error,
  }
}

/**
 * Custom hook for single category operations
 */
export const useCategory = slug => {
  const dispatch = useDispatch()
  const currentCategory = useSelector(selectCurrentCategory)
  const loading = useSelector(selectCategoriesLoading)
  const error = useSelector(selectCategoriesError)

  const loadCategory = useCallback(() => {
    if (slug) {
      return dispatch(fetchCategoryBySlug(slug))
    }
  }, [dispatch, slug])

  const markAsViewed = useCallback(
    categoryId => {
      dispatch(addToRecentlyViewed(categoryId))
    },
    [dispatch]
  )

  // Auto-load category when slug changes
  useEffect(() => {
    if (slug && (!currentCategory || currentCategory.slug !== slug)) {
      loadCategory()
    }
  }, [slug, currentCategory, loadCategory])

  return {
    category: currentCategory,
    loading,
    error,
    loadCategory,
    markAsViewed,
    isLoaded: currentCategory?.slug === slug,
  }
}

/**
 * Custom hook for user category interactions
 */
export const useCategoryInteractions = () => {
  const dispatch = useDispatch()
  const recentlyViewed = useSelector(selectRecentlyViewedCategories)
  const favorites = useSelector(selectFavoriteCategories)

  const toggleFavorite = useCallback(
    categoryId => {
      dispatch(toggleFavoriteCategory(categoryId))
    },
    [dispatch]
  )

  const markAsViewed = useCallback(
    categoryId => {
      dispatch(addToRecentlyViewed(categoryId))
    },
    [dispatch]
  )

  const isFavorite = useCallback(
    categoryId => {
      return favorites.includes(categoryId)
    },
    [favorites]
  )

  const isRecentlyViewed = useCallback(
    categoryId => {
      return recentlyViewed.includes(categoryId)
    },
    [recentlyViewed]
  )

  return {
    recentlyViewed,
    favorites,
    toggleFavorite,
    markAsViewed,
    isFavorite,
    isRecentlyViewed,
  }
}
