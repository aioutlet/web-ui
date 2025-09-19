import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Rating from '../components/ui/Rating'

// Extended mock data for reviews
const extendedReviews = [
  {
    id: 1,
    username: 'Sarah Johnson',
    rating: 5,
    date: 'March 15, 2024',
    title: 'Absolutely perfect!',
    content:
      'This product exceeded all my expectations. The quality is outstanding and delivery was super fast.',
    verified: true,
    helpful: 24,
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    ],
    category: 'Quality',
  },
  {
    id: 2,
    username: 'Mike Chen',
    rating: 4,
    date: 'March 10, 2024',
    title: 'Great value for money',
    content:
      'Really solid product. Works exactly as described. Only minor issue is the packaging could be better.',
    verified: true,
    helpful: 18,
    images: [],
    category: 'Value',
  },
  {
    id: 3,
    username: 'Emily Davis',
    rating: 5,
    date: 'March 8, 2024',
    title: 'Love it!',
    content: 'Perfect size and quality. Would definitely recommend to others.',
    verified: false,
    helpful: 12,
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    ],
    category: 'Quality',
  },
  {
    id: 4,
    username: 'James Wilson',
    rating: 3,
    date: 'March 5, 2024',
    title: 'Good but not great',
    content:
      'Product is okay. Does what it says but feels a bit cheap for the price.',
    verified: true,
    helpful: 8,
    images: [],
    category: 'Quality',
  },
  {
    id: 5,
    username: 'Lisa Thompson',
    rating: 5,
    date: 'March 3, 2024',
    title: 'Fantastic purchase',
    content:
      'Amazing quality and fast shipping. Customer service was also very helpful when I had questions.',
    verified: true,
    helpful: 31,
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    ],
    category: 'Service',
  },
  {
    id: 6,
    username: 'David Rodriguez',
    rating: 4,
    date: 'February 28, 2024',
    title: 'Solid choice',
    content:
      'Good product overall. Installation was straightforward and it works well.',
    verified: true,
    helpful: 15,
    images: [],
    category: 'Quality',
  },
  {
    id: 7,
    username: 'Anna Martinez',
    rating: 5,
    date: 'February 25, 2024',
    title: 'Highly recommended!',
    content:
      "Best purchase I've made in a while. Quality is top-notch and it arrived earlier than expected.",
    verified: true,
    helpful: 27,
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    ],
    category: 'Quality',
  },
  {
    id: 8,
    username: 'Robert Kim',
    rating: 2,
    date: 'February 22, 2024',
    title: 'Disappointed',
    content:
      'Product arrived damaged and customer service was slow to respond. Quality is also not as advertised.',
    verified: true,
    helpful: 5,
    images: [],
    category: 'Service',
  },
  {
    id: 9,
    username: 'Jennifer Lee',
    rating: 4,
    date: 'February 20, 2024',
    title: 'Pretty good',
    content: 'Works as expected. Good quality materials and fair price.',
    verified: false,
    helpful: 10,
    images: [],
    category: 'Value',
  },
  {
    id: 10,
    username: 'Mark Taylor',
    rating: 5,
    date: 'February 18, 2024',
    title: 'Excellent!',
    content:
      'Perfect product! Exactly what I was looking for. Great build quality and excellent customer service.',
    verified: true,
    helpful: 22,
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    ],
    category: 'Quality',
  },
]

// Mock product data for different categories
const mockProductData = {
  1: {
    id: 1,
    name: 'Premium Wireless Headphones',
    brand: 'AudioTech',
    sku: 'AT-WH-001',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviewCount: 1247,
    category: 'Electronics',
    badge: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  },
  2: {
    id: 2,
    name: 'Professional Gaming Mouse',
    brand: 'GamePro',
    sku: 'GP-M-002',
    price: 79.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 892,
    category: 'Electronics',
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
  },
  3: {
    id: 3,
    name: 'Ergonomic Office Chair',
    brand: 'ComfortSeating',
    sku: 'CS-EC-003',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.4,
    reviewCount: 567,
    category: 'Furniture',
    badge: 'Sale',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
  },
}

