/**
 * Orders API Client
 * Handles all order-related API calls to the BFF
 */
import bffClient from './bffClient';
import { API_ENDPOINTS } from './endpoints';

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @param {string} orderData.customerId - Customer ID
 * @param {Array} orderData.items - Order items
 * @param {Object} orderData.shippingAddress - Shipping address
 * @param {Object} orderData.billingAddress - Billing address
 * @param {string} orderData.notes - Optional notes
 * @returns {Promise<Object>} Created order
 */
export const createOrder = async orderData => {
  const response = await bffClient.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
  return response.data;
};

/**
 * Get current user's orders
 * @returns {Promise<Array>} List of user's orders
 */
export const getMyOrders = async () => {
  const response = await bffClient.get(`${API_ENDPOINTS.ORDERS.LIST}/my`);
  console.log('📦 getMyOrders API response:', response);
  console.log('📦 response.data:', response.data);

  // The BFF returns { success: true, data: orders }
  // We need to extract the actual orders array
  if (response.data && response.data.data) {
    return response.data.data;
  }

  return response.data;
};

/**
 * Get current user's orders with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} pageSize - Page size (default: 10)
 * @returns {Promise<Object>} Paged orders response
 */
export const getMyOrdersPaged = async (page = 1, pageSize = 10) => {
  const response = await bffClient.get(
    `${API_ENDPOINTS.ORDERS.LIST}/my/paged?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Order details
 */
export const getOrderById = async orderId => {
  const response = await bffClient.get(API_ENDPOINTS.ORDERS.DETAIL(orderId));
  return response.data;
};

/**
 * Cancel an order
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Cancellation result
 */
export const cancelOrder = async orderId => {
  const response = await bffClient.post(API_ENDPOINTS.ORDERS.CANCEL(orderId));
  return response.data;
};

const ordersAPI = {
  createOrder,
  getMyOrders,
  getMyOrdersPaged,
  getOrderById,
  cancelOrder,
};

export default ordersAPI;
