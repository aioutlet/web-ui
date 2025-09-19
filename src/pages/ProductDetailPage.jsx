import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  HeartIcon,
  ShareIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  TruckIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  HandThumbUpIcon,
  BoltIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid'
import { addToCart } from '../store/slices/cartSlice'
import { cn } from '../utils'
import Rating from '../components/ui/Rating'

// Mock product data
const getProductById = productId => {
  const mockProducts = {
    1: {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      description:
        'Experience premium sound quality with our latest wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort design.',
      category: 'Electronics',
      brand: 'TechSound',
      rating: 4.8,
      reviewCount: 1284,
      inStock: true,
      stock: 15,
      sku: 'WH-TSP-001',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
        'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80',
        'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80',
      ],
      features: [
        'Active Noise Cancellation',
        '30-hour battery life',
        'Premium leather cushioning',
        'Wireless & Bluetooth 5.0',
        'Quick charge: 15 min = 3 hours',
      ],
      specifications: {
        'Driver Size': '40mm',
        'Frequency Response': '20Hz - 20kHz',
        Impedance: '32 ohms',
        'Battery Life': '30 hours',
        'Charging Time': '2 hours',
        Weight: '250g',
        Connectivity: 'Bluetooth 5.0, 3.5mm jack',
        Warranty: '2 years',
      },
      shipping: 'Free shipping on orders over $50',
      returns: '30-day return policy',
      warranty: '2-year manufacturer warranty',
    },
  }

  return mockProducts[productId] || mockProducts['1']
}

// Mock reviews data
const getMockReviews = () => [
  {
    id: 1,
    user: 'Sarah Johnson',
    rating: 5,
    date: '2024-01-15',
    title: 'Excellent sound quality!',
    comment:
      'These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is as advertised.',
    verified: true,
    helpful: 24,
  },
  {
    id: 2,
    user: 'Mike Chen',
    rating: 4,
    date: '2024-01-10',
    title: 'Great headphones, minor comfort issue',
    comment:
      'Sound quality is amazing, but they can get a bit uncomfortable during very long sessions. Overall very satisfied.',
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    user: 'Emily Davis',
    rating: 5,
    date: '2024-01-08',
    title: 'Perfect for work from home',
    comment:
      'The noise cancellation helps me focus during calls. Battery lasts all day and more.',
    verified: true,
    helpful: 31,
  },
]

// Mock frequently bought together data
const getFrequentlyBoughtTogether = productId => {
  const fbtData = {
    1: [
      {
        id: 'fbt-1-1',
        name: 'Wireless Charging Pad',
        price: 29.99,
        image:
          'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&q=80',
        category: 'Accessories',
        inStock: true,
        stock: 25,
      },
      {
        id: 'fbt-1-2',
        name: 'Premium Carrying Case',
        price: 19.99,
        image:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80',
        category: 'Accessories',
        inStock: true,
        stock: 18,
      },
    ],
  }

  return fbtData[productId] || []
}

export default function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get product data
  const product = getProductById(productId)
  const mockReviews = getMockReviews()

  // Component state
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isFavorite, setIsFavorite] = useState(false) // Handle quantity change
  const handleQuantityChange = change => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  // Handle add to cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
      })
    )
  }

  // Tab configuration
  const tabs = [
    {
      id: 'description',
      name: 'Description',
      current: activeTab === 'description',
    },
    {
      id: 'specifications',
      name: 'Specifications',
      current: activeTab === 'specifications',
    },
    {
      id: 'reviews',
      name: `Reviews (${mockReviews.length})`,
      current: activeTab === 'reviews',
    },
    {
      id: 'shipping',
      name: 'Shipping & Returns',
      current: activeTab === 'shipping',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <button
            onClick={() => navigate('/products')}
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            Products
          </button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-3 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div className="grid grid-cols-6 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setSelectedImage(index)}
                    className={cn(
                      'relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50',
                      selectedImage === index
                        ? 'ring-2 ring-primary-500 ring-offset-2'
                        : 'ring-1 ring-gray-300'
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Main image */}
            <div className="h-96 w-full">
              <div className="relative h-full overflow-hidden rounded-lg">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h1>

              {/* Action Icons - Heart and Share */}
              <div className="flex space-x-2">
                {/* Favorite Heart Icon */}
                <button
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsFavorite(!isFavorite)
                  }}
                  className="rounded-full bg-gray-100 p-2 shadow-sm transition-all hover:scale-110 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  aria-label={
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                  }
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>

                {/* Share Icon */}
                <button
                  className="rounded-full bg-gray-100 p-2 shadow-sm transition-all hover:scale-110 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  title="Share product"
                  aria-label="Share product"
                >
                  <ShareIcon className="h-5 w-5 text-gray-600 hover:text-primary-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center space-x-4">
                <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
                  ${product.price}
                </p>
                {product.originalPrice && (
                  <p className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </p>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Rating value={product.rating} size="sm" />
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <a
                  href="#reviews"
                  className="ml-3 text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  {product.reviewCount} reviews
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Key Features
              </h3>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircleIcon className="mr-2 h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock status */}
            <div className="mt-6">
              <div className="flex items-center">
                <CheckCircleIcon className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  In stock ({product.stock} available)
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <label
                    htmlFor="quantity"
                    className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Qty:
                  </label>
                  <div className="flex items-center rounded-md border border-gray-300">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={e =>
                        setQuantity(
                          Math.max(
                            1,
                            Math.min(
                              product.stock,
                              parseInt(e.target.value) || 1
                            )
                          )
                        )
                      }
                      className="w-16 border-0 py-2 text-center text-gray-900 dark:bg-gray-800 dark:text-white"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </div>
            </div>

            {/* Shipping info */}
            <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <TruckIcon className="mr-2 h-5 w-5" />
                Free shipping on orders over $50
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {product.returns} • {product.warranty}
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Section */}
        <FrequentlyBoughtTogether product={product} />

        {/* Product details tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    tab.current
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                    'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-gray-700 dark:text-gray-300">
                <p className="mb-4">{product.description}</p>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  About this product
                </h3>
                <p>
                  Our premium wireless headphones deliver exceptional audio
                  quality with cutting-edge technology. Designed for audiophiles
                  and everyday users alike, these headphones feature advanced
                  active noise cancellation that blocks out unwanted ambient
                  sound, allowing you to focus on what matters most - your
                  music.
                </p>
                <p className="mt-4">
                  The ergonomic design ensures comfortable all-day wear, while
                  the premium materials provide durability and style. With up to
                  30 hours of battery life, you can enjoy uninterrupted
                  listening throughout your day.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b border-gray-200 py-2 dark:border-gray-700"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {key}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewsSection product={product} reviews={mockReviews} />
            )}

            {activeTab === 'shipping' && <ShippingSection />}
          </div>
        </div>
      </div>
    </div>
  )
}

// Frequently Bought Together Component
function FrequentlyBoughtTogether({ product }) {
  const fbtItems = getFrequentlyBoughtTogether(product.id)

  if (fbtItems.length === 0) return null

  const [selectedItems, setSelectedItems] = useState([
    true,
    ...fbtItems.map(item => item.inStock),
  ])

  const [favoriteItems, setFavoriteItems] = useState([
    false,
    ...Array(fbtItems.length).fill(false),
  ])

  const calculateTotal = () => {
    let total = selectedItems[0] ? product.price : 0
    fbtItems.forEach((item, index) => {
      if (selectedItems[index + 1] && item.inStock) {
        total += item.price
      }
    })
    return total
  }

  const handleItemToggle = index => {
    const newSelected = [...selectedItems]
    newSelected[index] = !newSelected[index]
    setSelectedItems(newSelected)
  }

  const handleFavoriteToggle = index => {
    const newFavorites = [...favoriteItems]
    newFavorites[index] = !newFavorites[index]
    setFavoriteItems(newFavorites)
  }

  return (
    <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Frequently bought together
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left Column - Products */}
        <div className="space-y-3">
          {/* Current Product */}
          <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
            <input
              type="checkbox"
              checked={selectedItems[0]}
              onChange={() => handleItemToggle(0)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                ${product.price}
              </p>
              <span className="text-xs text-green-600 dark:text-green-400">
                ✓ This item
              </span>
            </div>
            <button
              onClick={() => handleFavoriteToggle(0)}
              className="text-gray-400 hover:text-red-500"
            >
              {favoriteItems[0] ? (
                <HeartSolidIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* FBT Items */}
          {fbtItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedItems[index + 1]}
                onChange={() => handleItemToggle(index + 1)}
                disabled={!item.inStock}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
              />
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  ${item.price}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs ${
                      item.inStock
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {item.inStock ? '✓ In stock' : '✗ Out of stock'}
                  </span>
                  {item.inStock && (
                    <button className="text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400">
                      Add alone
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleFavoriteToggle(index + 1)}
                className="text-gray-400 hover:text-red-500"
              >
                {favoriteItems[index + 1] ? (
                  <HeartSolidIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Right Column - Total and Actions */}
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total for {selectedItems.filter(Boolean).length} items:
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${calculateTotal().toFixed(2)}
              </p>
              <button className="mt-4 w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                Add selected to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reviews Section Component
function ReviewsSection({ product, reviews }) {
  const generateGravatar = user => {
    // Simple hash for demo - generates consistent avatars based on username
    const avatars = [
      'https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    ]
    return avatars[user.length % avatars.length]
  }

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Customer Reviews
          </h3>
          <div className="mt-3 flex items-center">
            <Rating value={product.rating} size="lg" />
            <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              {product.rating} out of 5
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Based on {product.reviewCount} reviews
          </p>
        </div>
        <div>
          <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            Write a review
          </button>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map(review => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-6 dark:border-gray-700"
          >
            <div className="flex items-start space-x-4">
              <img
                src={generateGravatar(review.user)}
                alt={review.user}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {review.user}
                      {review.verified && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                          <CheckCircleIcon className="mr-1 h-3 w-3" />
                          Verified
                        </span>
                      )}
                    </h4>
                    <Rating value={review.rating} size="sm" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <h5 className="mt-2 font-medium text-gray-900 dark:text-white">
                  {review.title}
                </h5>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {review.comment}
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <HandThumbUpIcon className="mr-1 h-4 w-4" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Shipping Section Component
function ShippingSection() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div>
        <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
          <TruckIcon className="mr-2 h-6 w-6 text-primary-500" />
          Shipping Information
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-start">
            <CheckCircleIcon className="mr-3 mt-0.5 h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Free Standard Shipping
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                On orders over $50. Delivery in 5-7 business days.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <BoltIcon className="mr-3 mt-0.5 h-5 w-5 text-yellow-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Express Shipping
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                $9.99 for delivery in 2-3 business days.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <SparklesIcon className="mr-3 mt-0.5 h-5 w-5 text-purple-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Next Day Delivery
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                $19.99 for next business day delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
          <ShieldCheckIcon className="mr-2 h-6 w-6 text-primary-500" />
          Returns & Warranty
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-start">
            <CheckCircleIcon className="mr-3 mt-0.5 h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                30-Day Returns
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Return within 30 days for a full refund or exchange.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <ShieldCheckIcon className="mr-3 mt-0.5 h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                2-Year Warranty
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Covered against manufacturing defects and normal wear.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
