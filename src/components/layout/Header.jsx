import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toggleCart } from '../../store/slices/cartSlice';
import ThemeToggle from '../ui/ThemeToggle';
import UserDropdown from '../UserDropdown';
import { useAuthStore } from '../../store/authStore';
import PropTypes from 'prop-types';

// Icons matching the design
const LogoIcon = () => (
  <svg
    className="w-6 h-6 text-primary-600"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const XMarkIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const BasketIcon = ({ itemCount }) => (
  <div className="relative">
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
      />
    </svg>
    {itemCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
        {itemCount}
      </span>
    )}
  </div>
);

BasketIcon.propTypes = {
  itemCount: PropTypes.number.isRequired,
};

const MenuIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null);

  const dispatch = useDispatch();
  const { totalItems } = useSelector(state => state.cart);
  // Use Zustand auth store instead of Redux
  const { isAuthenticated } = useAuthStore();

  // Sync search query with URL when on search page
  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search);
      const query = params.get('q');
      if (query) {
        setSearchQuery(query);
      } else {
        setSearchQuery('');
      }
    } else {
      // Clear search query when navigating away from search page
      setSearchQuery('');
    }
  }, [location]);

  const navigationItems = [
    {
      name: 'Women',
      href: '/women',
      dropdown: {
        sections: [
          {
            title: 'Clothing',
            items: [
              { name: 'Tops', href: '/women/clothing/tops' },
              { name: 'Dresses', href: '/women/clothing/dresses' },
              { name: 'Pants', href: '/women/clothing/pants' },
              {
                name: 'Browse All',
                href: '/women/clothing',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Accessories',
            items: [
              { name: 'Jewelry', href: '/women/accessories/jewelry' },
              { name: 'Bags', href: '/women/accessories/bags' },
              {
                name: 'Browse All',
                href: '/women/accessories',
                isBrowseAll: true,
              },
            ],
          },
        ],
      },
    },
    {
      name: 'Men',
      href: '/men',
      dropdown: {
        sections: [
          {
            title: 'Clothing',
            items: [
              { name: 'Shirts', href: '/men/clothing/shirts' },
              { name: 'Pants', href: '/men/clothing/pants' },
              {
                name: 'Browse All',
                href: '/men/clothing',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Accessories',
            items: [
              { name: 'Belts', href: '/men/accessories/belts' },
              { name: 'Watches', href: '/men/accessories/watches' },
              {
                name: 'Browse All',
                href: '/men/accessories',
                isBrowseAll: true,
              },
            ],
          },
        ],
      },
    },
    {
      name: 'Kids',
      href: '/kids',
      dropdown: {
        sections: [
          {
            title: 'Clothing',
            items: [
              { name: 'Tops', href: '/kids/clothing/tops' },
              { name: 'Jackets', href: '/kids/clothing/jackets' },
              {
                name: 'Browse All',
                href: '/kids/clothing',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Footwear',
            items: [
              { name: 'Sneakers', href: '/kids/footwear/sneakers' },
              {
                name: 'Browse All',
                href: '/kids/footwear',
                isBrowseAll: true,
              },
            ],
          },
        ],
      },
    },
    {
      name: 'Electronics',
      href: '/electronics',
      dropdown: {
        sections: [
          {
            title: 'Mobile',
            items: [
              { name: 'Smartphones', href: '/electronics/mobile/smartphones' },
              {
                name: 'Browse All',
                href: '/electronics/mobile',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Audio',
            items: [
              { name: 'Headphones', href: '/electronics/audio/headphones' },
              {
                name: 'Browse All',
                href: '/electronics/audio',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Computers',
            items: [
              { name: 'Laptops', href: '/electronics/computers/laptops' },
              { name: 'Tablets', href: '/electronics/computers/tablets' },
              {
                name: 'Browse All',
                href: '/electronics/computers',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Gaming',
            items: [
              { name: 'Consoles', href: '/electronics/gaming/consoles' },
              {
                name: 'Browse All',
                href: '/electronics/gaming',
                isBrowseAll: true,
              },
            ],
          },
        ],
      },
    },
    {
      name: 'Sports',
      href: '/sports',
      dropdown: {
        sections: [
          {
            title: 'Footwear',
            items: [
              { name: 'Running', href: '/sports/footwear/running' },
              { name: 'Basketball', href: '/sports/footwear/basketball' },
              {
                name: 'Browse All',
                href: '/sports/footwear',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Apparel',
            items: [
              { name: 'Jackets', href: '/sports/apparel/jackets' },
              { name: 'Shorts', href: '/sports/apparel/shorts' },
              {
                name: 'Browse All',
                href: '/sports/apparel',
                isBrowseAll: true,
              },
            ],
          },
        ],
      },
    },
    {
      name: 'Books',
      href: '/books',
      dropdown: {
        sections: [
          {
            title: 'Fiction',
            items: [
              { name: 'Contemporary', href: '/books/fiction/contemporary' },
              { name: 'Fantasy', href: '/books/fiction/fantasy' },
              {
                name: 'Browse All',
                href: '/books/fiction',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Nonfiction',
            items: [
              { name: 'SelfHelp', href: '/books/nonfiction/selfhelp' },
              { name: 'Biography', href: '/books/nonfiction/biography' },
              {
                name: 'Browse All',
                href: '/books/nonfiction',
                isBrowseAll: true,
              },
            ],
          },
        ],
      },
    },
  ];

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      // Keep search bar open and query visible for easy editing
      // setIsSearchOpen(false);
      // setSearchQuery('');
    }
  };

  const handleMouseEnter = itemName => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileSubmenu = itemName => {
    setMobileExpandedMenu(mobileExpandedMenu === itemName ? null : itemName);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo, Navigation, and Icons */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <LogoIcon />
              <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400 transition-colors duration-200">
                AIOutlet
              </span>
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            {navigationItems.map(item => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={`px-1 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                    activeDropdown === item.name
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-200 ${
                      activeDropdown === item.name
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>

                {/* Mega Menu Dropdown */}
                {item.dropdown && activeDropdown === item.name && (
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 z-50 ${
                      item.dropdown.sections.length === 2
                        ? 'w-screen max-w-2xl'
                        : 'w-screen max-w-4xl'
                    }`}
                  >
                    {/* Transparent hover area to keep dropdown open */}
                    <div className="h-2 w-full"></div>
                    <div className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-200">
                      <div className="max-w-7xl mx-auto px-8 pt-6 pb-8">
                        <div
                          className={`grid gap-8 ${
                            item.dropdown.sections.length === 2
                              ? 'grid-cols-2'
                              : 'grid-cols-3'
                          }`}
                        >
                          {item.dropdown.sections.map(
                            (section, sectionIndex) => (
                              <div key={sectionIndex} className="space-y-3">
                                <h3 className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider transition-colors duration-200">
                                  {section.title}
                                </h3>
                                <ul className="space-y-1">
                                  {section.items.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      {subItem.isBrowseAll && (
                                        <div className="border-t border-gray-200 my-2 w-12"></div>
                                      )}
                                      <Link
                                        to={subItem.href}
                                        className={`transition-colors duration-150 text-sm py-1 relative group inline-block ${
                                          subItem.isBrowseAll
                                            ? 'text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300'
                                            : 'text-gray-600 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400'
                                        }`}
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        {subItem.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          {/* Right Side Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* User Account - Show dropdown if authenticated, otherwise login link */}
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <Link
                to="/login"
                className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
                aria-label="Sign in"
              >
                <UserIcon />
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={handleCartClick}
              className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all duration-200 relative"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <BasketIcon itemCount={totalItems} />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all duration-200 md:hidden"
              aria-label="Toggle menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Search Bar - Full width, always visible */}
        <div className="pb-3">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <XMarkIcon />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200">
          <div className="px-4 py-4 space-y-1">
            {navigationItems.map(item => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  {/* Main Navigation Item */}
                  {item.dropdown ? (
                    <button
                      onClick={() => toggleMobileSubmenu(item.name)}
                      className="flex-1 text-left px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200 relative group"
                    >
                      {item.name}
                      <span className="absolute bottom-2 left-3 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-6"></span>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex-1 px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-all duration-200 relative group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      <span className="absolute bottom-2 left-3 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-6"></span>
                    </Link>
                  )}

                  {/* Expand/Collapse Icon */}
                  {item.dropdown && (
                    <div className="px-3 py-3">
                      <svg
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                          mobileExpandedMenu === item.name ? 'rotate-180' : ''
                        }`}
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
                    </div>
                  )}
                </div>

                {/* Sub-menu items for mobile - Only show when expanded */}
                {item.dropdown && mobileExpandedMenu === item.name && (
                  <div className="ml-4 space-y-1 border-l-2 border-primary-100 pl-4">
                    {item.dropdown.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="space-y-2">
                        <h4 className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mt-3 first:mt-1 transition-colors duration-200">
                          {section.title}
                        </h4>
                        {section.items.map((subItem, subIndex) => (
                          <div key={subIndex}>
                            {subItem.isBrowseAll && (
                              <div className="border-t border-gray-200 my-3 w-12 mx-2"></div>
                            )}
                            <Link
                              to={subItem.href}
                              className={`block px-2 py-2 text-sm rounded transition-all duration-200 relative group ${
                                subItem.isBrowseAll
                                  ? 'text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-gray-800'
                                  : 'text-gray-600 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800'
                              }`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setMobileExpandedMenu(null);
                              }}
                            >
                              {subItem.name}
                              <span className="absolute bottom-1 left-2 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-4"></span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
