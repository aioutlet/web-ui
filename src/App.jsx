import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ContactUsPage from './pages/ContactUsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ReviewListPage from './pages/ReviewListPage';
import WriteReviewPage from './pages/WriteReviewPage';
import CategoryPage from './pages/CategoryPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AccountPage from './pages/AccountPage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/customer-service/contact"
                  element={<ContactUsPage />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route
                  path="/verify-email"
                  element={<EmailVerificationPage />}
                />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route
                  path="/products/:id/reviews"
                  element={<ReviewListPage />}
                />
                <Route
                  path="/products/:productId/write-review"
                  element={
                    <ProtectedRoute>
                      <WriteReviewPage />
                    </ProtectedRoute>
                  }
                />

                {/* Top-level Category Pages */}
                <Route
                  path="/women"
                  element={<CategoryPage category="women" />}
                />
                <Route path="/men" element={<CategoryPage category="men" />} />
                <Route
                  path="/electronics"
                  element={<CategoryPage category="electronics" />}
                />
                <Route
                  path="/sports"
                  element={<CategoryPage category="sports" />}
                />

                {/* Subcategory and Product Type Pages - Dynamic */}
                {/* 2-level URLs like /women/bags map to productType */}
                {/* Browse All URLs like /women/accessories map to subcategory */}
                <Route
                  path="/women/:subcategoryOrType"
                  element={<CategoryPage category="women" />}
                />
                <Route
                  path="/women/:subcategory/:productType"
                  element={<CategoryPage category="women" />}
                />
                <Route
                  path="/men/:subcategoryOrType"
                  element={<CategoryPage category="men" />}
                />
                <Route
                  path="/men/:subcategory/:productType"
                  element={<CategoryPage category="men" />}
                />
                <Route
                  path="/electronics/:subcategoryOrType"
                  element={<CategoryPage category="electronics" />}
                />
                <Route
                  path="/electronics/:subcategory/:productType"
                  element={<CategoryPage category="electronics" />}
                />
                <Route
                  path="/sports/:subcategoryOrType"
                  element={<CategoryPage category="sports" />}
                />
                <Route
                  path="/sports/:subcategory/:productType"
                  element={<CategoryPage category="sports" />}
                />

                {/* Collections (for backward compatibility) */}
                <Route
                  path="/collections/:collection"
                  element={<CategoryPage />}
                />

                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders/:orderId"
                  element={
                    <ProtectedRoute>
                      <OrderDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-success"
                  element={
                    <ProtectedRoute>
                      <OrderSuccessPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
