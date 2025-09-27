import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Placeholder routes for navigation items */}
              <Route
                path="/women"
                element={
                  <div className="p-8 text-center">
                    Women's Collection - Coming Soon
                  </div>
                }
              />
              <Route
                path="/men"
                element={
                  <div className="p-8 text-center">
                    Men's Collection - Coming Soon
                  </div>
                }
              />
              <Route
                path="/company"
                element={
                  <div className="p-8 text-center">
                    Company Info - Coming Soon
                  </div>
                }
              />
              <Route
                path="/stores"
                element={
                  <div className="p-8 text-center">
                    Store Locations - Coming Soon
                  </div>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
