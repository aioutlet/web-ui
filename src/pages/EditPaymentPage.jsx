import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { userAPI } from '../api/clients/userClient';

/**
 * EditPaymentPage Component
 *
 * Amazon-style full-page form to edit existing payment method (replaces modal)
 * Note: For security, we don't allow editing card number or CVV
 */
const EditPaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    cardholderName: '',
    cardType: 'visa',
    expiryMonth: '',
    expiryYear: '',
    billingAddress: {
      addressLine1: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
    },
    isDefault: false,
  });

  const [errors, setErrors] = useState({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch payment method by ID
  const {
    data: payments = [],
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: userAPI.getPaymentMethods,
  });

  const payment = payments.find(p => p._id === id);

  // Populate form when payment is loaded
  useEffect(() => {
    if (payment) {
      setFormData({
        cardholderName: payment.cardholderName || '',
        cardType: payment.cardType || 'visa',
        expiryMonth: payment.expiryMonth || '',
        expiryYear: payment.expiryYear || '',
        billingAddress: {
          addressLine1: payment.billingAddress?.addressLine1 || '',
          city: payment.billingAddress?.city || '',
          state: payment.billingAddress?.state || '',
          zipCode: payment.billingAddress?.zipCode || '',
          country: payment.billingAddress?.country || 'USA',
        },
        isDefault: payment.isDefault || false,
      });
    }
  }, [payment]);

  // Update payment mutation
  const updatePaymentMutation = useMutation({
    mutationFn: ({ id, data }) => userAPI.updatePaymentMethod(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['paymentMethods']);
      navigate('/account/payments');
    },
    onError: error => {
      setErrors({
        submit:
          error.response?.data?.message || 'Failed to update payment method',
      });
    },
  });

  const validateForm = () => {
    const newErrors = {};

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

    // Billing address validation
    if (!formData.billingAddress.addressLine1.trim()) {
      newErrors.billingAddressLine1 = 'Address is required';
    }
    if (!formData.billingAddress.city.trim()) {
      newErrors.billingCity = 'City is required';
    }
    if (!formData.billingAddress.state.trim()) {
      newErrors.billingState = 'State is required';
    }
    if (!formData.billingAddress.zipCode.trim()) {
      newErrors.billingZipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.billingAddress.zipCode)) {
      newErrors.billingZipCode = 'Invalid ZIP code format';
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

  const handleBillingChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        [name]: value,
      },
    }));

    // Clear error for this field
    const errorKey = `billing${name.charAt(0).toUpperCase() + name.slice(1)}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: undefined }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    updatePaymentMutation.mutate({ id, data: formData });
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

  // Loading state
  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (fetchError || !payment) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
            <p className="text-red-800 dark:text-red-300">
              Payment method not found or failed to load.
            </p>
            <button
              onClick={() => navigate('/account/payments')}
              className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Return to Payment Methods
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mask card number for display (show last 4 digits)
  const maskedCardNumber = payment.cardNumber
    ? `**** **** **** ${payment.cardNumber.slice(-4)}`
    : '**** **** **** ****';

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
              Edit Payment
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Edit
            </span>{' '}
            <span className="text-gray-900 dark:text-white">
              Payment Method
            </span>
          </h1>
          <p className="text-lg leading-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Update your payment method information
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

          {/* Card Number (Read-only) */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Number
                </label>
                <p className="text-lg font-mono text-gray-900 dark:text-white">
                  {maskedCardNumber}
                </p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xs text-right">
                Card number cannot be changed for security reasons
              </div>
            </div>
          </div>

          {/* Card Details Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Card Details
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

              {/* Spacer */}
              <div></div>

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

          {/* Billing Address Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Billing Address
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Address Line 1 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.billingAddress.addressLine1}
                  onChange={handleBillingChange}
                  placeholder="123 Main Street"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    errors.billingAddressLine1
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.billingAddressLine1 && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.billingAddressLine1}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.billingAddress.city}
                  onChange={handleBillingChange}
                  placeholder="San Francisco"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    errors.billingCity
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.billingCity && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.billingCity}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.billingAddress.state}
                  onChange={handleBillingChange}
                  placeholder="CA"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    errors.billingState
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.billingState && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.billingState}
                  </p>
                )}
              </div>

              {/* ZIP Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.billingAddress.zipCode}
                  onChange={handleBillingChange}
                  placeholder="94103"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    errors.billingZipCode
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.billingZipCode && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.billingZipCode}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.billingAddress.country}
                  onChange={handleBillingChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
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
              disabled={updatePaymentMutation.isPending}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updatePaymentMutation.isPending
                ? 'Updating...'
                : 'Update Payment Method'}
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Security Note
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                For security reasons, you cannot change the card number. If you
                need to use a different card, please add a new payment method.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPaymentPage;
