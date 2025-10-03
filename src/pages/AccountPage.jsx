import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, openCart } from '../store/slices/cartSlice';
import { userData } from '../data/user';
import {
  UserCircleIcon,
  MapPinIcon,
  CreditCardIcon,
  HeartIcon,
  BellIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

/**
 * AccountPage Component
 *
 * Manages user account information including:
 * - Profile (name, email, phone, DOB, gender)
 * - Shipping addresses (CRUD operations)
 * - Payment methods (CRUD operations)
 * - Wishlist items
 * - Notification preferences
 * - Security settings
 *
 * Backend API Integration Required:
 * - See src/data/user.js for complete data structure and API endpoint documentation
 * - All user data is currently using mock data from userData import
 * - Replace useState initializations with API calls (e.g., useEffect with fetch/axios)
 * - Add proper error handling and loading states
 * - Implement actual save/update/delete operations with API calls
 */
const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Modal states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Profile Data - Initialize from imported user data
  const [profileData, setProfileData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    dateOfBirth: userData.dateOfBirth,
    gender: userData.gender,
  });

  // Addresses Data - Initialize from imported user data
  const [addresses, setAddresses] = useState(userData.addresses);

  // Payment Methods Data - Initialize from imported user data
  const [paymentMethods, setPaymentMethods] = useState(userData.paymentMethods);

  // Wishlist Data - Initialize from imported user data
  const [wishlistItems, setWishlistItems] = useState(userData.wishlist);

  // Notification Preferences - Initialize from imported user data
  const [notifications, setNotifications] = useState({
    emailOrders: userData.notifications.email.orderUpdates,
    emailPromotions: userData.notifications.email.promotions,
    emailNewsletter: userData.notifications.email.newsletter,
    smsOrders: userData.notifications.sms.orderUpdates,
    smsPromotions: userData.notifications.sms.promotions,
    pushOrders: userData.notifications.push.orderUpdates,
    pushPromotions: userData.notifications.push.promotions,
  });

  // Address form data
  const [addressForm, setAddressForm] = useState({
    type: 'Home',
    isDefault: false,
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phoneNumber: '',
  });

  // Payment form data
  const [paymentForm, setPaymentForm] = useState({
    type: 'visa',
    isDefault: false,
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingAddress: '',
  });

  const handleProfileChange = e => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = e => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveMessage('');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    setSaveMessage('Profile updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleRemoveFromWishlist = itemId => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleMoveToCart = item => {
    // Add item to cart
    dispatch(addToCart(item));
    // Open cart sidebar on desktop
    if (window.innerWidth >= 1024) {
      dispatch(openCart());
    }
    // Remove from wishlist
    handleRemoveFromWishlist(item.id);
  };

  // Address handlers
  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      type: 'Home',
      isDefault: false,
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phoneNumber: '',
    });
    setShowAddressModal(true);
  };

  const handleEditAddress = address => {
    setEditingAddress(address);
    setAddressForm(address);
    setShowAddressModal(true);
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(prev =>
        prev.map(addr => (addr.id === editingAddress.id ? addressForm : addr))
      );
    } else {
      // Add new address
      const newAddress = { ...addressForm, id: Date.now() };
      setAddresses(prev => [...prev, newAddress]);
    }
    setShowAddressModal(false);
    setSaveMessage(
      editingAddress
        ? 'Address updated successfully!'
        : 'Address added successfully!'
    );
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDeleteAddress = id => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

  const handleSetDefaultAddress = id => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleAddressFormChange = e => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Payment handlers
  const handleAddPayment = () => {
    setEditingPayment(null);
    setPaymentForm({
      type: 'visa',
      isDefault: false,
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      billingAddress: '',
    });
    setShowPaymentModal(true);
  };

  const handleEditPayment = payment => {
    setEditingPayment(payment);
    setPaymentForm(payment);
    setShowPaymentModal(true);
  };

  const handleSavePayment = () => {
    if (editingPayment) {
      // Update existing payment
      setPaymentMethods(prev =>
        prev.map(pm => (pm.id === editingPayment.id ? paymentForm : pm))
      );
    } else {
      // Add new payment
      const maskedNumber = `•••• •••• •••• ${paymentForm.cardNumber.slice(-4)}`;
      const newPayment = {
        ...paymentForm,
        id: Date.now(),
        cardNumber: maskedNumber,
        expiryDate: `${paymentForm.expiryMonth}/${paymentForm.expiryYear}`,
      };
      setPaymentMethods(prev => [...prev, newPayment]);
    }
    setShowPaymentModal(false);
    setSaveMessage(
      editingPayment
        ? 'Payment method updated successfully!'
        : 'Payment method added successfully!'
    );
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDeletePayment = id => {
    if (
      window.confirm('Are you sure you want to remove this payment method?')
    ) {
      setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    }
  };

  const handleSetDefaultPayment = id => {
    setPaymentMethods(prev =>
      prev.map(pm => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const handlePaymentFormChange = e => {
    const { name, value, type, checked } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'addresses', name: 'Addresses', icon: MapPinIcon },
    { id: 'payment', name: 'Payment Methods', icon: CreditCardIcon },
    { id: 'wishlist', name: 'Wishlist', icon: HeartIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  ];

  const getCardIcon = type => {
    const icons = {
      visa: (
        <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#1434CB" />
          <path
            d="M19.5 21.5l1.5-9h2.4l-1.5 9h-2.4zm10.8-8.8c-.5-.2-1.2-.4-2.1-.4-2.3 0-3.9 1.2-3.9 2.9 0 1.3 1.2 2 2.1 2.4.9.4 1.2.7 1.2 1.1 0 .6-.7.9-1.4.9-1 0-1.5-.1-2.3-.5l-.3-.2-.3 2c.6.2 1.6.4 2.7.4 2.4 0 4-1.2 4-3 0-1-.6-1.8-2-2.4-.8-.4-1.3-.7-1.3-1.1 0-.4.4-.7 1.3-.7.7 0 1.3.2 1.7.3l.2.1.3-1.8zm6.2-1.2h-1.9c-.6 0-1 .2-1.3.8l-3.6 8.7h2.4l.5-1.3h2.9l.3 1.3h2.1l-1.4-9zm-2.8 5.8l1.2-3.2.7 3.2h-1.9zm-10.3-5.8l-1.9 9h-2.3l-1.9-7.3c-.1-.4-.2-.6-.5-.8-.5-.3-1.3-.6-2-.8l.1-.4h3.4c.4 0 .8.3.9.8l.8 4.3 2-5.1h2.4z"
            fill="white"
          />
        </svg>
      ),
      mastercard: (
        <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#EB001B" />
          <circle cx="18" cy="16" r="10" fill="#FF5F00" />
          <circle cx="30" cy="16" r="10" fill="#F79E1B" />
          <path
            d="M24 8.5c-1.9 1.7-3 4.2-3 7s1.1 5.3 3 7c1.9-1.7 3-4.2 3-7s-1.1-5.3-3-7z"
            fill="#FF5F00"
          />
        </svg>
      ),
      amex: (
        <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#006FCF" />
          <text
            x="24"
            y="20"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
          >
            AMEX
          </text>
        </svg>
      ),
    };
    return icons[type] || icons.visa;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 overflow-x-auto">
          <nav className="flex min-w-max" aria-label="Tabs">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsEditing(false);
                    setSaveMessage('');
                  }}
                  className={`flex-1 min-w-[140px] px-4 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{tab.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Personal Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>

              {saveMessage && (
                <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg text-green-800 dark:text-green-200">
                  {saveMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shipping Addresses
                </h2>
                <button
                  onClick={handleAddAddress}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Add New Address
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map(address => (
                  <div
                    key={address.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 relative"
                  >
                    {address.isDefault && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-medium rounded-full">
                        Default
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {address.type}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {address.fullName}
                    </p>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {address.phoneNumber}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm transition-colors duration-200"
                      >
                        Edit
                      </button>
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefaultAddress(address.id)}
                          className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm transition-colors duration-200"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payment' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Payment Methods
                </h2>
                <button
                  onClick={handleAddPayment}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Add New Card
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex items-center gap-6"
                  >
                    <div className="flex-shrink-0">
                      {getCardIcon(method.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {method.cardNumber}
                        </h3>
                        {method.isDefault && (
                          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-medium rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {method.cardholderName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Expires: {method.expiryDate}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {method.billingAddress}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEditPayment(method)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm transition-colors duration-200"
                      >
                        Edit
                      </button>
                      {!method.isDefault && (
                        <button
                          onClick={() => handleSetDefaultPayment(method.id)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm transition-colors duration-200"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => handleDeletePayment(method.id)}
                        className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <span className="font-semibold">💳 Secure Payment:</span> All
                  payment information is encrypted and stored securely. We never
                  store your full card details.
                </p>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Wishlist
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {wishlistItems.length} item
                  {wishlistItems.length !== 1 ? 's' : ''} saved
                </p>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                  <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Save items you love for later
                  </p>
                  <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map(item => (
                    <div
                      key={item.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden group"
                    >
                      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(item.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {item.rating}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          ${item.price}
                        </p>
                        <div className="flex gap-2">
                          {item.inStock ? (
                            <button
                              onClick={() => handleMoveToCart(item)}
                              className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm transition-colors duration-200"
                            >
                              Move to Cart
                            </button>
                          ) : (
                            <button
                              disabled
                              className="flex-1 px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg text-sm cursor-not-allowed"
                            >
                              Out of Stock
                            </button>
                          )}
                          <button
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm transition-colors duration-200"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Notification Preferences
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Choose how you want to receive updates from us
                </p>
              </div>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Email Notifications
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Order Updates
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Shipping, delivery, and order confirmations
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="emailOrders"
                        checked={notifications.emailOrders}
                        onChange={handleNotificationChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Promotions & Deals
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Special offers and discounts
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="emailPromotions"
                        checked={notifications.emailPromotions}
                        onChange={handleNotificationChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Newsletter
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Weekly product recommendations
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="emailNewsletter"
                        checked={notifications.emailNewsletter}
                        onChange={handleNotificationChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </label>
                  </div>
                </div>

                {/* SMS Notifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    SMS Notifications
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Order Updates
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Critical order status via SMS
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="smsOrders"
                        checked={notifications.smsOrders}
                        onChange={handleNotificationChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Promotions
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Flash sales and exclusive deals
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="smsPromotions"
                        checked={notifications.smsPromotions}
                        onChange={handleNotificationChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </label>
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Push Notifications
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Order Updates
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Real-time order status
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="pushOrders"
                        checked={notifications.pushOrders}
                        onChange={handleNotificationChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Promotions
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Limited time offers
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        name="pushPromotions"
                        checked={notifications.pushPromotions}
                        onChange={handleNotificationChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Security Settings
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Manage your password and account security
                </p>
              </div>

              <div className="space-y-6">
                {/* Change Password */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Update Password
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                      Disabled
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Enable 2FA
                  </button>
                </div>

                {/* Account Activity */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Login from Chrome on Windows
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          New York, US • Oct 3, 2025 at 10:30 AM
                        </p>
                      </div>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Current
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Login from Safari on iPhone
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          New York, US • Oct 2, 2025 at 8:15 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Password changed
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Sep 28, 2025 at 3:45 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="border-2 border-red-200 dark:border-red-900/50 rounded-lg p-6 bg-red-50/50 dark:bg-red-900/10">
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-2">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={addressForm.type}
                  onChange={handleAddressFormChange}
                  placeholder="e.g., Home, Office"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={addressForm.isDefault}
                    onChange={e =>
                      handleAddressFormChange({
                        target: { name: 'isDefault', value: e.target.checked },
                      })
                    }
                    className="mr-2 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  Set as default address
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={addressForm.fullName}
                  onChange={handleAddressFormChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={addressForm.addressLine1}
                  onChange={handleAddressFormChange}
                  placeholder="Street address, P.O. box"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={addressForm.addressLine2}
                  onChange={handleAddressFormChange}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={addressForm.city}
                    onChange={handleAddressFormChange}
                    placeholder="New York"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressFormChange}
                    placeholder="NY"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={addressForm.zipCode}
                    onChange={handleAddressFormChange}
                    placeholder="10001"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={addressForm.country}
                    onChange={handleAddressFormChange}
                    placeholder="United States"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={addressForm.phoneNumber}
                  onChange={handleAddressFormChange}
                  placeholder="+1 (555) 123-4567"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddressModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingPayment
                  ? 'Edit Payment Method'
                  : 'Add New Payment Method'}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Card Type *
                </label>
                <select
                  name="type"
                  value={paymentForm.type}
                  onChange={handlePaymentFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="discover">Discover</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={paymentForm.isDefault}
                    onChange={e =>
                      handlePaymentFormChange({
                        target: { name: 'isDefault', value: e.target.checked },
                      })
                    }
                    className="mr-2 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  Set as default payment method
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentForm.cardNumber}
                  onChange={handlePaymentFormChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={paymentForm.cardholderName}
                  onChange={handlePaymentFormChange}
                  placeholder="JOHN DOE"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiry Month *
                  </label>
                  <select
                    name="expiryMonth"
                    value={paymentForm.expiryMonth}
                    onChange={handlePaymentFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option
                        key={month}
                        value={month.toString().padStart(2, '0')}
                      >
                        {month.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiry Year *
                  </label>
                  <select
                    name="expiryYear"
                    value={paymentForm.expiryYear}
                    onChange={handlePaymentFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">YYYY</option>
                    {Array.from(
                      { length: 15 },
                      (_, i) => new Date().getFullYear() + i
                    ).map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentForm.cvv}
                    onChange={handlePaymentFormChange}
                    placeholder="123"
                    maxLength="4"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Billing Address *
                </label>
                <textarea
                  name="billingAddress"
                  value={paymentForm.billingAddress}
                  onChange={handlePaymentFormChange}
                  placeholder="123 Main St, New York, NY 10001"
                  rows="3"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <span className="font-semibold">🔒 Secure:</span> Your payment
                  information is encrypted and stored securely.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePayment}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Save Payment Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
