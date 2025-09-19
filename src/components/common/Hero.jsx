import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32 dark:bg-gray-900">
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block dark:text-gray-900"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                <span className="block xl:inline">Discover Amazing</span>{' '}
                <span className="text-gradient block xl:inline">
                  Products with AI
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0 dark:text-gray-400">
                Experience the future of shopping with our AI-powered platform.
                Get personalized recommendations, smart search, and discover
                products that match your style and needs perfectly.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/products"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-primary-700 md:px-10 md:py-4 md:text-lg dark:bg-primary-600 dark:hover:bg-primary-700"
                  >
                    Start Shopping
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </a>
                </div>
                <div className="mt-3 sm:ml-3 sm:mt-0">
                  <a
                    href="/about"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-100 px-8 py-3 text-base font-medium text-primary-700 transition-colors duration-200 hover:bg-primary-200 md:px-10 md:py-4 md:text-lg dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
          alt="Shopping experience with modern technology"
        />
      </div>
    </div>
  )
}
