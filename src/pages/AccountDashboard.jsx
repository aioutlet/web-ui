import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  MapPinIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  HeartIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

/**
 * AccountDashboard Component
 *
 * Landing page for account management - Amazon-style dashboard
 * Shows cards for different account sections that users can navigate to
 */
const AccountDashboard = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const accountSections = [
    {
      id: 'orders',
      title: 'Your Orders',
      description:
        'Track, return, cancel an order, download invoice or buy again',
      icon: ShoppingBagIcon,
      path: '/orders',
      color: 'indigo',
    },
    {
      id: 'profile',
      title: 'Login & Profile',
      description: 'Manage your name, email, phone and personal information',
      icon: UserCircleIcon,
      path: '/account/profile',
      color: 'blue',
    },
    {
      id: 'addresses',
      title: 'Your Addresses',
      description: 'Edit, remove or set default shipping addresses',
      icon: MapPinIcon,
      path: '/account/addresses',
      color: 'green',
    },
    {
      id: 'payments',
      title: 'Payment Methods',
      description: 'Manage or add payment methods and view your transactions',
      icon: CreditCardIcon,
      path: '/account/payments',
      color: 'purple',
    },
    {
      id: 'security',
      title: 'Login & Security',
      description: 'Manage password, email and mobile number',
      icon: ShieldCheckIcon,
      path: '/account/security',
      color: 'red',
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      description: 'Manage your email and push notification settings',
      icon: BellIcon,
      path: '/account/notifications',
      color: 'yellow',
    },
    {
      id: 'wishlist',
      title: 'Your Wishlist',
      description: 'View and manage items saved for later',
      icon: HeartIcon,
      path: '/wishlist',
      color: 'pink',
    },
    {
      id: 'reviews',
      title: 'Your Reviews',
      description: 'See all reviews written for products',
      icon: ClipboardDocumentListIcon,
      path: '/account/reviews',
      color: 'cyan',
    },
  ];

  const handleNavigate = path => {
    navigate(path);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
      {/* Connecting gradient for flow */}
      <div className="absolute -inset-y-8 inset-x-0 bg-gradient-to-b from-indigo-50/20 via-transparent to-indigo-50/20 dark:from-indigo-900/5 dark:to-indigo-900/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 uppercase tracking-wide">
              Account Management
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Your
            </span>{' '}
            <span className="text-gray-900 dark:text-white">Account</span>
          </h1>
          <p className="text-lg leading-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your account settings, orders, and preferences all in one
            place
          </p>
        </div>

        {/* Account Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountSections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => handleNavigate(section.path)}
                className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 text-left"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/30 dark:group-hover:from-indigo-900/20 dark:group-hover:to-purple-900/10 rounded-xl transition-all duration-300" />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span>Go to {section.title.toLowerCase()}</span>
                    <svg
                      className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Find answers in our Help Center or contact our customer support
                team
              </p>
              <button
                onClick={() => navigate('/customer-service/contact')}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
              >
                Contact Customer Service →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
