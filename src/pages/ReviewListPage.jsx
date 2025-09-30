import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// StarRating component (reused from ProductDetailPage)
const StarRating = ({ rating, size = 'w-5 h-5' }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`${size} ${
            star <= rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300 dark:text-gray-600'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State management
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reviewsPerPage = 10;

  // Sample reviews data (expanded for pagination testing)
  const sampleReviews = [
    {
      id: 1,
      user: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      comment:
        'Absolutely love this product! The quality is outstanding and it fits perfectly. Highly recommend to anyone looking for something reliable and stylish.',
      verified: true,
    },
    {
      id: 2,
      user: 'James K.',
      rating: 4,
      date: '2024-01-10',
      comment:
        'Good quality product, although it took a bit longer to arrive than expected. Overall satisfied with the purchase.',
      verified: true,
    },
    {
      id: 3,
      user: 'Maria L.',
      rating: 5,
      date: '2024-01-08',
      comment:
        'Exceeded my expectations! The craftsmanship is excellent and it looks even better in person.',
      verified: false,
    },
    {
      id: 4,
      user: 'David R.',
      rating: 3,
      date: '2024-01-05',
      comment:
        "It's okay. The product works as described but the quality could be better for the price point.",
      verified: true,
    },
    {
      id: 5,
      user: 'Lisa Chen',
      rating: 5,
      date: '2024-01-03',
      comment:
        'Perfect addition to my collection. Fast shipping and excellent customer service.',
      verified: true,
    },
    {
      id: 6,
      user: 'Michael B.',
      rating: 4,
      date: '2024-01-01',
      comment:
        'Great product overall. Minor issue with packaging but the item itself is fantastic.',
      verified: true,
    },
    {
      id: 7,
      user: 'Emma W.',
      rating: 5,
      date: '2023-12-28',
      comment:
        'This has become one of my favorite purchases. Highly durable and looks amazing.',
      verified: true,
    },
    {
      id: 8,
      user: 'Robert T.',
      rating: 2,
      date: '2023-12-25',
      comment:
        "Unfortunately didn't meet my expectations. The color was different from the photos.",
      verified: false,
    },
    {
      id: 9,
      user: 'Anna S.',
      rating: 4,
      date: '2023-12-22',
      comment:
        'Good value for money. The product is solid and works well for my needs.',
      verified: true,
    },
    {
      id: 10,
      user: 'Thomas H.',
      rating: 5,
      date: '2023-12-20',
      comment:
        'Outstanding quality and design. Will definitely be purchasing more items from this brand.',
      verified: true,
    },
    {
      id: 11,
      user: 'Sophie M.',
      rating: 4,
      date: '2023-12-18',
      comment:
        "Really happy with this purchase. The material feels premium and it's very well made.",
      verified: true,
    },
    {
      id: 12,
      user: 'Alex P.',
      rating: 3,
      date: '2023-12-15',
      comment:
        "Average product. Does what it's supposed to do but nothing extraordinary.",
      verified: false,
    },
  ];

  // Mock product data
  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock product data
      const mockProduct = {
        id: parseInt(id),
        name: 'Organize Basic Set (Walnut)',
        price: 149,
        originalPrice: 199,
        rating: 4.8,
        reviews: sampleReviews.length,
        category: 'Objects',
        inStock: true,
        description:
          'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag.',
        images: [
          'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1594736797933-d0eac2451a9a?w=600&h=600&fit=crop&crop=center',
        ],
      };

      setProduct(mockProduct);
      setReviews(sampleReviews);
      setLoading(false);
    };

    fetchProductAndReviews();
  }, [id]);

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...reviews];

    // Apply rating filter
    if (filterRating !== 'all') {
      filtered = filtered.filter(
        review => review.rating === parseInt(filterRating)
      );
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        review =>
          review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.user.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [reviews, filterRating, searchTerm, sortBy]);

  // Calculate pagination
  const totalReviews = filteredReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  // Get rating distribution
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviewsCount = reviews.length;

  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageInput = e => {
    const page = parseInt(e.target.value);
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background gradients matching HomePage theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-transparent to-blue-50/30 dark:from-pink-900/10 dark:to-blue-900/10" />

      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] dark:opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header Section */}
        <div className="bg-gray-50/40 dark:bg-gray-800/20 border-b border-gray-200/60 dark:border-gray-700/40 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product Image */}
            <div className="lg:w-1/3">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={
                    product?.images?.[0] ||
                    'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=600&fit=crop&crop=center'
                  }
                  alt={product?.name || 'Product'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-2/3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => navigate(`/products/${id}`)}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
                >
                  ← Back to Product
                </button>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {product?.name || 'Product Reviews'}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <StarRating rating={product?.rating || 4.8} />
                  <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {product?.rating || 4.8}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  ({totalReviews} reviews)
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  {product?.category || 'Objects'}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product?.price || 149}
                </span>
                {product?.originalPrice && (
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product?.inStock && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    In Stock
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {product?.description ||
                  'View all customer reviews for this product.'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters and Rating Distribution */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50/60 dark:bg-gray-800/30 rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Filters & Summary
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Reviews
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search by comment or reviewer..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Sort */}
              <div className="mb-6 pt-6 border-t border-gray-200/30 dark:border-gray-700/20">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>

              {/* Rating Distribution */}
              <div className="mb-6 pt-6 border-t border-gray-200/30 dark:border-gray-700/20">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Rating Distribution
                </h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => {
                    const count = ratingDistribution[rating];
                    const percentage =
                      totalReviewsCount > 0
                        ? (count / totalReviewsCount) * 100
                        : 0;

                    return (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex items-center min-w-0">
                          <span className="text-sm text-gray-600 dark:text-gray-400 mr-1">
                            {rating}
                          </span>
                          <StarRating rating={1} size="w-3 h-3" />
                        </div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[3ch] text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-6 border-t border-gray-200/30 dark:border-gray-700/20">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Filter by Rating
                </h4>
                <div className="space-y-2">
                  {['all', '5', '4', '3', '2', '1'].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setFilterRating(rating)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterRating === rating
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      {rating === 'all' ? 'All Reviews' : `${rating} Stars`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Reviews */}
          <div className="lg:col-span-3">
            {/* Reviews Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/40 dark:border-gray-700/30">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Reviews ({filteredReviews.length})
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {startIndex + 1}-{Math.min(endIndex, totalReviews)} of{' '}
                  {totalReviews} reviews
                </p>
              </div>

              {/* Quick pagination info */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
            </div>{' '}
            {/* Reviews List */}
            <div className="space-y-6">
              {currentReviews.length > 0 ? (
                currentReviews.map(review => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200/50 dark:border-gray-700/30 pb-6 hover:bg-gray-50/30 dark:hover:bg-gray-800/20 rounded-lg p-4 -m-4 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {review.user.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {review.user}
                            </span>
                            {review.verified && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <StarRating rating={review.rating} size="w-4 h-4" />
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50/30 dark:bg-gray-800/20 rounded-lg border border-dashed border-gray-300/50 dark:border-gray-600/30">
                  <div className="text-gray-400 dark:text-gray-500 mb-2">
                    <svg
                      className="w-12 h-12 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No reviews found matching your criteria.
                  </p>
                </div>
              )}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 pt-6 border-t border-gray-200/40 dark:border-gray-700/30 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300 dark:border-gray-600"
                  >
                    ←
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        const delta = 2;
                        return (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - delta &&
                            page <= currentPage + delta)
                        );
                      })
                      .map((page, index, array) => {
                        const shouldShowEllipsis =
                          index > 0 && page - array[index - 1] > 1;

                        return (
                          <React.Fragment key={page}>
                            {shouldShowEllipsis && (
                              <span className="px-2 py-2 text-gray-500 dark:text-gray-400">
                                ...
                              </span>
                            )}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                                currentPage === page
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        );
                      })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300 dark:border-gray-600"
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewListPage;
