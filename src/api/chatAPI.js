/**
 * Chat API Client
 * Handles communication with the chat service through BFF
 */
import bffClient from './bffClient';
import { API_ENDPOINTS } from './endpoints';

/**
 * Send a chat message and get a response
 * @param {string} message - The user's message
 * @returns {Promise<Object>} Chat response with reply and optional data
 */
export const sendChatMessage = async message => {
  try {
    const response = await bffClient.post(API_ENDPOINTS.CHAT.MESSAGE, {
      message,
    });

    console.log('Raw API response:', response.data);

    // Handle different response structures
    if (response.data?.success) {
      const result = response.data.data;
      console.log('Extracted result:', result);
      console.log('Products in result:', result?.data?.products);
      return result;
    }

    return response.data;
  } catch (error) {
    console.error('Chat API Error:', error);

    // Provide user-friendly error messages
    if (error.isNetworkError) {
      throw new Error(
        'Unable to connect to the chat service. Please try again.'
      );
    }

    if (error.statusCode === 401) {
      throw new Error('Please log in to access all chat features.');
    }

    if (error.statusCode === 429) {
      throw new Error("You're sending messages too fast. Please slow down.");
    }

    if (error.statusCode >= 500) {
      throw new Error(
        'Our chat service is temporarily unavailable. Please try again later.'
      );
    }

    throw new Error(error.message || 'Something went wrong. Please try again.');
  }
};

/**
 * Get chat history (if implemented)
 * @returns {Promise<Array>} Array of previous messages
 */
export const getChatHistory = async () => {
  try {
    const response = await bffClient.get(API_ENDPOINTS.CHAT.HISTORY);
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error('Failed to fetch chat history:', error);
    return [];
  }
};

const chatAPI = {
  sendChatMessage,
  getChatHistory,
};

export default chatAPI;
