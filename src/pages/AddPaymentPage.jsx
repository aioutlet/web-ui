import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { userAPI } from '../api/clients/userClient';

/**
 * AddPaymentPage Component
 *
 * Amazon-style full-page form to add a new payment method (replaces modal)
 */
const AddPaymentPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    cardType: 'visa',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    isDefault: false,
  });

  const [errors, setErrors] = useState({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Create payment mutation
  const createPaymentMutation = useMutation({
    mutationFn: userAPI.createPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries(['paymentMethods']);
      navigate('/account/payments');
    },
    onError: error => {
      setErrors({
        submit: error.response?.data?.message || 'Failed to add payment method',
      });
    },
  });

  const validateForm = () => {
    const newErrors = {};

    // Card number validation (16 digits)
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    // Cardholder name validation
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    // Expiry validation
    if (!formData.expiryMonth) {
      newErrors.expiryMonth = 'Expiry month is required';
    }
    if (!formData.expiryYear) {
      newErrors.expiryYear = 'Expiry year is required';
    }

    // Check if card is expired
    if (formData.expiryMonth && formData.expiryYear) {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;

      if (
        parseInt(formData.expiryYear) < currentYear ||
        (parseInt(formData.expiryYear) === currentYear &&
          parseInt(formData.expiryMonth) < currentMonth)
      ) {
        newErrors.expiryMonth = 'Card is expired';
      }
    }

    // CVV validation (3-4 digits)
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCardNumberChange = e => {
    // Format card number with spaces (4444 4444 4444 4444)
    const value = e.target.value.replace(/\s/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData(prev => ({ ...prev, cardNumber: formattedValue }));

    if (errors.cardNumber) {
      setErrors(prev => ({ ...prev, cardNumber: undefined }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Remove CVV before sending (security - never store CVV)
    const { cvv, ...paymentData } = formData;

    // Clean up card number (remove spaces)
    paymentData.cardNumber = paymentData.cardNumber.replace(/\s/g, '');

    createPaymentMutation.mutate(paymentData);
  };

  const handleCancel = () => {
    navigate('/account/payments');
  };

  // Generate years array (current year + 20 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear + i);

  const months = [
    { value: '01', label: '01 - January' },
    { value: '02', label: '02 - February' },
    { value: '03', label: '03 - March' },
    { value: '04', label: '04 - April' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - June' },
    { value: '07', label: '07 - July' },
    { value: '08', label: '08 - August' },
    { value: '09', label: '09 - September' },
    { value: '10', label: '10 - October' },
    { value: '11', label: '11 - November' },
    { value: '12', label: '12 - December' },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleCancel}
          className="mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="font-medium">Back to Payment Methods</span>
        </button>

        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 uppercase tracking-wide">
              Add Payment
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Add New
            </span>{' '}
            <span className="text-gray-900 dark:text-white">
              Payment Method
            </span>
          </h1>
          <p className="text-lg leading-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Add a payment method for secure and convenient checkout
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-8"
        >
          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <p className="text-sm text-red-800 dark:text-red-300">
                {errors.submit}
              </p>
            </div>
          )}

          {/* Card Details Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Card Details
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Card Number */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    errors.cardNumber
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Cardholder Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    errors.cardholderName
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.cardholderName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.cardholderName}
                  </p>
                )}
              </div>

              {/* Card Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Card Type *
                </label>
                <select
                  name="cardType"
                  value={formData.cardType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="discover">Discover</option>
                </select>
              </div>

              {/* CVV */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength={4}
                  placeholder="123"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    errors.cvv
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.cvv}
                  </p>
                )}
              </div>

              {/* Expiry Month */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiry Month *
                </label>
                <select
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    errors.expiryMonth
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                {errors.expiryMonth && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.expiryMonth}
                  </p>
                )}
              </div>

              {/* Expiry Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiry Year *
                </label>
                <select
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    errors.expiryYear
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.expiryYear && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.expiryYear}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Default Payment Checkbox */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isDefault"
              className="text-sm font-medium text-gray-900 dark:text-white"
            >
              Set as default payment method
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createPaymentMutation.isPending}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createPaymentMutation.isPending
                ? 'Adding...'
                : 'Add Payment Method'}
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Your payment information is protected
              </p>
              <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                All payment data is encrypted using industry-standard security.
                We never store your CVV.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentPage;
