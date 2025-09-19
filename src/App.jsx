import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from './components/layout/Layout'
import ThemeProvider from './components/common/ThemeProvider'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ReviewListPage from './pages/ReviewListPage'
import CategoriesPage from './pages/CategoriesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import { loadUserFromStorage } from './store/slices/authSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Load user from localStorage on app startup
    dispatch(loadUserFromStorage())
  }, [dispatch])

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route
              path="/products/:productId/reviews"
              element={<ReviewListPage />}
            />
            <Route path="/category/:categoryId" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* Add more routes here as pages are created */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
