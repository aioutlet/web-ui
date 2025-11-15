import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import ShopByCategory from '../components/home/ShopByCategory';
import TrendingProducts from '../components/home/TrendingProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { useHomeData } from '../hooks/useHomeData';

const HomePage = () => {
  // Fetch home page data (trending products and categories) in one request
  useHomeData(4, 5);

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
