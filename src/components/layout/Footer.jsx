import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: 'Products',
      links: [
        { name: 'Bags', href: '/products/bags' },
        { name: 'Tees', href: '/products/tees' },
        { name: 'Objects', href: '/products/objects' },
        { name: 'Home Goods', href: '/products/home-goods' },
        { name: 'Accessories', href: '/products/accessories' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'Who we are', href: '/company/about' },
        { name: 'Sustainability', href: '/company/sustainability' },
        { name: 'Press', href: '/company/press' },
        { name: 'Careers', href: '/company/careers' },
        { name: 'Terms & Conditions', href: '/company/terms' },
        { name: 'Privacy', href: '/company/privacy' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact', href: '/customer-service/contact' },
        { name: 'Shipping', href: '/customer-service/shipping' },
        { name: 'Returns', href: '/customer-service/returns' },
        { name: 'Warranty', href: '/customer-service/warranty' },
        { name: 'Secure Payments', href: '/customer-service/payments' },
        { name: 'FAQ', href: '/customer-service/faq' },
        { name: 'Find a store', href: '/customer-service/stores' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-4 transition-colors duration-200">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 relative group inline-block"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors duration-200">
            © 2025 AIOutlet, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
