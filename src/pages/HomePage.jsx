import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import ShopByCategory from '../components/home/ShopByCategory';
import TrendingProducts from '../components/home/TrendingProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import {
  useTrendingProducts,
  useTrendingCategories,
} from '../hooks/useHomeData';

const HomePage = () => {
  // Prefetch both queries when page loads to prevent duplicate requests
  // React Query will deduplicate these requests automatically
  useTrendingProducts(4);
  useTrendingCategories(5);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <TrendingProducts />
      <ShopByCategory />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
