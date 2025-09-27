import { Link } from 'react-router-dom'
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'Clothing', path: '/clothing' },
        { name: 'Accessories', path: '/accessories' },
        { name: 'Footwear', path: '/footwear' },
        { name: 'Brands', path: '/brands' },
        { name: 'Sale', path: '/sale' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Size Guide', path: '/size-guide' },
        { name: 'Shipping & Returns', path: '/shipping-returns' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Order Tracking', path: '/track-order' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
        { name: 'Sustainability', path: '/sustainability' },
        { name: 'Affiliate Program', path: '/affiliate' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'Accessibility', path: '/accessibility' },
      ],
    },
  ]

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: 'facebook' },
    { name: 'Twitter', url: '#', icon: 'twitter' },
    { name: 'Instagram', url: '#', icon: 'instagram' },
    { name: 'YouTube', url: '#', icon: 'youtube' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for exclusive deals and new arrivals
            </p>
            <form className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="text-2xl font-bold text-primary-400">
                AIOutlet
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Your premier destination for fashion and lifestyle products. 
              Quality, style, and affordability in every purchase.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-400">
                <MapPinIcon className="h-4 w-4 mr-2" />
                <span>123 Fashion Ave, Style City, SC 12345</span>
              </div>
              <div className="flex items-center text-gray-400">
                <PhoneIcon className="h-4 w-4 mr-2" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                <span>support@aioutlet.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 sm:mb-0">
              © {currentYear} AIOutlet. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <div className="w-5 h-5 bg-gray-400 hover:bg-white rounded transition-colors duration-200"></div>
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <span className="text-gray-400 text-sm mr-2">We Accept:</span>
              <div className="flex space-x-1">
                {['Visa', 'MasterCard', 'PayPal', 'Apple Pay'].map((method) => (
                  <div
                    key={method}
                    className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center text-gray-300"
                  >
                    {method.slice(0, 2)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer