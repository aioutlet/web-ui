import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Paginator from '../components/ui/Paginator';

const getOrderProgress = status => {
  const steps = ['Processing', 'Shipped', 'Delivered'];
  const currentIndex = steps.indexOf(status);

  if (status === 'Cancelled') {
    return { percentage: 0, currentStep: 'Cancelled', totalSteps: 3 };
  }

  return {
    percentage:
      currentIndex >= 0 ? ((currentIndex + 1) / steps.length) * 100 : 0,
    currentStep: status,
    totalSteps: steps.length,
  };
};

const getProgressColor = status => {
  switch (status) {
    case 'Processing':
      return 'bg-yellow-500';
    case 'Shipped':
      return 'bg-blue-500';
    case 'Delivered':
      return 'bg-green-500';
    case 'Cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

// Helper function to get the primary image for an order
const getOrderPrimaryImage = order => {
  // For single item orders, use the item image
  if (order.items.length === 1) {
    return order.items[0].image;
  }
  // For multi-item orders, use the first item's image or a default
  return order.items[0]?.image || order.items[0].image;
};

// Helper function to get order title and description
const getOrderDisplayInfo = order => {
  if (order.items.length === 1) {
    return {
      title: order.items[0].title,
      description: order.items[0].description,
    };
  }

  // For multiple items, show count and primary item
  const primaryItem = order.items[0];
  const additionalCount = order.items.length - 1;

  return {
    title: `${primaryItem.title} + ${additionalCount} more item${additionalCount > 1 ? 's' : ''}`,
    description: `${order.items.length} items total`,
  };
};

const mockOrders = [
  {
    id: '12345',
    status: 'Processing',
    placedDate: 'December 15, 2024',
    total: '$149.98',
    items: [
      {
        id: 1,
        title: 'Wireless Headphones',
        description: 'Premium quality wireless headphones',
        image:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
        price: 99.99,
        quantity: 1,
      },
      {
        id: 2,
        title: 'Phone Case',
        description: 'Protective silicone case',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
        price: 49.99,
        quantity: 1,
      },
    ],
  },
  {
    id: '12346',
    status: 'Shipped',
    placedDate: 'December 14, 2024',
    total: '$159.99',
    items: [
      {
        id: 3,
        title: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking',
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
        price: 159.99,
        quantity: 1,
      },
    ],
  },
  {
    id: '12347',
    status: 'Delivered',
    placedDate: 'December 12, 2024',
    total: '$49.99',
    items: [
      {
        id: 4,
        title: 'Phone Case',
        description: 'Protective phone case with premium materials',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
        price: 49.99,
        quantity: 1,
      },
    ],
  },
  {
    id: '12348',
    status: 'Processing',
    placedDate: 'December 13, 2024',
    total: '$378.97',
    items: [
      {
        id: 5,
        title: 'Running Shoes',
        description: 'Professional running shoes for athletes',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
        price: 299.99,
        quantity: 1,
      },
      {
        id: 6,
        title: 'Sports Socks',
        description: 'Moisture-wicking athletic socks',
        image:
          'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop&crop=center',
        price: 39.99,
        quantity: 2,
      },
    ],
  },
  {
    id: '12349',
    status: 'Shipped',
    placedDate: 'December 11, 2024',
    total: '$79.99',
    items: [
      {
        id: 7,
        title: 'Backpack',
        description: 'Durable travel backpack with multiple compartments',
        image:
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&crop=center',
        price: 79.99,
        quantity: 1,
      },
    ],
  },
  {
    id: '12350',
    status: 'Delivered',
    placedDate: 'December 10, 2024',
    total: '$169.97',
    items: [
      {
        id: 8,
        title: 'Sunglasses',
        description: 'Stylish sunglasses with UV protection',
        image:
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center',
        price: 39.99,
        quantity: 1,
      },
      {
        id: 9,
        title: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness',
        image:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
        price: 129.99,
        quantity: 1,
      },
    ],
  },
  {
    id: '12351',
    status: 'Processing',
    placedDate: 'December 9, 2024',
    total: '$199.99',
    items: [
      {
        id: 10,
        title: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with excellent sound',
        image:
          'https://images.unsplash.com/photo-1505740106531-4243f3831c78?w=400&h=400&fit=crop&crop=center',
        price: 199.99,
        quantity: 1,
      },
    ],
  },
  {
    id: '12352',
    status: 'Cancelled',
    placedDate: 'December 8, 2024',
    total: '$89.99',
    items: [
      {
        id: 11,
        title: 'Laptop Stand',
        description: 'Adjustable laptop stand for better ergonomics',
        image:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center',
        price: 89.99,
        quantity: 1,
      },
    ],
  },
  {
    id: '12353',
    status: 'Shipped',
    placedDate: 'December 7, 2024',
    total: '$90.96',
    items: [
      {
        id: 12,
        title: 'Coffee Mug',
        description: 'Insulated coffee mug for hot beverages',
        image:
          'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=400&fit=crop&crop=center',
        price: 25.99,
        quantity: 1,
      },
      {
        id: 13,
        title: 'Notebook Set',
        description: 'Premium leather-bound notebook set',
        image:
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
        price: 64.97,
        quantity: 1,
      },
    ],
  },
  {
    id: '12354',
    status: 'Delivered',
    placedDate: 'December 6, 2024',
    total: '$129.99',
    items: [
      {
        id: 14,
        title: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness',
        image:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
        price: 129.99,
        quantity: 1,
      },
    ],
  },
  {
    id: '12355',
    status: 'Processing',
    placedDate: 'December 5, 2024',
    total: '$49.99',
    items: [
      {
        id: 15,
        title: 'Notebook',
        description: 'Premium leather-bound notebook',
        image:
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
        price: 49.99,
        quantity: 1,
      },
    ],
  },
  {
    id: '12356',
    status: 'Delivered',
    placedDate: 'December 4, 2024',
    total: '$95.94',
    items: [
      {
        id: 16,
        title: 'Pen Set',
        description: 'Professional pen set for writing',
        image:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center',
        price: 15.99,
        quantity: 2,
      },
      {
        id: 17,
        title: 'Desk Organizer',
        description: 'Bamboo desk organizer with compartments',
        image:
          'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop&crop=center',
        price: 63.96,
        quantity: 1,
      },
    ],
  },
];

function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('past-3-months');
  const [timeFilterOpen, setTimeFilterOpen] = useState(false);
  const ordersPerPage = 5;

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const timeFilters = [
    { value: 'past-3-months', label: 'past three months' },
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: 'all-time', label: 'all orders' },
  ];

  // Filter orders based on search term and status filter
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(
        item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === 'all' || order.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (timeFilterOpen && !event.target.closest('.time-filter-dropdown')) {
        setTimeFilterOpen(false);
      }
      if (
        statusFilterOpen &&
        !event.target.closest('.status-filter-dropdown')
      ) {
        setStatusFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [timeFilterOpen, statusFilterOpen]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Loading your orders...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
      {/* Connecting gradient for flow */}
      <div className="absolute -inset-y-8 inset-x-0 bg-gradient-to-b from-indigo-50/20 via-transparent to-indigo-50/20 dark:from-indigo-900/5 dark:to-indigo-900/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Order history
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Check the status of recent orders, manage returns, and download
            invoices.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search orders by ID, product name, or description..."
              className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Filters and Sort Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {/* Status Filter - Left Side */}
            <div className="relative status-filter-dropdown">
              <button
                onClick={() => setStatusFilterOpen(!statusFilterOpen)}
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <span>
                  Status:{' '}
                  {statusOptions.find(option => option.value === statusFilter)
                    ?.label || 'All Orders'}
                </span>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    statusFilterOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Status Filter Dropdown Menu */}
              {statusFilterOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    {statusOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setStatusFilter(option.value);
                          setStatusFilterOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          statusFilter === option.value
                            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Time Sort - Right Side */}
            <div className="relative time-filter-dropdown">
              <button
                onClick={() => setTimeFilterOpen(!timeFilterOpen)}
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <span>
                  Time:{' '}
                  {timeFilters.find(filter => filter.value === timeFilter)
                    ?.label || 'past three months'}
                </span>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${timeFilterOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Time Filter Dropdown Menu */}
              {timeFilterOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    {timeFilters.map(filter => (
                      <button
                        key={filter.value}
                        onClick={() => {
                          setTimeFilter(filter.value);
                          setTimeFilterOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          timeFilter === filter.value
                            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {filteredOrders.length}{' '}
          {filteredOrders.length === 1 ? 'order' : 'orders'} found
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {currentOrders.map((order, index) => {
            const progress = getOrderProgress(order.status);
            return (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    {/* Order Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                          Order number
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                          Date placed
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.placedDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                          Total amount
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.total}
                        </p>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-2 sm:flex-shrink-0">
                      <Link
                        to={`/orders/${order.id}`}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        View Order
                      </Link>
                      <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        View Invoice
                      </button>
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="space-y-6">
                    {order.items.map((item, itemIndex) => (
                      <div key={item.id}>
                        <div className="flex items-start gap-4 mb-3">
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded-md bg-gray-100 dark:bg-gray-700"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                              {item.description}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Quantity: {item.quantity}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-3">
                              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                                View Product
                              </button>
                              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                                Buy Again
                              </button>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <p className="text-base font-semibold text-gray-900 dark:text-white">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Order Status Progress Bar */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {progress.currentStep}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {order.status === 'Cancelled'
                            ? 'Order cancelled'
                            : `${Math.round(progress.percentage)}% complete`}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(order.status)}`}
                          style={{ width: `${progress.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Empty State */}
        {mockOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Start shopping to see your orders here.
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
