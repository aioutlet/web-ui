import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { toggleCart } from '../../store/slices/cartSlice'
import { logout } from '../../store/slices/authSlice'
import { useCategories } from '../../hooks/useCategories'
import ThemeToggle from '../common/ThemeToggle'
import { cn } from '../../utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { totalItems } = useAppSelector(state => state.cart)
  const { isAuthenticated, user } = useAppSelector(state => state.auth)
  const { featuredCategories, loading: categoriesLoading } = useCategories()
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false)

  const handleCartToggle = () => {
    dispatch(toggleCart())
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const isCurrentPath = href => {
    return location.pathname === href
  }

  return (
    <Disclosure
      as="nav"
      className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-800/10"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="flex items-center">
                    <img
                      className="h-8 w-auto"
                      src="/logo.svg"
                      alt="AIOutlet"
                    />
                    <span className="text-gradient ml-2 text-xl font-bold">
                      AIOutlet
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map(item => {
                    const isCurrent = isCurrentPath(item.href)

                    // Special handling for Categories dropdown
                    if (item.name === 'Categories') {
                      return (
                        <Menu
                          key={item.name}
                          as="div"
                          className="relative flex"
                        >
                          <Menu.Button
                            className={cn(
                              isCurrent
                                ? 'border-primary-500 text-gray-900 dark:text-white'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200',
                              'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors'
                            )}
                          >
                            {item.name}
                            <ChevronDownIcon className="ml-1 h-4 w-4" />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute left-0 top-full z-50 mt-0 max-h-96 w-56 origin-top-left overflow-y-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/categories"
                                    className={cn(
                                      active
                                        ? 'bg-gray-100 dark:bg-gray-700'
                                        : '',
                                      'block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200'
                                    )}
                                  >
                                    All Categories
                                  </Link>
                                )}
                              </Menu.Item>
                              {!categoriesLoading &&
                                featuredCategories.length > 0 && (
                                  <>
                                    <div className="border-t border-gray-200 dark:border-gray-600" />
                                    <div className="px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                      Featured
                                    </div>
                                    {featuredCategories
                                      .slice(0, 5)
                                      .map((category, index) => (
                                        <Menu.Item key={category.id}>
                                          {({ active }) => (
                                            <Link
                                              to={`/products?category=${category.slug}`}
                                              className={cn(
                                                active
                                                  ? 'bg-gray-100 dark:bg-gray-700'
                                                  : '',
                                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                              )}
                                            >
                                              {category.name}
                                            </Link>
                                          )}
                                        </Menu.Item>
                                      ))}
                                  </>
                                )}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      )
                    }

                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          isCurrent
                            ? 'border-primary-500 text-gray-900 dark:text-white'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200',
                          'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors'
                        )}
                        aria-current={isCurrent ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Search */}
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400 dark:text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 dark:focus:ring-primary-500 sm:text-sm sm:leading-6"
                      placeholder="Search products..."
                      type="search"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Cart */}
                <button
                  type="button"
                  onClick={handleCartToggle}
                  className="relative rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200 dark:focus:ring-offset-gray-900"
                >
                  <span className="sr-only">View cart</span>
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </button>

                {/* Profile dropdown */}
                {isAuthenticated ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-800 dark:focus:ring-offset-gray-900">
                        <span className="sr-only">Open user menu</span>
                        {user?.avatar ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.avatar}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600">
                            <UserIcon className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
                        <div className="border-b border-gray-200 px-4 py-2 text-sm text-gray-700 dark:border-gray-600 dark:text-gray-200">
                          <p className="font-medium">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            {user?.email}
                          </p>
                        </div>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={cn(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/orders"
                              className={cn(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                              )}
                            >
                              Order History
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/settings"
                              className={cn(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={cn(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="ml-3 flex items-center space-x-3">
                    <Link
                      to="/signin"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    >
                      Sign in
                    </Link>
                    <Link to="/signup" className="btn btn-primary btn-sm">
                      Sign up
                    </Link>
                  </div>
                )}

                {/* Mobile menu button */}
                <Disclosure.Button className="relative ml-3 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200 sm:hidden">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map(item => {
                const isCurrent = isCurrentPath(item.href)

                // Special handling for Categories in mobile
                if (item.name === 'Categories') {
                  return (
                    <div key={item.name}>
                      <div className="flex items-center">
                        <Disclosure.Button
                          as={Link}
                          to={item.href}
                          className={cn(
                            isCurrent
                              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200',
                            'block flex-1 border-l-4 py-2 pl-3 pr-2 text-base font-medium transition-colors'
                          )}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          Categories
                        </Disclosure.Button>
                        <button
                          onClick={() =>
                            setIsMobileCategoriesOpen(!isMobileCategoriesOpen)
                          }
                          className="px-3 py-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                          aria-label="Toggle featured categories"
                        >
                          <ChevronDownIcon
                            className={cn(
                              'h-5 w-5 transform transition-transform duration-200',
                              isMobileCategoriesOpen ? 'rotate-180' : ''
                            )}
                          />
                        </button>
                      </div>
                      {isMobileCategoriesOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          <Disclosure.Button
                            as={Link}
                            to="/categories"
                            className="flex items-center border-l-4 border-transparent py-1 pl-3 pr-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                          >
                            All Categories
                          </Disclosure.Button>
                          {!categoriesLoading &&
                            featuredCategories.length > 0 && (
                              <>
                                <div className="px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                                  Featured
                                </div>
                                {featuredCategories
                                  .slice(0, 5)
                                  .map(category => (
                                    <Disclosure.Button
                                      key={category.id}
                                      as={Link}
                                      to={`/products?category=${category.slug}`}
                                      className="block border-l-4 border-transparent py-1 pl-3 pr-4 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                    >
                                      {category.name}
                                    </Disclosure.Button>
                                  ))}
                              </>
                            )}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={cn(
                      isCurrent
                        ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200',
                      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-colors'
                    )}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                )
              })}
            </div>

            {/* Mobile Auth Actions */}
            {!isAuthenticated && (
              <div className="border-t border-gray-200 pb-3 pt-4 dark:border-gray-700">
                <div className="flex items-center space-x-3 px-4">
                  <Link
                    to="/signin"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  >
                    Sign in
                  </Link>
                  <Link to="/signup" className="btn btn-primary btn-sm">
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
