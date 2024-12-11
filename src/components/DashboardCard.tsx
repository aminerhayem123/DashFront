import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
interface DashboardCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  tech: string;
  rating: number;
}
export default function DashboardCard({
  id,
  title,
  description,
  price,
  image,
  tech,
  rating,
}: DashboardCardProps) {
  const { dispatch, state } = useCart();
  const isInCart = state.items.some(item => item.id === id);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id,
        title,
        price,
        image,
        tech,
      },
    });
  };
  // Ensure rating is a valid number before calling toFixed
  const displayRating = typeof rating === 'number' ? rating.toFixed(1) : '0.0';
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-md text-sm">
          {tech}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{displayRating}</span>
          </div>
          <span className="text-lg font-bold text-indigo-600">{price} TND</span>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Link
            to={`/dashboard/${id}`}
            className="flex-1 text-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50"
          >
            Preview
          </Link>
          <button 
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`flex items-center justify-center px-4 py-2 rounded-md ${
              isInCart 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}