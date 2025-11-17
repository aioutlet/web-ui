import { useQuery } from '@tanstack/react-query';
import bffClient from '../api/bffClient';
import { convertColorsToObjects } from '../utils/productHelpers';

/**
 * Custom hook to fetch home page data (trending products and categories) in one request
 * Prevents duplicate requests and provides shared cache across components
 */
export const useHomeData = (productsLimit = 4, categoriesLimit = 5) => {
  return useQuery({
    queryKey: ['home-data', productsLimit, categoriesLimit],
    queryFn: async () => {
      const response = await bffClient.get(
        `/api/storefront/home?productsLimit=${productsLimit}&categoriesLimit=${categoriesLimit}`
      );

      if (!response.data.success || !response.data.data) {
        throw new Error('Invalid response format');
      }

      const { trendingProducts, trendingCategories } = response.data.data;

      // Map products to component format
      const mappedProducts = trendingProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image:
          product.images && product.images.length > 0
            ? product.images[0]
            : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        rating: product.reviews?.averageRating || 0,
        reviews: product.reviews?.reviewCount || 0,
        inStock: product.inventory?.inStock || false,
        link: `/products/${product.id}`,
        badge:
          product.badge || (product.inventory?.inStock ? null : 'Out of Stock'),
        colors: convertColorsToObjects(product.colors || []),
      }));

      // Map categories to component format
      const mappedCategories = trendingCategories
        .filter(category => category.name != null && category.name !== '')
        .map((category, index) => {
          const categoryRoutes = {
            Clothing: {
              path: '/products?department=women&category=clothing',
              department: 'Women',
              category: 'Clothing',
            },
            Accessories: {
              path: '/products?department=women&category=accessories',
              department: 'Women',
              category: 'Accessories',
            },
            Apparel: {
              path: '/products?department=sports&category=apparel',
              department: 'Sports',
              category: 'Apparel',
            },
            Footwear: {
              path: '/products?department=sports&category=footwear',
              department: 'Sports',
              category: 'Footwear',
            },
            Mobile: {
              path: '/products?department=electronics&category=mobile',
              department: 'Electronics',
              category: 'Mobile',
            },
            Audio: {
              path: '/products?department=electronics&category=audio',
              department: 'Electronics',
              category: 'Audio',
            },
            Computers: {
              path: '/products?department=electronics&category=computers',
              department: 'Electronics',
              category: 'Computers',
            },
            Gaming: {
              path: '/products?department=electronics&category=gaming',
              department: 'Electronics',
              category: 'Gaming',
            },
            Fiction: {
              path: '/products?department=books&category=fiction',
              department: 'Books',
              category: 'Fiction',
            },
            Nonfiction: {
              path: '/products?department=books&category=nonfiction',
              department: 'Books',
              category: 'Nonfiction',
            },
          };

          const route = categoryRoutes[category.name] || {
            path: `/products?category=${category.name}`,
            department: category.name,
            category: category.name,
          };

          return {
            id: index + 1,
            title: category.name,
            displayName: category.displayName,
            link: category.path || route.path,
            department: category.department || route.department,
            categoryName: category.categoryName || route.category,
            image: category.image,
            description: category.displayName,
            productCount: category.accurateCount || category.product_count,
            totalCount: category.accurateCount || category.product_count,
            avgRating: category.avg_rating,
          };
        });

      return {
        trendingProducts: mappedProducts,
        trendingCategories: mappedCategories,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });
};
