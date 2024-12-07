import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogIn } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { state } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // State to toggle the profile dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Refs for detecting clicks outside the dropdown and the profile button
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Reference to the profile button

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState); // Toggle dropdown visibility on click
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseLeave = () => {
    // Close dropdown when the mouse leaves the profile button or dropdown
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">DashStore</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </Link>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4 relative">
                <button
                  ref={buttonRef}
                  onClick={toggleDropdown}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <User className="h-5 w-5" />
                </button>

                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1"
                    onMouseLeave={handleMouseLeave} // Close dropdown when mouse leaves the dropdown
                    style={{ top: '100%', right: 0 }} // Ensure it positions just below the profile button
                  >
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-600">Profile</Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-600 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
