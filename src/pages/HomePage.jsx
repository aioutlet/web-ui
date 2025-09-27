import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  setCategories, 
  setFeaturedProducts 
} from '../slices/productSlice'
import { 
  categories, 
  featuredProducts, 
  testimonials, 
  heroData,
  brands 
} from '../data/mockData'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import TestimonialCard from '../components/TestimonialCard'
import { 
  TruckIcon,
  ArrowPathIcon,
  CreditCardIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const HomePage = () => {
  const dispatch = useDispatch()
  const { categories: storeCategories, featuredProducts: storeFeaturedProducts } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    // Load initial data
    dispatch(setCategories(categories))
    dispatch(setFeaturedProducts(featuredProducts))
  }, [dispatch])

  const features = [
    {
      icon: TruckIcon,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: ArrowPathIcon,
      title: '30-Day Returns',
      description: 'Easy returns policy',
    },
    {
      icon: CreditCardIcon,
      title: 'Secure Payment',
      description: '100% secure checkout',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Quality Guarantee',
      description: 'Premium quality products',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroData.backgroundImage})`,
            backgroundColor: '#1e40af' // fallback color
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {heroData.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              {heroData.subtitle}
            </p>
            <Link
              to={heroData.ctaLink}
              className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {heroData.ctaText}
            </Link>
          </div>
        </div>

        {/* Features Row */}
        <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-center space-x-3 text-white">
                    <IconComponent className="h-8 w-8 text-primary-300" />
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm opacity-80">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of premium products across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storeCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked favorites from our collection
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-block text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-200"
            >
              View All Products →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {storeFeaturedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link
              to="/products"
              className="inline-block bg-primary-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-700 transition-colors duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Brands
            </h2>
            <p className="text-xl text-gray-600">
              Shop from your favorite brands
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.filter(brand => brand.featured).map((brand) => (
              <div 
                key={brand.id} 
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
              >
                <div className="text-2xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real reviews from satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay in Style
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for exclusive deals, new arrivals, and style tips
          </p>
          
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-300"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
          
          <p className="text-sm mt-4 opacity-75">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage