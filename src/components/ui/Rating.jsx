import React from 'react'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { cn } from '../../utils'

/**
 * Rating component for displaying star ratings
 * @param {Object} props - Component props
 * @param {number} props.rating - Rating value (0-5)
 * @param {string} props.size - Size of stars (Tailwind CSS classes)
 * @param {boolean} props.showValue - Whether to show the numeric rating value
 * @param {string} props.valuePosition - Position of numeric value ('right' or 'left')
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.starClassName - Additional CSS classes for stars
 * @param {string} props.valueClassName - Additional CSS classes for the value text
 * @param {boolean} props.readonly - Whether the rating is readonly (affects styling)
 */
const Rating = ({
  rating = 0,
  size = 'w-5 h-5',
  showValue = false,
  valuePosition = 'right',
  className = '',
  starClassName = '',
  valueClassName = '',
  readonly = true,
  ...props
}) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIconSolid
        key={i}
        className={cn(
          size,
          i < Math.floor(rating)
            ? 'text-yellow-400'
            : 'text-gray-300 dark:text-gray-600',
          starClassName
        )}
        {...props}
      />
    ))
  }

  const ratingValue = (
    <span
      className={cn(
        'text-sm font-medium text-gray-900 dark:text-white',
        valueClassName
      )}
    >
      {rating.toFixed(1)}
    </span>
  )

  return (
    <div className={cn('flex items-center', className)}>
      {showValue && valuePosition === 'left' && ratingValue}
      <div
        className={cn(
          'flex items-center',
          showValue && valuePosition === 'left' && 'ml-2'
        )}
      >
        {renderStars()}
      </div>
      {showValue && valuePosition === 'right' && (
        <div className="ml-2">{ratingValue}</div>
      )}
    </div>
  )
}

export default Rating
