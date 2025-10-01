// Centralized reviews data for API integration
// This file defines the complete review schema expected from the backend API

export const reviews = [
  {
    id: 1,
    productId: 1,
    author: 'Emily Johnson',
    rating: 5,
    date: '2 days ago',
    comment:
      'This is the bag of my dreams. I took it on my last vacation and was able to fit an obscene amount of snacks for the many long and hungry flights.',
    verified: true,
  },
  {
    id: 2,
    productId: 1,
    author: 'Hector Gibbons',
    rating: 5,
    date: '3 days ago',
    comment:
      'Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can share my snacks with confidence and style!',
    verified: true,
  },
  {
    id: 3,
    productId: 1,
    author: 'Mark Edwards',
    rating: 4,
    date: '1 week ago',
    comment:
      'I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins!',
    verified: false,
  },
  {
    id: 4,
    productId: 2,
    author: 'Sarah Mitchell',
    rating: 5,
    date: '5 days ago',
    comment:
      'Perfect for organizing my desk! The quality is exceptional and it looks beautiful.',
    verified: true,
  },
  {
    id: 5,
    productId: 3,
    author: 'David Chen',
    rating: 5,
    date: '1 week ago',
    comment:
      'Exactly what I needed for my sticky notes. The magnetic base is super convenient.',
    verified: true,
  },
  {
    id: 6,
    productId: 6,
    author: 'Lisa Brown',
    rating: 5,
    date: '2 days ago',
    comment:
      'Great quality cotton tee! Fits perfectly and the fabric is so soft.',
    verified: true,
  },
  {
    id: 7,
    productId: 6,
    author: 'Tom Wilson',
    rating: 4,
    date: '1 week ago',
    comment:
      'Nice basic tee. Good value for the price. Will order more colors.',
    verified: true,
  },
  {
    id: 8,
    productId: 10,
    author: 'Jessica Lee',
    rating: 5,
    date: '3 days ago',
    comment:
      'This hoodie is amazing! Perfect weight and the zipper quality is excellent.',
    verified: true,
  },
];

// Helper functions for easy review data access
export const getProductReviews = productId => {
  return reviews.filter(review => review.productId === parseInt(productId));
};

export const getReviewById = reviewId => {
  return reviews.find(review => review.id === parseInt(reviewId));
};

export const getVerifiedReviews = () => {
  return reviews.filter(review => review.verified);
};

export const getReviewsByRating = rating => {
  return reviews.filter(review => review.rating === rating);
};

export const getAverageRating = productId => {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / productReviews.length).toFixed(1);
};

export const getReviewCount = productId => {
  return getProductReviews(productId).length;
};

export const getRatingDistribution = productId => {
  const productReviews = getProductReviews(productId);
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  productReviews.forEach(review => {
    distribution[review.rating]++;
  });

  return distribution;
};

// Expected API response format for backend integration
export const apiSchema = {
  review: {
    id: 'number',
    productId: 'number',
    author: 'string',
    rating: 'number (1-5)',
    date: 'string (relative or ISO date)',
    comment: 'string',
    verified: 'boolean',
    helpful: 'number (optional - count of helpful votes)',
    title: 'string (optional)',
  },
};
