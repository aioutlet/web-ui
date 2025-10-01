import React from 'react';
import PropTypes from 'prop-types';

/**
 * Paginator Component
 *
 * A reusable pagination component with traditional button styling.
 *
 * @param {number} currentPage - Current active page
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback function when page changes
 * @param {string} size - Size variant: 'sm' | 'md' | 'lg' (default: 'md')
 * @param {string} color - Color theme: 'blue' | 'indigo' | 'gray' (default: 'indigo')
 * @param {boolean} showEllipsis - Whether to show ellipsis for large page counts (default: true)
 * @param {number} maxVisiblePages - Maximum visible page numbers (default: 10)
 * @param {string} className - Additional CSS classes for the container
 * @param {boolean} showPrevNext - Whether to show Previous/Next buttons (default: true)
 */
const Paginator = ({
  currentPage,
  totalPages,
  onPageChange,
  size = 'md',
  color = 'indigo',
  showEllipsis = true,
  maxVisiblePages = 10,
  className = '',
  showPrevNext = true,
}) => {
  const visiblePages = maxVisiblePages;

  // Size configurations
  const sizeConfig = {
    sm: {
      button: 'px-3 py-1 text-xs',
      prevNext: 'px-3 py-1 text-xs',
    },
    md: {
      button: 'w-8 h-8 text-sm',
      prevNext: 'px-4 py-2 text-sm',
    },
    lg: {
      button: 'w-10 h-10 text-base',
      prevNext: 'px-6 py-3 text-base',
    },
  };

  // Color configurations
  const colorConfig = {
    blue: {
      active: 'bg-blue-600 text-white',
      inactive:
        'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30',
      border: 'border-gray-300 dark:border-gray-600',
    },
    indigo: {
      active: 'bg-indigo-600 text-white',
      inactive:
        'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30',
      border: 'border-gray-300 dark:border-gray-600',
    },
    gray: {
      active: 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800',
      inactive:
        'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
      border: 'border-gray-300 dark:border-gray-600',
    },
  };

  const { button: buttonSize, prevNext: prevNextSize } = sizeConfig[size];
  const { active, inactive, border } = colorConfig[color];

  // Generate page numbers with ellipsis logic
  const generatePageNumbers = () => {
    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const delta = Math.floor(visiblePages / 2);

    if (showEllipsis) {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle section
      let start = Math.max(2, currentPage - delta);
      let end = Math.min(totalPages - 1, currentPage + delta);

      // Adjust if we're near the beginning or end
      if (currentPage <= delta + 1) {
        end = Math.min(totalPages - 1, visiblePages - 1);
      }
      if (currentPage >= totalPages - delta) {
        start = Math.max(2, totalPages - visiblePages + 2);
      }

      // Add ellipsis before middle section if needed
      if (start > 2) {
        pages.push('ellipsis-start');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle section if needed
      if (end < totalPages - 1) {
        pages.push('ellipsis-end');
      }

      // Always show last page (if totalPages > 1)
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    } else {
      // Simple pagination without ellipsis
      const startPage = Math.max(1, currentPage - delta);
      const endPage = Math.min(totalPages, startPage + visiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const handlePageClick = page => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageButton = (page, index) => {
    if (typeof page === 'string' && page.startsWith('ellipsis')) {
      return (
        <span key={page} className="px-2 py-2 text-gray-500 dark:text-gray-400">
          ...
        </span>
      );
    }

    const isActive = page === currentPage;
    const baseClass = `${buttonSize} rounded flex items-center justify-center font-medium transition-colors`;

    return (
      <button
        key={page}
        onClick={() => handlePageClick(page)}
        className={`${baseClass} ${
          isActive ? active : `${inactive} hover:scale-105`
        }`}
      >
        {page}
      </button>
    );
  };

  const renderPrevNextButton = type => {
    const isNext = type === 'next';
    const disabled = isNext ? currentPage === totalPages : currentPage === 1;
    const targetPage = isNext ? currentPage + 1 : currentPage - 1;

    return (
      <button
        onClick={() => !disabled && handlePageClick(targetPage)}
        disabled={disabled}
        className={`${prevNextSize} ${
          disabled
            ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        {isNext ? 'Next' : 'Previous'}
      </button>
    );
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {showPrevNext && renderPrevNextButton('previous')}

      <div className="flex items-center space-x-2">
        {pageNumbers.map((page, index) => renderPageButton(page, index))}
      </div>

      {showPrevNext && renderPrevNextButton('next')}
    </div>
  );
};

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['blue', 'indigo', 'gray']),
  showEllipsis: PropTypes.bool,
  maxVisiblePages: PropTypes.number,
  className: PropTypes.string,
  showPrevNext: PropTypes.bool,
};

export default Paginator;
