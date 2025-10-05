import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorAlert Component - Displays error messages with optional validation details
 * @param {Object} props
 * @param {string} props.message - Main error message
 * @param {Object} props.validationErrors - Object containing field-specific validation errors
 * @param {Function} props.onClose - Callback when alert is dismissed
 */
const ErrorAlert = ({ message, validationErrors, onClose }) => {
  if (!message && !validationErrors) return null;

  const hasValidationErrors =
    validationErrors && Object.keys(validationErrors).length > 0;

  return (
    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 mb-4 border border-red-200 dark:border-red-800">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400 dark:text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
            {message}
          </h3>

          {hasValidationErrors && (
            <div className="mt-2 text-sm text-red-700 dark:text-red-400">
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(validationErrors).map(([field, error]) => {
                  // Skip requirements array, it's handled separately
                  if (field === 'requirements') return null;

                  return (
                    <li key={field}>
                      <span className="font-medium capitalize">{field}:</span>{' '}
                      {typeof error === 'string' ? error : error}
                    </li>
                  );
                })}
              </ul>

              {/* Show password requirements if present */}
              {validationErrors.requirements &&
                Array.isArray(validationErrors.requirements) && (
                  <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-800">
                    <p className="font-medium mb-2 text-red-900 dark:text-red-300">
                      Password Requirements:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-red-800 dark:text-red-400">
                      {validationErrors.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          )}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ErrorAlert.propTypes = {
  message: PropTypes.string,
  validationErrors: PropTypes.object,
  onClose: PropTypes.func,
};

export default ErrorAlert;
