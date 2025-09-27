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
      description: 'Latest arrivals',
    },
    {
      id: 2,
      title: 'Electronics',
      link: '/collections/electronics',
      image:
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      description: 'Tech essentials',
    },
    {
      id: 3,
      title: 'Fashion',
      link: '/collections/fashion',
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      description: 'Style & trends',
    },
    {
      id: 4,
      title: 'Home & Living',
      link: '/collections/home',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      description: 'For your space',
    },
    {
      id: 5,
      title: 'Sale',
      link: '/collections/sale',
      image:
        'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      description: 'Best deals',
    },
  ];

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

        {/* Category Grid */}
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
      </div>
    </section>
  );
};

export default ShopByCategory;
