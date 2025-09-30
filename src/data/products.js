// Centralized product data for API integration
// This file defines the complete product schema expected from the backend API

export const products = [
  // Trending/Featured Products
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 156,
    category: 'Electronics',
    color: 'Midnight Black',
    badge: 'Bestseller',
    inStock: true,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop&crop=center',
    ],
    colors: [
      { name: 'Midnight Black', value: '#1a1a1a' },
      { name: 'Silver', value: '#e5e7eb' },
      { name: 'Rose Gold', value: '#f59e0b' },
    ],
    link: '/products/wireless-headphones',
    description:
      'Premium wireless headphones with active noise cancellation and superior sound quality. Perfect for music lovers and professionals.',
    highlights: [
      'Active noise cancellation technology',
      '30-hour battery life',
      'Premium leather headband',
      'Quick charge capability',
    ],
    specifications: {
      Brand: 'AudioTech Pro',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      Weight: '280g',
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
    },
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 249,
    originalPrice: 329,
    rating: 4.6,
    reviews: 89,
    category: 'Electronics',
    color: 'Space Gray',
    badge: 'New',
    inStock: true,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop&crop=center',
    ],
    colors: [
      { name: 'Space Gray', value: '#4b5563' },
      { name: 'Gold', value: '#fbbf24' },
      { name: 'Silver', value: '#e5e7eb' },
    ],
    link: '/products/fitness-watch',
    description:
      'Advanced fitness tracking with heart rate monitoring, GPS, and smart notifications.',
    highlights: [
      'Built-in GPS tracking',
      'Heart rate monitoring',
      'Water resistant to 50m',
      '7-day battery life',
    ],
    specifications: {
      Brand: 'FitTech',
      'Display Size': '1.4 inch',
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      Sensors: 'Heart rate, GPS, Accelerometer',
      Compatibility: 'iOS & Android',
    },
  },
  {
    id: 3,
    name: 'Premium Coffee Machine',
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 203,
    category: 'Appliances',
    color: 'Stainless Steel',
    badge: 'Limited',
    inStock: true,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=600&fit=crop&crop=center',
    ],
    colors: [
      { name: 'Stainless Steel', value: '#9ca3af' },
      { name: 'Matte Black', value: '#374151' },
    ],
    link: '/products/coffee-machine',
    description:
      'Professional-grade espresso machine with built-in grinder and milk frother for café-quality coffee at home.',
    highlights: [
      'Built-in ceramic grinder',
      'Automatic milk frother',
      'Programmable brewing settings',
      'Premium stainless steel construction',
    ],
    specifications: {
      Brand: 'BrewMaster Pro',
      'Water Tank': '2.5L',
      'Bean Hopper': '350g',
      Pressure: '15 bars',
      Power: '1450W',
      Dimensions: '35 x 28 x 38 cm',
    },
  },
  // Organization/Objects Products
  {
    id: 4,
    name: 'Organize Basic Set (Walnut)',
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    reviews: 38,
    category: 'Objects',
    inStock: true,
    badge: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1594736797933-d0eac2451a9a?w=600&h=600&fit=crop&crop=center',
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#1e3a8a' },
    ],
    link: '/products/1',
    description:
      'The perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag.',
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    specifications: {
      Origin: 'Designed by Good Goods, Inc.',
      Material:
        'Solid walnut base with rare earth magnets and powder-coated steel tips.',
      Dimensions: '15" x 3.25" x .75"',
      Finish: 'Hand sanded and finished with natural oil',
      Includes: 'Wood card, Leather strap, Desk tray, Sticky notes',
      Considerations:
        'Made from natural materials. Grain and color vary with each item.',
    },
  },
  {
    id: 5,
    name: 'Organize Pen Holder',
    price: 15,
    rating: 4.9,
    reviews: 18,
    category: 'Objects',
    inStock: false,
    image:
      'https://images.unsplash.com/photo-1606662628430-d3d3b88824ad?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1606662628430-d3d3b88824ad?w=600&h=600&fit=crop&crop=center',
    ],
    link: '/products/5',
    description:
      'Elegant wooden pen holder to keep your desk organized and stylish.',
    highlights: [
      'Natural wood finish',
      'Multiple compartments',
      'Handcrafted quality',
    ],
    specifications: {
      Material: 'Bamboo wood',
      Dimensions: '4" x 4" x 3"',
      Compartments: '3 sections',
    },
  },
  {
    id: 6,
    name: 'Organize Sticky Note Holder',
    price: 15,
    rating: 4.7,
    reviews: 14,
    category: 'Objects',
    inStock: true,
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=center',
    ],
    link: '/products/6',
    description:
      'Keep your sticky notes organized and easily accessible with this modern holder.',
    highlights: ['Magnetic base', 'Sleek design', 'Perfect desk accessory'],
    specifications: {
      Material: 'Aluminum',
      Dimensions: '3" x 3" x 1"',
      Features: 'Magnetic mounting',
    },
  },
];

// Sample reviews data
export const reviews = [
  {
    id: 1,
    productId: 1,
    author: 'Sarah Johnson',
    rating: 5,
    title: 'Excellent sound quality!',
    content:
      'These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is incredible.',
    date: '2024-03-15',
    verified: true,
    helpful: 23,
  },
  {
    id: 2,
    productId: 1,
    author: 'Mike Chen',
    rating: 4,
    title: 'Great value for money',
    content:
      'Really happy with this purchase. The build quality is solid and they are very comfortable for long listening sessions.',
    date: '2024-03-10',
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    productId: 2,
    author: 'Emily Rodriguez',
    rating: 5,
    title: 'Perfect fitness companion',
    content:
      'Love tracking my workouts with this watch. The GPS is accurate and the health metrics are very detailed.',
    date: '2024-03-12',
    verified: true,
    helpful: 15,
  },
];

// Helper functions for easy data access
export const getFeaturedProducts = () => {
  return products.filter(
    product =>
      product.badge === 'Bestseller' ||
      product.badge === 'New' ||
      product.badge === 'Limited'
  );
};

export const getProductById = id => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = category => {
  return products.filter(product => product.category === category);
};

export const getProductReviews = productId => {
  return reviews.filter(review => review.productId === parseInt(productId));
};

export const getInStockProducts = () => {
  return products.filter(product => product.inStock);
};

export const getProductsByPriceRange = (min, max) => {
  return products.filter(
    product => product.price >= min && product.price <= max
  );
};

// Categories for filtering
export const categories = ['All', 'Electronics', 'Objects', 'Appliances'];

// Expected API response format for backend integration
export const apiSchema = {
  products: {
    id: 'number',
    name: 'string',
    price: 'number',
    originalPrice: 'number (optional)',
    rating: 'number',
    reviews: 'number',
    category: 'string',
    color: 'string (optional)',
    badge: 'string (optional: Bestseller, New, Limited)',
    inStock: 'boolean',
    image: 'string (URL)',
    images: 'array of strings (URLs)',
    colors: 'array of objects: {name: string, value: string}',
    link: 'string',
    description: 'string',
    highlights: 'array of strings',
    specifications: 'object with key-value pairs',
  },
  reviews: {
    id: 'number',
    productId: 'number',
    author: 'string',
    rating: 'number',
    title: 'string',
    content: 'string',
    date: 'string (ISO date)',
    verified: 'boolean',
    helpful: 'number',
  },
};
