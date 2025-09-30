import React, { useState } from 'react';
import { FiMenu, FiX, FiHeart, FiShoppingBag, FiInfo } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect untuk detect scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrder = () => {
    const email = 'rizalinggar19@gmail.com';
    const subject = 'Order Wedding Service';
    const body =
      'Hello, I would like to order your Wedding service.\n\nPlease send me more information about:\n- Pricing\n- Available packages\n- Requirements\n\nThank you.';

    // Langsung buka Gmail compose
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank');
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-white py-4'
        }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"></div>
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Online
                </span>
                <span className="text-gray-800">Wedding</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-8 font-medium">
              <li>
                <a
                  href="#about"
                  className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition-colors duration-200 group">
                  <FiInfo className="text-lg group-hover:scale-110 transition-transform" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="#catalogue"
                  className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition-colors duration-200 group">
                  <FiShoppingBag className="text-lg group-hover:scale-110 transition-transform" />
                  <span>Catalogue</span>
                </a>
              </li>
              <li>
                <button
                  onClick={handleOrder}
                  href="#order"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold">
                  Order Now
                </button>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                menuOpen
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-pink-500 hover:text-white'
              }`}>
              {menuOpen ? (
                <FiX className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="md:hidden mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-fade-in">
              <ul className="space-y-4">
                <li>
                  <a
                    href="#about"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-pink-50 text-gray-700 hover:text-pink-500 transition-all duration-200 group"
                    onClick={() => setMenuOpen(false)}>
                    <FiInfo className="text-xl group-hover:scale-110 transition-transform" />
                    <span className="font-medium">About Us</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#catalogue"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-pink-50 text-gray-700 hover:text-pink-500 transition-all duration-200 group"
                    onClick={() => setMenuOpen(false)}>
                    <FiShoppingBag className="text-xl group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Catalogue</span>
                  </a>
                </li>
                <li className="pt-2">
                  <a
                    href="#order"
                    className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                    onClick={() => setMenuOpen(false)}>
                    Book Now
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer untuk fixed navbar */}
      <div className="h-20"></div>
    </div>
  );
};

export default Navbar;
