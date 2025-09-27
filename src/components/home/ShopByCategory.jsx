import React from 'react';
import { Link } from 'react-router-dom';

const ShopByCategory = () => {
  const categories = [
    {
      id: 1,
      title: 'New Arrivals',
      link: '/collections/new-arrivals',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      title: 'Productivity',
      link: '/collections/productivity',
      image:
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      title: 'Workspace',
      link: '/collections/workspace',
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      title: 'Accessories',
      link: '/collections/accessories',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 5,
      title: 'Sale',
      link: '/collections/sale',
      image:
        'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Shop by Category
          </h2>
          <Link
            to="/categories"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center space-x-1 group transition-colors duration-200"
          >
            <span className="relative inline-block">
              Browse all categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-200 ease-out"></span>
            </span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Category Grid - Horizontal Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(category => (
            <div key={category.id} className="group">
              <Link to={category.link} className="block">
                {/* Card Container */}
                <div className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden aspect-square hover:shadow-lg transition-all duration-300">
                  {/* Product Image */}
                  <div className="absolute inset-0 p-6 flex items-center justify-center">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Category Title */}
                <div className="mt-3 text-center">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 relative inline-block">
                    {category.title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-200 ease-out"></span>
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
