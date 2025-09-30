import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading order data
    const fetchOrder = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock order data based on the screenshot
      const mockOrder = {
        id: orderId || '54879',
        orderNumber: `#${orderId || '54879'}`,
        status: 'Processing',
        placedDate: 'March 22, 2021',
        preparingToShipDate: 'March 24, 2021',
        items: [
          {
            id: 1,
            name: 'Nomad Tumbler',
            price: 35.0,
            quantity: 1,
            image:
              'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop&crop=center',
            description:
              'This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.',
          },
        ],
        shipping: {
          address: {
            name: 'Floyd Miles',
            street: '7363 Cynthia Pass',
            city: 'Toronto',
            state: 'ON',
            zip: 'N3Y 4H8',
          },
          method: 'Standard Shipping',
          cost: 5.0,
          updates: {
            email: 'f••••@example.com',
            phone: '1••••••••40',
          },
        },
        billing: {
          address: {
            name: 'Floyd Miles',
            street: '7363 Cynthia Pass',
            city: 'Toronto',
            state: 'ON',
            zip: 'N3Y 4H8',
          },
        },
        payment: {
          method: 'Visa',
          last4: '4242',
          expires: '02 / 24',
        },
        summary: {
          subtotal: 72.0,
          shipping: 5.0,
          tax: 6.16,
          total: 83.16,
        },
        tracking: {
          steps: [
            {
              name: 'Order placed',
              status: 'completed',
              date: 'March 22, 2021',
            },
            { name: 'Processing', status: 'current', date: null },
            { name: 'Shipped', status: 'pending', date: null },
            { name: 'Delivered', status: 'pending', date: null },
          ],
        },
      };

      setOrder(mockOrder);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order not found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The order you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Order {order.orderNumber}
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Order placed {order.placedDate}
              </p>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              View invoice →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Order Items
              </h2>
              {order.items.map(item => (
                <div key={item.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Preparing to ship on {order.preparingToShipDate}
              </h2>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {order.tracking.steps.map((step, index) => (
                    <div key={step.name} className="flex-1">
                      <div
                        className={`h-2 rounded-full ${
                          step.status === 'completed'
                            ? 'bg-indigo-600'
                            : step.status === 'current'
                              ? 'bg-indigo-600'
                              : 'bg-gray-200'
                        } ${index !== order.tracking.steps.length - 1 ? 'mr-2' : ''}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="flex justify-between">
                {order.tracking.steps.map(step => (
                  <div key={step.name} className="text-center flex-1">
                    <p
                      className={`text-sm font-medium ${
                        step.status === 'completed' || step.status === 'current'
                          ? 'text-indigo-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.name}
                    </p>
                    {step.date && (
                      <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Billing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Address */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Delivery address
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {order.shipping.address.name}
                  </p>
                  <p>{order.shipping.address.street}</p>
                  <p>
                    {order.shipping.address.city},{' '}
                    {order.shipping.address.state} {order.shipping.address.zip}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Shipping updates
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.shipping.updates.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.shipping.updates.phone}
                  </p>
                  <button className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 mt-2">
                    Edit
                  </button>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Payment information
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Ending with {order.payment.last4}</p>
                    <p>Expires {order.payment.expires}</p>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Billing address
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {order.billing.address.name}
                  </p>
                  <p>{order.billing.address.street}</p>
                  <p>
                    {order.billing.address.city}, {order.billing.address.state}{' '}
                    {order.billing.address.zip}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    ${order.summary.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    ${order.summary.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white">
                    ${order.summary.tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      Order total
                    </span>
                    <span className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                      ${order.summary.total.toFixed(2)}
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
