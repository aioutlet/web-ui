import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-pink-50/50 dark:from-indigo-900/20 dark:via-purple-900/15 dark:to-pink-900/20" />

      {/* Subtle connecting gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent dark:from-transparent dark:via-blue-900/10 dark:to-transparent" />

      {/* Center the content vertically in the available space below header */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-80px)] py-12">
        <div className="max-w-md mx-auto px-6">
          {/* 404 Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                  404
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                Page
              </span>{' '}
              <span className="text-gray-900 dark:text-white">not found</span>
            </h1>

            {/* Description */}
            <p className="text-lg leading-6 text-gray-600 dark:text-gray-300 mb-8 max-w-sm mx-auto">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-lg shadow-sm transition-colors duration-200"
            >
              Go back home
            </Link>

            <Link
              to="/customer-service/contact"
              className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors bg-indigo-50 dark:bg-indigo-900/20 px-4 py-3 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
            >
              Contact support
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
