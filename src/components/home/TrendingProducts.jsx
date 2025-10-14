import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBadgeStyles } from '../../utils/productHelpers';
import { API_ENDPOINTS } from '../../api/endpoints';

const TrendingProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending products from BFF
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_ENDPOINTS.HOME.TRENDING}?limit=4`);

        if (!response.ok) {
          throw new Error('Failed to fetch trending products');
        }

        const data = await response.json();

        if (data.success && data.data) {
          // Map BFF response to component format
          const mappedProducts = data.data.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image:
              product.images && product.images.length > 0
                ? product.images[0]
                : 'https://via.placeholder.com/400x400',
            rating: product.reviews?.averageRating || 0,
            reviews: product.reviews?.reviewCount || 0,
            inStock: product.inventory?.inStock || false,
            link: `/products/${product.id}`,
            badge:
              product.badge ||
              (product.inventory?.inStock ? null : 'Out of Stock'),
          }));

          setProducts(mappedProducts);
        }
      } catch (err) {
        console.error('Error fetching trending products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  const handleViewDetails = productLink => {
    navigate(productLink);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gray-100 dark:bg-gray-800 py-16 sm:py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-indigo-900/20 dark:via-purple-900/15 dark:to-pink-900/20" />
      {/* Connecting gradient for flow */}
      <div className="absolute -inset-y-8 inset-x-0 bg-gradient-to-b from-purple-50/20 via-transparent to-purple-50/20 dark:from-purple-900/5 dark:to-purple-900/5" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                Featured
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Trending
            </span>{' '}
            <span className="text-gray-900 dark:text-white">Products</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Discover what's popular right now. Hand-picked products that our
            customers love most.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
          >
            See all products
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">
              Unable to load trending products. Please try again later.
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {products.map(product => (
              <article
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Badge */}
                  <div className="absolute left-4 top-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ${getBadgeStyles(product.badge)}`}
                    >
                      {product.badge}
                    </span>
                  </div>
                  {/* Price Badge */}
                  <div className="absolute right-4 top-4">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-x-4 text-xs">
                    {product.category && (
                      <div className="text-gray-500 dark:text-gray-400">
                        {product.category}
                      </div>
                    )}
                    {product.rating && (
                      <div className="flex items-center gap-x-1">
                        <svg
                          className="h-3 w-3 fill-current text-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          {product.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Title with fixed height */}
                  <div className="group relative flex-1">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      <button
                        onClick={() => handleViewDetails(product.link)}
                        className="absolute inset-0 text-left"
                      />
                      {product.name}
                    </h3>
                  </div>

                  {/* Color Swatches - only show if colors available */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mt-4 flex gap-2">
                      {product.colors.map(color => (
                        <button
                          key={color.name}
                          className="h-6 w-6 rounded-full border-2 transition-all hover:scale-110 border-gray-300 dark:border-gray-600 hover:border-gray-400"
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  )}

                  {/* Fixed position button */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleViewDetails(product.link)}
                      className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* No Products State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No trending products available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
