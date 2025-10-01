import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';

const Layout = ({ children }) => {
  const isCartOpen = useSelector(state => state.cart.isOpen);

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
