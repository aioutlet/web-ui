import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import bffClient from '../api/bffClient';
import ordersAPI from '../api/ordersAPI';
import { useAuth } from '../hooks/useAuth';

const WriteReviewPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data
        const productResponse = await bffClient.get(
          `/api/products/${productId}`
        );
        if (productResponse.data.success) {
          const p = productResponse.data.data;
          setProduct({
            id: p.id,
            sku: p.sku,
            name: p.name,
            description: p.description,
            price: p.price,
            brand: p.brand,
            images:
              p.images && p.images.length > 0
                ? p.images
                : ['https://via.placeholder.com/800'],
          });
        } else {
          navigate('/products');
          return;
        }

        // Check if user has purchased this product
        // If orderId is provided in URL, use it directly
        if (orderId) {
          setHasPurchased(true);
        } else {
          // Otherwise, check user's order history
          try {
            const orders = await ordersAPI.getMyOrders();
            console.log('Orders response:', orders);
            console.log('Checking orders for productId:', productId);

            // Ensure orders is an array
            const ordersArray = Array.isArray(orders) ? orders : [];

            // Check both items and orderItems, and compare both string and number IDs
            const purchased = ordersArray.some(order => {
              const items = order.items || order.orderItems || [];
              console.log('Order items:', items);

              return items.some(item => {
                const itemProductId =
                  item.productId || item.product_id || item.product?.id;
                console.log('Comparing:', itemProductId, 'with', productId);
                // Compare as strings to handle both string and number IDs
                return String(itemProductId) === String(productId);
              });
            });

            console.log('Has purchased:', purchased);
            setHasPurchased(purchased);
          } catch (orderError) {
            console.error('Error checking purchase history:', orderError);
            // Allow review even if we can't verify purchase
            setHasPurchased(false);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
        setCheckingPurchase(false);
      }
    };

    fetchData();
  }, [productId, orderId, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!reviewTitle.trim()) {
      newErrors.reviewTitle = 'Review title is required';
    } else if (reviewTitle.length < 5) {
      newErrors.reviewTitle = 'Title must be at least 5 characters';
    }

    if (!reviewText.trim()) {
      newErrors.reviewText = 'Review text is required';
    } else if (reviewText.length < 20) {
      newErrors.reviewText = 'Review must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // POST review to the backend
      const reviewData = {
        productId,
        rating,
        title: reviewTitle,
        comment: reviewText,
        author: user?.name || user?.username,
        email: user?.email,
        orderId,
        verified: !!orderId, // Verified if submitted with order ID
      };

      console.log('Submitting review:', reviewData);

      const response = await bffClient.post('/api/reviews', reviewData);

      if (response.data.success) {
        console.log('Review submitted successfully:', response.data);
        // Navigate back to product page with success message
        navigate(`/products/${productId}?reviewSubmitted=true`);
      } else {
        console.error('Review submission failed:', response.data);
        setErrors({ submit: 'Failed to submit review. Please try again.' });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({
        submit:
          error.message || 'Failed to submit review. Please try again later.',
      });
      setIsSubmitting(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => {
          const isActive = star <= (hoveredRating || rating);
          return (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              {isActive ? (
                <StarIcon className="w-10 h-10 text-yellow-400" />
              ) : (
                <StarIconOutline className="w-10 h-10 text-gray-300 dark:text-gray-600" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  if (loading || checkingPurchase || !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show message if user hasn't purchased the product
  if (!hasPurchased) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => navigate(`/products/${productId}`)}
              className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium mb-4 inline-flex items-center"
            >
              ← Back to product
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Purchase Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to purchase this product before you can write a review.
              This helps ensure authentic and helpful reviews for other
              customers.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate(`/products/${productId}`)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
              >
                View Product
              </button>
              <button
                onClick={() => navigate('/account/orders')}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                View My Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/products/${productId}`)}
            className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium mb-4 inline-flex items-center"
          >
            ← Back to product
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Write a Review
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Share your experience with this product
          </p>
        </div>

        {/* Product Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex gap-4">
            <img
              src={product.images?.[0] || 'https://via.placeholder.com/800'}
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ${product.price}
              </p>
              {product.rating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.reviews} reviews
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Overall Rating *
            </label>
            {renderStarRating()}
            {rating > 0 && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            )}
            {errors.rating && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.rating}
              </p>
            )}
          </div>

          {/* Review Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
            {/* Review Title */}
            <div>
              <label
                htmlFor="reviewTitle"
                className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
              >
                Review Title *
              </label>
              <input
                type="text"
                id="reviewTitle"
                value={reviewTitle}
                onChange={e => setReviewTitle(e.target.value)}
                placeholder="Sum up your experience in one line"
                className={`w-full px-4 py-2 border ${
                  errors.reviewTitle
                    ? 'border-red-300 dark:border-red-600'
                    : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                maxLength={100}
              />
              <div className="mt-1 flex justify-between">
                <div>
                  {errors.reviewTitle && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.reviewTitle}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {reviewTitle.length}/100
                </p>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label
                htmlFor="reviewText"
                className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
              >
                Your Review *
              </label>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Tell us about your experience with this product. What did you like or dislike? What would you use it for?"
                rows={6}
                className={`w-full px-4 py-2 border ${
                  errors.reviewText
                    ? 'border-red-300 dark:border-red-600'
                    : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none`}
                maxLength={2000}
              />
              <div className="mt-1 flex justify-between">
                <div>
                  {errors.reviewText && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.reviewText}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {reviewText.length}/2000
                </p>
              </div>
            </div>
          </div>

          {/* Verified Purchase Badge */}
          {orderId && (
            <div className="flex items-start gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <svg
                className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Verified Purchase
                </p>
                <p className="text-sm text-green-700 dark:text-green-400 mt-0.5">
                  You purchased this product (Order #{orderId})
                </p>
              </div>
            </div>
          )}

          {/* Submit Error Message */}
          {errors.submit && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.submit}
              </p>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate(`/products/${productId}`)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </button>
          </div>

          {/* Privacy Note */}
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By submitting this review, you agree to our{' '}
              <button
                type="button"
                onClick={() => {}}
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Terms of Use
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => {}}
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewPage;
