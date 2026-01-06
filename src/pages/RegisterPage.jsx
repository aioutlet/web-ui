import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ErrorAlert from '../components/ErrorAlert';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerAsync, isAuthenticated, isRegistering } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    agreeToTerms: false,
  });

  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [apiValidationErrors, setApiValidationErrors] = useState(null);

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation (matching user.validator.js)
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName = 'First name must not exceed 50 characters';
    } else if (!/^[a-zA-Z\s\-'.]+$/.test(formData.firstName.trim())) {
      newErrors.firstName =
        'First name can only contain letters, spaces, hyphens, apostrophes, and periods';
    }

    // Last Name validation (matching user.validator.js)
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length > 50) {
      newErrors.lastName = 'Last name must not exceed 50 characters';
    } else if (!/^[a-zA-Z\s\-'.]+$/.test(formData.lastName.trim())) {
      newErrors.lastName =
        'Last name can only contain letters, spaces, hyphens, apostrophes, and periods';
    }

    // Email validation (matching user.validator.js)
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email.trim().length < 5) {
      newErrors.email = 'Email must be at least 5 characters';
    } else if (formData.email.trim().length > 100) {
      newErrors.email = 'Email must not exceed 100 characters';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email.trim())) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation (matching user.validator.js)
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (formData.password.trim().length > 25) {
      newErrors.password = 'Password must not exceed 25 characters';
    } else if (!/[A-Za-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one letter';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone Number validation (matching user.validator.js)
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = 'Phone number must be at least 7 characters';
    } else if (formData.phoneNumber.trim().length > 20) {
      newErrors.phoneNumber = 'Phone number must not exceed 20 characters';
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber =
        'Phone number can only contain digits, spaces, hyphens, parentheses, and leading +';
    } else {
      const digitCount = (formData.phoneNumber.trim().match(/\d/g) || [])
        .length;
      if (digitCount < 7 || digitCount > 15) {
        newErrors.phoneNumber =
          'Phone number must contain between 7 and 15 digits';
      }
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitMessage('');
    setErrors({});
    setApiValidationErrors(null);

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
    };

    try {
      const response = await registerAsync(userData);

      // Check if email verification is required
      if (response.requiresVerification) {
        // Navigate to success page with email in state
        navigate('/registration-success', {
          state: { email: formData.email },
          replace: true,
        });
      } else {
        setSubmitMessage('Account created successfully! Welcome to xshopai.');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.error('Registration error:', error);

      // Extract error details from API response
      const errorData = error.response?.data || {};

      // Ensure errorMessage is always a string
      let errorMessage = 'Something went wrong. Please try again.';
      if (typeof errorData.error === 'string') {
        errorMessage = errorData.error;
      } else if (typeof error.message === 'string') {
        errorMessage = error.message;
      }

      // Set API validation errors for display in ErrorAlert
      if (errorData.validationErrors) {
        setApiValidationErrors(errorData.validationErrors);
      }

      setSubmitMessage(errorMessage);
      setErrors({ submit: errorMessage });
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />

      <div className="relative max-w-2xl mx-auto px-6 py-12 sm:py-16">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                Register
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Create
            </span>{' '}
            <span className="text-gray-900 dark:text-white">Account</span>
          </h1>
        </div>

        {/* Registration Form */}
        <div className="max-w-md mx-auto">
          {/* Error Alert */}
          {errors.submit && (
            <ErrorAlert
              message={submitMessage}
              validationErrors={apiValidationErrors}
              onClose={() => {
                setErrors({});
                setSubmitMessage('');
                setApiValidationErrors(null);
              }}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                    errors.firstName
                      ? 'border-red-300 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                    errors.lastName
                      ? 'border-red-300 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

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

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                  errors.phoneNumber
                    ? 'border-red-300 dark:border-red-600'
                    : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                    errors.password
                      ? 'border-red-300 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                    errors.confirmPassword
                      ? 'border-red-300 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Terms Agreement */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-colors duration-200"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  I agree to the{' '}
                  <Link
                    to="/terms"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
                  >
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isRegistering}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isRegistering ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>

            {/* Success Message Only */}
            {submitMessage &&
              typeof submitMessage === 'string' &&
              submitMessage.includes('successfully') && (
                <div className="p-4 rounded-lg text-center border bg-green-50 dark:bg-green-500/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-400/50">
                  {submitMessage}
                </div>
              )}
          </form>
        </div>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
