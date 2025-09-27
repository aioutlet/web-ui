import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Future routes will be added here */}
              <Route path="/clothing" element={<div>Clothing Page - Coming Soon</div>} />
              <Route path="/accessories" element={<div>Accessories Page - Coming Soon</div>} />
              <Route path="/footwear" element={<div>Footwear Page - Coming Soon</div>} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </Provider>
  )
}

export default App
