import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/alert-dialog";

interface CartItem {
  id: string;
  title: string;
  tech: string;
  price: number;
  image: string;
}

export default function Cart() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const total = state.items.reduce((sum: number, item: CartItem) => sum + item.price, 0);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleRemoveFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handlePurchaseConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to make a purchase.');
        setLoading(false);
        return;
      }

      const dashboardIds = state.items.map(item => item.id);
      const response = await axios.post(
        `${apiUrl}/purchasedash`,
        { 
          total,
          dashboardIds 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || 'Purchase successful!');
      dispatch({ type: 'CLEAR_CART' });
      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Failed to complete the purchase. Please try again.'
      );
    } finally {
      setLoading(false);
      setShowConfirmDialog(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to purchase these items for {total} TND?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handlePurchaseConfirm} disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Purchase'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center mb-8">
        <ShoppingCart className="h-6 w-6 text-indigo-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* If the cart is empty */}
      {state.items.length === 0 ? (
        <div className="text-center text-gray-600">
          Your cart is empty.{' '}
          <button
            onClick={() => navigate('/')}
            className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Go to Home
          </button>
        </div>
      ) : (
        // Display cart items
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items list */}
          <div className="lg:col-span-2">
            {state.items.map((item: CartItem) => (
              <div key={item.id} className="bg-white p-6 shadow-sm rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.tech}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-900">{item.price} TND</span>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-sm rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{total} TND</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-indigo-600">{total} TND</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowConfirmDialog(true)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Purchase Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
