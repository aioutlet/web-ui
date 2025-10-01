import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrderProgressBar from '../components/ui/OrderProgressBar';
import { selectAllOrders } from '../store/slices/ordersSlice';
import { getOrderById } from '../utils/orderHelpers';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const allOrders = useSelector(selectAllOrders);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading order data
    const fetchOrder = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get order from orders.js via Redux store
      const foundOrder = getOrderById(allOrders, orderId);

      if (!foundOrder) {
        setOrder(null);
        setLoading(false);
        return;
      }

      // Calculate order summary from items
      const subtotal = foundOrder.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const shippingCost = 5.0;
      const tax = subtotal * 0.13; // 13% tax
      const total = subtotal + shippingCost + tax;

      // Generate tracking steps based on order status
      const getTrackingSteps = status => {
        const statusLower = status.toLowerCase();
        return [
          {
            name: 'Order placed',
            status:
              statusLower === 'processing' ||
              statusLower === 'shipped' ||
              statusLower === 'delivered'
                ? 'completed'
                : 'current',
            date: foundOrder.placedDate,
          },
          {
            name: 'Processing',
            status:
              statusLower === 'processing'
                ? 'current'
                : statusLower === 'shipped' || statusLower === 'delivered'
                  ? 'completed'
                  : 'pending',
            date: statusLower !== 'processing' ? null : foundOrder.placedDate,
          },
          {
            name: 'Shipped',
            status:
              statusLower === 'shipped'
                ? 'current'
                : statusLower === 'delivered'
                  ? 'completed'
                  : 'pending',
            date: null,
          },
          {
            name: 'Delivered',
            status: statusLower === 'delivered' ? 'completed' : 'pending',
            date: statusLower === 'delivered' ? foundOrder.placedDate : null,
          },
        ];
      };

      // Transform order data to include all details needed for OrderDetailsPage
      // Note: In production, shipping/billing/payment would come from separate microservices
      const enhancedOrder = {
        id: foundOrder.id,
        orderNumber: `#${foundOrder.id}`,
        status: foundOrder.status,
        placedDate: foundOrder.placedDate,
        preparingToShipDate: foundOrder.placedDate, // In real app, this would be calculated
        items: foundOrder.items.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          description: item.description,
        })),
        // Mock shipping data (would come from shipping microservice)
        shipping: {
          address: {
            name: 'John Doe',
            street: '123 Main Street',
            city: 'Toronto',
            state: 'ON',
            zip: 'M5V 3A8',
          },
          method: 'Standard Shipping',
          cost: shippingCost,
          updates: {
            email: 'j••••@example.com',
            phone: '1••••••••00',
          },
        },
        // Mock billing data (would come from billing microservice)
        billing: {
          address: {
            name: 'John Doe',
            street: '123 Main Street',
            city: 'Toronto',
            state: 'ON',
            zip: 'M5V 3A8',
          },
        },
        // Mock payment data (would come from payment microservice)
        payment: {
          method: 'Visa',
          last4: '4242',
          expires: '12 / 25',
        },
        summary: {
          subtotal: parseFloat(subtotal.toFixed(2)),
          shipping: shippingCost,
          tax: parseFloat(tax.toFixed(2)),
          total: parseFloat(total.toFixed(2)),
        },
        tracking: {
          steps: getTrackingSteps(foundOrder.status),
        },
      };

      setOrder(enhancedOrder);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId, allOrders]);

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
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => navigate('/orders')}
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
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Order {order.orderNumber}
            </h1>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
              View invoice →
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Order placed{' '}
            <span className="font-medium text-gray-900 dark:text-white">
              {order.placedDate}
            </span>
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {/* Order Items Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {order.items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {index < order.items.length - 1 && (
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Progress Section */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              Preparing to ship on {order.preparingToShipDate}
            </p>

            {/* Progress Bar */}
            <OrderProgressBar status={order.status} />
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            {/* Delivery Address */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Delivery address
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.shipping.address.name}
                </p>
                <p>{order.shipping.address.street}</p>
                <p>
                  {order.shipping.address.city}, {order.shipping.address.state}{' '}
                  {order.shipping.address.zip}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Shipping updates
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {order.shipping.updates.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {order.shipping.updates.phone}
                </p>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mt-2 font-medium">
                  Edit
                </button>
              </div>
            </div>

            {/* Payment Information */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Payment information
              </h3>
              <div className="flex items-start gap-3">
                <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Ending with {order.payment.last4}</p>
                  <p>Expires {order.payment.expires}</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Billing address
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5 mb-6">
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.billing.address.name}
                </p>
                <p>{order.billing.address.street}</p>
                <p>
                  {order.billing.address.city}, {order.billing.address.state}{' '}
                  {order.billing.address.zip}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="text-gray-900 dark:text-white text-right">
                    ${order.summary.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="text-gray-900 dark:text-white text-right">
                    ${order.summary.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white text-right">
                    ${order.summary.tax.toFixed(2)}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Order total
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-right">
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
