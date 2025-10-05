import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ForgotPasswordPage = () => {
  const { forgotPassword, isForgotPasswordLoading } = useAuth();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    email: '',
  });

  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitMessage('');
    setErrors({});

    forgotPassword(
      { email: formData.email },
      {
        onSuccess: () => {
          setSubmitMessage(
            'Password reset instructions have been sent to your email address. Please check your inbox and follow the instructions to reset your password.'
          );
          // Clear form after successful submission
          setFormData({ email: '' });
        },
        onError: error => {
          console.error('Forgot password error:', error);
          const errorMessage =
            error.message ||
            'Unable to send reset instructions. Please try again later.';
          setSubmitMessage(errorMessage);
          setErrors({ submit: errorMessage });
        },
      }
    );
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />

      <div className="relative max-w-4xl mx-auto px-6 py-12 sm:py-16">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                Reset Password
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Forgot
            </span>{' '}
            <span className="text-gray-900 dark:text-white">Password?</span>
          </h1>
        </div>

        {/* Forgot Password Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                  errors.email
                    ? 'border-red-300 dark:border-red-600'
                    : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                placeholder="name@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isForgotPasswordLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isForgotPasswordLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending instructions...
                </div>
              ) : (
                'Send reset instructions'
              )}
            </button>

            {/* Success/Error Message */}
            {submitMessage && (
              <div
                className={`p-4 rounded-lg text-center border ${
                  submitMessage.includes('sent')
                    ? 'bg-green-50 dark:bg-green-500/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-400/50'
                    : 'bg-red-50 dark:bg-red-500/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-400/50'
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        {/* Back to Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
