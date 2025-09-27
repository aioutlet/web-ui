import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel slides data
  const slides = [
    {
      id: 1,
      title: 'New arrivals are',
      highlight: 'here',
      subtitle:
        "The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release while they're still in stock.",
      primaryCta: {
        text: 'Shop New Arrivals',
        link: '/collections/new-arrivals',
      },
      secondaryCta: {
        text: 'Browse All Products',
        link: '/collections/all',
      },
      background:
        'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      imageAlt: 'Fashion model showcasing new arrivals collection',
    },
    {
      id: 2,
      title: 'Summer collection',
      highlight: 'now live',
      subtitle:
        'Beat the heat with our curated summer collection. From lightweight fabrics to vibrant colors, find everything you need for the perfect summer look.',
      primaryCta: {
        text: 'Shop Summer',
        link: '/collections/summer',
      },
      secondaryCta: {
        text: 'View Lookbook',
        link: '/lookbook/summer',
      },
      background:
        'from-orange-50 to-red-100 dark:from-orange-800 dark:to-red-900',
      image:
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      imageAlt:
        'Summer fashion collection with vibrant clothing and accessories',
    },
    {
      id: 3,
      title: 'Tech essentials',
      highlight: 'reimagined',
      subtitle:
        'Discover the latest in technology and innovation. From cutting-edge gadgets to everyday essentials, elevate your digital lifestyle.',
      primaryCta: {
        text: 'Shop Electronics',
        link: '/collections/electronics',
      },
      secondaryCta: {
        text: 'Tech Guide',
        link: '/guides/tech',
      },
      background:
        'from-blue-50 to-indigo-100 dark:from-blue-800 dark:to-indigo-900',
      image:
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      imageAlt: 'Modern tech workspace with devices and gadgets',
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = index => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full min-h-[700px] overflow-hidden">
      {/* Carousel Wrapper */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background with Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.background} transition-colors duration-200`}
            >
              {/* Subtle Particle Dots */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-1 h-1 bg-primary-400 rounded-full opacity-40 animate-pulse"></div>
                <div className="absolute top-32 right-32 w-0.5 h-0.5 bg-primary-300 rounded-full opacity-50"></div>
                <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-primary-500 rounded-full opacity-30 animate-pulse animation-delay-1000"></div>
                <div className="absolute top-60 left-1/3 w-0.5 h-0.5 bg-primary-400 rounded-full opacity-60"></div>
                <div className="absolute bottom-60 right-1/4 w-1 h-1 bg-primary-300 rounded-full opacity-40 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/3 right-20 w-0.5 h-0.5 bg-primary-500 rounded-full opacity-50"></div>
                <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-primary-400 rounded-full opacity-35 animate-pulse animation-delay-3000"></div>
                <div className="absolute top-48 right-1/3 w-0.5 h-0.5 bg-primary-300 rounded-full opacity-45"></div>
                <div className="absolute bottom-20 right-40 w-1.5 h-1.5 bg-primary-500 rounded-full opacity-25"></div>
                <div className="absolute top-80 left-1/2 w-0.5 h-0.5 bg-primary-400 rounded-full opacity-55 animate-pulse animation-delay-4000"></div>
              </div>

              {/* Subtle Blur Overlay */}
              <div className="absolute inset-0 bg-gray-900/5 backdrop-blur-[0.5px]"></div>

              {/* Text Contrast Overlay - Light overlay for dark text in light mode */}
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 z-10 h-full">
              <div className="flex flex-col lg:flex-row items-center justify-center min-h-[600px] py-16">
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left lg:pr-12 z-30">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                    {slide.title}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600">
                      {slide.highlight}
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      to={slide.primaryCta.link}
                      className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      {slide.primaryCta.text}
                    </Link>

                    <Link
                      to={slide.secondaryCta.link}
                      className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-white transition-all duration-200 transform hover:scale-105"
                    >
                      {slide.secondaryCta.text}
                    </Link>
                  </div>
                </div>

                {/* Product Showcase - Right Side */}
                <div className="flex-1 mt-12 lg:mt-0 relative z-30">
                  <div className="relative max-w-md mx-auto lg:max-w-none">
                    {/* Main Product Display */}
                    <div className="relative">
                      {/* Background Cards/Products */}
                      <div className="absolute -top-4 -right-4 w-48 h-60 rounded-lg shadow-xl transform rotate-6 opacity-60 transition-all duration-1000 overflow-hidden">
                        <img
                          src={slide.image}
                          alt={slide.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-8 right-0 w-48 h-60 rounded-lg shadow-xl transform rotate-3 opacity-80 transition-all duration-1000 delay-200 overflow-hidden">
                        <img
                          src={slide.image}
                          alt={slide.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Foreground Product */}
                      <div className="relative w-48 h-60 rounded-lg shadow-2xl mx-auto transition-all duration-1000 delay-400 overflow-hidden">
                        <img
                          src={slide.image}
                          alt={slide.imageAlt}
                          className="w-full h-full object-cover"
                        />

                        {/* Product Details Overlay */}
                        <div className="absolute -bottom-2 -left-2 bg-white rounded-lg px-3 py-2 shadow-lg">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs font-medium text-gray-900">
                              In Stock
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute -bottom-6 left-8 w-32 h-2 bg-gradient-to-r from-primary-600 to-transparent rounded-full opacity-60"></div>

                      {/* Additional decorative elements */}
                      <div className="absolute top-12 -left-8 w-6 h-6 bg-primary-500 rounded-full opacity-40 animate-pulse"></div>
                      <div className="absolute bottom-20 -right-12 w-4 h-4 bg-primary-400 rounded-full opacity-60 animate-pulse animation-delay-1000"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border ${
              index === currentSlide
                ? 'bg-primary-600 dark:bg-white border-primary-600 dark:border-white scale-125 shadow-lg'
                : 'bg-gray-300 dark:bg-white/50 border-gray-300 dark:border-white/50 hover:bg-primary-300 dark:hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-gray-900 dark:text-white text-sm font-medium z-40 bg-white/90 dark:bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-200 dark:border-white/30 shadow-lg">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Hero;
