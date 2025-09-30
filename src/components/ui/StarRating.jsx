import React from 'react';
import PropTypes from 'prop-types';

/**
 * StarRating Component
 *
 * A reusable star rating component that displays a 5-star rating system.
 * Supports customizable size, spacing, and optional review count display.
 *
 * @param {number} rating - The rating value (0-5)
 * @param {string} size - Tailwind size classes for the stars (default: 'w-5 h-5')
 * @param {string} spacing - Tailwind spacing classes between stars (default: 'space-x-1')
 * @param {number} reviews - Optional number of reviews to display
 * @param {boolean} showReviews - Whether to show the review count (default: false)
 * @param {string} reviewsTextSize - Tailwind text size for review count (default: 'text-sm')
 * @param {string} className - Additional CSS classes for the container
 */
const StarRating = ({
  rating,
  size = 'w-5 h-5',
  spacing = 'space-x-1',
  reviews,
  showReviews = false,
  reviewsTextSize = 'text-sm',
  className = '',
}) => {
  // Ensure rating is within valid range
  const validRating = Math.max(0, Math.min(5, rating || 0));

  return (
    <div className={`flex items-center ${spacing} ${className}`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <svg
            key={star}
            className={`${size} ${
              star <= Math.floor(validRating)
                ? 'text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            } fill-current`}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {showReviews && reviews !== undefined && (
        <span className={`${reviewsTextSize} text-gray-500 dark:text-gray-400`}>
          ({reviews})
        </span>
      )}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.string,
  spacing: PropTypes.string,
  reviews: PropTypes.number,
  showReviews: PropTypes.bool,
  reviewsTextSize: PropTypes.string,
  className: PropTypes.string,
};

export default StarRating;
