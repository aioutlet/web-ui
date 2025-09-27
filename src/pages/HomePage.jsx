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
      <div className="bg-gray-100 dark:bg-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Why Choose AIOutlet
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Discover what makes us your preferred e-commerce destination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Free returns',
                description:
                  'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
                icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
              },
              {
                title: 'Same day delivery',
                description:
                  'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
                icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
              },
              {
                title: 'All year discount',
                description:
                  'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
              },
              {
                title: 'For the planet',
                description:
                  "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
                icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
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
