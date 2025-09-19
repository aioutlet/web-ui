export default function Footer() {
  return (
    <footer
      className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="AIOutlet" />
              <span className="text-gradient ml-2 text-xl font-bold">
                AIOutlet
              </span>
            </div>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
              Your one-stop destination for AI-powered shopping. Discover
              amazing products with intelligent recommendations.
            </p>
            <div className="flex space-x-6">
              {[
                {
                  name: 'Facebook',
                  href: '#',
                  icon: props => (
                    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                },
                {
                  name: 'Instagram',
                  href: '#',
                  icon: props => (
                    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                      <path
                        fillRule="evenodd"
                        d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                },
                {
                  name: 'Twitter',
                  href: '#',
                  icon: props => (
                    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  ),
                },
              ].map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 transition-colors hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Shop
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {[
                    { name: 'All Products', href: '#' },
                    { name: 'Electronics', href: '#' },
                    { name: 'Fashion', href: '#' },
                    { name: 'Home & Garden', href: '#' },
                    { name: 'Sports', href: '#' },
                  ].map(item => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Customer Service
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {[
                    { name: 'Contact Us', href: '#' },
                    { name: 'FAQ', href: '#' },
                    { name: 'Shipping Info', href: '#' },
                    { name: 'Returns', href: '#' },
                    { name: 'Size Guide', href: '#' },
                  ].map(item => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {[
                    { name: 'About', href: '#' },
                    { name: 'Blog', href: '#' },
                    { name: 'Careers', href: '#' },
                    { name: 'Press', href: '#' },
                  ].map(item => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {[
                    { name: 'Privacy Policy', href: '#' },
                    { name: 'Terms of Service', href: '#' },
                    { name: 'Cookie Policy', href: '#' },
                  ].map(item => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 dark:border-gray-700/50">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
              &copy; 2025 AIOutlet, Inc. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 sm:mt-0">
              <a
                href="#"
                className="text-xs leading-5 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs leading-5 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
