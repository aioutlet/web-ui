import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

const ProductListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Helper function to check if product is in cart
  const isInCart = productId => {
    return cartItems.some(item => item.id === productId);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock product data with more items and better images
  const [allProducts] = useState([
    {
      id: 1,
      name: 'Organize Basic Set (Walnut)',
      price: 149,
      rating: 4.8,
      reviews: 38,
      category: 'Objects',
      image:
        'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=400&fit=crop&crop=center',
      inStock: true,
      badge: 'Bestseller',
    },
    {
      id: 2,
      name: 'Organize Pen Holder',
      price: 15,
      rating: 4.9,
      reviews: 18,
      category: 'Objects',
      image:
        'https://images.unsplash.com/photo-1606662628430-d3d3b88824ad?w=400&h=400&fit=crop&crop=center',
      inStock: false,
    },
    {
      id: 3,
      name: 'Organize Sticky Note Holder',
      price: 15,
      rating: 4.7,
      reviews: 14,
      category: 'Objects',
      image:
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center',
      inStock: true,
      badge: 'New',
    },
    {
      id: 4,
      name: 'Organize Phone Holder',
      price: 15,
      rating: 4.6,
      reviews: 21,
      category: 'Objects',
      image:
        'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: 5,
      name: 'Leather Key Ring (Black)',
      price: 32,
      rating: 4.8,
      reviews: 24,
      category: 'Objects',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
      inStock: true,
      badge: 'Sale',
    },
    {
      id: 6,
      name: 'Basic Cotton Tee (White)',
      price: 25,
      rating: 4.5,
      reviews: 89,
      category: 'Tees',
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: 7,
      name: 'Basic Cotton Tee (Black)',
      price: 25,
      rating: 4.6,
      reviews: 72,
      category: 'Tees',
      image:
        'https://images.unsplash.com/photo-1583743814966-8936f37f82db?w=400&h=400&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: 8,
      name: 'Basic Cotton Tee (Gray)',
      price: 25,
      rating: 4.4,
      reviews: 65,
      category: 'Tees',
      image:
        'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: 9,
      name: 'Cozy Pullover Sweatshirt',
      price: 55,
      rating: 4.7,
      reviews: 43,
      category: 'Sweatshirts',
      image:
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: 10,
      name: 'Zip-Up Hoodie',
      price: 65,
      rating: 4.8,
      reviews: 56,
      category: 'Sweatshirts',
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      inStock: true,
      badge: 'Bestseller',
    },
    {
      id: 11,
      name: 'Classic Denim Jeans',
      price: 79,
      rating: 4.3,
      reviews: 127,
      category: 'Pants & Shorts',
      image:
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center',
      inStock: false,
    },
    {
      id: 12,
      name: 'Casual Chino Shorts',
      price: 35,
      rating: 4.2,
      reviews: 84,
      category: 'Pants & Shorts',
      image:
        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop&crop=center',
      inStock: true,
      badge: 'Sale',
    },
    {
      id: 13,
      name: 'Wooden Desk Organizer',
      price: 75,
      rating: 4.9,
      reviews: 92,
      category: 'Objects',
      image:
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: 14,
      name: 'Modern Table Lamp',
      price: 89,
      rating: 4.7,
      reviews: 38,
      category: 'Objects',
      image:
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: 15,
      name: 'Vintage Cotton Tee',
      price: 29,
      rating: 4.5,
      reviews: 156,
      category: 'Tees',
      image:
        'https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=400&h=400&fit=crop&crop=center',
      inStock: true,
      badge: 'New',
    },
    {
      id: 16,
      name: 'Casual Sweatpants',
      price: 45,
      rating: 4.4,
      reviews: 78,
      category: 'Pants & Shorts',
      image:
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center',
      inStock: false,
    },
    {
      id: 17,
      name: 'Minimalist Notebook',
      price: 18,
      rating: 4.6,
      reviews: 234,
      category: 'Objects',
      image:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center',
      inStock: true,
      badge: 'Bestseller',
    },
    {
      id: 18,
      name: 'Crew Neck Sweatshirt',
      price: 59,
      rating: 4.7,
      reviews: 67,
      category: 'Sweatshirts',
      image:
        'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: 19,
      name: 'Soft Cotton Shorts',
      price: 28,
      rating: 4.3,
      reviews: 95,
      category: 'Pants & Shorts',
      image:
        'https://images.unsplash.com/photo-1506629905962-4b91bb1ab297?w=400&h=400&fit=crop&crop=center',
      inStock: true,
    },
    {
      id: 20,
      name: 'Graphic Print Tee',
      price: 32,
      rating: 4.4,
      reviews: 112,
      category: 'Tees',
      image:
        'https://images.unsplash.com/photo-1527719327259-0c9669ac8644?w=400&h=400&fit=crop&crop=center',
      inStock: true,
    },
  ]);

  // State for favorites
  const [favorites, setFavorites] = useState(new Set());

  // Cart actions using Redux
  const handleCartAction = (product, e) => {
    e.stopPropagation(); // Prevent navigation when clicking cart button

    if (isInCart(product.id)) {
      // Remove from cart
      dispatch(removeFromCart(product.id));
    } else {
      // Add to cart
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
    }
  };

  // Navigate to product details
  const handleProductClick = productId => {
    navigate(`/product/${productId}`);
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

  // Filter state - simplified to match reference design
  const [filters, setFilters] = useState({
    price: 'All',
    color: 'All',
    size: 'All',
    category: 'All',
  });

  // Filter options matching the reference design
  const filterOptions = {
    price: ['All', '$0 - $25', '$25 - $50', '$50 - $75', '$75+'],
    color: ['All', 'White', 'Beige', 'Blue', 'Brown', 'Green', 'Purple'],
    size: ['All', 'XS', 'S', 'M', 'L', 'XL', '2XL'],
    category: [
      'All',
      'All New Arrivals',
      'Tees',
      'Objects',
      'Sweatshirts',
      'Pants & Shorts',
    ],
  };

  // Sort state
  const [sortBy, setSortBy] = useState('featured');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Sort options
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (sortDropdownOpen && !event.target.closest('.sort-dropdown')) {
        setSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sortDropdownOpen]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const productsPerPage = 8;

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter(product => {
    if (filters.category !== 'All' && filters.category !== 'All New Arrivals') {
      if (filters.category === 'Objects' && product.category !== 'Objects')
        return false;
      if (filters.category === 'Tees' && product.category !== 'Tees')
        return false;
    }

    // Price filtering
    if (filters.price !== 'All') {
      const price = product.price;
      switch (filters.price) {
        case '$0 - $25':
          if (price > 25) return false;
          break;
        case '$25 - $50':
          if (price < 25 || price > 50) return false;
          break;
        case '$50 - $75':
          if (price < 50 || price > 75) return false;
          break;
        case '$75+':
          if (price < 75) return false;
          break;
        default:
          break;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id; // Assuming higher ID means newer
      case 'popular':
        return (b.reviews || 0) - (a.reviews || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'featured':
      default:
        return 0; // Keep original order for featured
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Star rating component
  // Badge component
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
    };

    return (
      <div
        className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded ${badgeStyles[badge] || 'bg-blue-500 text-white'}`}
      >
        {badge}
      </div>
    );
  };

  // PropTypes for ProductBadge
  ProductBadge.propTypes = {
    badge: PropTypes.string,
    inStock: PropTypes.bool.isRequired,
  };

  const StarRating = ({ rating, reviews }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= Math.floor(rating)
              ? 'text-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          } fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({reviews})
        </span>
      </div>
    );
  };

  // PropTypes for StarRating
  StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-blue-50/50 dark:from-purple-900/20 dark:via-pink-900/15 dark:to-blue-900/20" />

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* Title and Subtitle */}
          <div className="mb-6">
            <h1 className="text-3xl font-normal text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                New
              </span>{' '}
              <span className="text-gray-900 dark:text-white">Arrivals</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Checkout out the latest release of Basic Tees, new and improved
              with four openings!
            </p>
          </div>

          {/* Filter Controls Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Filter Toggle */}
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
                  {filtersOpen ? 'Hide' : 'Show'} Filters (
                  {Object.values(filters).filter(f => f !== 'All').length})
                </span>
              </button>

              {/* Separator */}
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>

              {/* Clear All */}
              {Object.values(filters).some(f => f !== 'All') && (
                <button
                  onClick={() =>
                    setFilters({
                      price: 'All',
                      color: 'All',
                      size: 'All',
                      category: 'All',
                    })
                  }
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Sort - Right Side */}
            <div className="relative sort-dropdown">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <span>
                  Sort:{' '}
                  {sortOptions.find(option => option.value === sortBy)?.label ||
                    'Featured'}
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

              {/* Sort Dropdown */}
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
        </div>

        {/* Filters Row - Expandable/Collapsible Horizontal Layout */}
        {filtersOpen && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 transition-all duration-300 ease-in-out">
            <div className="grid grid-cols-4 gap-8">
              {Object.entries(filterOptions).map(([filterKey, options]) => (
                <div key={filterKey}>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4 capitalize">
                    {filterKey}
                  </h3>
                  <div className="space-y-3">
                    {options.map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters[filterKey] === option}
                          onChange={() => handleFilterChange(filterKey, option)}
                          className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-700"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
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

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {paginatedProducts.map(product => (
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
                    onError={e => {
                      // First fallback: Try a different Unsplash image based on category
                      const fallbackImages = {
                        Objects:
                          'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center',
                        Tees: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center',
                        Sweatshirts:
                          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center',
                        'Pants & Shorts':
                          'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center',
                      };

                      // If the current source is not already a fallback
                      if (
                        !e.target.src.includes('placeholder.com') &&
                        !e.target.dataset.fallbackUsed
                      ) {
                        e.target.dataset.fallbackUsed = 'true';
                        e.target.src =
                          fallbackImages[product.category] ||
                          fallbackImages['Objects'];
                      } else {
                        // Final fallback: Use placeholder service
                        e.target.src = `https://via.placeholder.com/400x400/E5E7EB/6B7280?text=${encodeURIComponent(product.name.split(' ')[0])}`;
                      }
                    }}
                    onLoad={e => {
                      // Reset fallback flag on successful load
                      delete e.target.dataset.fallbackUsed;
                    }}
                  />

                  {/* Product Badge */}
                  <ProductBadge
                    badge={product.badge}
                    inStock={product.inStock}
                  />

                  {/* Heart Icon - only show if in stock */}
                  {product.inStock && (
                    <button
                      onClick={e => toggleFavorite(product.id, e)}
                      className="absolute top-3 right-3 p-1.5 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all duration-200"
                    >
                      <svg
                        className={`w-5 h-5 ${
                          favorites.has(product.id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-400 hover:text-red-400 dark:text-gray-500 dark:hover:text-red-400'
                        }`}
                        fill={
                          favorites.has(product.id) ? 'currentColor' : 'none'
                        }
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
                  )}

                  {/* Add to Cart Button - Responsive design for mobile and desktop */}
                  {product.inStock && (
                    <>
                      {/* Desktop: Full button with hover effect */}
                      <button
                        onClick={e => handleCartAction(product, e)}
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
                        onClick={e => handleCartAction(product, e)}
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
                  className={`text-sm font-medium mb-1 ${
                    product.inStock
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {product.name}
                  {!product.inStock && (
                    <span className="text-xs text-red-500 ml-2">
                      (Out of Stock)
                    </span>
                  )}
                </h3>
                <StarRating rating={product.rating} reviews={product.reviews} />
                <p
                  className={`text-lg font-medium mt-2 ${
                    product.inStock
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm ${
                currentPage === 1
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {Array.from(
                { length: Math.min(totalPages, 10) },
                (_, i) => i + 1
              ).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 text-sm rounded ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 10 && (
                <span className="text-gray-400 dark:text-gray-500">...</span>
              )}
              {totalPages > 10 && (
                <>
                  <button
                    onClick={() => handlePageChange(totalPages - 1)}
                    className={`w-8 h-8 text-sm rounded ${
                      currentPage === totalPages - 1
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {totalPages - 1}
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`w-8 h-8 text-sm rounded ${
                      currentPage === totalPages
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm ${
                currentPage === totalPages
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
