import bffClient from './bffClient';

// ============================================================================
// Authenticated Cart API
// ============================================================================

/**
 * Get authenticated user's cart
 * @returns {Promise} Cart data
 */
export const getCart = async () => {
  const response = await bffClient.get('/cart');
  return response.data;
};

/**
 * Add item to authenticated user's cart
 * @param {Object} itemData - { productId, productName, price, quantity }
 * @returns {Promise} Updated cart
 */
export const addItem = async itemData => {
  const response = await bffClient.post('/cart/items', itemData);
  return response.data;
};

/**
 * Update item quantity in authenticated user's cart
 * @param {string} productId - Product ID
 * @param {number} quantity - New quantity
 * @returns {Promise} Updated cart
 */
export const updateItem = async (productId, quantity) => {
  const response = await bffClient.put(`/cart/items/${productId}`, {
    quantity,
  });
  return response.data;
};

/**
 * Remove item from authenticated user's cart
 * @param {string} productId - Product ID
 * @returns {Promise} Updated cart
 */
export const removeItem = async productId => {
  const response = await bffClient.delete(`/cart/items/${productId}`);
  return response.data;
};

/**
 * Clear authenticated user's cart
 * @returns {Promise} Success message
 */
export const clearCart = async () => {
  const response = await bffClient.delete('/cart');
  return response.data;
};

/**
 * Transfer guest cart to authenticated user
 * @param {string} guestId - Guest ID (UUID)
 * @returns {Promise} Merged cart
 */
export const transferCart = async guestId => {
  const response = await bffClient.post('/cart/transfer', { guestId });
  return response.data;
};

// ============================================================================
// Guest Cart API
// ============================================================================

/**
 * Get guest cart
 * @param {string} guestId - Guest ID (UUID)
 * @returns {Promise} Cart data
 */
export const getGuestCart = async guestId => {
  const response = await bffClient.get(`/cart/guest/${guestId}`);
  return response.data;
};

/**
 * Add item to guest cart
 * @param {string} guestId - Guest ID (UUID)
 * @param {Object} itemData - { productId, productName, price, quantity }
 * @returns {Promise} Updated cart
 */
export const addGuestItem = async (guestId, itemData) => {
  const response = await bffClient.post(
    `/cart/guest/${guestId}/items`,
    itemData
  );
  return response.data;
};

/**
 * Update item quantity in guest cart
 * @param {string} guestId - Guest ID (UUID)
 * @param {string} productId - Product ID
 * @param {number} quantity - New quantity
 * @returns {Promise} Updated cart
 */
export const updateGuestItem = async (guestId, productId, quantity) => {
  const response = await bffClient.put(
    `/cart/guest/${guestId}/items/${productId}`,
    { quantity }
  );
  return response.data;
};

/**
 * Remove item from guest cart
 * @param {string} guestId - Guest ID (UUID)
 * @param {string} productId - Product ID
 * @returns {Promise} Updated cart
 */
export const removeGuestItem = async (guestId, productId) => {
  const response = await bffClient.delete(
    `/cart/guest/${guestId}/items/${productId}`
  );
  return response.data;
};

/**
 * Clear guest cart
 * @param {string} guestId - Guest ID (UUID)
 * @returns {Promise} Success message
 */
export const clearGuestCart = async guestId => {
  const response = await bffClient.delete(`/cart/guest/${guestId}`);
  return response.data;
};

// Export as default for convenience
const cartAPI = {
  // Authenticated
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
  transferCart,
  // Guest
  getGuestCart,
  addGuestItem,
  updateGuestItem,
  removeGuestItem,
  clearGuestCart,
};

export default cartAPI;
