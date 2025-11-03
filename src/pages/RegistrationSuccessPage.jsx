import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RegistrationSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state
  const registeredEmail = location.state?.email || 'your email';

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 via-blue-50/40 to-purple-50/50 dark:from-green-900/20 dark:via-blue-900/15 dark:to-purple-900/20" />

      <div className="relative max-w-2xl mx-auto px-6 py-6 sm:py-8">
        <div className="text-center mb-6">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Registration Successful!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Your account has been created successfully.
          </p>
        </div>

        {/* Email Verification Notice */}
        <div className="max-w-md mx-auto">
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200">
                  Check your email
                </h3>
                <div className="mt-2 text-sm text-blue-800 dark:text-blue-300">
                  <p className="mb-2">We've sent a verification email to:</p>
                  <p className="font-semibold">{registeredEmail}</p>
                  <p className="mt-3">
                    Please click the verification link in the email to activate
                    your account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Next Steps:
            </h3>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mr-3">
                  1
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Open your email inbox
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mr-3">
                  2
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Look for an email from AIOutlet
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mr-3">
                  3
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Click the verification link
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mr-3">
                  4
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Return here to log in
                </span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/login')}
              className="flex-1 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Go to Login
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Back to Home
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the email?{' '}
              <button
                onClick={() => {
                  // TODO: Implement resend verification email
                  alert('Resend functionality coming soon!');
                }}
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
              >
                Resend verification email
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;
