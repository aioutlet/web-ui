import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../slices/cartSlice'
import { 
  StarIcon,
  HeartIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'

const ProductCard = ({ product, className = '' }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addItem(product))
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIconSolid key={`full-${i}`} className="h-4 w-4 text-yellow-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarIconSolid className="h-4 w-4 text-yellow-400" />
          </div>
        </div>
      )
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      )
    }

    return stars
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group ${className}`}>
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-1">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50">
          <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </button>

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product.slug}`}>
          <div className="space-y-2">
            {/* Brand */}
            {product.brand && (
              <p className="text-sm text-gray-500 font-medium">{product.brand}</p>
            )}

            {/* Product Name */}
            <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors duration-200">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviews})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500">Colors:</span>
                <div className="flex space-x-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                        color === 'white' ? 'bg-gray-100' : `bg-${color}-500`
                      }`}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    image: PropTypes.string.isRequired,
    brand: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    isNew: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  className: PropTypes.string,
}

export default ProductCard