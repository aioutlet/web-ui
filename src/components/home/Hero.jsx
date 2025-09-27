import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel slides data
  const slides = [
    {
      id: 1,
      title: 'New arrivals',
      highlight: 'are here',
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
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = index => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative isolate px-6 pt-14 lg:px-8 bg-white dark:bg-gray-900 pb-8">
      {/* Additional gradient overlay for better flow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-transparent to-blue-50/30 dark:from-pink-900/10 dark:to-blue-900/10" />

      {/* Background gradient */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Carousel content with consistent height */}
      <div className="relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100'
                : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
          >
            {/* Fixed height container for all slides */}
            <div className="h-[600px] sm:h-[700px] lg:h-[800px]">
              <div className="mx-auto max-w-2xl text-center">
                {/* Announcement banner - Fixed position at top */}
                <div className="hidden sm:mb-8 sm:flex sm:justify-center pt-16">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-white/10 hover:ring-gray-900/20 dark:hover:ring-white/20 transition-all">
                    Latest collection now available.{' '}
                    <Link
                      to="/collections/all"
                      className="font-semibold text-indigo-600 dark:text-indigo-400"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      Shop now <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Main content - Centered in remaining space */}
                <div className="flex items-center justify-center h-[calc(100%-120px)]">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                      <span className="text-gray-900 dark:text-white">
                        {slide.title}
                      </span>{' '}
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                        {slide.highlight}
                      </span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                      {slide.subtitle}
                    </p>

                    {/* CTA buttons */}
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <Link
                        to={slide.primaryCta.link}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                      >
                        {slide.primaryCta.text}
                      </Link>
                      <Link
                        to={slide.secondaryCta.link}
                        className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {slide.secondaryCta.text}{' '}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators - Fixed position at bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-8">
          <div className="flex space-x-3 items-center justify-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-indigo-600 dark:bg-indigo-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background gradient at bottom */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] dark:opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
