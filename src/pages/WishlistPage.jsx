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
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
      {/* Connecting gradient for flow */}
      <div className="absolute -inset-y-8 inset-x-0 bg-gradient-to-b from-indigo-50/20 via-transparent to-indigo-50/20 dark:from-indigo-900/5 dark:to-indigo-900/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 uppercase tracking-wide">
              Your Favorites
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              My
            </span>{' '}
            <span className="text-gray-900 dark:text-white">Wishlist</span>
          </h1>
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
                <div
                  className="relative aspect-square bg-gray-100 dark:bg-gray-700 cursor-pointer"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
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
                  <h3
                    className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[40px] cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    onClick={() => navigate(`/products/${item.id}`)}
                  >
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
