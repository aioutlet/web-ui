// Mock user data - defines the structure expected from backend API
// This represents what should be returned from GET /api/users/{userId} or /api/auth/me

export const userData = {
  // Basic Profile Information
  id: 'user_123456',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+1 (555) 123-4567',
  dateOfBirth: '1990-05-15',
  gender: 'male', // 'male', 'female', 'other', 'prefer-not-to-say'

  // Account Status
  accountStatus: 'active', // 'active', 'suspended', 'pending-verification'
  emailVerified: true,
  phoneVerified: true,
  createdAt: '2023-01-15T10:30:00Z',
  lastLogin: '2025-10-03T08:15:00Z',

  // Shipping Addresses
  addresses: [
    {
      id: 'addr_1',
      type: 'Home',
      isDefault: true,
      fullName: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phoneNumber: '+1 (555) 123-4567',
      createdAt: '2023-01-15T10:30:00Z',
      updatedAt: '2024-06-20T14:22:00Z',
    },
    {
      id: 'addr_2',
      type: 'Office',
      isDefault: false,
      fullName: 'John Doe',
      addressLine1: '456 Business Ave',
      addressLine2: 'Suite 200',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'United States',
      phoneNumber: '+1 (555) 987-6543',
      createdAt: '2023-03-10T09:15:00Z',
      updatedAt: '2023-03-10T09:15:00Z',
    },
    {
      id: 'addr_3',
      type: 'Parents House',
      isDefault: false,
      fullName: 'John Doe',
      addressLine1: '789 Oak Lane',
      addressLine2: '',
      city: 'Queens',
      state: 'NY',
      zipCode: '11375',
      country: 'United States',
      phoneNumber: '+1 (555) 555-5555',
      createdAt: '2023-06-22T16:45:00Z',
      updatedAt: '2023-06-22T16:45:00Z',
    },
  ],

  // Payment Methods
  paymentMethods: [
    {
      id: 'pay_1',
      type: 'visa',
      isDefault: true,
      cardNumber: '•••• •••• •••• 4242', // Last 4 digits only
      cardholderName: 'JOHN DOE',
      expiryMonth: '12',
      expiryYear: '2027',
      expiryDate: '12/27', // Formatted for display
      billingAddress: '123 Main Street, Apt 4B, New York, NY 10001',
      createdAt: '2023-01-20T11:30:00Z',
      updatedAt: '2023-01-20T11:30:00Z',
    },
    {
      id: 'pay_2',
      type: 'mastercard',
      isDefault: false,
      cardNumber: '•••• •••• •••• 5555',
      cardholderName: 'JOHN DOE',
      expiryMonth: '08',
      expiryYear: '2026',
      expiryDate: '08/26',
      billingAddress: '456 Business Ave, Suite 200, Brooklyn, NY 11201',
      createdAt: '2023-05-10T14:20:00Z',
      updatedAt: '2023-05-10T14:20:00Z',
    },
  ],

  // Wishlist Items
  wishlist: [
    {
      id: 'prod_1',
      productId: 'prod_1',
      name: 'Sony WH-1000XM5 Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
      price: 399.99,
      rating: 4.8,
      inStock: true,
      addedAt: '2025-09-15T10:30:00Z',
    },
    {
      id: 'prod_2',
      productId: 'prod_2',
      name: 'Apple iPad Pro 12.9" 256GB',
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500',
      price: 1099.99,
      rating: 4.9,
      inStock: true,
      addedAt: '2025-09-20T14:45:00Z',
    },
    {
      id: 'prod_3',
      productId: 'prod_3',
      name: 'Samsung 65" QLED 4K TV',
      image:
        'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500',
      price: 1299.99,
      rating: 4.7,
      inStock: false,
      addedAt: '2025-08-10T09:20:00Z',
    },
    {
      id: 'prod_4',
      productId: 'prod_4',
      name: 'Bose SoundLink Revolve+ Speaker',
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
      price: 329.0,
      rating: 4.6,
      inStock: true,
      addedAt: '2025-09-25T16:10:00Z',
    },
  ],

  // Notification Preferences
  notifications: {
    email: {
      orderUpdates: true,
      promotions: true,
      newsletter: false,
      productRecommendations: true,
      securityAlerts: true,
    },
    sms: {
      orderUpdates: true,
      promotions: false,
      newsletter: false,
      productRecommendations: false,
      securityAlerts: true,
    },
    push: {
      orderUpdates: true,
      promotions: true,
      newsletter: false,
      productRecommendations: true,
      securityAlerts: true,
    },
  },

  // Security Settings
  security: {
    twoFactorEnabled: false,
    twoFactorMethod: null, // 'app', 'sms', 'email'
    passwordLastChanged: '2024-09-28T15:45:00Z',
    activeSessions: 2,
    lastPasswordChange: '2024-09-28T15:45:00Z',
  },

  // Activity Log (Recent activities)
  activityLog: [
    {
      id: 'activity_1',
      type: 'login',
      description: 'Login from Chrome on Windows',
      location: 'New York, US',
      ipAddress: '192.168.1.1',
      timestamp: '2025-10-03T08:15:00Z',
      isCurrent: true,
    },
    {
      id: 'activity_2',
      type: 'login',
      description: 'Login from Safari on iPhone',
      location: 'New York, US',
      ipAddress: '192.168.1.50',
      timestamp: '2025-10-02T20:15:00Z',
      isCurrent: false,
    },
    {
      id: 'activity_3',
      type: 'password_change',
      description: 'Password changed',
      location: 'New York, US',
      ipAddress: '192.168.1.1',
      timestamp: '2024-09-28T15:45:00Z',
      isCurrent: false,
    },
  ],

  // Order Statistics (Optional - for profile summary)
  orderStats: {
    totalOrders: 42,
    totalSpent: 8549.99,
    averageOrderValue: 203.57,
    lastOrderDate: '2025-09-30T14:20:00Z',
  },

  // Preferences (Optional)
  preferences: {
    currency: 'USD',
    language: 'en-US',
    timezone: 'America/New_York',
    theme: 'auto', // 'light', 'dark', 'auto'
  },
};