function ReviewListPage() {
  const { productId } = useParams()
  const [reviews, setReviews] = useState(extendedReviews)
  const [filteredReviews, setFilteredReviews] = useState(extendedReviews)
  const [selectedRating, setSelectedRating] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [product, setProduct] = useState(null)
  const reviewsPerPage = 5

  // Get product data
  useEffect(() => {
    const productData = mockProductData[productId]
    if (productData) {
      setProduct(productData)
    }
  }, [productId])

  // Scroll to top when page loads or filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage, selectedRating, selectedCategory, sortBy])

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...reviews]

    // Filter by rating
    if (selectedRating !== 'all') {
      filtered = filtered.filter(
        review => review.rating === parseInt(selectedRating)
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(review => review.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        review =>
          review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort reviews
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating)
        break
      case 'helpful':
        filtered.sort((a, b) => b.helpful - a.helpful)
        break
      default:
        break
    }

    setFilteredReviews(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [reviews, selectedRating, selectedCategory, sortBy, searchTerm])

  // Pagination
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  )
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage)

  const getAverageRating = () => {
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]
    reviews.forEach(review => {
      distribution[review.rating - 1]++
    })
    return distribution.reverse() // Show 5 stars first
  }

  const getUniqueCategories = () => {
    return [...new Set(reviews.map(review => review.category))]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Product Information Header */}
        {product && (
          <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
            <div className="p-6">
              <div className="flex flex-col items-start space-y-6 lg:flex-row lg:space-x-8 lg:space-y-0">
                {/* Product Image */}
                <div className="relative">
                  <div className="h-32 w-32 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 lg:h-40 lg:w-40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    />
                    {product.badge && (
                      <span
                        className={`absolute left-2 top-2 rounded-full px-2 py-1 text-xs font-medium text-white ${
                          product.badge === 'Sale'
                            ? 'bg-red-500'
                            : product.badge === 'Best Seller'
                              ? 'bg-green-500'
                              : product.badge === 'New'
                                ? 'bg-blue-500'
                                : 'bg-gray-500'
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      by {product.brand} • SKU: {product.sku}
                    </p>
                  </div>

                  {/* Rating and Reviews Count */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400'
                                : i < product.rating
                                  ? 'text-yellow-300'
                                  : 'text-gray-300 dark:text-gray-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-lg font-medium text-gray-900 dark:text-white">
                        {product.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Based on {product.reviewCount.toLocaleString()} reviews
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-400">
                      {product.category}
                    </span>
                  </div>

                  {/* Back to Product Button */}
                  <div>
                    <Link
                      to={`/products/${productId}`}
                      className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back to Product
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Link
              to="/products"
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              Products
            </Link>
            <span>›</span>
            <Link
              to={`/products/${productId}`}
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              {product ? product.name : 'Product Details'}
            </Link>
            <span>›</span>
            <span className="text-gray-900 dark:text-white">
              Customer Reviews
            </span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Customer Reviews
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {filteredReviews.length} of {reviews.length} reviews
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              {/* Overall Rating */}
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Overall Rating
                </h3>
                <div className="mb-4 flex items-center space-x-3">
                  <Rating
                    rating={parseFloat(getAverageRating())}
                    size="w-5 h-5"
                    showValue={true}
                    valuePosition="right"
                    valueClassName="text-lg font-medium text-gray-900 dark:text-white"
                  />
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    out of 5
                  </span>
                </div>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {reviews.length.toLocaleString()} global ratings
                </p>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {getRatingDistribution().map((count, index) => {
                    const rating = 5 - index
                    const percentage =
                      reviews.length > 0 ? (count / reviews.length) * 100 : 0
                    return (
                      <div key={rating} className="flex items-center space-x-2">
                        <span className="w-6 text-sm text-gray-600 dark:text-gray-400">
                          {rating}★
                        </span>
                        <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-2 rounded-full bg-yellow-400 transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="w-8 text-sm text-gray-600 dark:text-gray-400">
                          {count}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Search Reviews
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search by title, content, or reviewer..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-400"
                />
              </div>

              {/* Filter by Rating */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Filter by Rating
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value="all"
                      checked={selectedRating === 'all'}
                      onChange={e => setSelectedRating(e.target.value)}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-400"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      All Ratings
                    </span>
                  </label>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating.toString()}
                        checked={selectedRating === rating.toString()}
                        onChange={e => setSelectedRating(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-400"
                      />
                      <span className="ml-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <Rating rating={rating} size="w-4 h-4" />
                        <span className="ml-1">& up</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Category */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Filter by Category
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={e => setSelectedCategory(e.target.value)}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-400"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      All Categories
                    </span>
                  </label>
                  {getUniqueCategories().map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-400"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Reviews */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSelectedRating('all')
                  setSelectedCategory('all')
                  setSearchTerm('')
                  setSortBy('newest')
                }}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Clear all filters
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {currentReviews.length > 0 ? (
                currentReviews.map(review => (
                  <div
                    key={review.id}
                    className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400">
                          {review.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {review.username}
                            {review.verified && (
                              <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                                ✓ Verified Purchase
                              </span>
                            )}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Rating rating={review.rating} size="w-4 h-4" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        {review.category}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-2 font-medium text-gray-900 dark:text-white">
                        {review.title}
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        {review.content}
                      </p>
                    </div>

                    {review.images.length > 0 && (
                      <div className="mb-4 flex space-x-2">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt="Review"
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <button className="flex items-center space-x-1 hover:text-primary-600 dark:hover:text-primary-400">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V18M7 20l4-10m-4 10l4-10m-4 10V9a2 2 0 012-2h2.264a2 2 0 011.789 1.106L15 9m-4 1v10"
                          />
                        </svg>
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="hover:text-primary-600 dark:hover:text-primary-400">
                        Report
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg bg-white p-8 text-center shadow-sm dark:bg-gray-800">
                  <p className="text-gray-500 dark:text-gray-400">
                    No reviews found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing{' '}
                  <span className="font-medium">{indexOfFirstReview + 1}</span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastReview, filteredReviews.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{filteredReviews.length}</span>{' '}
                  results
                </p>

                <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber =
                      Math.max(1, Math.min(totalPages - 4, currentPage - 2)) +
                      index
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 ${
                          pageNumber === currentPage
                            ? 'z-10 border-primary-500 bg-primary-50 text-primary-600 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-400'
                            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewListPage
