import { StarIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { addToCart } from '../../store/slices/cartSlice'
import { formatCurrency, cn } from '../../utils'
import Rating from '../ui/Rating'

const featuredProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    rating: 5,
    reviewCount: 128,
    imageSrc:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    imageAlt: 'Premium wireless headphones in black',
    category: 'Electronics',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 199.99,
    rating: 4,
    reviewCount: 89,
    imageSrc:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    imageAlt: 'Smart fitness watch with black band',
    category: 'Wearables',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    price: 449.99,
    rating: 5,
    reviewCount: 67,
    imageSrc:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
    imageAlt: 'Modern ergonomic office chair in gray',
    category: 'Furniture',
  },
  {
    id: 4,
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    rating: 4,
    reviewCount: 34,
    imageSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    imageAlt: 'Modern minimalist desk lamp in white',
    category: 'Home & Office',
  },
]

export default function FeaturedProducts() {
  const dispatch = useAppDispatch()

  const handleAddToCart = product => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageSrc,
        category: product.category,
        quantity: 1,
      })
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="hidden text-sm font-medium text-primary-600 hover:text-primary-500 md:block dark:text-primary-400 dark:hover:text-primary-300"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map(product => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 lg:h-80 dark:bg-gray-700">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                {product.badge && (
                  <div className="absolute left-2 top-2">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                        product.badge === 'Best Seller'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                      )}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 dark:text-gray-300">
                    <Link to={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {product.category}
                  </p>

                  {/* Rating */}
                  <div className="mt-2 flex items-center">
                    <Rating rating={product.rating} size="h-4 w-4" />
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(product.price)}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={e => {
                  e.preventDefault()
                  handleAddToCart(product)
                }}
                className="btn btn-primary btn-sm mt-3 w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/products"
            className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
