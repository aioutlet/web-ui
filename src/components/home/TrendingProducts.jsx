import React from 'react';
import { Link } from 'react-router-dom';

const TrendingProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Machined Pen',
      price: 35,
      color: 'Black',
      image:
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      colors: [
        { name: 'Black', value: '#000000' },
        { name: 'Gold', value: '#FFD700' },
        { name: 'Silver', value: '#C0C0C0' },
      ],
      link: '/products/machined-pen',
    },
    {
      id: 2,
      name: 'Earthen Mug',
      price: 28,
      color: 'Matte Black',
      image:
        'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      colors: [
        { name: 'Matte Black', value: '#2D2D2D' },
        { name: 'Cream', value: '#F5F5DC' },
      ],
      link: '/products/earthen-mug',
    },
    {
      id: 3,
      name: 'Leatherbound Daily Journal Set',
      price: 50,
      color: 'Natural',
      image:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      colors: [
        { name: 'Natural', value: '#D2B48C' },
        { name: 'Black', value: '#000000' },
        { name: 'Brown', value: '#8B4513' },
      ],
      link: '/products/journal-set',
    },
    {
      id: 4,
      name: 'Leatherbound Daily Journal',
      price: 50,
      color: 'Black',
      image:
        'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      colors: [
        { name: 'Black', value: '#000000' },
        { name: 'Brown', value: '#8B4513' },
        { name: 'Tan', value: '#D2B48C' },
      ],
      link: '/products/daily-journal',
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Trending products
          </h2>
          <Link
            to="/products"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center space-x-1 group transition-colors duration-200"
          >
            <span>See everything</span>
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="group">
              <Link to={product.link} className="block">
                {/* Product Image */}
                <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden aspect-square mb-4 group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  {/* Color and Name */}
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {product.color}
                    </p>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${product.price}
                  </p>

                  {/* Color Swatches */}
                  <div className="flex space-x-2 pt-1">
                    {product.colors.map((color, index) => (
                      <button
                        key={color.name}
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                          color.name === product.color
                            ? 'border-gray-400 dark:border-gray-500'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
