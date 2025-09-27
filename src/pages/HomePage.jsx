import React from 'react';
import Hero from '../components/home/Hero';
import ShopByCategory from '../components/home/ShopByCategory';
import TrendingProducts from '../components/home/TrendingProducts';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ShopByCategory />
      <TrendingProducts />

      {/* Additional Homepage Sections */}
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Why Choose AIOutlet
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Discover what makes us your preferred e-commerce destination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Free Shipping',
                description: 'Free shipping on orders over $50',
                icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock customer service',
                icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
              },
              {
                title: 'Easy Returns',
                description: '30-day hassle-free returns',
                icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 text-center border border-gray-100 dark:border-gray-700 group cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
