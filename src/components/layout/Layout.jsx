import Header from './Header'
import Footer from './Footer'
import CartSlideOver from './CartSlideOver'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>
      <Footer />
      <CartSlideOver />
    </div>
  )
}
