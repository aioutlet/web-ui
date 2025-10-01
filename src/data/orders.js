// Complete order data matching backend API response format
// Includes order details, items, shipping, billing, payment, and tracking information
export const orders = [
  {
    id: '12345',
    orderNumber: '#12345',
    status: 'Processing',
    placedDate: 'December 15, 2024',
    preparingToShipDate: 'December 17, 2024',
    items: [
      {
        id: 1,
        title: 'Wireless Headphones',
        description: 'Premium quality wireless headphones',
        image:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
        price: 99.99,
        quantity: 1,
      },
      {
        id: 2,
        title: 'Phone Case',
        description: 'Protective silicone case',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
        price: 49.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'Toronto',
        state: 'ON',
        zip: 'M5V 3A8',
      },
      method: 'Standard Shipping',
      cost: 5.0,
      updates: {
        email: 'j••••@example.com',
        phone: '1••••••••00',
      },
    },
    billing: {
      address: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'Toronto',
        state: 'ON',
        zip: 'M5V 3A8',
      },
    },
    payment: {
      method: 'Visa',
      last4: '4242',
      expires: '12/25',
    },
    summary: {
      subtotal: 149.98,
      shipping: 5.0,
      tax: 19.5,
      total: 174.48,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 15, 2024',
        },
        { name: 'Processing', status: 'current', date: 'December 15, 2024' },
        { name: 'Shipped', status: 'pending', date: null },
        { name: 'Delivered', status: 'pending', date: null },
      ],
    },
    total: '$174.48',
  },
  {
    id: '12346',
    orderNumber: '#12346',
    status: 'Shipped',
    placedDate: 'December 14, 2024',
    preparingToShipDate: 'December 16, 2024',
    items: [
      {
        id: 3,
        title: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking',
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
        price: 159.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'Sarah Johnson',
        street: '456 Oak Avenue',
        city: 'Vancouver',
        state: 'BC',
        zip: 'V6B 1A1',
      },
      method: 'Express Shipping',
      cost: 15.0,
      updates: {
        email: 's••••@example.com',
        phone: '1••••••••11',
      },
    },
    billing: {
      address: {
        name: 'Sarah Johnson',
        street: '456 Oak Avenue',
        city: 'Vancouver',
        state: 'BC',
        zip: 'V6B 1A1',
      },
    },
    payment: {
      method: 'Mastercard',
      last4: '8888',
      expires: '06/26',
    },
    summary: {
      subtotal: 159.99,
      shipping: 15.0,
      tax: 20.8,
      total: 195.79,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 14, 2024',
        },
        { name: 'Processing', status: 'completed', date: 'December 15, 2024' },
        { name: 'Shipped', status: 'current', date: 'December 16, 2024' },
        { name: 'Delivered', status: 'pending', date: null },
      ],
    },
    total: '$195.79',
  },
  {
    id: '12347',
    orderNumber: '#12347',
    status: 'Delivered',
    placedDate: 'December 12, 2024',
    preparingToShipDate: 'December 13, 2024',
    items: [
      {
        id: 4,
        title: 'Phone Case',
        description: 'Protective phone case with premium materials',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
        price: 49.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'Michael Chen',
        street: '789 Pine Road',
        city: 'Montreal',
        state: 'QC',
        zip: 'H2Y 1C6',
      },
      method: 'Standard Shipping',
      cost: 5.0,
      updates: {
        email: 'm••••@example.com',
        phone: '1••••••••22',
      },
    },
    billing: {
      address: {
        name: 'Michael Chen',
        street: '789 Pine Road',
        city: 'Montreal',
        state: 'QC',
        zip: 'H2Y 1C6',
      },
    },
    payment: {
      method: 'Visa',
      last4: '1234',
      expires: '09/25',
    },
    summary: {
      subtotal: 49.99,
      shipping: 5.0,
      tax: 6.5,
      total: 61.49,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 12, 2024',
        },
        { name: 'Processing', status: 'completed', date: 'December 12, 2024' },
        { name: 'Shipped', status: 'completed', date: 'December 13, 2024' },
        { name: 'Delivered', status: 'completed', date: 'December 15, 2024' },
      ],
    },
    total: '$61.49',
  },
  {
    id: '12348',
    orderNumber: '#12348',
    status: 'Processing',
    placedDate: 'December 13, 2024',
    preparingToShipDate: 'December 15, 2024',
    items: [
      {
        id: 5,
        title: 'Running Shoes',
        description: 'Professional running shoes for athletes',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
        price: 299.99,
        quantity: 1,
      },
      {
        id: 6,
        title: 'Sports Socks',
        description: 'Moisture-wicking athletic socks',
        image:
          'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop&crop=center',
        price: 39.99,
        quantity: 2,
      },
    ],
    shipping: {
      address: {
        name: 'Emily Rodriguez',
        street: '321 Maple Drive',
        city: 'Calgary',
        state: 'AB',
        zip: 'T2P 1J9',
      },
      method: 'Express Shipping',
      cost: 15.0,
      updates: {
        email: 'e••••@example.com',
        phone: '1••••••••33',
      },
    },
    billing: {
      address: {
        name: 'Emily Rodriguez',
        street: '321 Maple Drive',
        city: 'Calgary',
        state: 'AB',
        zip: 'T2P 1J9',
      },
    },
    payment: {
      method: 'Amex',
      last4: '5678',
      expires: '03/27',
    },
    summary: {
      subtotal: 379.97,
      shipping: 15.0,
      tax: 49.4,
      total: 444.37,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 13, 2024',
        },
        { name: 'Processing', status: 'current', date: 'December 13, 2024' },
        { name: 'Shipped', status: 'pending', date: null },
        { name: 'Delivered', status: 'pending', date: null },
      ],
    },
    total: '$444.37',
  },
  {
    id: '12349',
    orderNumber: '#12349',
    status: 'Shipped',
    placedDate: 'December 11, 2024',
    preparingToShipDate: 'December 12, 2024',
    items: [
      {
        id: 7,
        title: 'Backpack',
        description: 'Durable travel backpack with multiple compartments',
        image:
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&crop=center',
        price: 79.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'David Kim',
        street: '456 Oak Street',
        city: 'Ottawa',
        state: 'ON',
        zip: 'K1P 5G4',
      },
      method: 'Standard Shipping',
      cost: 5.0,
      updates: {
        email: 'd••••@example.com',
        phone: '1••••••••44',
      },
    },
    billing: {
      address: {
        name: 'David Kim',
        street: '456 Oak Street',
        city: 'Ottawa',
        state: 'ON',
        zip: 'K1P 5G4',
      },
    },
    payment: {
      method: 'Visa',
      last4: '9012',
      expires: '11/26',
    },
    summary: {
      subtotal: 79.99,
      shipping: 5.0,
      tax: 10.4,
      total: 95.39,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 11, 2024',
        },
        { name: 'Processing', status: 'completed', date: 'December 11, 2024' },
        { name: 'Shipped', status: 'current', date: 'December 12, 2024' },
        { name: 'Delivered', status: 'pending', date: null },
      ],
    },
    total: '$95.39',
  },
  {
    id: '12350',
    orderNumber: '#12350',
    status: 'Delivered',
    placedDate: 'December 10, 2024',
    preparingToShipDate: 'December 11, 2024',
    items: [
      {
        id: 8,
        title: 'Sunglasses',
        description: 'Stylish sunglasses with UV protection',
        image:
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center',
        price: 39.99,
        quantity: 1,
      },
      {
        id: 9,
        title: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness',
        image:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
        price: 129.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'Jessica Wang',
        street: '789 Pine Avenue',
        city: 'Winnipeg',
        state: 'MB',
        zip: 'R3C 0P8',
      },
      method: 'Express Shipping',
      cost: 15.0,
      updates: {
        email: 'j••••@example.com',
        phone: '1••••••••55',
      },
    },
    billing: {
      address: {
        name: 'Jessica Wang',
        street: '789 Pine Avenue',
        city: 'Winnipeg',
        state: 'MB',
        zip: 'R3C 0P8',
      },
    },
    payment: {
      method: 'Mastercard',
      last4: '3456',
      expires: '08/27',
    },
    summary: {
      subtotal: 169.98,
      shipping: 15.0,
      tax: 22.1,
      total: 207.08,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 10, 2024',
        },
        { name: 'Processing', status: 'completed', date: 'December 10, 2024' },
        { name: 'Shipped', status: 'completed', date: 'December 11, 2024' },
        { name: 'Delivered', status: 'completed', date: 'December 13, 2024' },
      ],
    },
    total: '$207.08',
  },
  {
    id: '12351',
    orderNumber: '#12351',
    status: 'Processing',
    placedDate: 'December 9, 2024',
    preparingToShipDate: 'December 11, 2024',
    items: [
      {
        id: 10,
        title: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with excellent sound',
        image:
          'https://images.unsplash.com/photo-1505740106531-4243f3831c78?w=400&h=400&fit=crop&crop=center',
        price: 199.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'Robert Martinez',
        street: '101 Elm Street',
        city: 'Halifax',
        state: 'NS',
        zip: 'B3H 2Y5',
      },
      method: 'Standard Shipping',
      cost: 5.0,
      updates: {
        email: 'r••••@example.com',
        phone: '1••••••••66',
      },
    },
    billing: {
      address: {
        name: 'Robert Martinez',
        street: '101 Elm Street',
        city: 'Halifax',
        state: 'NS',
        zip: 'B3H 2Y5',
      },
    },
    payment: {
      method: 'Visa',
      last4: '7890',
      expires: '05/28',
    },
    summary: {
      subtotal: 199.99,
      shipping: 5.0,
      tax: 26.0,
      total: 230.99,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 9, 2024',
        },
        { name: 'Processing', status: 'current', date: 'December 9, 2024' },
        { name: 'Shipped', status: 'pending', date: null },
        { name: 'Delivered', status: 'pending', date: null },
      ],
    },
    total: '$230.99',
  },
  {
    id: '12352',
    orderNumber: '#12352',
    status: 'Cancelled',
    placedDate: 'December 8, 2024',
    preparingToShipDate: null,
    items: [
      {
        id: 11,
        title: 'Laptop Stand',
        description: 'Adjustable laptop stand for better ergonomics',
        image:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center',
        price: 89.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'Amanda Lee',
        street: '202 Birch Lane',
        city: 'Quebec City',
        state: 'QC',
        zip: 'G1R 4P5',
      },
      method: 'Standard Shipping',
      cost: 5.0,
      updates: {
        email: 'a••••@example.com',
        phone: '1••••••••77',
      },
    },
    billing: {
      address: {
        name: 'Amanda Lee',
        street: '202 Birch Lane',
        city: 'Quebec City',
        state: 'QC',
        zip: 'G1R 4P5',
      },
    },
    payment: {
      method: 'Mastercard',
      last4: '2345',
      expires: '09/26',
    },
    summary: {
      subtotal: 89.99,
      shipping: 5.0,
      tax: 11.7,
      total: 106.69,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 8, 2024',
        },
        { name: 'Processing', status: 'cancelled', date: 'December 8, 2024' },
        { name: 'Shipped', status: 'pending', date: null },
        { name: 'Delivered', status: 'pending', date: null },
      ],
    },
    total: '$106.69',
  },
  {
    id: '12353',
    orderNumber: '#12353',
    status: 'Shipped',
    placedDate: 'December 7, 2024',
    preparingToShipDate: 'December 8, 2024',
    items: [
      {
        id: 12,
        title: 'Coffee Mug',
        description: 'Insulated coffee mug for hot beverages',
        image:
          'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=400&fit=crop&crop=center',
        price: 25.99,
        quantity: 1,
      },
      {
        id: 13,
        title: 'Notebook Set',
        description: 'Premium leather-bound notebook set',
        image:
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
        price: 64.97,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'Christopher Brown',
        street: '303 Cedar Road',
        city: 'Victoria',
        state: 'BC',
        zip: 'V8W 1S6',
      },
      method: 'Express Shipping',
      cost: 15.0,
      updates: {
        email: 'c••••@example.com',
        phone: '1••••••••88',
      },
    },
    billing: {
      address: {
        name: 'Christopher Brown',
        street: '303 Cedar Road',
        city: 'Victoria',
        state: 'BC',
        zip: 'V8W 1S6',
      },
    },
    payment: {
      method: 'Amex',
      last4: '6789',
      expires: '12/27',
    },
    summary: {
      subtotal: 90.96,
      shipping: 15.0,
      tax: 11.8,
      total: 117.76,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 7, 2024',
        },
        { name: 'Processing', status: 'completed', date: 'December 7, 2024' },
        { name: 'Shipped', status: 'current', date: 'December 8, 2024' },
        { name: 'Delivered', status: 'pending', date: null },
      ],
    },
    total: '$117.76',
  },
  {
    id: '12354',
    orderNumber: '#12354',
    status: 'Delivered',
    placedDate: 'December 6, 2024',
    preparingToShipDate: 'December 7, 2024',
    items: [
      {
        id: 14,
        title: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness',
        image:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
        price: 129.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'Sophia Garcia',
        street: '404 Willow Way',
        city: 'Saskatoon',
        state: 'SK',
        zip: 'S7K 0J5',
      },
      method: 'Standard Shipping',
      cost: 5.0,
      updates: {
        email: 's••••@example.com',
        phone: '1••••••••99',
      },
    },
    billing: {
      address: {
        name: 'Sophia Garcia',
        street: '404 Willow Way',
        city: 'Saskatoon',
        state: 'SK',
        zip: 'S7K 0J5',
      },
    },
    payment: {
      method: 'Visa',
      last4: '4321',
      expires: '06/27',
    },
    summary: {
      subtotal: 129.99,
      shipping: 5.0,
      tax: 16.9,
      total: 151.89,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 6, 2024',
        },
        { name: 'Processing', status: 'completed', date: 'December 6, 2024' },
        { name: 'Shipped', status: 'completed', date: 'December 7, 2024' },
        { name: 'Delivered', status: 'completed', date: 'December 10, 2024' },
      ],
    },
    total: '$151.89',
  },
  {
    id: '12355',
    orderNumber: '#12355',
    status: 'Processing',
    placedDate: 'December 5, 2024',
    preparingToShipDate: 'December 7, 2024',
    items: [
      {
        id: 15,
        title: 'Notebook',
        description: 'Premium leather-bound notebook',
        image:
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
        price: 49.99,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'Daniel White',
        street: '505 Spruce Court',
        city: 'Regina',
        state: 'SK',
        zip: 'S4P 3Y2',
      },
      method: 'Standard Shipping',
      cost: 5.0,
      updates: {
        email: 'd••••@example.com',
        phone: '1••••••••00',
      },
    },
    billing: {
      address: {
        name: 'Daniel White',
        street: '505 Spruce Court',
        city: 'Regina',
        state: 'SK',
        zip: 'S4P 3Y2',
      },
    },
    payment: {
      method: 'Mastercard',
      last4: '8765',
      expires: '10/26',
    },
    summary: {
      subtotal: 49.99,
      shipping: 5.0,
      tax: 6.5,
      total: 61.49,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 5, 2024',
        },
        { name: 'Processing', status: 'current', date: 'December 5, 2024' },
        { name: 'Shipped', status: 'pending', date: null },
        { name: 'Delivered', status: 'pending', date: null },
      ],
    },
    total: '$61.49',
  },
  {
    id: '12356',
    orderNumber: '#12356',
    status: 'Delivered',
    placedDate: 'December 4, 2024',
    preparingToShipDate: 'December 5, 2024',
    items: [
      {
        id: 16,
        title: 'Pen Set',
        description: 'Professional pen set for writing',
        image:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center',
        price: 15.99,
        quantity: 2,
      },
      {
        id: 17,
        title: 'Desk Organizer',
        description: 'Bamboo desk organizer with compartments',
        image:
          'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop&crop=center',
        price: 63.96,
        quantity: 1,
      },
    ],
    shipping: {
      address: {
        name: 'Olivia Taylor',
        street: '606 Ash Boulevard',
        city: 'Fredericton',
        state: 'NB',
        zip: 'E3B 5H1',
      },
      method: 'Express Shipping',
      cost: 15.0,
      updates: {
        email: 'o••••@example.com',
        phone: '1••••••••11',
      },
    },
    billing: {
      address: {
        name: 'Olivia Taylor',
        street: '606 Ash Boulevard',
        city: 'Fredericton',
        state: 'NB',
        zip: 'E3B 5H1',
      },
    },
    payment: {
      method: 'Visa',
      last4: '2109',
      expires: '04/28',
    },
    summary: {
      subtotal: 95.94,
      shipping: 15.0,
      tax: 12.5,
      total: 123.44,
    },
    tracking: {
      steps: [
        {
          name: 'Order placed',
          status: 'completed',
          date: 'December 4, 2024',
        },
        { name: 'Processing', status: 'completed', date: 'December 4, 2024' },
        { name: 'Shipped', status: 'completed', date: 'December 5, 2024' },
        { name: 'Delivered', status: 'completed', date: 'December 8, 2024' },
      ],
    },
    total: '$123.44',
  },
];
