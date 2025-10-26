import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  removeFromCartAsync,
  updateQuantityAsync,
  clearCartAsync,
} from '../store/slices/cartSlice';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, loading } = useSelector(
    state => state.cart
  );
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate if eligible for free delivery
  const freeDeliveryThreshold = 20;
  const isFreeDelivery = totalPrice >= freeDeliveryThreshold;
  const amountToFreeDelivery = freeDeliveryThreshold - totalPrice;

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantityAsync({ productId: id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = id => {
    dispatch(removeFromCartAsync(id));
  };

  const handleClearCart = () => {
    dispatch(clearCartAsync());
    setShowClearConfirm(false);
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="relative bg-white dark:bg-gray-900">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-indigo-50/20 via-transparent to-indigo-50/20 dark:from-indigo-900/5 dark:to-indigo-900/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-h-[calc(100vh-4rem)]">
          <div className="text-center flex flex-col items-center justify-center h-full">
            <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 text-gray-400 mb-6">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your shopping cart is empty
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20 -z-10" />
      <div className="fixed inset-x-0 top-0 h-full bg-gradient-to-b from-indigo-50/20 via-transparent to-indigo-50/20 dark:from-indigo-900/5 dark:to-indigo-900/5 -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Shopping Basket
            </h1>
            {items.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                Deselect all items
              </button>
            )}
          </div>

          {/* Free Delivery Banner */}
          {!isFreeDelivery && totalPrice > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-sm text-green-800 dark:text-green-200">
                <span className="font-semibold">
                  £{amountToFreeDelivery.toFixed(2)}
                </span>{' '}
                away from{' '}
                <span className="font-semibold">FREE Delivery Today</span> by
                22:00!
              </p>
            </div>
          )}

          {isFreeDelivery && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                You are getting FREE Delivery Today by 22:00!
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Items Header - Hidden on mobile */}
              <div className="hidden sm:block px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price
                </p>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map(item => (
                  <div key={item.id} className="p-3 sm:p-6">
                    <div className="flex gap-2 sm:gap-4">
                      {/* Checkbox - Hidden on mobile */}
                      <div className="hidden sm:block flex-shrink-0 pt-1">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                      </div>

                      {/* Product Image - Smaller on mobile */}
                      <div className="flex-shrink-0">
                        <Link to={`/products/${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-lg bg-gray-100 dark:bg-gray-700 hover:opacity-75 transition-opacity"
                          />
                        </Link>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.id}`}
                          className="block group"
                        >
                          <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-1 hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>

                        {/* Badge if applicable */}
                        {item.badge && (
                          <div className="mb-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                              #{item.badge}
                            </span>
                          </div>
                        )}

                        {/* Stock Status */}
                        <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                          In Stock
                        </p>

                        {/* Prime Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-500 text-white">
                            prime
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            Same-Day & Overnight
                          </span>
                        </div>

                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          FREE delivery{' '}
                          <span className="font-semibold">
                            Today 18:00 - 22:00
                          </span>
                        </p>

                        {/* Gift Checkbox - Hidden on mobile */}
                        <div className="hidden sm:flex items-center gap-2 mb-3">
                          <input
                            type="checkbox"
                            id={`gift-${item.id}`}
                            className="w-3 h-3 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                          />
                          <label
                            htmlFor={`gift-${item.id}`}
                            className="text-xs text-gray-600 dark:text-gray-400"
                          >
                            This will be a gift{' '}
                            <button className="text-indigo-600 dark:text-indigo-400 hover:underline">
                              Learn more
                            </button>
                          </label>
                        </div>

                        {/* Category/Color if available - Hidden on mobile */}
                        {item.category && (
                          <p className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <span className="font-medium">Category:</span>{' '}
                            {item.category}
                          </p>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity, -1)
                              }
                              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                            </button>
                            <span className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity, 1)
                              }
                              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg transition-colors"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                            </button>
                          </div>
                        </div>

                        {/* Action Links */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline font-medium"
                          >
                            Delete
                          </button>
                          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">
                            |
                          </span>
                          <button className="hidden sm:inline text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline font-medium">
                            Save for later
                          </button>
                          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">
                            |
                          </span>
                          <button className="hidden sm:inline text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline font-medium">
                            See more like this
                          </button>
                          <span className="hidden lg:inline text-gray-300 dark:text-gray-600">
                            |
                          </span>
                          <button className="hidden lg:inline text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline font-medium">
                            Share
                          </button>
                        </div>
                      </div>

                      {/* Price - Right side on desktop, below on mobile */}
                      <div className="hidden sm:block flex-shrink-0 text-right">
                        <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.originalPrice && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            £{item.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price on mobile - Below content */}
                    <div className="sm:hidden mt-2 text-right">
                      <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal at bottom */}
              <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                  <Link
                    to="/products"
                    className="sm:hidden w-full text-center py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline font-medium"
                  >
                    Continue shopping
                  </Link>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):{' '}
                    <span className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                      £{totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              {/* Free Delivery Badge */}
              {isFreeDelivery && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm font-semibold text-green-800 dark:text-green-200 text-center">
                    You are getting FREE Delivery Today by 22:00!
                  </p>
                </div>
              )}

              {/* Subtotal */}
              <div className="mb-4">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-2">
                  Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):{' '}
                  <span className="font-bold text-gray-900 dark:text-white text-xl">
                    £{totalPrice.toFixed(2)}
                  </span>
                </p>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="gift-order"
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="gift-order"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    This order contains a gift
                  </label>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 mb-3"
              >
                Proceed to Checkout
              </button>

              {/* Payment Methods */}
              <div className="text-center text-xs text-gray-600 dark:text-gray-400 mb-4">
                <p className="mb-3">Accepted payment methods</p>
                <div className="flex justify-center gap-3 items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                    alt="Visa"
                    className="h-8 w-auto"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    className="h-8 w-auto"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                    alt="American Express"
                    className="h-8 w-auto"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    className="h-8 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Clear Shopping Cart?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to remove all items from your cart? This
              action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
