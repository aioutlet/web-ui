import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Free returns',
      description:
        'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M7 10l5 5 5-5"
            stroke="#6366f1"
            opacity="0.6"
          />
        </svg>
      ),
    },
    {
      title: 'Same day delivery',
      description:
        'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
          <circle cx="12" cy="12" r="2" fill="#6366f1" opacity="0.6" />
        </svg>
      ),
    },
    {
      title: 'All year discount',
      description:
        'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 12h6"
            stroke="#8b5cf6"
            opacity="0.6"
          />
        </svg>
      ),
    },
    {
      title: 'For the planet',
      description:
        "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
          />
          <circle cx="12" cy="12" r="1" fill="#10b981" opacity="0.7" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative bg-white dark:bg-gray-900 py-16 sm:py-20 pb-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-pink-50/20 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />
      {/* Subtle connecting gradient for light mode separation */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-gray-50/60 dark:from-transparent dark:to-gray-900/40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pb-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-12"></div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">
                Benefits
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-12"></div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            <span className="text-gray-900 dark:text-white">Why Choose</span>{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent dark:from-green-400 dark:to-blue-400">
              AIOutlet
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Experience the difference with our commitment to quality, service,
            and customer satisfaction.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition-colors bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            Learn more
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
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={feature.title} className="text-center">
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm`}
              >
                <div className={feature.iconColor}>{feature.icon}</div>
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
