import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, openCart } from '../store/slices/cartSlice';
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import StarRating from '../components/ui/StarRating';
import axios from 'axios';

const BFF_URL = process.env.REACT_APP_BFF_URL || 'http://localhost:3100';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const cartItems = useSelector(state => state.cart.items);

  // Get search query from URL
  const searchQuery = searchParams.get('q') || '';

  // State
  const [allProducts, setAllProducts] = useState([]); // All search results (unfiltered)
  const [products, setProducts] = useState([]); // Filtered products for display
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [facets, setFacets] = useState({ departments: {} }); // For department+category counts
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState(new Set());
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch search results from BFF
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setAllProducts([]);
        setProducts([]);
        setTotalCount(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.append('q', searchQuery);

        // Only apply department filters to the API (not category filters)
        // Category filtering will be done client-side to maintain facet visibility
        if (selectedDepartments.size > 0) {
          selectedDepartments.forEach(dept =>
            params.append('department', dept)
          );
        }

        if (priceRange.min > 0)
          params.append('min_price', priceRange.min.toString());
        if (priceRange.max < 10000)
          params.append('max_price', priceRange.max.toString());

        params.append('skip', ((currentPage - 1) * productsPerPage).toString());
        params.append('limit', productsPerPage.toString());

        const response = await axios.get(
          `${BFF_URL}/api/products/search?${params.toString()}`
        );

        if (response.data.success) {
          const apiProducts = response.data.data.products || [];

          // Transform API products to match frontend format
          const allTransformedProducts = apiProducts.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            image: p.images?.[0] || 'https://via.placeholder.com/400',
            images: p.images || [],
            rating: p.average_rating || 0,
            reviews: p.num_reviews || 0,
            inStock: true,
            department: p.department,
            category: p.category,
            subcategory: p.subcategory,
            brand: p.brand,
          }));

          // Save all products (unfiltered) for facets and client-side filtering
          setAllProducts(allTransformedProducts);

          // Calculate facets from ALL results (ensures all filter options remain visible)
          calculateFacets(allTransformedProducts);
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to load search results. Please try again.');
        setAllProducts([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, selectedDepartments, priceRange, currentPage]);

  // Apply client-side category filtering whenever selectedCategories changes
  useEffect(() => {
    if (allProducts.length === 0) {
      setProducts([]);
      setTotalCount(0);
      return;
    }

    let filtered = allProducts;

    // Apply category filters (dept:cat combinations)
    if (selectedCategories.size > 0) {
      filtered = allProducts.filter(product => {
        const key = `${product.department}:${product.category}`;
        return selectedCategories.has(key);
      });
    }

    setProducts(filtered);
    setTotalCount(filtered.length);
  }, [allProducts, selectedCategories]);

  // Calculate facets (department + category counts) from products
  const calculateFacets = productList => {
    const deptFacets = {};

    productList.forEach(product => {
      const dept = product.department;
      const cat = product.category;

      if (!deptFacets[dept]) {
        deptFacets[dept] = { total: 0, categories: {} };
      }

      deptFacets[dept].total += 1;

      if (cat) {
        if (!deptFacets[dept].categories[cat]) {
          deptFacets[dept].categories[cat] = 0;
        }
        deptFacets[dept].categories[cat] += 1;
      }
    });

    setFacets({ departments: deptFacets });
  };

  // Scroll to top when component mounts or search changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery]);

  // Helper function to check if product is in cart
  const isInCart = productId => {
    return cartItems.some(item => item.id === productId);
  };

  // Client-side sorting (server handles filtering/pagination)
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'relevance':
      default:
        // Keep original order (relevance from API)
        break;
    }

    return sorted;
  }, [products, sortBy]);

  // Pagination
  const totalPages = Math.ceil(totalCount / productsPerPage);

  // Cart actions
  const handleCartAction = (product, e) => {
    e.stopPropagation();

    if (isInCart(product.id)) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1,
        })
      );
      if (window.innerWidth >= 1024) {
        dispatch(openCart());
      }
    }
  };

  // Navigate to product details
  const handleProductClick = productId => {
    navigate(`/products/${productId}`);
  };

  // Toggle favorite
  const toggleFavorite = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
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

  // Toggle department filter
  const toggleDepartment = department => {
    setSelectedDepartments(prev => {
      const newDepts = new Set(prev);
      if (newDepts.has(department)) {
        newDepts.delete(department);
      } else {
        newDepts.add(department);
      }
      return newDepts;
    });
    setCurrentPage(1); // Reset to first page
  };

  // Toggle category filter
  const toggleCategory = (department, category) => {
    const key = `${department}:${category}`;
    setSelectedCategories(prev => {
      const newCategories = new Set(prev);
      if (newCategories.has(key)) {
        newCategories.delete(key);
      } else {
        newCategories.add(key);
      }
      return newCategories;
    });
    setCurrentPage(1); // Reset to first page
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedDepartments(new Set());
    setSelectedCategories(new Set());
    setPriceRange({ min: 0, max: 10000 });
    setMinRating(0);
    setSortBy('relevance');
    setCurrentPage(1);
  };

  // State for collapsible department sections
  const [expandedDepts, setExpandedDepts] = useState(new Set());

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Search Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {searchQuery ? (
                    <>Search results for &quot;{searchQuery}&quot;</>
                  ) : (
                    'All Products'
                  )}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {totalCount} {totalCount === 1 ? 'product' : 'products'} found
                </p>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort"
                    className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
                  >
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                {/* Filter Toggle (Mobile) */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <AdjustmentsHorizontalIcon className="h-5 w-5" />
                  Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Filters
                </h2>
                {(selectedCategories.size > 0 ||
                  priceRange.min > 0 ||
                  priceRange.max < 10000 ||
                  minRating > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Departments & Categories - Faceted Search */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Departments & Categories
                </h3>
                <div className="space-y-2">
                  {Object.entries(facets.departments)
                    .sort()
                    .map(([dept, deptData]) => {
                      const isExpanded = expandedDepts.has(dept);
                      const hasCategories =
                        Object.keys(deptData.categories).length > 0;

                      return (
                        <div key={dept} className="space-y-1">
                          {/* Department Level */}
                          <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer flex-1">
                              <input
                                type="checkbox"
                                checked={selectedDepartments.has(dept)}
                                onChange={() => toggleDepartment(dept)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              />
                              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {dept}
                                <span className="ml-1 text-xs text-gray-500">
                                  ({deptData.total})
                                </span>
                              </span>
                            </label>
                            {hasCategories && (
                              <button
                                onClick={() => {
                                  setExpandedDepts(prev => {
                                    const newSet = new Set(prev);
                                    if (newSet.has(dept)) {
                                      newSet.delete(dept);
                                    } else {
                                      newSet.add(dept);
                                    }
                                    return newSet;
                                  });
                                }}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                              >
                                <svg
                                  className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
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
                            )}
                          </div>

                          {/* Category Level - Collapsible */}
                          {isExpanded && hasCategories && (
                            <div className="ml-6 space-y-1 mt-1">
                              {Object.entries(deptData.categories)
                                .sort()
                                .map(([cat, count]) => (
                                  <label
                                    key={`${dept}:${cat}`}
                                    className="flex items-center cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedCategories.has(
                                        `${dept}:${cat}`
                                      )}
                                      onChange={() => toggleCategory(dept, cat)}
                                      className="w-3.5 h-3.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                      {cat}
                                      <span className="ml-1 text-xs text-gray-500">
                                        ({count})
                                      </span>
                                    </span>
                                  </label>
                                ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  {Object.keys(facets.departments).length === 0 && !loading && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No filters available
                    </p>
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400">
                      Min: ${priceRange.min}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="50"
                      value={priceRange.min}
                      onChange={e =>
                        setPriceRange(prev => ({
                          ...prev,
                          min: Number(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400">
                      Max: ${priceRange.max}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="50"
                      value={priceRange.max}
                      onChange={e =>
                        setPriceRange(prev => ({
                          ...prev,
                          max: Number(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Minimum Rating
                </h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label
                      key={rating}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="ml-2 flex items-center">
                        <StarRating rating={rating} />
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                          & up
                        </span>
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === 0}
                      onChange={() => setMinRating(0)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      All ratings
                    </span>
                  </label>
                </div>
              </div>

              {/* Close button for mobile */}
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              // Loading State
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Searching products...
                  </p>
                </div>
              </div>
            ) : error ? (
              // Error State
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
                <div className="text-red-500 mb-4">
                  <svg
                    className="h-16 w-16 mx-auto"
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
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {error}
                </h3>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : sortedProducts.length === 0 ? (
              // Empty State
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
                <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchQuery ? (
                    <>
                      We couldn&apos;t find any products matching &quot;
                      {searchQuery}&quot;
                    </>
                  ) : (
                    'Try adjusting your filters to see more results'
                  )}
                </p>
                <button
                  onClick={() => {
                    setSearchParams({});
                    clearFilters();
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Clear Search & Filters
                </button>
              </div>
            ) : (
              // Products Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                          {product.badge}
                        </span>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={e => toggleFavorite(product.id, e)}
                        className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                      >
                        {favorites.has(product.id) ? (
                          <HeartSolid className="h-5 w-5 text-red-500" />
                        ) : (
                          <HeartOutline className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        )}
                      </button>

                      {/* Desktop: Add to Cart Button (shown on hover) */}
                      <button
                        onClick={e => handleCartAction(product, e)}
                        className="hidden md:block absolute bottom-3 left-3 right-3 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {isInCart(product.id)
                          ? 'Remove from Cart'
                          : 'Add to Cart'}
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 h-10">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={product.rating} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          ({product.reviews || 0})
                        </span>
                      </div>

                      {/* Price */}
                      <p className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        ${product.price}
                      </p>

                      {/* Mobile: Add to Cart Button */}
                      <button
                        onClick={e => handleCartAction(product, e)}
                        className="md:hidden w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                      >
                        {isInCart(product.id)
                          ? 'Remove from Cart'
                          : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
