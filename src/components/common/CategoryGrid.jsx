import { Link } from 'react-router-dom'
import { useCategories } from '../../hooks/useCategories'
import { cn } from '../../utils'

export default function CategoryGrid() {
  const { featuredCategories, loading } = useCategories()

  // Use the first 4 featured categories for the grid layout
  const displayCategories = featuredCategories.slice(0, 4).map(cat => ({
    name: cat.name,
    href: `/products?category=${cat.slug}`,
    imageSrc: cat.image,
    imageAlt: `${cat.name} category`,
    description: cat.shortDescription,
  }))

  // Loading state
  if (loading || displayCategories.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Shop by Category
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700',
                  i === 0
                    ? 'aspect-h-1 aspect-w-2 sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2'
                    : 'aspect-h-1 aspect-w-2'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Shop by Category
          </h2>
          <Link
            to="/categories"
            className="hidden text-sm font-medium text-primary-600 hover:text-primary-500 sm:block dark:text-primary-400 dark:hover:text-primary-300"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <Link
            to={displayCategories[0]?.href || '/categories'}
            className="aspect-h-1 aspect-w-2 sm:aspect-h-1 sm:aspect-w-1 group relative overflow-hidden rounded-lg sm:row-span-2"
          >
            <img
              src={displayCategories[0]?.imageSrc}
              alt={displayCategories[0]?.imageAlt}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
            />
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <h3 className="font-semibold text-white">
                  {displayCategories[0]?.name}
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  {displayCategories[0]?.description}
                </p>
              </div>
            </div>
          </Link>

          {displayCategories.slice(1, 4).map((category, index) => (
            <Link
              key={index}
              to={category.href}
              className="aspect-h-1 aspect-w-2 sm:aspect-none group overflow-hidden rounded-lg sm:relative sm:h-full"
            >
              <img
                src={category.imageSrc}
                alt={category.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div>
                  <h3 className="font-semibold text-white">{category.name}</h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            to="/categories"
            className="block text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
