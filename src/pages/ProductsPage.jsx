import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  ListBulletIcon,
  StarIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import {
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid'
import { Menu, Transition } from '@headlessui/react'
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  updateFilters,
  updateCurrentPage,
  clearFilters,
} from '../store/slices/productsSlice'
import { addToCart } from '../store/slices/cartSlice'
import { cn } from '../utils'
import Rating from '../components/ui/Rating'
import { useCategories } from '../hooks/useCategories'

const sortOptions = [
  { name: 'Most Popular', value: 'popular', current: false },
  { name: 'Best Rating', value: 'rating', current: false },
  { name: 'Newest', value: 'newest', current: false },
  { name: 'Price: Low to High', value: 'price-asc', current: true },
  { name: 'Price: High to Low', value: 'price-desc', current: false },
]

const priceRanges = [
  { name: 'All', value: [0, 1000], current: true },
  { name: 'Under $25', value: [0, 25], current: false },
  { name: '$25 to $50', value: [25, 50], current: false },
  { name: '$50 to $100', value: [50, 100], current: false },
  { name: '$100 to $200', value: [100, 200], current: false },
  { name: '$200 & Above', value: [200, 1000], current: false },
]

// Mock product data - replace with actual API calls
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 256,
    category: 'Electronics',
    imageSrc:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    imageAlt: 'Wireless headphones',
    description: 'Premium wireless headphones with noise cancellation',
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 249.99,
    rating: 4.8,
    reviewCount: 189,
    category: 'Electronics',
    imageSrc:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    imageAlt: 'Smart watch',
    description: 'Advanced fitness tracking and smart notifications',
    inStock: true,
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.6,
    reviewCount: 342,
    category: 'Sports',
    imageSrc:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    imageAlt: 'Running shoes',
    description: 'Lightweight running shoes for optimal performance',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 4,
    name: 'Coffee Maker',
    price: 79.99,
    rating: 4.3,
    reviewCount: 167,
    category: 'Home',
    imageSrc:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
    imageAlt: 'Coffee maker',
    description: 'Programmable coffee maker with thermal carafe',
    inStock: false,
  },
  {
    id: 5,
    name: 'Backpack',
    price: 59.99,
    rating: 4.4,
    reviewCount: 298,
    category: 'Fashion',
    imageSrc:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    imageAlt: 'Backpack',
    description: 'Durable travel backpack with multiple compartments',
    inStock: true,
  },
  {
    id: 6,
    name: 'Desk Lamp',
    price: 45.99,
    rating: 4.2,
    reviewCount: 124,
    category: 'Home',
    imageSrc:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    imageAlt: 'Desk lamp',
    description: 'Adjustable LED desk lamp with USB charging port',
    inStock: true,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewCount: 203,
    category: 'Electronics',
    imageSrc:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    imageAlt: 'Bluetooth speaker',
    description: 'Portable waterproof speaker with 360-degree sound',
    badge: 'New',
    inStock: true,
  },
  {
    id: 8,
    name: 'Yoga Mat',
    price: 34.99,
    rating: 4.5,
    reviewCount: 456,
    category: 'Sports',
    imageSrc:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80',
    imageAlt: 'Yoga mat',
    description: 'Non-slip eco-friendly yoga mat with carrying strap',
    inStock: true,
  },
  {
    id: 9,
    name: 'Leather Wallet',
    price: 39.99,
    rating: 4.4,
    reviewCount: 189,
    category: 'Fashion',
    imageSrc:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
    imageAlt: 'Leather wallet',
    description: 'Genuine leather bi-fold wallet with RFID protection',
    inStock: true,
  },
  {
    id: 10,
    name: 'Air Purifier',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 278,
    category: 'Home',
    imageSrc:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    imageAlt: 'Air purifier',
    description: 'HEPA air purifier for rooms up to 300 sq ft',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 11,
    name: 'Gaming Mouse',
    price: 69.99,
    rating: 4.8,
    reviewCount: 324,
    category: 'Electronics',
    imageSrc:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    imageAlt: 'Gaming mouse',
    description: 'High-precision wireless gaming mouse with RGB lighting',
    inStock: true,
  },
  {
    id: 12,
    name: 'Tennis Racket',
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviewCount: 156,
    category: 'Sports',
    imageSrc:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&q=80',
    imageAlt: 'Tennis racket',
    description: 'Professional carbon fiber tennis racket',
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: 13,
    name: 'Sunglasses',
    price: 79.99,
    rating: 4.3,
    reviewCount: 234,
    category: 'Fashion',
    imageSrc:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
    imageAlt: 'Sunglasses',
    description: 'UV protection polarized sunglasses with titanium frame',
    inStock: true,
  },
  {
    id: 14,
    name: 'Kitchen Scale',
    price: 29.99,
    rating: 4.4,
    reviewCount: 167,
    category: 'Home',
    imageSrc:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80',
    imageAlt: 'Kitchen scale',
    description: 'Digital kitchen scale with LCD display',
    inStock: false,
  },
  {
    id: 15,
    name: 'Tablet',
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviewCount: 445,
    category: 'Electronics',
    imageSrc:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80',
    imageAlt: 'Tablet',
    description: '10-inch tablet with high-resolution display',
    badge: 'New',
    inStock: true,
  },
  {
    id: 16,
    name: 'Basketball',
    price: 24.99,
    rating: 4.2,
    reviewCount: 98,
    category: 'Sports',
    imageSrc:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&q=80',
    imageAlt: 'Basketball',
    description: 'Official size leather basketball for indoor/outdoor play',
    inStock: true,
  },
  {
    id: 17,
    name: 'Handbag',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviewCount: 234,
    category: 'Fashion',
    imageSrc:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',
    imageAlt: 'Handbag',
    description: 'Designer leather handbag with adjustable strap',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: 18,
    name: 'Plant Pot',
    price: 19.99,
    rating: 4.1,
    reviewCount: 87,
    category: 'Home',
    imageSrc:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
    imageAlt: 'Plant pot',
    description: 'Ceramic plant pot with drainage hole and saucer',
    inStock: true,
  },
]

