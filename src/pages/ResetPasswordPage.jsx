import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword, isResetPasswordLoading } = useAuth();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [tokenValid, setTokenValid] = useState(true);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Password strength validation
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Check if token exists on mount
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
    }
    // TODO: In production, validate token with backend API here
    // For now, we'll validate on submit
  }, [token]);

  // Update password strength indicators
  useEffect(() => {
    const password = formData.password;
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [formData.password]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!Object.values(passwordStrength).every(Boolean)) {
      newErrors.password = 'Password does not meet all requirements';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});

    resetPassword(
      { token, password: formData.password },
      {
        onSuccess: () => {
          setResetSuccess(true);
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login', {
              state: {
                message:
                  'Password reset successful! Please log in with your new password.',
              },
            });
          }, 3000);
        },
        onError: error => {
          console.error('Reset password error:', error);
          const errorMessage =
            error.message ||
            'Failed to reset password. The link may have expired.';
          setErrors({
            submit: errorMessage,
          });
          setTokenValid(false);
        },
      }
    );
  };

  // Invalid token view
  if (!tokenValid) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />

        <div className="relative max-w-4xl mx-auto px-6 py-12 sm:py-16">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-12"></div>
              <div className="bg-red-100 dark:bg-red-900/30 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-red-700 dark:text-red-300 uppercase tracking-wide">
                  Invalid Link
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-12"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent dark:from-red-400 dark:to-orange-400">
                Link Expired
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This password reset link is invalid or has expired. Please request
              a new one.
            </p>
            <Link
              to="/forgot-password"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success view
  if (resetSuccess) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />

        <div className="relative max-w-4xl mx-auto px-6 py-12 sm:py-16">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-12"></div>
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">
                  Success
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-12"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
                Password Reset!
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your password has been successfully reset. Redirecting you to
              login...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Password strength indicator component
  const PasswordRequirement = ({ met, text }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <CheckCircleIcon className="h-4 w-4 text-green-500" />
      ) : (
        <XCircleIcon className="h-4 w-4 text-gray-300 dark:text-gray-600" />
      )}
      <span
        className={
          met
            ? 'text-green-600 dark:text-green-400'
            : 'text-gray-500 dark:text-gray-400'
        }
      >
        {text}
      </span>
    </div>
  );

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
              Create
            </span>{' '}
            <span className="text-gray-900 dark:text-white">New Password</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please enter your new password below
          </p>
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                    errors.password
                      ? 'border-red-300 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-2 p-3 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password must contain:
                  </p>
                  <PasswordRequirement
                    met={passwordStrength.hasMinLength}
                    text="At least 8 characters"
                  />
                  <PasswordRequirement
                    met={passwordStrength.hasUpperCase}
                    text="One uppercase letter"
                  />
                  <PasswordRequirement
                    met={passwordStrength.hasLowerCase}
                    text="One lowercase letter"
                  />
                  <PasswordRequirement
                    met={passwordStrength.hasNumber}
                    text="One number"
                  />
                  <PasswordRequirement
                    met={passwordStrength.hasSpecialChar}
                    text="One special character"
                  />
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                    errors.confirmPassword
                      ? 'border-red-300 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 rounded-lg text-center border bg-red-50 dark:bg-red-500/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-400/50">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isResetPasswordLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isResetPasswordLoading ? (
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
                  Resetting Password...
                </div>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          {/* Back to Login */}
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
    </div>
  );
};

export default ResetPasswordPage;
