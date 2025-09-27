// Categories data
export const categories = [
  {
    id: 1,
    name: 'Clothing',
    slug: 'clothing',
    description: 'Trendy clothes for every occasion',
    image: '/images/categories/clothing.jpg',
    subcategories: ['Shirts', 'Dresses', 'Pants', 'Jackets', 'Activewear'],
  },
  {
    id: 2,
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your look with our accessories',
    image: '/images/categories/accessories.jpg',
    subcategories: ['Bags', 'Jewelry', 'Watches', 'Belts', 'Sunglasses'],
  },
  {
    id: 3,
    name: 'Footwear',
    slug: 'footwear',
    description: 'Step out in style with our footwear',
    image: '/images/categories/footwear.jpg',
    subcategories: ['Sneakers', 'Boots', 'Sandals', 'Heels', 'Flats'],
  },
]

// Featured Products data
export const featuredProducts = [
  {
    id: 1,
    name: 'Classic White Sneakers',
    slug: 'classic-white-sneakers',
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    rating: 4.8,
    reviews: 324,
    image: '/images/products/sneakers-1.jpg',
    category: 'Footwear',
    brand: 'Nike',
    colors: ['white', 'black', 'gray'],
    sizes: ['7', '8', '9', '10', '11'],
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: 'Denim Jacket',
    slug: 'denim-jacket',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.6,
    reviews: 156,
    image: '/images/products/jacket-1.jpg',
    category: 'Clothing',
    brand: 'Levi\'s',
    colors: ['blue', 'black', 'light-blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isFeatured: true,
  },
  {
    id: 3,
    name: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.9,
    reviews: 89,
    image: '/images/products/bag-1.jpg',
    category: 'Accessories',
    brand: 'Coach',
    colors: ['brown', 'black', 'tan'],
    sizes: ['One Size'],
    isNew: true,
    isFeatured: true,
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    price: 299.99,
    originalPrice: 349.99,
    discount: 14,
    rating: 4.7,
    reviews: 445,
    image: '/images/products/headphones-1.jpg',
    category: 'Electronics',
    brand: 'Sony',
    colors: ['black', 'white', 'blue'],
    sizes: ['One Size'],
    isNew: false,
    isFeatured: true,
  },
]

// Brands data
export const brands = [
  { id: 1, name: 'Nike', logo: '/images/brands/nike.svg', featured: true },
  { id: 2, name: 'Adidas', logo: '/images/brands/adidas.svg', featured: true },
  { id: 3, name: 'Levi\'s', logo: '/images/brands/levis.svg', featured: true },
  { id: 4, name: 'Coach', logo: '/images/brands/coach.svg', featured: true },
  { id: 5, name: 'Sony', logo: '/images/brands/sony.svg', featured: true },
  { id: 6, name: 'Apple', logo: '/images/brands/apple.svg', featured: true },
  { id: 7, name: 'Samsung', logo: '/images/brands/samsung.svg', featured: false },
  { id: 8, name: 'Zara', logo: '/images/brands/zara.svg', featured: false },
]

// Testimonials data
export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/images/avatars/sarah.jpg',
    rating: 5,
    comment: 'Amazing quality products and super fast delivery! The clothes fit perfectly and the customer service is outstanding.',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: 2,
    name: 'Mike Chen',
    avatar: '/images/avatars/mike.jpg',
    rating: 5,
    comment: 'Best online shopping experience I\'ve had. The return policy is flexible and the prices are very competitive.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    avatar: '/images/avatars/emily.jpg',
    rating: 4,
    comment: 'Great selection of brands and styles. The website is easy to navigate and checkout was seamless.',
    date: '2024-01-08',
    verified: true,
  },
]

// Hero/Banner data
export const heroData = {
  title: 'Discover Your Style',
  subtitle: 'Shop the latest trends from top brands with unbeatable prices',
  ctaText: 'Shop Now',
  ctaLink: '/products',
  backgroundImage: '/images/hero/hero-bg.jpg',
  features: [
    { icon: '🚚', text: 'Free Shipping on Orders $50+' },
    { icon: '↩️', text: '30-Day Easy Returns' },
    { icon: '💳', text: 'Secure Payment' },
  ],
}

// Newsletter data
export const newsletterData = {
  title: 'Stay Updated',
  subtitle: 'Get the latest deals, new arrivals, and style tips delivered to your inbox.',
  placeholder: 'Enter your email address',
  ctaText: 'Subscribe',
}