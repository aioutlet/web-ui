import Hero from '../components/common/Hero'
import Features from '../components/common/Features'
import CategoryGrid from '../components/common/CategoryGrid'
import FeaturedProducts from '../components/product/FeaturedProducts'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <CategoryGrid />
      <FeaturedProducts />
    </div>
  )
}
