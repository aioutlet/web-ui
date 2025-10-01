import React from 'react';
import PropTypes from 'prop-types';

const OrderProgressBar = ({ status }) => {
  // Define the order tracking steps
  const getTrackingSteps = status => {
    const steps = [
      { name: 'Order placed', key: 'placed' },
      { name: 'Processing', key: 'processing' },
      { name: 'Shipped', key: 'shipped' },
      { name: 'Delivered', key: 'delivered' },
    ];

    // Determine the current step based on status
    let currentStepIndex = -1;

    if (status === 'Cancelled') {
      // For cancelled orders, mark only "Order placed" as completed
      return steps.map((step, index) => ({
        ...step,
        status: index === 0 ? 'completed' : 'cancelled',
      }));
    }

    // Map status to step index
    const statusMap = {
      Processing: 1,
      Shipped: 2,
      Delivered: 3,
    };

    currentStepIndex = statusMap[status] || 0;

    return steps.map((step, index) => {
      if (index < currentStepIndex) {
        return { ...step, status: 'completed' };
      } else if (index === currentStepIndex) {
        return { ...step, status: 'current' };
      } else {
        return { ...step, status: 'pending' };
      }
    });
  };

  const trackingSteps = getTrackingSteps(status);

  return (
    <div>
      {/* Progress Bar */}
      <div className="flex gap-1 mb-3">
        {trackingSteps.map(step => (
          <div key={step.key} className="flex-1">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                step.status === 'completed' || step.status === 'current'
                  ? 'bg-indigo-600 dark:bg-indigo-500'
                  : step.status === 'cancelled'
                    ? 'bg-red-500 dark:bg-red-600'
                    : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Steps Labels */}
      <div className="flex justify-between">
        {trackingSteps.map(step => (
          <div key={step.key} className="text-center flex-1">
            <p
              className={`text-xs font-medium ${
                step.status === 'completed' || step.status === 'current'
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : step.status === 'cancelled'
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {step.name}
            </p>
          </div>
        ))}
      </div>

      {/* Cancelled message */}
      {status === 'Cancelled' && (
        <div className="mt-2 text-center">
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">
            Order Cancelled
          </p>
        </div>
      )}
    </div>
  );
};

OrderProgressBar.propTypes = {
  status: PropTypes.oneOf(['Processing', 'Shipped', 'Delivered', 'Cancelled'])
    .isRequired,
};

export default OrderProgressBar;
