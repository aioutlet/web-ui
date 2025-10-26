import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  closeCart,
  removeFromCartAsync,
  updateQuantityAsync,
} from '../../store/slices/cartSlice';
import {
  XMarkIcon,
  TrashIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, isOpen, loading } = useSelector(
    state => state.cart
  );

  // Automatically close sidebar when cart becomes empty
  useEffect(() => {
    if (isOpen && items.length === 0) {
      dispatch(closeCart());
    }
  }, [items.length, isOpen, dispatch]);

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantityAsync({ productId: id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCartAsync(id));
    }
  };

  const handleRemoveItem = id => {
    dispatch(removeFromCartAsync(id));
  };

  const handleGoToCart = () => {
    dispatch(closeCart());
    navigate('/cart');
  };

  const handleClose = () => {
    dispatch(closeCart());
  };

  // Calculate if eligible for free delivery
  const freeDeliveryThreshold = 20;
  const isFreeDelivery = totalPrice >= freeDeliveryThreshold;
  const amountToFreeDelivery = freeDeliveryThreshold - totalPrice;

  return (
    <>
      {/* Backdrop - Mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 w-full sm:w-96 h-screen bg-white dark:bg-gray-800 shadow-2xl z-40 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Basket
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Free Delivery Banner */}
        {items.length > 0 && (
          <div className="px-4 sm:px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            {!isFreeDelivery && totalPrice > 0 ? (
              <div className="text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    £{amountToFreeDelivery.toFixed(2)}
                  </span>{' '}
                  away from{' '}
                  <span className="font-semibold">FREE Same-Day delivery</span>
                </p>
              </div>
            ) : (
              <div className="text-sm">
                <p className="text-green-600 dark:text-green-400 font-semibold">
                  ✓ FREE Same-Day delivery
                </p>
              </div>
            )}
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 text-gray-400 mb-4">
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
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your basket is empty
              </p>
              <Link
                to="/products"
                onClick={handleClose}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  {/* Product Image */}
                  <Link
                    to={`/products/${item.id}`}
                    onClick={handleClose}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-gray-100 dark:bg-gray-700 hover:opacity-75 transition-opacity"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.id}`}
                      onClick={handleClose}
                      className="block"
                    >
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400">
                        {item.name}
                      </h3>
                    </Link>

                    {/* Badge if applicable */}
                    {item.badge && (
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          Limited time
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="mt-1 flex items-baseline gap-2">
                      <p className="text-base font-bold text-red-600 dark:text-red-400">
                        £{item.price.toFixed(2)}
                      </p>
                      {item.originalPrice && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                          £{item.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>

                    {/* Prime Badge */}
                    <div className="mt-1 flex items-center gap-1">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-blue-500 text-white">
                        prime
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                        Eligible for FREE delivery
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="inline-flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity, -1)
                          }
                          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          {item.quantity === 1 ? (
                            <TrashIcon className="h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />
                          ) : (
                            <MinusIcon className="h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />
                          )}
                        </button>
                        <span className="px-3 py-1 text-xs font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity, 1)
                          }
                          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Subtotal and Actions */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 bg-gray-50 dark:bg-gray-900/50">
            {/* Subtotal */}
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):
                </span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  £{totalPrice.toFixed(2)}
                </span>
              </div>
              {!isFreeDelivery && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  + delivery charges
                </p>
              )}
            </div>

            {/* Go to Basket Button */}
            <button
              onClick={handleGoToCart}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors duration-200 mb-3 text-sm sm:text-base"
            >
              Go to basket
            </button>

            {/* Continue Shopping Link */}
            <Link
              to="/products"
              onClick={handleClose}
              className="block text-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline font-medium py-2"
            >
              Continue shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
