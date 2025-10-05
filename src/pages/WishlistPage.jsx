import React from 'react';
import { Link } from 'react-router-dom';

const HeartIcon = () => (
  <svg
    className="w-16 h-16 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const WishlistPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Wishlist
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Save your favorite items for later
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-700">
              <HeartIcon />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
              Your wishlist is empty
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Start adding items to your wishlist by clicking the heart icon on
              products you love.
            </p>
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Start Shopping
              </Link>
            </div>
          </div>
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
    </div>
  );
};

export default WishlistPage;
