import React from 'react';
import PropTypes from 'prop-types';
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

/**
 * PaymentCard Component
 *
 * Displays a single payment method with actions to edit, delete, and set as default
 */
const PaymentCard = ({ payment, onEdit, onDelete, onSetDefault }) => {
  const handleEdit = () => {
    onEdit(payment._id);
  };

  const handleDelete = () => {
    if (
      window.confirm('Are you sure you want to delete this payment method?')
    ) {
      onDelete(payment._id);
    }
  };

  const handleSetDefault = () => {
    if (!payment.isDefault) {
      onSetDefault(payment._id);
    }
  };

  // Get card type icon/color
  const getCardTypeColor = type => {
    const cardType = type?.toLowerCase() || 'other';
    switch (cardType) {
      case 'visa':
        return 'text-blue-600 dark:text-blue-400';
      case 'mastercard':
        return 'text-orange-600 dark:text-orange-400';
      case 'amex':
        return 'text-green-600 dark:text-green-400';
      case 'discover':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Mask card number (show only last 4 digits)
  const maskCardNumber = cardNumber => {
    if (!cardNumber) return '•••• •••• •••• ••••';
    const lastFour = cardNumber.slice(-4);
    return `•••• •••• •••• ${lastFour}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      {/* Header with Card Type and Default Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCardIcon
            className={`h-6 w-6 ${getCardTypeColor(payment.cardType)}`}
          />
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 capitalize">
            {payment.cardType || 'Card'}
          </span>
          {payment.isDefault && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircleIcon className="h-3 w-3" />
              Default
            </span>
          )}
        </div>
      </div>

      {/* Card Details */}
      <div className="space-y-2 mb-4">
        <p className="text-gray-900 dark:text-white font-medium text-lg font-mono">
          {maskCardNumber(payment.cardNumber)}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {payment.cardholderName}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Expires: {payment.expiryMonth}/{payment.expiryYear}
        </p>
        {payment.billingAddress && (
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Billing: {payment.billingAddress.city},{' '}
            {payment.billingAddress.state}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors duration-200"
        >
          <PencilIcon className="h-4 w-4" />
          <span>Edit</span>
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
        >
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </button>

        {!payment.isDefault && (
          <button
            onClick={handleSetDefault}
            className="ml-auto flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <CheckCircleIcon className="h-4 w-4" />
            <span>Set as Default</span>
          </button>
        )}
      </div>
    </div>
  );
};

PaymentCard.propTypes = {
  payment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cardType: PropTypes.string,
    cardNumber: PropTypes.string.isRequired,
    cardholderName: PropTypes.string.isRequired,
    expiryMonth: PropTypes.string.isRequired,
    expiryYear: PropTypes.string.isRequired,
    billingAddress: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    isDefault: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
};

export default PaymentCard;
