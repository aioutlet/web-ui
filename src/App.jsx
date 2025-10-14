import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ContactUsPage from './pages/ContactUsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ReviewListPage from './pages/ReviewListPage';
import WriteReviewPage from './pages/WriteReviewPage';
import ProductListPage from './pages/ProductListPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AccountPage from './pages/ProfilePage';
import AccountDashboard from './pages/AccountDashboard';
import AddressesPage from './pages/AddressesPage';
import AddAddressPage from './pages/AddAddressPage';
import EditAddressPage from './pages/EditAddressPage';
import PaymentsPage from './pages/PaymentsPage';
import AddPaymentPage from './pages/AddPaymentPage';
import EditPaymentPage from './pages/EditPaymentPage';
import SearchResultsPage from './pages/SearchResultsPage';
import WishlistPage from './pages/WishlistPage';
import NotFoundPage from './pages/NotFoundPage';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
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
                  <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                  />
                  <Route
                    path="/verify-email"
                    element={<EmailVerificationPage />}
                  />

                  {/* Products - All use ProductListPage with different levels of filtering */}
                  {/* All products page */}
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

                  {/* Hierarchical Category Pages */}
                  {/* Level 1: Department only (e.g., /women) */}
                  <Route path="/:department" element={<ProductListPage />} />

                  {/* Level 2: Department + Category (e.g., /women/clothing) */}
                  <Route
                    path="/:department/:category"
                    element={<ProductListPage />}
                  />

                  {/* Level 3: Department + Category + Subcategory (e.g., /women/clothing/tops) */}
                  <Route
                    path="/:department/:category/:subcategory"
                    element={<ProductListPage />}
                  />

                  <Route
                    path="/account/orders"
                    element={
                      <ProtectedRoute>
                        <OrdersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/orders/:orderId"
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
                        <AccountDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/profile"
                    element={
                      <ProtectedRoute>
                        <AccountPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/addresses"
                    element={
                      <ProtectedRoute>
                        <AddressesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/addresses/add"
                    element={
                      <ProtectedRoute>
                        <AddAddressPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/addresses/:id/edit"
                    element={
                      <ProtectedRoute>
                        <EditAddressPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/payments"
                    element={
                      <ProtectedRoute>
                        <PaymentsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/payments/add"
                    element={
                      <ProtectedRoute>
                        <AddPaymentPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/payments/:id/edit"
                    element={
                      <ProtectedRoute>
                        <EditPaymentPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/wishlist"
                    element={
                      <ProtectedRoute>
                        <WishlistPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </Router>
          </ThemeProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
