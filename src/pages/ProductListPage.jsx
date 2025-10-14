import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, openCart } from '../store/slices/cartSlice';
import StarRating from '../components/ui/StarRating';
import Paginator from '../components/ui/Paginator';
import axios from 'axios';

const BFF_URL = process.env.REACT_APP_BFF_URL || 'http://localhost:3100';

// Dynamic filter configuration based on category
const getCategoryFilters = (department, category, subcategory) => {
  // Normalize input to handle case-insensitivity and special characters
  const normalizeName = name => {
    if (!name) return null;
    // Convert to title case and handle special cases
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const deptKey = normalizeName(department);
  const catKey = normalizeName(category);

  // Define which filters are relevant for each category
  const filterConfig = {
    Women: {
      Clothing: ['price', 'color', 'size'],
      Accessories: ['price', 'color'],
      Shoes: ['price', 'color', 'size'],
    },
    Men: {
      Clothing: ['price', 'color', 'size'],
      Accessories: ['price', 'color'],
      Shoes: ['price', 'color', 'size'],
    },
    Kids: {
      Clothing: ['price', 'color', 'size'],
      Shoes: ['price', 'color', 'size'],
    },
    Electronics: {
      Computers: ['price', 'color'],
      Audio: ['price', 'color'],
      Headphones: ['price', 'color'],
      Mobile: ['price', 'color'],
      Gaming: ['price', 'color'],
      Cameras: ['price'],
      Tablets: ['price', 'color'],
    },
    Sports: {
      Apparel: ['price', 'color', 'size'],
      Equipment: ['price'],
      Footwear: ['price', 'color', 'size'],
    },
    Books: {
      default: ['price'],
    },
  };

  // If no department/category (e.g., /products home page), show all filters
  if (!deptKey && !catKey) {
    return ['price', 'color', 'size'];
  }

  // Get filters for specific department/category
  if (filterConfig[deptKey]?.[catKey]) {
    return filterConfig[deptKey][catKey];
  }

  // Fallback to department level
  if (filterConfig[deptKey]) {
    const deptCategories = filterConfig[deptKey];
    // If department has 'default', use it
    if (deptCategories.default) {
      return deptCategories.default;
    }
    // Otherwise, return first category's filters as default
    const firstCategoryFilters = Object.values(deptCategories)[0];
    if (firstCategoryFilters) {
      return firstCategoryFilters;
    }
  }

  // Default to price filter only for unknown categories
  // TODO: Add color/size when backend API supports these attributes
  return ['price'];
};

const ProductListPage = ({ category: propCategory }) => {
  const { department, category, subcategory } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Determine hierarchy from URL params
  const dept = department || propCategory;

  // Determine which filters to show based on category
  const activeFilters = useMemo(() => {
    console.log('Filter Debug - Original:', { dept, category, subcategory });
    const filters = getCategoryFilters(dept, category, subcategory);
    console.log('Filter Debug - Active Filters:', filters);
    return filters;
  }, [dept, category, subcategory]);

  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [filters, setFilters] = useState({
    price: new Set(),
    color: new Set(),
    size: new Set(),
  });
  const [sortBy, setSortBy] = useState('featured');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch products from BFF
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (dept) params.append('department', dept);
        if (category) params.append('category', category);
        if (subcategory) params.append('subcategory', subcategory);

        // Add price filters - handle multiple price ranges
        if (filters.price.size > 0) {
          const priceRanges = Array.from(filters.price).map(p =>
            getPriceRangeFromFilter(p)
          );
          const minPrice = Math.min(
            ...priceRanges.map(r => r?.min || 0).filter(v => v !== undefined)
          );
          const maxPrice = Math.max(
            ...priceRanges
              .map(r => r?.max || Infinity)
              .filter(v => v !== Infinity)
          );

          if (minPrice !== Infinity)
            params.append('min_price', minPrice.toString());
          if (maxPrice !== -Infinity && maxPrice !== Infinity) {
            params.append('max_price', maxPrice.toString());
          }
        }

        params.append('skip', ((currentPage - 1) * productsPerPage).toString());
        params.append('limit', productsPerPage.toString());

        const response = await axios.get(
          `${BFF_URL}/api/products?${params.toString()}`
        );

        if (response.data.success) {
          const apiProducts = response.data.data.products || [];
          console.log('API Products Sample:', apiProducts[0]);

          // Transform API products to match frontend format
          const transformedProducts = apiProducts.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            image: p.images?.[0] || 'https://via.placeholder.com/400',
            images: p.images || [],
            rating: p.average_rating || 0,
            reviews: p.num_reviews || 0,
            inStock: true, // API doesn't have stock info yet
            badge:
              p.num_reviews > 100
                ? 'Bestseller'
                : p.num_reviews < 10
                  ? 'New'
                  : null,
            department: p.department,
            category: p.category,
            subcategory: p.subcategory,
            brand: p.brand,
            // Product variations as arrays
            colors: p.colors || [],
            sizes: p.sizes || [],
          }));

          console.log('Transformed Products Sample:', transformedProducts[0]);

          setProducts(transformedProducts);
          setTotalCount(
            response.data.data.total_count || transformedProducts.length
          );
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dept, category, subcategory, filters.price, currentPage]);

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dept, category, subcategory]);

  // Apply client-side filtering for color and size
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply color filter
    if (filters.color.size > 0) {
      filtered = filtered.filter(product => {
        // Product colors: array of available colors
        const productColors = product.colors || [];

        if (productColors.length === 0) return false;

        // Check if any product color matches any selected filter color
        return Array.from(filters.color).some(selectedColor =>
          productColors.some(
            color => color.toLowerCase() === selectedColor.toLowerCase()
          )
        );
      });
    }

    // Apply size filter
    if (filters.size.size > 0) {
      filtered = filtered.filter(product => {
        // Product sizes: array of available sizes
        const productSizes = product.sizes || [];

        if (productSizes.length === 0) return false;

        // Check if any product size matches any selected filter size
        return Array.from(filters.size).some(selectedSize =>
          productSizes.some(
            size => size.toLowerCase() === selectedSize.toLowerCase()
          )
        );
      });
    }

    return filtered;
  }, [products, filters.color, filters.size]);

  // Sort products client-side
  const sortedProducts = sortProductsLocal(filteredProducts, sortBy);

  // Pagination - use filtered products count for client-side filtering
  const effectiveTotalCount =
    filters.color.size > 0 || filters.size.size > 0
      ? sortedProducts.length
      : totalCount;
  const totalPages = Math.ceil(effectiveTotalCount / productsPerPage);

  // Get breadcrumbs for navigation
  const breadcrumbs = getBreadcrumbs(dept, category, subcategory);

  // Helper functions
  const isInCart = productId => {
    return cartItems.some(item => item.id === productId);
  };

  const toggleFavorite = productId => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleCartAction = product => {
    if (isInCart(product.id)) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
      // Open cart sidebar only on desktop (lg and above)
      if (window.innerWidth >= 1024) {
        dispatch(openCart());
      }
    }
  };

  const handleProductClick = productId => {
    navigate(`/products/${productId}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      const filterSet = new Set(prev[key]);

      if (value === 'All') {
        // Clear all selections for this filter
        newFilters[key] = new Set();
      } else {
        // Toggle the selection
        if (filterSet.has(value)) {
          filterSet.delete(value);
        } else {
          filterSet.add(value);
        }
        newFilters[key] = filterSet;
      }

      return newFilters;
    });
    setCurrentPage(1);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get only the relevant filter options based on category
  const filterOptions = useMemo(() => {
    // Price filter is always static
    const priceOptions = [
      'All',
      '$0 - $25',
      '$25 - $50',
      '$50 - $75',
      '$75 - $100',
      '$100+',
    ];

    // Use curated common color options for cleaner UX
    // Individual products show all their specific colors on the detail page
    const commonColorOptions = [
      'All',
      'Black',
      'White',
      'Gray',
      'Blue',
      'Red',
      'Green',
      'Pink',
      'Brown',
      'Navy',
    ];

    // Use curated common size options based on category
    // Individual products show all their specific sizes on the detail page
    let commonSizeOptions = ['All'];

    // Determine size options based on category context
    if (dept === 'Electronics' || category === 'Electronics') {
      // No size filter for electronics
      commonSizeOptions = ['All'];
    } else if (
      category === 'Footwear' ||
      subcategory === 'Sneakers' ||
      subcategory === 'Running'
    ) {
      // Shoe sizes
      commonSizeOptions = [
        'All',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '1Y',
        '2Y',
        '3Y',
        '4Y',
        '5Y',
      ];
    } else if (
      subcategory === 'Pants' ||
      subcategory === 'Jeans' ||
      subcategory === 'Chinos'
    ) {
      // Waist sizes for pants
      commonSizeOptions = [
        'All',
        '24',
        '26',
        '28',
        '30',
        '32',
        '34',
        '36',
        '38',
      ];
    } else if (dept === 'Kids' || category === 'Kids') {
      // Kids sizes
      commonSizeOptions = ['All', '4', '6', '8', '10', '12', '14'];
    } else {
      // Standard clothing sizes (default)
      commonSizeOptions = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
    }

    const colorOptions = commonColorOptions;
    const sizeOptions = commonSizeOptions;

    const allFilterOptions = {
      price: priceOptions,
      color: colorOptions,
      size: sizeOptions,
    };

    const relevantOptions = {};
    activeFilters.forEach(filterKey => {
      if (allFilterOptions[filterKey]) {
        relevantOptions[filterKey] = allFilterOptions[filterKey];
      }
    });
    console.log('Filter Options:', relevantOptions);
    return relevantOptions;
  }, [activeFilters, category, dept, subcategory]);

  // Sort options
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name: A-Z' },
  ];

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (sortDropdownOpen && !event.target.closest('.sort-dropdown')) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sortDropdownOpen]);

  // Product Badge Component
  const ProductBadge = ({ badge, inStock }) => {
    if (!inStock) {
      return (
        <div className="absolute top-3 left-3 bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded">
          Out of Stock
        </div>
      );
    }
    if (!badge) return null;

    const badgeStyles = {
      Bestseller: 'bg-orange-500 text-white',
      New: 'bg-green-500 text-white',
      Sale: 'bg-red-500 text-white',
      Limited: 'bg-purple-500 text-white',
    };

    return (
      <div
        className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded ${badgeStyles[badge] || 'bg-blue-500 text-white'}`}
      >
        {badge}
      </div>
    );
  };

  ProductBadge.propTypes = {
    badge: PropTypes.string,
    inStock: PropTypes.bool.isRequired,
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={index}>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Link
                    to={crumb.path}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    {crumb.label}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                  {subcategory
                    ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
                    : category
                      ? category.charAt(0).toUpperCase() + category.slice(1)
                      : dept
                        ? dept.charAt(0).toUpperCase() + dept.slice(1)
                        : 'Products'}
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            </div>
          </div>

          {/* Filter Controls - Show when filters are available */}
          {!loading && !error && Object.keys(filterOptions).length > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  <span className="text-sm">
                    {filtersOpen ? 'Hide' : 'Show'} Filters
                    {Object.values(filters).reduce(
                      (sum, set) => sum + set.size,
                      0
                    ) > 0 &&
                      ` (${Object.values(filters).reduce((sum, set) => sum + set.size, 0)})`}
                  </span>
                </button>

                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>

                {Object.values(filters).some(set => set.size > 0) && (
                  <button
                    onClick={() =>
                      setFilters({
                        price: new Set(),
                        color: new Set(),
                        size: new Set(),
                      })
                    }
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative sort-dropdown">
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <span>
                    Sort:{' '}
                    {sortOptions.find(option => option.value === sortBy)
                      ?.label || 'Featured'}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {sortDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="py-2">
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setSortDropdownOpen(false);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            sortBy === option.value
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Filters Panel */}
        {filtersOpen && Object.keys(filterOptions).length > 0 && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 mb-8 transition-all duration-300 ease-in-out">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Object.entries(filterOptions).map(([filterKey, options]) => (
                <div key={filterKey} className="pb-4 sm:pb-0">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 capitalize text-sm sm:text-base">
                    {filterKey}
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {options.map(option => (
                      <label
                        key={option}
                        className="flex items-center cursor-pointer py-1 sm:py-0"
                      >
                        <input
                          type="checkbox"
                          checked={
                            option === 'All'
                              ? filters[filterKey].size === 0
                              : filters[filterKey].has(option)
                          }
                          onChange={() => handleFilterChange(filterKey, option)}
                          className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-700 flex-shrink-0"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading products...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Error loading products
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {error}
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && sortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {sortedProducts.map(product => (
                <div key={product.id} className="group">
                  <div className="relative">
                    <div
                      className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 relative cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-200 ${
                          product.inStock
                            ? 'group-hover:scale-105'
                            : 'opacity-60 grayscale'
                        }`}
                      />
                      <ProductBadge
                        badge={product.badge}
                        inStock={product.inStock}
                      />
                    </div>

                    {/* Action buttons */}
                    {product.inStock && (
                      <>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
                          aria-label={
                            favorites.has(product.id)
                              ? 'Remove from favorites'
                              : 'Add to favorites'
                          }
                        >
                          <svg
                            className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'fill-none text-gray-600 dark:text-gray-400'}`}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>

                        {/* Desktop: Full button with hover effect */}
                        <button
                          onClick={() => handleCartAction(product)}
                          className={`hidden md:block absolute bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${
                            isInCart(product.id)
                              ? 'bg-green-500 hover:bg-red-500 text-white'
                              : 'bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-800 shadow-md'
                          }`}
                          title={
                            isInCart(product.id)
                              ? 'Click to remove from cart'
                              : 'Add to cart'
                          }
                        >
                          {isInCart(product.id) ? (
                            <div className="flex items-center space-x-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <span>Remove</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 00-.293.707V19a2 2 0 002 2h10a2 2 0 002-2v-2.586a1 1 0 00-.293-.707L16 13"
                                />
                              </svg>
                              <span>Add to Cart</span>
                            </div>
                          )}
                        </button>

                        {/* Mobile: Compact cart icon button in bottom-right */}
                        <button
                          onClick={() => handleCartAction(product)}
                          className={`md:hidden absolute bottom-2 right-2 p-2 rounded-full transition-all duration-200 shadow-lg ${
                            isInCart(product.id)
                              ? 'bg-green-500 hover:bg-red-500 text-white'
                              : 'bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
                          }`}
                          title={
                            isInCart(product.id)
                              ? 'Remove from cart'
                              : 'Add to cart'
                          }
                        >
                          {isInCart(product.id) ? (
                            <svg
                              className="w-4 h-4"
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
                          ) : (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 00-.293.707V19a2 2 0 002 2h10a2 2 0 002-2v-2.586a1 1 0 00-.293-.707L16 13"
                              />
                            </svg>
                          )}
                        </button>
                      </>
                    )}
                  </div>

                  <h3
                    className={`text-sm font-medium mb-1 ${product.inStock ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {product.name}
                    {!product.inStock && (
                      <span className="text-xs text-red-500 ml-2">
                        (Out of Stock)
                      </span>
                    )}
                  </h3>

                  <StarRating
                    rating={product.rating}
                    reviews={product.reviews}
                    showReviews={true}
                    size="w-4 h-4"
                    reviewsTextSize="text-sm"
                  />

                  <p
                    className={`text-lg font-medium mt-2 ${product.inStock ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Paginator
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  variant="traditional"
                  size="md"
                  color="blue"
                  showEllipsis={true}
                  maxVisiblePages={10}
                />
              </div>
            )}
          </>
        ) : !loading && !error ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your filters or check back later.
            </p>
            <div className="mt-6">
              <button
                onClick={() =>
                  setFilters({
                    price: new Set(),
                    color: new Set(),
                    size: new Set(),
                  })
                }
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

ProductListPage.propTypes = {
  category: PropTypes.string,
};

// Helper function to parse price range
function getPriceRangeFromFilter(priceFilter) {
  if (!priceFilter || priceFilter === 'All') return null;

  const ranges = {
    '$0 - $25': { min: 0, max: 25 },
    '$25 - $50': { min: 25, max: 50 },
    '$50 - $75': { min: 50, max: 75 },
    '$75 - $100': { min: 75, max: 100 },
    '$100+': { min: 100, max: Infinity },
  };

  return ranges[priceFilter] || null;
}

// Helper function to sort products
function sortProductsLocal(productList, sortBy) {
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
    case 'featured':
    default:
      return sorted;
  }
}

// Helper function to get breadcrumbs
function getBreadcrumbs(department, category, subcategory) {
  const breadcrumbs = [];

  if (department) {
    breadcrumbs.push({
      label: formatName(department),
      path: `/${department}`,
    });
  }

  if (category) {
    breadcrumbs.push({
      label: formatName(category),
      path: `/${department}/${category}`,
    });
  }

  if (subcategory) {
    breadcrumbs.push({
      label: formatName(subcategory),
      path: `/${department}/${category}/${subcategory}`,
    });
  }

  return breadcrumbs;
}

// Helper function to format names
function formatName(name) {
  if (!name) return '';
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default ProductListPage;
