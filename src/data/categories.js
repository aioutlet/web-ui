// Categories data structure for the AIOutlet e-commerce platform
export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description:
      'Cutting-edge technology and innovative electronic devices for modern living',
    shortDescription: 'Latest tech gadgets and electronics',
    image:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    icon: '📱',
    productCount: 1248,
    featured: true,
    trending: true,
    subcategories: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        slug: 'smartphones',
        productCount: 156,
        image:
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
      },
      {
        id: 'laptops',
        name: 'Laptops',
        slug: 'laptops',
        productCount: 89,
        image:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
      },
      {
        id: 'headphones',
        name: 'Headphones',
        slug: 'headphones',
        productCount: 234,
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      },
      {
        id: 'tablets',
        name: 'Tablets',
        slug: 'tablets',
        productCount: 67,
        image:
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
      },
    ],
    tags: ['technology', 'gadgets', 'innovation', 'smart devices'],
    color: 'blue',
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    slug: 'fashion',
    description:
      'Trendy clothing, accessories, and fashion items for every style and occasion',
    shortDescription: 'Stylish clothing and accessories',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    icon: '👗',
    productCount: 2156,
    featured: true,
    trending: false,
    subcategories: [
      {
        id: 'womens-clothing',
        name: "Women's Clothing",
        slug: 'womens-clothing',
        productCount: 856,
        image:
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
      },
      {
        id: 'mens-clothing',
        name: "Men's Clothing",
        slug: 'mens-clothing',
        productCount: 642,
        image:
          'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&q=80',
      },
      {
        id: 'shoes',
        name: 'Shoes',
        slug: 'shoes',
        productCount: 434,
        image:
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
      },
      {
        id: 'accessories',
        name: 'Accessories',
        slug: 'accessories',
        productCount: 224,
        image:
          'https://images.unsplash.com/photo-1583158837671-59be8b3e1d1a?w=600&q=80',
      },
    ],
    tags: ['clothing', 'style', 'fashion', 'apparel'],
    color: 'pink',
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    slug: 'home-garden',
    description:
      'Beautiful home decor, furniture, and garden essentials for your living space',
    shortDescription: 'Home decor and garden essentials',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    icon: '🏠',
    productCount: 1789,
    featured: true,
    trending: true,
    subcategories: [
      {
        id: 'furniture',
        name: 'Furniture',
        slug: 'furniture',
        productCount: 456,
        image:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      },
      {
        id: 'decor',
        name: 'Home Decor',
        slug: 'decor',
        productCount: 687,
        image:
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
      },
      {
        id: 'kitchen',
        name: 'Kitchen & Dining',
        slug: 'kitchen',
        productCount: 345,
        image:
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      },
      {
        id: 'garden',
        name: 'Garden & Outdoor',
        slug: 'garden',
        productCount: 301,
        image:
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
      },
    ],
    tags: ['home', 'furniture', 'decor', 'garden'],
    color: 'green',
  },
  {
    id: 'sports-fitness',
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    description:
      'Professional sports equipment, fitness gear, and outdoor adventure essentials',
    shortDescription: 'Sports equipment and fitness gear',
    image:
      'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=800&q=80',
    icon: '⚽',
    productCount: 967,
    featured: false,
    trending: true,
    subcategories: [
      {
        id: 'fitness-equipment',
        name: 'Fitness Equipment',
        slug: 'fitness-equipment',
        productCount: 234,
        image:
          'https://images.unsplash.com/photo-1517438984742-1262db08379e?w=600&q=80',
      },
      {
        id: 'athletic-wear',
        name: 'Athletic Wear',
        slug: 'athletic-wear',
        productCount: 345,
        image:
          'https://images.unsplash.com/photo-1506629905962-b91ba3e75477?w=600&q=80',
      },
      {
        id: 'outdoor-sports',
        name: 'Outdoor Sports',
        slug: 'outdoor-sports',
        productCount: 234,
        image:
          'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80',
      },
      {
        id: 'team-sports',
        name: 'Team Sports',
        slug: 'team-sports',
        productCount: 154,
        image:
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
      },
    ],
    tags: ['sports', 'fitness', 'exercise', 'outdoor'],
    color: 'orange',
  },
  {
    id: 'beauty-health',
    name: 'Beauty & Health',
    slug: 'beauty-health',
    description:
      'Premium beauty products, skincare, health supplements, and wellness items',
    shortDescription: 'Beauty and health essentials',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    icon: '💄',
    productCount: 1432,
    featured: false,
    trending: false,
    subcategories: [
      {
        id: 'skincare',
        name: 'Skincare',
        slug: 'skincare',
        productCount: 456,
        image:
          'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
      },
      {
        id: 'makeup',
        name: 'Makeup',
        slug: 'makeup',
        productCount: 378,
        image:
          'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
      },
      {
        id: 'health-supplements',
        name: 'Health Supplements',
        slug: 'health-supplements',
        productCount: 289,
        image:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
      },
      {
        id: 'personal-care',
        name: 'Personal Care',
        slug: 'personal-care',
        productCount: 309,
        image:
          'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
      },
    ],
    tags: ['beauty', 'health', 'skincare', 'wellness'],
    color: 'purple',
  },
  {
    id: 'books-media',
    name: 'Books & Media',
    slug: 'books-media',
    description:
      'Extensive collection of books, e-books, audiobooks, and digital media content',
    shortDescription: 'Books and digital media',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    icon: '📚',
    productCount: 3456,
    featured: false,
    trending: false,
    subcategories: [
      {
        id: 'fiction',
        name: 'Fiction',
        slug: 'fiction',
        productCount: 1234,
        image:
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
      },
      {
        id: 'non-fiction',
        name: 'Non-Fiction',
        slug: 'non-fiction',
        productCount: 987,
        image:
          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
      },
      {
        id: 'digital-media',
        name: 'Digital Media',
        slug: 'digital-media',
        productCount: 567,
        image:
          'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80',
      },
      {
        id: 'educational',
        name: 'Educational',
        slug: 'educational',
        productCount: 668,
        image:
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
      },
    ],
    tags: ['books', 'media', 'reading', 'education'],
    color: 'indigo',
  },
  {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    description:
      'Car accessories, parts, tools, and automotive maintenance essentials',
    shortDescription: 'Auto parts and accessories',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    icon: '🚗',
    productCount: 834,
    featured: false,
    trending: false,
    subcategories: [
      {
        id: 'car-parts',
        name: 'Car Parts',
        slug: 'car-parts',
        productCount: 345,
        image:
          'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=600&q=80',
      },
      {
        id: 'accessories',
        name: 'Car Accessories',
        slug: 'car-accessories',
        productCount: 234,
        image:
          'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&q=80',
      },
      {
        id: 'tools',
        name: 'Tools & Equipment',
        slug: 'automotive-tools',
        productCount: 156,
        image:
          'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
      },
      {
        id: 'maintenance',
        name: 'Maintenance',
        slug: 'maintenance',
        productCount: 99,
        image:
          'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80',
      },
    ],
    tags: ['automotive', 'car parts', 'accessories', 'tools'],
    color: 'gray',
  },
  {
    id: 'toys-games',
    name: 'Toys & Games',
    slug: 'toys-games',
    description: 'Fun toys, educational games, and entertainment for all ages',
    shortDescription: 'Toys and games for all ages',
    image:
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80',
    icon: '🎮',
    productCount: 1567,
    featured: false,
    trending: true,
    subcategories: [
      {
        id: 'video-games',
        name: 'Video Games',
        slug: 'video-games',
        productCount: 456,
        image:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
      },
      {
        id: 'board-games',
        name: 'Board Games',
        slug: 'board-games',
        productCount: 234,
        image:
          'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&q=80',
      },
      {
        id: 'kids-toys',
        name: 'Kids Toys',
        slug: 'kids-toys',
        productCount: 567,
        image:
          'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&q=80',
      },
      {
        id: 'educational-toys',
        name: 'Educational Toys',
        slug: 'educational-toys',
        productCount: 310,
        image:
          'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80',
      },
    ],
    tags: ['toys', 'games', 'entertainment', 'kids'],
    color: 'yellow',
  },
]

