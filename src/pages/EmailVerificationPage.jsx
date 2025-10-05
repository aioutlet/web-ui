import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircleIcon,
  XCircleIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const {
    verifyEmail,
    isVerifyingEmail,
    resendVerification,
    isResendingVerification,
  } = useAuth();

  const [status, setStatus] = useState('verifying'); // verifying, success, error, already-verified
  const [message, setMessage] = useState('');
  const [resendSuccess, setResendSuccess] = useState(false);
  const [email, setEmail] = useState('');

  // Verify email on component mount
  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link. No token provided.');
      return;
    }

    verifyEmail(
      { token },
      {
        onSuccess: data => {
          if (data.alreadyVerified) {
            setStatus('already-verified');
            setMessage('This email address has already been verified.');
          } else {
            setStatus('success');
            setMessage('Your email has been successfully verified!');
            // Redirect to login after 3 seconds
            setTimeout(() => {
              navigate('/login', {
                state: {
                  message: 'Email verified successfully! You can now log in.',
                },
              });
            }, 3000);
          }

          if (data.email) {
            setEmail(data.email);
          }
        },
        onError: error => {
          console.error('Email verification error:', error);
          setStatus('error');
          setMessage(
            error.message ||
              'Verification failed. The link may be invalid or expired.'
          );
          if (error.email) {
            setEmail(error.email);
          }
        },
      }
    );
  }, [token, navigate, verifyEmail]);

  // Handle resend verification email
  const handleResendEmail = async () => {
    if (!email) {
      setMessage('Unable to resend email. Please try registering again.');
      return;
    }

    setResendSuccess(false);

    resendVerification(
      { email },
      {
        onSuccess: () => {
          setResendSuccess(true);
          setMessage('Verification email sent! Please check your inbox.');
        },
        onError: error => {
          console.error('Resend email error:', error);
          const errorMessage =
            error.message || 'Failed to resend email. Please try again.';
          setMessage(errorMessage);
        },
      }
    );
  };

  // Verifying state
  if (status === 'verifying') {
    return (
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />

        <div className="relative max-w-4xl mx-auto px-6 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                  Verifying
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            </div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-2">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                Verifying
              </span>{' '}
              <span className="text-gray-900 dark:text-white">Your Email</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />

        <div className="relative max-w-4xl mx-auto px-6 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-12"></div>
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">
                  Verified
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-12"></div>
            </div>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <CheckCircleIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-2">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
                Email Verified!
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Redirecting you to login...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
            <div className="mt-6">
              <Link
                to="/login"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
              >
                Click here if not redirected
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Already verified state
  if (status === 'already-verified') {
    return (
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />

        <div className="relative max-w-4xl mx-auto px-6 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-12"></div>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                  Already Verified
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-12"></div>
            </div>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <CheckCircleIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                Already Verified
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
            <Link
              to="/login"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Error state
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
                Verification Failed
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-12"></div>
          </div>
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <XCircleIcon className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-2">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent dark:from-red-400 dark:to-orange-400">
              Unable to Verify
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>

          {/* Resend Success Message */}
          {resendSuccess && (
            <div className="mb-6 rounded-lg p-4 border bg-green-50 dark:bg-green-500/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-400/50 max-w-md mx-auto">
              <p className="text-sm">
                Verification email has been sent! Please check your inbox and
                spam folder.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="max-w-md mx-auto space-y-3">
          {/* Resend Verification Button */}
          {(email || token) && !resendSuccess && (
            <button
              onClick={handleResendEmail}
              disabled={isResendingVerification}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isResendingVerification ? (
                <>
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
                  Sending...
                </>
              ) : (
                <>
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  Resend Verification Email
                </>
              )}
            </button>
          )}

          {/* Register Again - if no email/token */}
          {!email && !token && (
            <Link
              to="/register"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Register Again
            </Link>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?{' '}
            <Link
              to="/customer-service/contact"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
            >
              Contact Support
            </Link>
            {' or '}
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

export default EmailVerificationPage;