// This will be moved inside the component to use Redux state

const formatCurrency = amount => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const ProductsPage = () => {
  const dispatch = useDispatch()
  const { categoryId } = useParams()
  const { products, categories, loading, filters, pagination } = useSelector(
    state => state.products
  )

  // Use categories from Redux state
  const { categories: allCategories, loading: categoriesLoading } =
    useCategories()

  // Convert comprehensive categories data to the format expected by ProductsPage
  const mockCategories = [
    { id: 0, name: 'All Categories', value: '', count: 18 },
    ...allCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      value: cat.slug,
      count: cat.productCount,
    })),
  ]

  const [viewMode, setViewMode] = useState('grid')
  const [favorites, setFavorites] = useState(new Set()) // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Simulate API calls - replace with actual API calls
    dispatch(fetchProductsStart())

    setTimeout(() => {
      let filteredProducts = mockProducts

      // Filter by category if categoryId is provided
      if (categoryId && allCategories.length > 0) {
        // Create category map from Redux categories data
        const categoryMap = {}
        allCategories.forEach(cat => {
          categoryMap[cat.slug] = cat.name
        })

        const categoryName = categoryMap[categoryId]
        if (categoryName) {
          filteredProducts = mockProducts.filter(
            product => product.category === categoryName
          )

          // Update filters to reflect the category selection
          dispatch(updateFilters({ category: categoryName }))
        }
      }

      dispatch(
        fetchProductsSuccess({
          products: filteredProducts,
          pagination: {
            currentPage: 1,
            totalPages: Math.ceil(filteredProducts.length / 6),
            totalItems: filteredProducts.length,
            itemsPerPage: 6,
          },
        })
      )
    }, 500)
  }, [dispatch, categoryId])

  const handleAddToCart = product => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageSrc,
        quantity: 1,
      })
    )
  }

  const toggleFavorite = productId => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const handleFilterChange = (filterType, value) => {
    dispatch(updateFilters({ [filterType]: value }))
  }

  const handleSortChange = sortValue => {
    dispatch(updateFilters({ sortBy: sortValue }))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  // Get category display name
  const getCategoryDisplayName = () => {
    if (!categoryId) return 'Products'
    if (allCategories.length === 0) return 'Products'

    // Create category map from Redux categories data
    const categoryMap = {}
    allCategories.forEach(cat => {
      categoryMap[cat.slug] = cat.name
    })

    return categoryMap[categoryId] || 'Products'
  }

  const filteredProducts = products.filter(product => {
    if (filters.category && product.category !== filters.category) return false
    if (
      filters.searchQuery &&
      !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    )
      return false
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    )
      return false
    return true
  })

  // Pagination logic
  const itemsPerPage = 6
  const currentPage = pagination.currentPage || 1
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = page => {
    dispatch(updateCurrentPage(page))
    // Scroll to top of products section
    document
      .querySelector('.products-section')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 pt-24 dark:border-gray-700">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {getCategoryDisplayName()}
          </h1>
          <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
            {categoryId
              ? `Discover our amazing ${getCategoryDisplayName().toLowerCase()} collection`
              : 'Discover our amazing collection of products'}
          </p>
        </div>

        <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          {/* Filters */}
          <aside className="hidden lg:block">
            <h2 className="sr-only">Filters</h2>

            <div className="space-y-10 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Search */}
              <div>
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900 dark:text-white">
                    Search
                  </legend>
                  <div className="mt-3 space-y-3">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={filters.searchQuery}
                        onChange={e =>
                          handleFilterChange('searchQuery', e.target.value)
                        }
                        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* Categories */}
              <div className="pt-10">
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900 dark:text-white">
                    Categories
                  </legend>
                  <div className="mt-3 space-y-3">
                    {mockCategories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <input
                          id={`category-${category.id}`}
                          name="category"
                          type="radio"
                          checked={filters.category === category.value}
                          onChange={() =>
                            handleFilterChange('category', category.value)
                          }
                          className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                        >
                          {category.name}
                          <span className="ml-1 text-gray-400">
                            ({category.count})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Price Range */}
              <div className="pt-10">
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900 dark:text-white">
                    Price Range
                  </legend>
                  <div className="mt-3 space-y-3">
                    {priceRanges.map(range => (
                      <div key={range.name} className="flex items-center">
                        <input
                          id={`price-${range.name}`}
                          name="price"
                          type="radio"
                          checked={
                            filters.priceRange[0] === range.value[0] &&
                            filters.priceRange[1] === range.value[1]
                          }
                          onChange={() =>
                            handleFilterChange('priceRange', range.value)
                          }
                          className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                        />
                        <label
                          htmlFor={`price-${range.name}`}
                          className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                        >
                          {range.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Clear Filters */}
              <div className="pt-10">
                <button
                  onClick={handleClearFilters}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2 xl:col-span-3">
            {/* Mobile filter dialog */}
            <div className="mb-8 lg:hidden">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <FunnelIcon className="mr-2 h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 dark:border-gray-700">
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                      Sort
                      <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
                      <div className="py-1">
                        {sortOptions.map(option => (
                          <Menu.Item key={option.value}>
                            {({ active }) => (
                              <button
                                onClick={() => handleSortChange(option.value)}
                                className={cn(
                                  filters.sortBy === option.value
                                    ? 'font-medium text-gray-900 dark:text-white'
                                    : 'text-gray-500 dark:text-gray-300',
                                  active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                  'block w-full px-4 py-2 text-left text-sm'
                                )}
                              >
                                {option.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <div className="flex items-center">
                <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2',
                      viewMode === 'grid'
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    )}
                  >
                    <Squares2X2Icon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2',
                      viewMode === 'list'
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    )}
                  >
                    <ListBulletIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className="mt-8 flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div className="products-section mt-8">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {paginatedProducts.map(product => (
                      <div key={product.id} className="group relative">
                        <Link to={`/product/${product.id}`} className="block">
                          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 dark:bg-gray-700">
                            <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center"
                            />
                            {product.badge && (
                              <div className="absolute left-2 top-2">
                                <span
                                  className={cn(
                                    'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                                    product.badge === 'Best Seller'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                      : product.badge === 'Sale'
                                        ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                                        : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                                  )}
                                >
                                  {product.badge}
                                </span>
                              </div>
                            )}

                            {!product.inStock && (
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                <span className="font-medium text-white">
                                  Out of Stock
                                </span>
                              </div>
                            )}
                          </div>
                        </Link>

                        {/* Favorite Heart Icon - Outside of Link */}
                        <button
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleFavorite(product.id)
                          }}
                          className="absolute right-2 top-2 z-20 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                          aria-label={
                            favorites.has(product.id)
                              ? 'Remove from favorites'
                              : 'Add to favorites'
                          }
                        >
                          {favorites.has(product.id) ? (
                            <HeartIconSolid className="h-4 w-4 text-red-500" />
                          ) : (
                            <HeartIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          )}
                        </button>
                        <div className="mt-4 flex justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm text-gray-700 dark:text-gray-300">
                              <Link
                                to={`/product/${product.id}`}
                                className="hover:text-gray-900 dark:hover:text-white"
                              >
                                {product.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {product.category}
                            </p>
                            <div className="mt-2 flex items-center">
                              <Rating rating={product.rating} size="h-4 w-4" />
                              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                ({product.reviewCount})
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatCurrency(product.price)}
                            </p>
                            {product.originalPrice && (
                              <p className="text-xs text-gray-500 line-through dark:text-gray-400">
                                {formatCurrency(product.originalPrice)}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={e => {
                            e.preventDefault()
                            handleAddToCart(product)
                          }}
                          disabled={!product.inStock}
                          className="btn btn-primary mt-3 w-full opacity-0 transition-opacity duration-200 disabled:opacity-50 group-hover:opacity-100"
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {paginatedProducts.map(product => (
                      <div
                        key={product.id}
                        className="relative flex items-start space-x-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700">
                          <Link to={`/product/${product.id}`}>
                            <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center"
                            />
                          </Link>
                        </div>

                        {/* Favorite Heart Icon for List View - Top Right Corner */}
                        <button
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleFavorite(product.id)
                          }}
                          className="absolute right-3 top-3 z-20 rounded-full bg-white p-2 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700"
                          aria-label={
                            favorites.has(product.id)
                              ? 'Remove from favorites'
                              : 'Add to favorites'
                          }
                        >
                          {favorites.has(product.id) ? (
                            <HeartIconSolid className="h-4 w-4 text-red-500" />
                          ) : (
                            <HeartIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          )}
                        </button>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              <Link
                                to={`/product/${product.id}`}
                                className="hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {product.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {product.description}
                            </p>
                            <div className="mt-2 flex items-center">
                              <Rating rating={product.rating} size="h-4 w-4" />
                              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                                ({product.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-lg font-medium text-gray-900 dark:text-white">
                                {formatCurrency(product.price)}
                              </p>
                              {product.originalPrice && (
                                <p className="text-sm text-gray-500 line-through dark:text-gray-400">
                                  {formatCurrency(product.originalPrice)}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                              className="btn btn-primary disabled:opacity-50"
                            >
                              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                    <div className="flex flex-1 justify-between sm:hidden">
                      <button
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Showing{' '}
                          <span className="font-medium">{startIndex + 1}</span>{' '}
                          to{' '}
                          <span className="font-medium">
                            {Math.min(endIndex, filteredProducts.length)}
                          </span>{' '}
                          of{' '}
                          <span className="font-medium">
                            {filteredProducts.length}
                          </span>{' '}
                          results
                        </p>
                      </div>
                      <div>
                        <nav
                          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                          aria-label="Pagination"
                        >
                          {/* Previous button */}
                          <button
                            onClick={() =>
                              handlePageChange(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-gray-600 dark:hover:bg-gray-700"
                          >
                            <span className="sr-only">Previous</span>
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          {/* Page numbers */}
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map(page => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={cn(
                                page === currentPage
                                  ? 'relative z-10 inline-flex items-center bg-primary-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                                  : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-700'
                              )}
                            >
                              {page}
                            </button>
                          ))}

                          {/* Next button */}
                          <button
                            onClick={() =>
                              handlePageChange(
                                Math.min(totalPages, currentPage + 1)
                              )
                            }
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-gray-600 dark:hover:bg-gray-700"
                          >
                            <span className="sr-only">Next</span>
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
