import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import bffClient from '../api/bffClient';
import { ShoppingBagIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const CategoryListPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all categories from BFF
  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['all-categories'],
    queryFn: async () => {
      const response = await bffClient.get('/api/products/categories');
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
  });

  const categories = categoriesResponse?.data || [];

  // Category metadata for display (department, images, descriptions)
  const categoryMetadata = {
    women: {
      name: 'Women',
      description: 'Explore the latest fashion trends and styles',
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
      gradient: 'from-pink-500 to-rose-500',
      categories: [
        {
          name: 'Clothing',
          subcategories: ['Tops', 'Dresses', 'Pants'],
          image:
            'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
        },
        {
          name: 'Accessories',
          subcategories: ['Jewelry', 'Bags'],
          image:
            'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400',
        },
      ],
    },
    men: {
      name: 'Men',
      description: 'Discover classic and modern styles',
      image:
        'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=600&fit=crop',
      gradient: 'from-blue-500 to-indigo-500',
      categories: [
        {
          name: 'Clothing',
          subcategories: ['Shirts', 'Pants'],
          image:
            'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400',
        },
        {
          name: 'Accessories',
          subcategories: ['Belts', 'Watches'],
          image:
            'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400',
        },
      ],
    },
    kids: {
      name: 'Kids',
      description: 'Fun and comfortable styles for children',
      image:
        'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&h=600&fit=crop',
      gradient: 'from-yellow-500 to-orange-500',
      categories: [
        {
          name: 'Clothing',
          subcategories: ['Tops', 'Jackets'],
          image:
            'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400',
        },
        {
          name: 'Footwear',
          subcategories: ['Sneakers'],
          image:
            'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400',
        },
      ],
    },
    electronics: {
      name: 'Electronics',
      description: 'Latest gadgets and technology',
      image:
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop',
      gradient: 'from-purple-500 to-indigo-500',
      categories: [
        {
          name: 'Mobile',
          subcategories: ['Smartphones'],
          image:
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        },
        {
          name: 'Audio',
          subcategories: ['Headphones'],
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        },
        {
          name: 'Computers',
          subcategories: ['Laptops', 'Tablets'],
          image:
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        },
        {
          name: 'Gaming',
          subcategories: ['Consoles'],
          image:
            'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
        },
      ],
    },
    sports: {
      name: 'Sports',
      description: 'Gear up for your active lifestyle',
      image:
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
      gradient: 'from-green-500 to-teal-500',
      categories: [
        {
          name: 'Footwear',
          subcategories: ['Running', 'Basketball'],
          image:
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        },
        {
          name: 'Apparel',
          subcategories: ['Jackets', 'Shorts'],
          image:
            'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400',
        },
      ],
    },
    books: {
      name: 'Books',
      description: 'Explore worlds of knowledge and imagination',
      image:
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&fit=crop',
      gradient: 'from-amber-500 to-red-500',
      categories: [
        {
          name: 'Fiction',
          subcategories: ['Contemporary', 'Fantasy'],
          image:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        },
        {
          name: 'Nonfiction',
          subcategories: ['SelfHelp', 'Biography'],
          image:
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        },
      ],
    },
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="flex justify-center items-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading categories...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
              <svg
                className="w-10 h-10 text-red-600 dark:text-red-400"
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
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Unable to Load Categories
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We're having trouble loading categories. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-x-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient - matching ProductListPage */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />

      {/* Categories Section */}
      <div className="relative">
        {/* Available Categories Info */}
        {categories.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {categories.length}
              </span>{' '}
              {categories.length === 1 ? 'category' : 'categories'}
            </p>
          </div>
        )}

        {/* Department Grid - Each with different background */}
        {Object.entries(categoryMetadata).map(([key, department], index) => {
          // Alternate background colors for each section
          const bgColors = [
            'bg-gray-100 dark:bg-gray-800',
            'bg-gray-50 dark:bg-gray-800/50',
            'bg-white dark:bg-gray-900',
            'bg-gray-100 dark:bg-gray-800',
            'bg-gray-50 dark:bg-gray-800/50',
            'bg-white dark:bg-gray-900',
          ];

          const gradients = [
            'from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-indigo-900/20 dark:via-purple-900/15 dark:to-pink-900/20',
            'from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20',
            'from-pink-50/50 via-purple-50/30 to-indigo-50/50 dark:from-pink-900/20 dark:via-purple-900/15 dark:to-indigo-900/20',
            'from-purple-50/60 via-pink-50/30 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20',
            'from-indigo-50/50 via-blue-50/30 to-purple-50/50 dark:from-indigo-900/20 dark:via-blue-900/15 dark:to-purple-900/20',
            'from-pink-50/60 via-indigo-50/30 to-purple-50/50 dark:from-pink-900/20 dark:via-indigo-900/15 dark:to-purple-900/20',
          ];

          return (
            <section key={key} className={`relative ${bgColors[index]} py-12`}>
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[index]}`}
              />
              {/* Connecting gradient for flow */}
              <div className="absolute -inset-y-8 inset-x-0 bg-gradient-to-b from-purple-50/20 via-transparent to-purple-50/20 dark:from-purple-900/5 dark:to-purple-900/5" />

              <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Department Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-1 h-10 bg-gradient-to-b ${department.gradient} rounded-full`}
                    ></div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {department.name}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {department.description}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/products?department=${key}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group"
                  >
                    View all products
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Category Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {department.categories.map((category, idx) => (
                    <Link
                      key={idx}
                      to={`/products?department=${key}&category=${category.name.toLowerCase()}`}
                      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                    >
                      {/* Category Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      </div>

                      {/* Category Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {category.name}
                        </h3>

                        {/* Subcategories */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {category.subcategories.map((sub, subIdx) => (
                            <span
                              key={subIdx}
                              className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>

                        {/* Browse Button */}
                        <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300">
                          <ShoppingBagIcon className="w-4 h-4" />
                          <span>Shop Now</span>
                          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* No Categories State */}
        {categories.length === 0 && !isLoading && !error && (
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <ShoppingBagIcon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Categories Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Check back soon for new categories.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryListPage;