export const featuredCategories = categories.filter(cat => cat.featured)
export const trendingCategories = categories.filter(cat => cat.trending)

// Category color mapping for consistent theming
export const categoryColors = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    text: 'text-blue-900 dark:text-blue-100',
    accent: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    hover: 'hover:bg-blue-100 dark:hover:bg-blue-900',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-950',
    text: 'text-pink-900 dark:text-pink-100',
    accent: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-200 dark:border-pink-800',
    hover: 'hover:bg-pink-100 dark:hover:bg-pink-900',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-900 dark:text-green-100',
    accent: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    hover: 'hover:bg-green-100 dark:hover:bg-green-900',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950',
    text: 'text-orange-900 dark:text-orange-100',
    accent: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    hover: 'hover:bg-orange-100 dark:hover:bg-orange-900',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950',
    text: 'text-purple-900 dark:text-purple-100',
    accent: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    hover: 'hover:bg-purple-100 dark:hover:bg-purple-900',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950',
    text: 'text-indigo-900 dark:text-indigo-100',
    accent: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800',
    hover: 'hover:bg-indigo-100 dark:hover:bg-indigo-900',
  },
  gray: {
    bg: 'bg-gray-50 dark:bg-gray-950',
    text: 'text-gray-900 dark:text-gray-100',
    accent: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-800',
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-900',
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    text: 'text-yellow-900 dark:text-yellow-100',
    accent: 'text-yellow-600 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800',
    hover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900',
  },
}

// Helper function to get category by slug
export const getCategoryBySlug = slug => {
  return categories.find(cat => cat.slug === slug)
}

// Helper function to get total product count
export const getTotalProductCount = () => {
  return categories.reduce((total, cat) => total + cat.productCount, 0)
}