// API Endpoints that should be implemented in the backend:
//
// GET    /api/users/me                          - Get current user's full profile
// GET    /api/users/:userId                     - Get user by ID (admin only)
// PATCH  /api/users/me                          - Update user profile
// DELETE /api/users/me                          - Delete user account
//
// GET    /api/users/me/addresses                - Get all addresses
// POST   /api/users/me/addresses                - Create new address
// PATCH  /api/users/me/addresses/:addressId     - Update address
// DELETE /api/users/me/addresses/:addressId     - Delete address
// PATCH  /api/users/me/addresses/:addressId/default - Set address as default
//
// GET    /api/users/me/payment-methods          - Get all payment methods
// POST   /api/users/me/payment-methods          - Add new payment method
// PATCH  /api/users/me/payment-methods/:id      - Update payment method
// DELETE /api/users/me/payment-methods/:id      - Delete payment method
// PATCH  /api/users/me/payment-methods/:id/default - Set payment as default
//
// GET    /api/users/me/wishlist                 - Get wishlist items
// POST   /api/users/me/wishlist                 - Add item to wishlist
// DELETE /api/users/me/wishlist/:productId      - Remove from wishlist
//
// GET    /api/users/me/notifications            - Get notification preferences
// PATCH  /api/users/me/notifications            - Update notification preferences
//
// GET    /api/users/me/security                 - Get security settings
// PATCH  /api/users/me/security/password        - Change password
// POST   /api/users/me/security/2fa/enable      - Enable 2FA
// POST   /api/users/me/security/2fa/disable     - Disable 2FA
//
// GET    /api/users/me/activity                 - Get activity log
// POST   /api/users/me/security/logout-all      - Logout all sessions
