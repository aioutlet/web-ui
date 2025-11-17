import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthStore } from '../../store/authStore';
import { fetchCartAsync } from '../../store/slices/cartSlice';
import Header from './Header';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(state => state.cart.isOpen);
  const { isAuthenticated } = useAuthStore();

  // Initialize cart on mount and when auth state changes
  useEffect(() => {
    // Only fetch cart once per auth state change
    // This handles both authenticated users and guests
    dispatch(fetchCartAsync());
  }, [dispatch, isAuthenticated]); // Re-fetch when auth state changes

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      <div
        className={`transition-all duration-300 ease-in-out ${isCartOpen ? 'lg:mr-96' : 'mr-0'}`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <CartSidebar />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
