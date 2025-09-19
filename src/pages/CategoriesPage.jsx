import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ViewfinderCircleIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  SparklesIcon,
  FireIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import CategoryCard from '../components/category/CategoryCard'
import { useCategories } from '../hooks/useCategories'
import { cn } from '../utils'

const CategoriesPage = () => {
  // Use the custom hook for categories state management
  const {
    categories,
    featuredCategories,
    trendingCategories,
    filteredCategories,
    totalProducts,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    searchCategories,
  } = useCategories()

  const [localSearchTerm, setLocalSearchTerm] = useState('')

  const filterOptions = [
    { value: 'all', label: 'All Categories', count: categories.length },
    { value: 'featured', label: 'Featured', count: featuredCategories.length },
    { value: 'trending', label: 'Trending', count: trendingCategories.length },
  ]

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'products', label: 'Most Products' },
    { value: 'featured', label: 'Featured First' },
  ]

  // Handle search with debouncing
  const handleSearch = query => {
    setLocalSearchTerm(query)
    updateFilters({ searchQuery: query })
  }

  // Handle filter changes
  const handleFilterChange = filterBy => {
    updateFilters({ filterBy })
  }

  // Handle sort changes
  const handleSortChange = sortBy => {
    updateFilters({ sortBy })
  }

  // Loading state
  if (loading && categories.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Loading categories...
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary mt-4"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover object-center opacity-20"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
            alt="Shopping categories background"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Explore Our Categories
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-primary-100">
              Discover thousands of products across our carefully curated
              categories. From the latest technology to home essentials, find
              everything you need in one place.
            </p>

            {/* Stats */}
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {categories.length}
                </div>
                <div className="text-sm text-primary-200">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {totalProducts.toLocaleString()}
                </div>
                <div className="text-sm text-primary-200">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {featuredCategories.length}
                </div>
                <div className="text-sm text-primary-200">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {trendingCategories.length}
                </div>
                <div className="text-sm text-primary-200">Trending</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Featured Categories Section */}
        {featuredCategories.length > 0 && (
          <div className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Featured Categories
                </h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                  Hand-picked categories with the best products and deals
                </p>
              </div>
              <SparklesIcon className="h-8 w-8 text-yellow-500" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCategories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  variant="featured"
                  size="lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Trending Categories Section */}
        {trendingCategories.length > 0 && (
          <div className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Trending Categories
                </h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                  Popular categories with high demand and new arrivals
                </p>
              </div>
              <FireIcon className="h-8 w-8 text-red-500" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {trendingCategories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  variant="compact"
                  size="sm"
                  showSubcategories={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4 lg:flex lg:items-center lg:justify-between lg:space-y-0">
          <div className="max-w-lg flex-1">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search categories..."
                value={localSearchTerm}
                onChange={e => handleSearch(e.target.value)}
                className="block w-full rounded-lg border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-600"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Filter Tabs */}
            <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(option.value)}
                  className={cn(
                    'relative rounded-md px-3 py-2 text-sm font-medium transition-all focus:outline-none',
                    filters.filterBy === option.value
                      ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  )}
                >
                  {option.label}
                  <span className="ml-1 text-xs text-gray-400">
                    ({option.count})
                  </span>
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={e => handleSortChange(e.target.value)}
              className="rounded-lg border-0 py-2 pl-3 pr-8 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-600"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* All Categories Grid */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              All Categories
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {filteredCategories.length}{' '}
              {filteredCategories.length === 1 ? 'category' : 'categories'}{' '}
              found
            </p>
          </div>

          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCategories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  variant="default"
                  size="md"
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <ViewfinderCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No categories found
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setLocalSearchTerm('')
                  clearFilters()
                }}
                className="btn btn-primary mt-4"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="rounded-2xl bg-gradient-to-r from-primary-50 to-primary-100 p-8 text-center dark:from-primary-950 dark:to-primary-900">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Can't find what you're looking for?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Our extensive product search can help you find exactly what you
              need across all categories.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/products"
                className="btn btn-primary inline-flex items-center"
              >
                <ShoppingBagIcon className="mr-2 h-5 w-5" />
                Browse All Products
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="btn btn-secondary inline-flex items-center"
              >
                <TagIcon className="mr-2 h-5 w-5" />
                Request Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
