import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogIn } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
  const { state } = useCart();

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
            <Link to="/login" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}