import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import Paginator from '../components/ui/Paginator';
import OrderProgressBar from '../components/ui/OrderProgressBar';
import {
  selectAllOrders,
  selectOrdersLoading,
  selectOrdersError,
  fetchOrders,
} from '../store/slices/ordersSlice';
import { filterOrders } from '../utils/orderHelpers';

function OrdersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get orders from Redux store
  const allOrders = useSelector(selectAllOrders);
  const isLoadingOrders = useSelector(selectOrdersLoading);
  const ordersError = useSelector(selectOrdersError);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [timeFilterOpen, setTimeFilterOpen] = useState(false);
  const ordersPerPage = 5;

  // Fetch orders on mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const timeFilters = [
    { value: 'past-3-months', label: 'Past Three Months' },
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: 'all-time', label: 'All Orders' },
  ];

  // Ensure allOrders is always an array
  const ordersArray = Array.isArray(allOrders) ? allOrders : [];

  // Filter orders using the helper function from ordersSlice
  const filteredOrders = filterOrders(
    ordersArray,
    searchTerm,
    statusFilter,
    timeFilter
  );

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
    // Use the loading state from Redux
    if (!isLoadingOrders) {
      setLoading(false);
    }
  }, [isLoadingOrders]);

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

  if (ordersError) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <svg
                className="h-12 w-12 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
                Failed to Load Orders
              </h3>
              <p className="text-red-700 dark:text-red-300 mb-4">
                {ordersError}
              </p>
              <button
                onClick={() => dispatch(fetchOrders())}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
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
        {/* Back Button */}
        <button
          onClick={() => navigate('/account')}
          className="mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="font-medium">Back to Account</span>
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 uppercase tracking-wide">
              Your Orders
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Order
            </span>{' '}
            <span className="text-gray-900 dark:text-white">History</span>
          </h1>
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            {/* Status Filter - Left Side */}
            <div className="relative status-filter-dropdown w-full sm:w-auto">
              <button
                onClick={() => setStatusFilterOpen(!statusFilterOpen)}
                className="flex items-center justify-between sm:justify-start space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors w-full sm:w-auto"
              >
                <span className="text-left">
                  Status:{' '}
                  {statusOptions.find(option => option.value === statusFilter)
                    ?.label || 'All Orders'}
                </span>
                <ChevronDownIcon
                  className={`h-4 w-4 flex-shrink-0 transition-transform ${
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
            <div className="relative time-filter-dropdown w-full sm:w-auto">
              <button
                onClick={() => setTimeFilterOpen(!timeFilterOpen)}
                className="flex items-center justify-between sm:justify-start space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors w-full sm:w-auto"
              >
                <span className="text-left">
                  Time:{' '}
                  {timeFilters.find(filter => filter.value === timeFilter)
                    ?.label || 'past three months'}
                </span>
                <ChevronDownIcon
                  className={`h-4 w-4 flex-shrink-0 transition-transform ${timeFilterOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Time Filter Dropdown Menu */}
              {timeFilterOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
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
                          {order.orderNumber || order.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                          Date placed
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                          Total amount
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          ${order.totalAmount?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-2 sm:flex-shrink-0">
                      <Link
                        to={`/account/orders/${order.id}`}
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
                    {order.items?.map((item, itemIndex) => (
                      <div key={item.id}>
                        <div className="flex items-start gap-4 mb-3">
                          <div className="flex-shrink-0">
                            {item.productImageUrl ? (
                              <img
                                src={item.productImageUrl}
                                alt={item.productName}
                                className="w-20 h-20 object-cover rounded-md bg-gray-100 dark:bg-gray-700"
                                onError={e => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    'https://via.placeholder.com/80?text=No+Image';
                                }}
                              />
                            ) : (
                              <div className="w-20 h-20 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700 text-gray-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                              {item.productName}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Quantity: {item.quantity}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <Link
                                to={`/products/${item.productId}`}
                                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                              >
                                View Product
                              </Link>
                              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                                Buy Again
                              </button>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <p className="text-base font-semibold text-gray-900 dark:text-white">
                              ${item.unitPrice?.toFixed(2) || '0.00'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Order Status Progress Bar */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                      <OrderProgressBar status={order.status} />
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
        {allOrders.length === 0 && (
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
