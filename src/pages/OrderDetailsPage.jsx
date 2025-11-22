import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import OrderProgressBar from '../components/ui/OrderProgressBar';
import ordersAPI from '../api/ordersAPI';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        // Debug: Check authentication
        const token = localStorage.getItem('accessToken');
        console.log('🔑 Has token:', !!token);

        const response = await ordersAPI.getOrderById(orderId);
        console.log('📦 Order details fetched:', response);

        // Extract order data - handle both wrapped and unwrapped responses
        const orderData = response.data || response;
        setOrder(orderData);
        setError(null);
      } catch (err) {
        console.error('❌ Failed to fetch order:', err);
        console.error('❌ Error response:', err.response?.data);
        setError(err.message || 'Failed to load order');
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {error ? 'Error Loading Order' : 'Order not found'}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {error || "The order you're looking for doesn't exist."}
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => navigate('/account/orders')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View All Orders
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Go Home
            </button>
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

      <div className="relative max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/account/orders')}
          className="mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="font-medium">Back to Orders</span>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Order {order.orderNumber || order.id}
            </h1>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
              View invoice →
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Order placed{' '}
            <span className="font-medium text-gray-900 dark:text-white">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'N/A'}
            </span>
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {/* Order Items Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {order.items?.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      {item.productImageUrl ? (
                        <img
                          src={item.productImageUrl}
                          alt={item.productName}
                          className="w-24 h-24 rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
                          onError={e => {
                            e.target.onerror = null;
                            e.target.src =
                              'https://via.placeholder.com/96?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-24 h-24 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        ${item.unitPrice?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                  {index < order.items.length - 1 && (
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700"></div>
                  )}
                </div>
              )) || <p className="text-gray-500">No items found</p>}
            </div>
          </div>

          {/* Order Progress Section */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              Order Status: {order.status}
            </p>

            {/* Progress Bar */}
            <OrderProgressBar status={order.status} />
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            {/* Delivery Address */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Shipping address
              </h3>
              {order.shippingAddress ? (
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && (
                    <p>{order.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No address provided</p>
              )}

              {(order.customerName ||
                order.customerEmail ||
                order.customerPhone) && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Contact information
                  </h4>
                  {order.customerName && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.customerName}
                    </p>
                  )}
                  {order.customerEmail && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.customerEmail}
                    </p>
                  )}
                  {order.customerPhone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.customerPhone}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Payment Information */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Payment information
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Payment Status: {order.paymentStatus || 'Pending'}</p>
                <p className="mt-2">
                  Shipping Status: {order.shippingStatus || 'Pending'}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Billing address
              </h3>
              {order.billingAddress ? (
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5 mb-6">
                  <p>{order.billingAddress.addressLine1}</p>
                  {order.billingAddress.addressLine2 && (
                    <p>{order.billingAddress.addressLine2}</p>
                  )}
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state}{' '}
                    {order.billingAddress.zipCode}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-6">
                  Same as shipping address
                </p>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="text-gray-900 dark:text-white text-right">
                    ${order.subtotal?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="text-gray-900 dark:text-white text-right">
                    ${order.shippingCost?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white text-right">
                    ${order.taxAmount?.toFixed(2) || '0.00'}
                  </span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Discount
                    </span>
                    <span className="text-green-600 dark:text-green-400 text-right">
                      -${order.discountAmount?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Order total
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-right">
                      ${order.totalAmount?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
