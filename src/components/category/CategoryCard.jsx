import { Link } from 'react-router-dom'
import {
  ArrowRightIcon,
  FireIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { cn } from '../../utils'
import { categoryColors } from '../../data/categories'

/**
 * CategoryCard Component
 *
 * A reusable card component for displaying category information with:
 * - Category image and icon
 * - Title and description
 * - Product count
 * - Subcategories preview
 * - Interactive hover effects
 * - Responsive design
 *
 * @param {Object} category - Category data object
 * @param {string} variant - Card variant: 'default', 'featured', 'compact'
 * @param {string} size - Card size: 'sm', 'md', 'lg'
 * @param {boolean} showSubcategories - Whether to show subcategories
 * @param {string} className - Additional CSS classes
 */
const CategoryCard = ({
  category,
  variant = 'default',
  size = 'md',
  showSubcategories = true,
  className = '',
}) => {
  const colors = categoryColors[category.color] || categoryColors.gray

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const imageHeights = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
  }

  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-xl border transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-xl',
        colors.border,
        colors.hover,
        sizeClasses[size],
        isFeatured &&
          'ring-2 ring-primary-500/20 ring-offset-2 dark:ring-offset-gray-900',
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-gradient-to-br from-current to-transparent" />
      </div>

      {/* Category Image */}
      <div
        className={cn(
          'relative mb-4 overflow-hidden rounded-lg',
          imageHeights[size],
          isCompact && 'mb-3'
        )}
      >
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category Icon */}
        <div className="absolute bottom-3 left-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl backdrop-blur-sm">
            {category.icon}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute right-3 top-3 flex gap-2">
          {category.featured && (
            <div className="flex items-center gap-1 rounded-full bg-yellow-500/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <SparklesIcon className="h-3 w-3" />
              Featured
            </div>
          )}
          {category.trending && (
            <div className="flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <FireIcon className="h-3 w-3" />
              Trending
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative space-y-3">
        {/* Title and Description */}
        <div>
          <h3
            className={cn(
              'font-semibold transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400',
              colors.text,
              isCompact ? 'text-lg' : 'text-xl',
              isFeatured && 'text-2xl'
            )}
          >
            {category.name}
          </h3>

          {!isCompact && (
            <p className={cn('mt-2 text-sm leading-relaxed', colors.accent)}>
              {category.shortDescription}
            </p>
          )}
        </div>

        {/* Product Count */}
        <div
          className={cn(
            'flex items-center justify-between',
            isCompact ? 'text-xs' : 'text-sm'
          )}
        >
          <span className={colors.accent}>
            {category.productCount.toLocaleString()} products
          </span>
          <ArrowRightIcon
            className={cn(
              'transition-transform group-hover:translate-x-1',
              colors.accent,
              'h-4 w-4'
            )}
          />
        </div>

        {/* Subcategories */}
        {showSubcategories &&
          !isCompact &&
          category.subcategories?.length > 0 && (
            <div className="space-y-2 border-t pt-3 dark:border-gray-700">
              <h4
                className={cn(
                  'text-xs font-medium uppercase tracking-wide',
                  colors.accent
                )}
              >
                Popular in {category.name}
              </h4>
              <div className="flex flex-wrap gap-1">
                {category.subcategories.slice(0, 3).map(sub => (
                  <span
                    key={sub.id}
                    className={cn(
                      'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium transition-colors',
                      colors.bg,
                      colors.text,
                      'hover:bg-opacity-80'
                    )}
                  >
                    {sub.name}
                  </span>
                ))}
                {category.subcategories.length > 3 && (
                  <span className={cn('text-xs', colors.accent)}>
                    +{category.subcategories.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
      </div>

      {/* Featured Highlight - positioned behind content */}
      {isFeatured && (
        <div className="absolute -inset-px -z-10 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 transition-opacity group-hover:opacity-10" />
      )}
    </Link>
  )
}

export default CategoryCard
