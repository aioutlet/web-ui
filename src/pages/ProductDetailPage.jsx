import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import StarRating from '../components/ui/StarRating';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Sample product data (in real app, this would come from API)
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // Removed activeTab state - using separate sections instead
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());

  // Helper function to check if product is in cart
  const isInCart = productId => {
    return cartItems.some(item => item.id === productId);
  };

  // Helper function to check if product is in favorites
  const isFavorite = productId => {
    return favorites.has(productId);
  };

  // Helper function to calculate star percentage for review summary
  const getStarPercentage = starRating => {
    // Mock data for star distribution based on the reference image
    const distribution = {
      5: 81,
      4: 14,
      3: 4,
      2: 0,
      1: 1,
    };
    return distribution[starRating] || 0;
  };

  // Handler for toggling favorite status
  const handleToggleFavorite = () => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(product.id)) {
      newFavorites.delete(product.id);
    } else {
      newFavorites.add(product.id);
    }
    setFavorites(newFavorites);

    // Here you could also dispatch to Redux store or make API call
    // Example: dispatch(toggleFavorite(product.id));
  };

  // Mock product data based on the ID
  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      setLoading(true);
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockProducts = {
        1: {
          id: 1,
          name: 'Organize Basic Set (Walnut)',
          price: 149,
          originalPrice: 199,
          rating: 4.8,
          reviews: 38,
          category: 'Objects',
          inStock: true,
          description:
            'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.',
          images: [
            'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1594736797933-d0eac2451a9a?w=600&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=600&fit=crop&crop=center',
          ],
          colors: [
            { name: 'Black', value: '#000000' },
            { name: 'Navy', value: '#1e3a8a' },
          ],
          highlights: [
            'Hand cut and sewn locally',
            'Dyed with our proprietary colors',
            'Pre-washed & pre-shrunk',
            'Ultra-soft 100% cotton',
          ],
          details:
            'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
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
        // Add more mock products as needed
      };

      const productData = mockProducts[id] || mockProducts[1];
      setProduct(productData);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  // Handle cart actions
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[selectedImage],
          category: product.category,
          quantity: quantity,
          selectedColor: product.colors
            ? product.colors[selectedColor].name
            : null,
        })
      );
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      dispatch(removeFromCart(product.id));
    }
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: 'Emily Johnson',
      rating: 5,
      date: '2 days ago',
      comment:
        'This is the bag of my dreams. I took it on my last vacation and was able to fit an obscene amount of snacks for the many long and hungry flights.',
      verified: true,
    },
    {
      id: 2,
      author: 'Hector Gibbons',
      rating: 5,
      date: '3 days ago',
      comment:
        'Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can share my snacks with confidence and style!',
      verified: true,
    },
    {
      id: 3,
      author: 'Mark Edwards',
      rating: 4,
      date: '1 week ago',
      comment:
        'I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins!',
      verified: false,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/30 to-purple-50/40 dark:from-blue-900/15 dark:via-indigo-900/10 dark:to-purple-900/15" />
      {/* Main Product Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-24 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-indigo-500 ${
                      index === selectedImage
                        ? 'ring-2 ring-indigo-500'
                        : 'ring-1 ring-gray-300 dark:ring-gray-600'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <span className="sr-only">Image {index + 1}</span>
                    <img
                      src={image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-center object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Main image */}
            <div className="w-full aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center space-x-4">
                <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
                  ${product.price}
                </p>
                {product.originalPrice && (
                  <p className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice}
                  </p>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <StarRating rating={product.rating} />
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <a
                  href="#reviews"
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  {product.reviews} reviews
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 dark:text-gray-300 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Color picker */}
            {product.colors && (
              <div className="mt-8">
                <div className="flex items-center space-x-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white w-16">
                    Color
                  </h3>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color, colorIdx) => (
                      <label
                        key={color.name}
                        className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                          colorIdx === selectedColor
                            ? 'ring-2 ring-indigo-500'
                            : 'ring-1 ring-gray-300 dark:ring-gray-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="color-choice"
                          value={color.name}
                          className="sr-only"
                          aria-labelledby={`color-choice-${colorIdx}-label`}
                          checked={colorIdx === selectedColor}
                          onChange={() => setSelectedColor(colorIdx)}
                        />
                        <span
                          id={`color-choice-${colorIdx}-label`}
                          className="sr-only"
                        >
                          {color.name}
                        </span>
                        <span
                          style={{ backgroundColor: color.value }}
                          aria-hidden="true"
                          className="h-8 w-8 rounded-full border border-black border-opacity-10"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <fieldset className="sr-only">
                  <legend>Choose a color</legend>
                </fieldset>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center space-x-3">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-900 dark:text-white w-16"
                  >
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value))}
                    className="min-w-[80px] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base font-medium px-3 py-2 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                {isInCart(product.id) ? (
                  <button
                    onClick={handleRemoveFromCart}
                    className="flex-1 bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className={`border rounded-md py-3 px-3 flex items-center justify-center transition-colors duration-200 ${
                    isFavorite(product?.id)
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-500 dark:hover:text-gray-200'
                  }`}
                >
                  <svg
                    className="h-6 w-6"
                    fill={isFavorite(product?.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="sr-only">
                    {isFavorite(product?.id)
                      ? 'Remove from favorites'
                      : 'Add to favorites'}
                  </span>
                </button>
              </div>
            </div>

            {/* Highlights */}
            <section aria-labelledby="details-heading" className="mt-12">
              <h2
                id="details-heading"
                className="text-lg font-medium text-gray-900 dark:text-white"
              >
                Highlights
              </h2>

              <div className="mt-4 space-y-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <ul className="space-y-2">
                    {product.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px bg-blue-300 dark:bg-blue-600 w-12"></div>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2 border border-blue-200 dark:border-blue-700">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                  Overview
                </span>
              </div>
              <div className="h-px bg-blue-300 dark:bg-blue-600 w-12"></div>
            </div>
          </div>

          {/* Description Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
              <p className="text-base leading-relaxed">{product.details}</p>
              <p className="text-base leading-relaxed">
                This carefully curated collection represents the perfect balance
                of style, comfort, and versatility. Each piece has been
                thoughtfully designed to complement your lifestyle while
                maintaining the highest standards of quality and craftsmanship.
              </p>
              <p className="text-base leading-relaxed">
                Whether you're building a capsule wardrobe or adding essential
                pieces to your collection, this selection offers timeless appeal
                that transcends seasonal trends. The attention to detail and
                premium materials ensure long-lasting durability and comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="relative bg-white dark:bg-gray-800 py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px bg-blue-300 dark:bg-blue-600 w-12"></div>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2 border border-blue-200 dark:border-blue-700">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                  Tech Specs
                </span>
              </div>
              <div className="h-px bg-blue-300 dark:bg-blue-600 w-12"></div>
            </div>
          </div>

          {/* Specifications Content */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                >
                  <dt className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {key}
                  </dt>
                  <dd className="text-sm text-gray-700 dark:text-gray-300">
                    {value}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px bg-blue-300 dark:bg-blue-600 w-12"></div>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2 border border-blue-200 dark:border-blue-700">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                  Reviews
                </span>
              </div>
              <div className="h-px bg-blue-300 dark:bg-blue-600 w-12"></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Review Summary - Left Side */}
            <div className="lg:w-1/3">
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <StarRating rating={product.rating} size="w-6 h-6" />
                    <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {product.rating} out of 5
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {product.reviews.toLocaleString()} global ratings
                  </p>

                  {/* Rating Distribution */}
                  <div className="space-y-3 mb-8 flex-1">
                    {[5, 4, 3, 2, 1].map(star => {
                      const percentage = getStarPercentage(star);
                      return (
                        <div key={star} className="flex items-center">
                          <span className="text-sm text-blue-600 dark:text-blue-400 w-12 font-medium">
                            {star} star
                          </span>
                          <div className="flex-1 mx-3">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-gradient-to-r from-orange-400 to-orange-500 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8 font-medium">
                            {percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Review this product section */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-auto">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Review this product
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Share your thoughts with other customers
                    </p>
                    <button className="w-full inline-flex items-center justify-center gap-x-2 px-4 py-3 text-sm font-semibold leading-6 text-white bg-blue-600 hover:bg-blue-700 transition-colors border border-blue-600 rounded-lg hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 duration-200">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Write a customer review
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews List - Right Side */}
            <div className="lg:w-2/3">
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Recent Reviews
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Showing {Math.min(3, reviews.length)} of {reviews.length}{' '}
                      reviews
                    </span>
                  </div>

                  <div className="space-y-6 flex-1">
                    {reviews.slice(0, 3).map(review => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                                {review.author[0]}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {review.author}
                                  {review.verified && (
                                    <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">
                                      ✓ Verified Purchase
                                    </span>
                                  )}
                                </h4>
                                <div className="flex items-center mt-1">
                                  <StarRating
                                    rating={review.rating}
                                    size="w-4 h-4"
                                  />
                                  <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                    {review.date}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* See more reviews link */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                    <button
                      onClick={() => navigate(`/products/${id}/reviews`)}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200 bg-transparent border-none cursor-pointer"
                    >
                      See all {reviews.length} reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
