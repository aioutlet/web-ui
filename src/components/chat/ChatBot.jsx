import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { sendChatMessage } from '../../api/chatAPI';
import { useChat } from '../../contexts/ChatContext';

// Message component for rendering individual chat messages
const ChatMessage = ({ message, onProductClick, onOrderClick }) => {
  const isUser = message.role === 'user';
  const isError = message.isError;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-md'
            : isError
              ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-bl-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
        }`}
      >
        {/* Message text */}
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

        {/* Product results */}
        {message.products && message.products.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.products.slice(0, 3).map((product, idx) => (
              <button
                key={idx}
                onClick={() => onProductClick(product.id || product._id)}
                className="w-full flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-left"
              >
                <img
                  src={product.images?.[0] || '/placeholder-product.png'}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md bg-gray-200 dark:bg-gray-600"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48"%3E%3Crect width="48" height="48" fill="%23e5e7eb"/%3E%3C/svg%3E';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
                    £{product.price?.toFixed(2)}
                  </p>
                </div>
              </button>
            ))}
            {message.products.length > 3 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                +{message.products.length - 3} more products
              </p>
            )}
          </div>
        )}

        {/* Order results */}
        {message.orders && message.orders.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.orders.slice(0, 3).map((order, idx) => (
              <button
                key={idx}
                onClick={() => onOrderClick(order.id || order.orderId)}
                className="w-full flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                  <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Order #{order.orderNumber || order.id?.slice(-8)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {order.status} • £{order.totalAmount?.toFixed(2)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p
          className={`text-xs mt-1 ${
            isUser
              ? 'text-indigo-200'
              : isError
                ? 'text-red-400 dark:text-red-500'
                : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    isError: PropTypes.bool,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        images: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    orders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        orderId: PropTypes.string,
        orderNumber: PropTypes.string,
        status: PropTypes.string,
        totalAmount: PropTypes.number,
      })
    ),
  }).isRequired,
  onProductClick: PropTypes.func.isRequired,
  onOrderClick: PropTypes.func.isRequired,
};

// Quick action buttons
const QuickActions = ({ onAction, disabled }) => {
  const actions = [
    {
      id: 'search',
      label: 'Search Products',
      icon: ShoppingBagIcon,
      prompt: 'I want to search for products',
    },
    {
      id: 'orders',
      label: 'My Orders',
      icon: ClipboardDocumentListIcon,
      prompt: 'Show me my recent orders',
    },
  ];

  return (
    <div className="flex gap-2 mb-3">
      {actions.map(action => (
        <button
          key={action.id}
          onClick={() => onAction(action.prompt)}
          disabled={disabled}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <action.icon className="w-3.5 h-3.5" />
          {action.label}
        </button>
      ))}
    </div>
  );
};

QuickActions.propTypes = {
  onAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

QuickActions.defaultProps = {
  disabled: false,
};

// Typing indicator
const TypingIndicator = () => (
  <div className="flex justify-start mb-3">
    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3">
      <div className="flex gap-1">
        <span
          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  </div>
);

// Main ChatBot component
const ChatBot = () => {
  const { isOpen, toggleChat, closeChat } = useChat();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(state => state.auth);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setHasNewMessage(false);
    }
  }, [isOpen]);

  // Add welcome message when chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: 'welcome',
        role: 'assistant',
        content: isAuthenticated
          ? `Hi${user?.firstName ? ` ${user.firstName}` : ''}! 👋 I'm your shopping assistant. I can help you search for products or check your order status. What would you like to do?`
          : "Hi there! 👋 I'm your shopping assistant. I can help you search for products. Log in to check your order history too!",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, isAuthenticated, user?.firstName]);

  const handleSendMessage = async (messageText = inputValue.trim()) => {
    if (!messageText || isLoading) return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call chat API
      const response = await sendChatMessage(messageText);

      // Add assistant response
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toISOString(),
        products: response.data?.products,
        orders: response.data?.orders || response.data,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Show notification if chat is closed
      if (!isOpen) {
        setHasNewMessage(true);
      }
    } catch (error) {
      console.error('Chat error:', error);

      // Add error message
      const errorMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          error.message ||
          "Sorry, I'm having trouble connecting right now. Please try again.",
        timestamp: new Date().toISOString(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleProductClick = productId => {
    closeChat();
    navigate(`/products/${productId}`);
  };

  const handleOrderClick = orderId => {
    closeChat();
    navigate(`/account/orders/${orderId}`);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-96 max-h-[70vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50 transform transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Shopping Assistant
              </h3>
              <p className="text-xs text-indigo-200">Powered by AI</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              title="Clear chat"
            >
              <ArrowPathIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={toggleChat}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 min-h-[300px] max-h-[400px]">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message}
              onProductClick={handleProductClick}
              onOrderClick={handleOrderClick}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4">
          <QuickActions onAction={handleSendMessage} disabled={isLoading} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-full text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 disabled:opacity-50"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-full transition-colors disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 sm:right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${
          isOpen
            ? 'bg-gray-600 hover:bg-gray-700 rotate-0'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <>
            <ChatBubbleLeftRightIconSolid className="w-6 h-6 text-white" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
            )}
          </>
        )}
      </button>
    </>
  );
};

export default ChatBot;
