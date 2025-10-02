/**
 * Product Helper Functions
 *
 * Pure utility functions for product data operations.
 * These functions provide business logic for products without modifying the data source.
 * Following React best practices: keep data in data files, logic in utilities.
 */

import { products } from '../data/products';

/**
 * Get a single product by ID
 * @param {number} id - Product ID
 * @returns {Object|undefined} Product object or undefined if not found
 */
export const getProductById = id => {
  return products.find(product => product.id === parseInt(id));
};

/**
 * Get products by category
 * @param {string} category - Category name
 * @returns {Array} Array of products in the specified category
 */
export const getProductsByCategory = category => {
  return products.filter(product => product.category === category);
};

/**
 * Get only in-stock products
 * @returns {Array} Array of in-stock products
 */
export const getInStockProducts = () => {
  return products.filter(product => product.inStock);
};

/**
 * Get products within a price range
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {Array} Array of products within the price range
 */
export const getProductsByPriceRange = (min, max) => {
  return products.filter(
    product => product.price >= min && product.price <= max
  );
};

/**
 * Get trending products (products with badges and high ratings)
 * Returns products that are bestsellers, new, or have high ratings
 * @param {number} limit - Maximum number of products to return (default: 4)
 * @returns {Array} Array of trending products
 */
export const getTrendingProducts = (limit = 4) => {
  // Define badge priority for sorting
  const badgePriority = {
    Bestseller: 4,
    New: 3,
    Limited: 2,
    Sale: 1,
  };

  return products
    .filter(product => {
      // Include products with badges or high ratings (4.5+)
      return product.badge || (product.rating && product.rating >= 4.5);
    })
    .sort((a, b) => {
      // Sort by badge priority first
      const aPriority = badgePriority[a.badge] || 0;
      const bPriority = badgePriority[b.badge] || 0;

      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }

      // Then by rating
      const aRating = a.rating || 0;
      const bRating = b.rating || 0;

      if (aRating !== bRating) {
        return bRating - aRating;
      }

      // Then by number of reviews
      const aReviews = a.reviews || 0;
      const bReviews = b.reviews || 0;

      return bReviews - aReviews;
    })
    .slice(0, limit);
};

/**
 * Get featured products (high rating and in stock)
 * @param {number} limit - Maximum number of products to return (default: 6)
 * @returns {Array} Array of featured products
 */
export const getFeaturedProducts = (limit = 6) => {
  return products
    .filter(product => product.inStock && product.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

/**
 * Get products on sale (with originalPrice field)
 * @returns {Array} Array of products on sale
 */
export const getSaleProducts = () => {
  return products.filter(
    product => product.originalPrice && product.price < product.originalPrice
  );
};

/**
 * Get new arrival products (with 'New' badge)
 * @param {number} limit - Maximum number of products to return (default: 8)
 * @returns {Array} Array of new products
 */
export const getNewArrivals = (limit = 8) => {
  return products.filter(product => product.badge === 'New').slice(0, limit);
};

/**
 * Search products by name or description
 * @param {string} query - Search query
 * @returns {Array} Array of matching products
 */
export const searchProducts = query => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      (product.description &&
        product.description.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Get products by multiple filters
 * @param {Object} filters - Filter object with optional properties
 * @param {string} filters.category - Category name
 * @param {number} filters.minPrice - Minimum price
 * @param {number} filters.maxPrice - Maximum price
 * @param {boolean} filters.inStock - Only in-stock items
 * @param {number} filters.minRating - Minimum rating
 * @returns {Array} Array of filtered products
 */
export const filterProducts = (filters = {}) => {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }

  if (filters.inStock) {
    filtered = filtered.filter(p => p.inStock);
  }

  if (filters.minRating !== undefined) {
    filtered = filtered.filter(p => p.rating >= filters.minRating);
  }

  return filtered;
};

/**
 * Get badge styling classes
 * @param {string} badge - Badge name
 * @returns {string} Tailwind CSS classes for the badge
 */
export const getBadgeStyles = badge => {
  const styles = {
    Bestseller:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/30 dark:text-yellow-200 border dark:border-yellow-400/50',
    New: 'bg-green-100 text-green-800 dark:bg-green-500/30 dark:text-green-200 border dark:border-green-400/50',
    Limited:
      'bg-purple-100 text-purple-800 dark:bg-purple-500/30 dark:text-purple-200 border dark:border-purple-400/50',
    Sale: 'bg-red-100 text-red-800 dark:bg-red-500/30 dark:text-red-200 border dark:border-red-400/50',
  };
  return (
    styles[badge] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-600/30 dark:text-gray-200 border dark:border-gray-400/50'
  );
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} currentPrice - Current price
 * @returns {number} Discount percentage (rounded)
 */
export const getDiscountPercentage = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Get all unique categories from products
 * @returns {Array} Array of unique category names
 */
export const getAllCategories = () => {
  const categories = [...new Set(products.map(p => p.category))];
  return ['All', ...categories];
};

/**
 * Get price range of all products
 * @returns {Object} Object with min and max prices
 */
export const getPriceRange = () => {
  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

/**
 * Sort products by various criteria
 * @param {Array} productList - Array of products to sort
 * @param {string} sortBy - Sort criteria: 'price-asc', 'price-desc', 'rating', 'name'
 * @returns {Array} Sorted array of products
 */
export const sortProducts = (productList, sortBy) => {
  const sorted = [...productList];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};
