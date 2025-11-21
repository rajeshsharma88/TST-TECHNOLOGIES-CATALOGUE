import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Phone, Mail, MapPin, Linkedin, Facebook, Youtube, Instagram } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { EnquiryModal } from './EnquiryModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Collections', path: '/collections' },
    { label: 'All Products', path: '/categories' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-bold text-xl">T</div>
            <span className="text-2xl font-bold tracking-tight">TST <span className="text-blue-400">Technologies</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  isActive(link.path) ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 ${
                   isActive(link.path) ? 'text-blue-400 bg-slate-900' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Company Info */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4">{COMPANY_INFO.name}</h3>
          <p className="mb-6 text-sm leading-relaxed">{COMPANY_INFO.aboutShort}</p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="YouTube"><Youtube size={20} /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
            <li><Link to="/collections" className="hover:text-blue-400 transition-colors">Collections</Link></li>
            <li><Link to="/categories" className="hover:text-blue-400 transition-colors">All Products</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        {/* Industries */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/categories?id=finger-print" className="hover:text-blue-400 transition-colors">Biometrics</Link></li>
            <li><Link to="/categories?id=boom-barrier" className="hover:text-blue-400 transition-colors">Entrance Control</Link></li>
            <li><Link to="/categories?id=baggage-scanner" className="hover:text-blue-400 transition-colors">Security Screening</Link></li>
            <li><Link to="/categories?id=hotel-lock" className="hover:text-blue-400 transition-colors">Hospitality</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-blue-500 mt-0.5" />
              <span>{COMPANY_INFO.address}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-blue-500" />
              <span>{COMPANY_INFO.phone}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-blue-500" />
              <span>{COMPANY_INFO.email}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <EnquiryModal />
    </div>
  );
};