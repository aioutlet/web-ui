import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleCart } from '../../store/slices/cartSlice';
import ThemeToggle from '../ui/ThemeToggle';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null);

  const dispatch = useDispatch();
  const { totalItems } = useSelector(state => state.cart);
  const { isAuthenticated, user } = useSelector(state => state.user);

  const navigationItems = [
    {
      name: 'Women',
      href: '/women',
      dropdown: {
        sections: [
          {
            title: 'Clothing',
            items: [
              { name: 'Tops', href: '/women/tops' },
              { name: 'Dresses', href: '/women/dresses' },
              { name: 'Pants', href: '/women/pants' },
              { name: 'Denim', href: '/women/denim' },
              { name: 'Sweaters', href: '/women/sweaters' },
              { name: 'Jackets', href: '/women/jackets' },
              { name: 'Activewear', href: '/women/activewear' },
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
              { name: 'Necklaces', href: '/women/necklaces' },
              { name: 'Watches', href: '/women/watches' },
              { name: 'Bags', href: '/women/bags' },
              { name: 'Sunglasses', href: '/women/sunglasses' },
              { name: 'Hats', href: '/women/hats' },
              { name: 'Belts', href: '/women/belts' },
              {
                name: 'Browse All',
                href: '/women/accessories',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Brands',
            items: [
              { name: 'Full Nelson', href: '/brands/full-nelson' },
              { name: 'My Way', href: '/brands/my-way' },
              { name: 'Re-Arranged', href: '/brands/re-arranged' },
              { name: 'Counterfeit', href: '/brands/counterfeit' },
              { name: 'Significant Other', href: '/brands/significant-other' },
              {
                name: 'Browse All',
                href: '/women/brands',
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
              { name: 'Shirts', href: '/men/shirts' },
              { name: 'T-Shirts', href: '/men/t-shirts' },
              { name: 'Pants', href: '/men/pants' },
              { name: 'Denim', href: '/men/denim' },
              { name: 'Sweaters', href: '/men/sweaters' },
              { name: 'Jackets', href: '/men/jackets' },
              { name: 'Activewear', href: '/men/activewear' },
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
              { name: 'Watches', href: '/men/watches' },
              { name: 'Wallets', href: '/men/wallets' },
              { name: 'Sunglasses', href: '/men/sunglasses' },
              { name: 'Hats', href: '/men/hats' },
              { name: 'Belts', href: '/men/belts' },
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
      name: 'Electronics',
      href: '/electronics',
      dropdown: {
        sections: [
          {
            title: 'Computers & Tablets',
            items: [
              { name: 'Laptops', href: '/electronics/laptops' },
              { name: 'Desktop Computers', href: '/electronics/desktops' },
              { name: 'Tablets', href: '/electronics/tablets' },
              { name: 'Monitors', href: '/electronics/monitors' },
              { name: 'Keyboards & Mice', href: '/electronics/peripherals' },
              {
                name: 'Browse All',
                href: '/electronics/computers',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Mobile & Audio',
            items: [
              { name: 'Smartphones', href: '/electronics/smartphones' },
              { name: 'Headphones', href: '/electronics/headphones' },
              { name: 'Speakers', href: '/electronics/speakers' },
              { name: 'Smartwatches', href: '/electronics/smartwatches' },
              { name: 'Phone Cases', href: '/electronics/cases' },
              {
                name: 'Browse All',
                href: '/electronics/mobile-audio',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Gaming & Entertainment',
            items: [
              { name: 'Gaming Consoles', href: '/electronics/consoles' },
              { name: 'Video Games', href: '/electronics/games' },
              {
                name: 'Gaming Accessories',
                href: '/electronics/gaming-accessories',
              },
              { name: 'TVs & Streaming', href: '/electronics/tvs' },
              { name: 'Virtual Reality', href: '/electronics/vr' },
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
            title: 'Athletic Wear',
            items: [
              { name: 'Running Shoes', href: '/sports/running-shoes' },
              { name: 'Athletic Apparel', href: '/sports/apparel' },
              { name: 'Gym Wear', href: '/sports/gym-wear' },
              { name: 'Sports Bras', href: '/sports/sports-bras' },
              { name: 'Athletic Socks', href: '/sports/socks' },
              {
                name: 'Browse All',
                href: '/sports/athletic-wear',
                isBrowseAll: true,
              },
            ],
          },
          {
            title: 'Equipment & Gear',
            items: [
              { name: 'Fitness Equipment', href: '/sports/fitness-equipment' },
              { name: 'Sports Balls', href: '/sports/balls' },
              { name: 'Water Bottles', href: '/sports/bottles' },
              { name: 'Gym Bags', href: '/sports/bags' },
              { name: 'Yoga Mats', href: '/sports/yoga' },
              {
                name: 'Browse All',
                href: '/sports/equipment',
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
      console.log('Searching for:', searchQuery);
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <LogoIcon />
              <span className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                AIOutlet
              </span>
            </Link>
          </div>

          {/* Center Navigation - Hidden on mobile */}
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
          <div className="flex items-center space-x-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* User Account */}
            <button
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
              aria-label={
                isAuthenticated ? `Account for ${user?.name}` : 'Sign in'
              }
            >
              <UserIcon />
            </button>

            {/* Cart */}
            <button
              onClick={handleCartClick}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all duration-200 relative"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <BasketIcon itemCount={totalItems} />
            </button>

            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-200 md:hidden"
              aria-label="Toggle menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Search Bar - Expandable */}
        {isSearchOpen && (
          <div className="pb-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-lg mx-auto"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                autoFocus
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
            </form>
          </div>
        )}
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
