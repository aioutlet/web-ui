import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CategoryCard = ({ category, className = '' }) => {
  return (
    <Link 
      to={`/${category.slug}`}
      className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="aspect-w-16 aspect-h-10 sm:aspect-w-2 sm:aspect-h-3">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(category.name)}`
          }}
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-300 transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-gray-200 text-sm mb-4 opacity-90">
          {category.description}
        </p>
        
        {/* Subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {category.subcategories.slice(0, 3).map((sub, index) => (
              <span 
                key={index}
                className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
              >
                {sub}
              </span>
            ))}
            {category.subcategories.length > 3 && (
              <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                +{category.subcategories.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* CTA */}
        <div className="flex items-center text-sm font-medium group-hover:text-primary-300 transition-colors duration-300">
          <span>Shop Now</span>
          <svg 
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    subcategories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  className: PropTypes.string,
}

export default CategoryCard