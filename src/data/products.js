// Centralized product data for API integration
// This file defines the complete product schema expected from the backend API

export const products = [
  {
    id: 1,
    name: 'Organize Basic Set (Walnut)',
    price: 149,
    rating: 4.8,
    reviews: 3,
    category: 'Objects',
    image:
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1594736797933-d0eac2451a9a?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop&crop=center',
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#1e3a8a' },
    ],
    inStock: true,
    badge: 'Bestseller',
    link: '/products/1',
    description:
      'The perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag.',
    details:
      'The Organize Basic Set is made from premium solid walnut wood with a natural oil finish. Each piece is hand cut and sewn locally, ensuring the highest quality craftsmanship. The set includes everything you need to keep your workspace organized and stylish.',
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
    id: 2,
    name: 'Organize Pen Holder',
    price: 15,
    rating: 4.9,
    reviews: 1,
    category: 'Objects',
    image:
      'https://images.unsplash.com/photo-1606662628430-d3d3b88824ad?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1606662628430-d3d3b88824ad?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1594736797933-d0eac2451a9a?w=600&h=600&fit=crop&crop=center',
    ],
    inStock: false,
    link: '/products/2',
    description:
      'Elegant wooden pen holder to keep your desk organized and stylish.',
    details:
      'This beautifully crafted pen holder features natural bamboo wood with multiple compartments for all your writing instruments.',
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
    id: 3,
    name: 'Organize Sticky Note Holder',
    price: 15,
    rating: 4.7,
    reviews: 1,
    category: 'Objects',
    image:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606662628430-d3d3b88824ad?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1594736797933-d0eac2451a9a?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&crop=center',
    ],
    inStock: true,
    badge: 'New',
    link: '/products/3',
    description:
      'Keep your sticky notes organized and easily accessible with this modern holder.',
    details:
      'Sleek aluminum sticky note holder with magnetic mounting for easy placement on any metal surface.',
    highlights: ['Magnetic base', 'Sleek design', 'Perfect desk accessory'],
    specifications: {
      Material: 'Aluminum',
      Dimensions: '3" x 3" x 1"',
      Features: 'Magnetic mounting',
    },
  },
  {
    id: 4,
    name: 'Organize Phone Holder',
    price: 15,
    rating: 4.6,
    reviews: 0,
    category: 'Objects',
    image:
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1594736797933-d0eac2451a9a?w=600&h=600&fit=crop&crop=center',
    ],
    inStock: true,
    link: '/products/4',
    description:
      'Modern phone holder that keeps your device within easy reach while you work.',
    details:
      'Adjustable phone holder with non-slip base, perfect for video calls, watching content, or following recipes.',
    highlights: [
      'Adjustable viewing angle',
      'Non-slip rubber base',
      'Compatible with all phones',
    ],
    specifications: {
      Material: 'Aluminum and silicone',
      Dimensions: '5" x 3" x 4"',
      Compatibility: 'All smartphones',
    },
  },
  {
    id: 5,
    name: 'Leather Key Ring (Black)',
    price: 32,
    rating: 4.8,
    reviews: 0,
    category: 'Objects',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop&crop=center',
    ],
    inStock: true,
    badge: 'Sale',
    link: '/products/5',
    description:
      'Premium leather key ring with solid brass hardware for a timeless look.',
    details:
      'Handcrafted from full-grain leather, this key ring develops a beautiful patina over time.',
    highlights: [
      'Full-grain leather',
      'Solid brass hardware',
      'Develops patina over time',
    ],
    specifications: {
      Material: 'Full-grain leather',
      Hardware: 'Solid brass',
      Dimensions: '3" x 1"',
    },
  },
  {
    id: 6,
    name: 'Basic Cotton Tee (White)',
    price: 25,
    rating: 4.5,
    reviews: 2,
    category: 'Tees',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1583743814966-8936f37f82db?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=600&h=600&fit=crop&crop=center',
    ],
    inStock: true,
    link: '/products/6',
    description:
      'Classic white cotton tee made from premium 100% cotton for ultimate comfort.',
    details:
      'This essential basic tee is perfect for everyday wear. Made from soft, breathable cotton that gets better with every wash.',
    highlights: [
      '100% premium cotton',
      'Pre-shrunk fabric',
      'Reinforced seams',
      'Machine washable',
    ],
    specifications: {
      Material: '100% Cotton',
      Weight: '180 GSM',
      Fit: 'Regular fit',
      Care: 'Machine wash cold',
    },
  },
  {
    id: 7,
    name: 'Basic Cotton Tee (Black)',
    price: 25,
    rating: 4.6,
    reviews: 0,
    category: 'Tees',
    image:
      'https://images.unsplash.com/photo-1583743814966-8936f37f82db?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f37f82db?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1527719327259-0c9669ac8644?w=600&h=600&fit=crop&crop=center',
    ],
    inStock: true,
    link: '/products/7',
    description:
      'Versatile black cotton tee that goes with everything in your wardrobe.',
    details:
      'A wardrobe staple made from high-quality cotton with a comfortable fit that maintains its shape wash after wash.',
    highlights: [
      '100% premium cotton',
      'Fade-resistant black dye',
      'Durable construction',
      'Easy care',
    ],
    specifications: {
      Material: '100% Cotton',
      Weight: '180 GSM',
      Fit: 'Regular fit',
      Care: 'Machine wash cold',
    },
  },
  {
    id: 8,
    name: 'Basic Cotton Tee (Gray)',
    price: 25,
    rating: 4.4,
    reviews: 0,
    category: 'Tees',
    image:
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1583743814966-8936f37f82db?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=600&h=600&fit=crop&crop=center',
    ],
    inStock: true,
    link: '/products/8',
    description:
      'Comfortable gray cotton tee perfect for casual everyday wear.',
    details:
      'Soft heather gray tee made from premium cotton blend for a relaxed, comfortable fit.',
    highlights: [
      'Cotton blend fabric',
      'Heather gray color',
      'Comfortable fit',
      'Easy to style',
    ],
    specifications: {
      Material: '90% Cotton, 10% Polyester',
      Weight: '180 GSM',
      Fit: 'Regular fit',
      Care: 'Machine wash cold',
    },
  },
  {
    id: 9,
    name: 'Cozy Pullover Sweatshirt',
    price: 55,
    rating: 4.7,
    reviews: 0,
    category: 'Sweatshirts',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=focalpoint&fp-x=0.7&fp-y=0.5',
    ],
    inStock: true,
    link: '/products/9',
    description:
      'Warm and comfortable pullover sweatshirt perfect for cooler weather.',
    details:
      'Ultra-soft fleece sweatshirt with a relaxed fit. Features ribbed cuffs and hem for extra warmth.',
    highlights: [
      'Soft fleece interior',
      'Relaxed fit',
      'Ribbed cuffs and hem',
      'Durable construction',
    ],
    specifications: {
      Material: '80% Cotton, 20% Polyester',
      Weight: '320 GSM',
      Fit: 'Relaxed fit',
      Care: 'Machine wash warm',
    },
  },
  {
    id: 10,
    name: 'Zip-Up Hoodie',
    price: 65,
    rating: 4.8,
    reviews: 1,
    category: 'Sweatshirts',
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=focalpoint&fp-x=0.3&fp-y=0.5',
    ],
    inStock: true,
    badge: 'Bestseller',
    link: '/products/10',
    description:
      'Versatile zip-up hoodie with convenient front pockets and adjustable hood.',
    details:
      'Premium hoodie with full-length zipper, kangaroo pocket, and adjustable drawstring hood. Perfect for layering.',
    highlights: [
      'Full-length zipper',
      'Kangaroo pocket',
      'Adjustable hood',
      'Premium cotton blend',
    ],
    specifications: {
      Material: '80% Cotton, 20% Polyester',
      Weight: '340 GSM',
      Fit: 'Regular fit',
      Care: 'Machine wash warm',
    },
  },
  {
    id: 11,
    name: 'Classic Denim Jeans',
    price: 79,
    rating: 4.3,
    reviews: 0,
    category: 'Pants & Shorts',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1506629905962-4b91bb1ab297?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop&crop=focalpoint&fp-x=0.7&fp-y=0.5',
    ],
    inStock: false,
    link: '/products/11',
    description:
      'Timeless denim jeans with a comfortable fit and classic styling.',
    details:
      'Made from premium denim with just the right amount of stretch for all-day comfort.',
    highlights: [
      'Premium denim fabric',
      'Comfortable stretch',
      'Classic five-pocket design',
      'Reinforced stitching',
    ],
    specifications: {
      Material: '98% Cotton, 2% Elastane',
      Weight: '12 oz denim',
      Fit: 'Regular fit',
      Care: 'Machine wash cold, tumble dry low',
    },
  },
  {
    id: 12,
    name: 'Casual Chino Shorts',
    price: 35,
    rating: 4.2,
    reviews: 0,
    category: 'Pants & Shorts',
    image:
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1506629905962-4b91bb1ab297?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop&crop=focalpoint&fp-x=0.6&fp-y=0.4',
    ],
    inStock: true,
    badge: 'Sale',
    link: '/products/12',
    description:
      'Comfortable chino shorts perfect for warm weather and casual occasions.',
    details:
      'Lightweight chino shorts with a modern fit. Features side pockets and a button closure.',
    highlights: [
      'Lightweight cotton',
      'Modern fit',
      'Side pockets',
      'Versatile styling',
    ],
    specifications: {
      Material: '100% Cotton',
      Length: '9 inch inseam',
      Fit: 'Modern fit',
      Care: 'Machine wash warm',
    },
  },
  {
    id: 13,
    name: 'Wooden Desk Organizer',
    price: 75,
    rating: 4.9,
    reviews: 0,
    category: 'Objects',
    image:
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1594736797933-d0eac2451a9a?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1606662628430-d3d3b88824ad?w=600&h=600&fit=crop&crop=center',
    ],
    inStock: true,
    link: '/products/13',
    description:
      'Beautifully crafted wooden organizer with multiple compartments for all your desk essentials.',
    details:
      'Premium wooden desk organizer featuring natural wood grain and multiple storage sections.',
    highlights: [
      'Natural wood construction',
      'Multiple compartments',
      'Handcrafted quality',
      'Eco-friendly materials',
    ],
    specifications: {
      Material: 'Solid oak wood',
      Dimensions: '12" x 6" x 4"',
      Finish: 'Natural oil',
      Compartments: '5 sections',
    },
  },
  {
    id: 14,
    name: 'Modern Table Lamp',
    price: 89,
    rating: 4.7,
    reviews: 0,
    category: 'Objects',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop&crop=focalpoint&fp-x=0.6&fp-y=0.4',
    ],
    inStock: true,
    link: '/products/14',
    description:
      'Sleek modern table lamp with adjustable brightness for the perfect ambiance.',
    details:
      'Contemporary table lamp with touch controls and multiple brightness levels.',
    highlights: [
      'Touch-sensitive controls',
      'Adjustable brightness',
      'Energy-efficient LED',
      'Modern design',
    ],
    specifications: {
      Type: 'LED table lamp',
      Power: '12W',
      'Light Temperature': '3000K - 6000K',
      Dimensions: '8" x 8" x 16"',
    },
  },
  {
    id: 15,
    name: 'Vintage Cotton Tee',
    price: 29,
    rating: 4.5,
    reviews: 0,
    category: 'Tees',
    image:
      'https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1583743814966-8936f37f82db?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1527719327259-0c9669ac8644?w=600&h=600&fit=crop&crop=center',
    ],
    inStock: true,
    badge: 'New',
    link: '/products/15',
    description:
      'Vintage-inspired cotton tee with a worn-in feel and retro styling.',
    details:
      'Soft, pre-washed cotton tee with a vintage aesthetic and comfortable fit.',
    highlights: [
      'Pre-washed for softness',
      'Vintage-inspired design',
      'Comfortable fit',
      'Durable fabric',
    ],
    specifications: {
      Material: '100% Cotton',
      Weight: '160 GSM',
      Fit: 'Relaxed fit',
      Care: 'Machine wash cold',
    },
  },
  {
    id: 16,
    name: 'Casual Sweatpants',
    price: 45,
    rating: 4.4,
    reviews: 0,
    category: 'Pants & Shorts',
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1506629905962-4b91bb1ab297?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.6',
    ],
    inStock: false,
    link: '/products/16',
    description:
      'Comfortable sweatpants perfect for lounging or light exercise.',
    details:
      'Soft fleece sweatpants with elastic waistband and cuffed ankles for maximum comfort.',
    highlights: [
      'Soft fleece interior',
      'Elastic waistband',
      'Cuffed ankles',
      'Side pockets',
    ],
    specifications: {
      Material: '80% Cotton, 20% Polyester',
      Weight: '300 GSM',
      Fit: 'Relaxed fit',
      Care: 'Machine wash warm',
    },
  },
  {
    id: 17,
    name: 'Minimalist Notebook',
    price: 18,
    rating: 4.6,
    reviews: 0,
    category: 'Objects',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop&crop=focalpoint&fp-x=0.6&fp-y=0.5',
    ],
    inStock: true,
    badge: 'Bestseller',
    link: '/products/17',
    description:
      'Clean, minimalist notebook with premium paper perfect for writing or sketching.',
    details:
      'High-quality notebook with smooth, acid-free paper and a durable cover.',
    highlights: [
      'Premium acid-free paper',
      'Lay-flat binding',
      'Durable cover',
      'Multiple page counts',
    ],
    specifications: {
      Pages: '192 pages',
      'Paper Weight': '100 GSM',
      Size: 'A5 (5.8" x 8.3")',
      Binding: 'Lay-flat thread binding',
    },
  },
  {
    id: 18,
    name: 'Crew Neck Sweatshirt',
    price: 59,
    rating: 4.7,
    reviews: 0,
    category: 'Sweatshirts',
    image:
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.4',
    ],
    inStock: true,
    link: '/products/18',
    description:
      'Classic crew neck sweatshirt with soft fleece interior for ultimate comfort.',
    details:
      'Timeless crew neck design with a premium cotton blend and soft brushed interior.',
    highlights: [
      'Brushed fleece interior',
      'Ribbed collar and cuffs',
      'Regular fit',
      'Premium cotton blend',
    ],
    specifications: {
      Material: '80% Cotton, 20% Polyester',
      Weight: '320 GSM',
      Fit: 'Regular fit',
      Care: 'Machine wash warm',
    },
  },
  {
    id: 19,
    name: 'Soft Cotton Shorts',
    price: 28,
    rating: 4.3,
    reviews: 0,
    category: 'Pants & Shorts',
    image:
      'https://images.unsplash.com/photo-1506629905962-4b91bb1ab297?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1506629905962-4b91bb1ab297?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1506629905962-4b91bb1ab297?w=600&h=600&fit=crop&crop=focalpoint&fp-x=0.4&fp-y=0.5',
    ],
    inStock: true,
    link: '/products/19',
    description:
      'Lightweight cotton shorts perfect for summer activities and lounging.',
    details:
      'Comfortable cotton shorts with an elastic waistband and relaxed fit.',
    highlights: [
      'Lightweight cotton',
      'Elastic waistband',
      'Side pockets',
      'Relaxed fit',
    ],
    specifications: {
      Material: '100% Cotton',
      Length: '7 inch inseam',
      Fit: 'Relaxed fit',
      Care: 'Machine wash warm',
    },
  },
  {
    id: 20,
    name: 'Graphic Print Tee',
    price: 32,
    rating: 4.4,
    reviews: 0,
    category: 'Tees',
    image:
      'https://images.unsplash.com/photo-1527719327259-0c9669ac8644?w=400&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1527719327259-0c9669ac8644?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1583743814966-8936f37f82db?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1527719327259-0c9669ac8644?w=600&h=600&fit=crop&crop=focalpoint&fp-x=0.6&fp-y=0.5',
    ],
    inStock: true,
    link: '/products/20',
    description:
      'Stylish graphic print tee made from soft cotton with unique design.',
    details:
      'Eye-catching graphic tee with high-quality screen printing on premium cotton.',
    highlights: [
      'Unique graphic design',
      'High-quality screen print',
      'Soft cotton fabric',
      'Fade-resistant ink',
    ],
    specifications: {
      Material: '100% Cotton',
      Weight: '180 GSM',
      Fit: 'Regular fit',
      Care: 'Machine wash inside out',
    },
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

export const getInStockProducts = () => {
  return products.filter(product => product.inStock);
};

export const getProductsByPriceRange = (min, max) => {
  return products.filter(
    product => product.price >= min && product.price <= max
  );
};

// Categories for filtering
export const categories = [
  'All',
  'All New Arrivals',
  'Tees',
  'Objects',
  'Sweatshirts',
  'Pants & Shorts',
];

// Expected API response format for backend integration
export const apiSchema = {
  product: {
    id: 'number',
    name: 'string',
    price: 'number',
    originalPrice: 'number (optional)',
    rating: 'number (1-5)',
    reviews: 'number (count of reviews)',
    category: 'string',
    color: 'string (optional)',
    badge: 'string (optional: Bestseller, New, Limited, Sale)',
    inStock: 'boolean',
    image: 'string (URL - main thumbnail)',
    images: 'array of strings (URLs - minimum 4 images for detail page)',
    colors: 'array of objects: {name: string, value: string} (optional)',
    link: 'string (product detail URL)',
    description: 'string (short description)',
    details: 'string (long description - optional)',
    highlights: 'array of strings (optional)',
    specifications: 'object with key-value pairs (optional)',
  },
};
