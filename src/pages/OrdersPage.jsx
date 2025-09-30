import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading orders data
    const fetchOrders = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock orders data
      const mockOrders = [
        {
          id: '54879',
          orderNumber: '#54879',
          status: 'Processing',
          placedDate: 'March 22, 2021',
          total: 83.16,
          items: [
            {
              name: 'Nomad Tumbler',
              image:
                'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop&crop=center',
            },
          ],
        },
        {
          id: '54878',
          orderNumber: '#54878',
          status: 'Delivered',
          placedDate: 'March 15, 2021',
          total: 127.5,
          items: [
            {
              name: 'Wireless Bluetooth Headphones',
              image:
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
            },
          ],
        },
        {
          id: '54877',
          orderNumber: '#54877',
          status: 'Delivered',
          placedDate: 'March 10, 2021',
          total: 199.99,
          items: [
            {
              name: 'Smart Fitness Watch',
              image:
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
            },
          ],
        },
      ];

      setOrders(mockOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getStatusColor = status => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/30 dark:text-yellow-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-500/30 dark:text-blue-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-500/30 dark:text-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-500/30 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-500/30 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Orders
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Track and manage your recent orders
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Order {order.orderNumber}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <Link
                    to={`/orders/${order.id}`}
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    View details
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {order.items.slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          +{order.items.length - 3}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {order.placedDate}
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              When you place an order, it will appear here.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
