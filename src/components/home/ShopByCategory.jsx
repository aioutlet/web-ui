import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../api/endpoints';

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending categories from BFF
  useEffect(() => {
    const fetchTrendingCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_ENDPOINTS.HOME.TRENDING_CATEGORIES}?limit=5`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch trending categories');
        }

        const data = await response.json();

        if (data.success && data.data) {
          // Map BFF response to component format
          const mappedCategories = data.data.map((category, index) => ({
            id: index + 1,
            title: category.name,
            displayName: category.displayName,
            link: `/products?category=${encodeURIComponent(category.name)}`,
            image: category.image,
            description: category.displayName,
            productCount: category.product_count,
            avgRating: category.avg_rating,
          }));

          setCategories(mappedCategories);
        }
      } catch (err) {
        console.error('Error fetching trending categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCategories();
  }, []);

  return (
    <section className="relative bg-gray-50 dark:bg-gray-800/50 py-16 sm:py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
      {/* Connecting gradient for flow */}
      <div className="absolute -inset-y-8 inset-x-0 bg-gradient-to-b from-pink-50/20 via-transparent to-indigo-50/20 dark:from-pink-900/5 dark:to-indigo-900/5" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-12"></div>
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                Explore
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-12"></div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            <span className="text-gray-900 dark:text-white">Shop by</span>{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              Category
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Browse our carefully curated collections. From the latest tech to
            lifestyle essentials.
          </p>
          <Link
            to="/categories"
            className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            Browse all categories
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <svg
                className="w-8 h-8 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Unable to Load Categories
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              We're having trouble loading trending categories. Please try again
              later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-x-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors"
            >
              Try Again
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Category Grid */}
        {!loading && categories.length > 0 && (
          <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {categories.map(category => (
              <article
                key={category.id}
                className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                {/* Product Count Badge */}
                {category.productCount && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {category.productCount}{' '}
                        {category.productCount === 1 ? 'product' : 'products'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  <div className="mr-8">{category.description}</div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <Link to={category.link}>
                    <span className="absolute inset-0" />
                    {category.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        )}

        {/* No Categories State */}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No categories available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByCategory;
