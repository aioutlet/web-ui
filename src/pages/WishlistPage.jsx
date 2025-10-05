import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, openCart } from '../store/slices/cartSlice';
import { userData } from '../data/user';
import { HeartIcon } from '@heroicons/react/24/outline';

const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Wishlist Data - Initialize from imported user data
  const [wishlistItems, setWishlistItems] = useState(userData.wishlist);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveFromWishlist = itemId => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleMoveToCart = item => {
    // Add item to cart
    dispatch(addToCart(item));
    // Open cart sidebar on desktop
    if (window.innerWidth >= 1024) {
      dispatch(openCart());
    }
    // Remove from wishlist
    handleRemoveFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Wishlist
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}{' '}
            saved
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          // Empty State
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
            <div className="text-center">
              <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Save items you love for later
              </p>
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Start Shopping
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Why use a wishlist?
              </h4>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Save items you love and come back to them later</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Get notified when items go on sale or are back in stock
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Share your wishlist with friends and family</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Wishlist Items Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-200"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[40px]">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {item.rating}
                    </span>
                  </div>

                  {/* Price */}
                  <p className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    ${item.price}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {item.inStock ? (
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors duration-200"
                      >
                        Move to Cart
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg text-sm cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm transition-colors duration-200"
                      aria-label="Remove from wishlist"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
