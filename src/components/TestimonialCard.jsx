import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

const TestimonialCard = ({ testimonial, className = '' }) => {
  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? (
          <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
        ) : (
          <StarIcon key={i} className="h-5 w-5 text-gray-300" />
        )
      )
    }
    return stars
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 ${className}`}>
      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {renderStars(testimonial.rating)}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        "{testimonial.comment}"
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=3b82f6&color=white&size=48`
          }}
        />
        <div className="flex-1">
          <div className="flex items-center">
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            {testimonial.verified && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Verified
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{formatDate(testimonial.date)}</p>
        </div>
      </div>
    </div>
  )
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    verified: PropTypes.bool,
  }).isRequired,
  className: PropTypes.string,
}

export default TestimonialCard