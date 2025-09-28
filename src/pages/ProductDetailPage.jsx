import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import PropTypes from 'prop-types';

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
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  // Helper function to check if product is in cart
  const isInCart = productId => {
    return cartItems.some(item => item.id === productId);
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

  const StarRating = ({ rating, size = 'w-5 h-5' }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <svg
            key={star}
            className={`${size} ${
              star <= Math.floor(rating)
                ? 'text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            } fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    size: PropTypes.string,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Home
                </button>
              </li>
              <li className="flex items-center">
                <svg
                  className="fill-current w-3 h-3 mx-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.476 239.03c9.373 9.372 9.373 24.568 0 33.941z" />
                </svg>
              </li>
              <li className="flex items-center">
                <button
                  onClick={() => navigate('/products')}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Products
                </button>
              </li>
              <li className="flex items-center">
                <svg
                  className="fill-current w-3 h-3 mx-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.476 239.03c9.373 9.372 9.373 24.568 0 33.941z" />
                </svg>
              </li>
              <li>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Color
                  </h3>
                </div>

                <fieldset className="mt-2">
                  <legend className="sr-only">Choose a color</legend>
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
                </fieldset>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="sr-only">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value))}
                    className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base font-medium px-3 py-2 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                    className="flex-1 bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  type="button"
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-3 px-3 flex items-center justify-center text-gray-400 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-500 dark:hover:text-gray-200"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
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
                  <span className="sr-only">Add to favorites</span>
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

        {/* Product details sections */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'specifications'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({reviews.length})
              </button>
            </nav>
          </div>

          <div className="pt-10">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  About this product
                </h3>
                <p>{product.details}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4"
                      >
                        <dt className="text-sm font-medium text-gray-900 dark:text-white">
                          {key}
                        </dt>
                        <dd className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                          {value}
                        </dd>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div id="reviews">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center">
                    <StarRating rating={product.rating} />
                    <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Based on {product.reviews} reviews
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {reviews.map(review => (
                    <div key={review.id} className="flex space-x-4">
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
                                <span className="ml-2 text-xs text-indigo-600 dark:text-indigo-400">
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
                        <div className="mt-4">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
