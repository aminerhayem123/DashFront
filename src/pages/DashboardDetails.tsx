import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Code, Layout, Palette, Monitor } from 'lucide-react';
import DashboardDemo from '../components/DashboardDemo';
import { useCart } from '../contexts/CartContext';

interface Dashboard {
  id: string;
  name: string;
  description: string;
  price_coins: number;
  demo_url: string;
  preview_url: string;
  features: string[];
  rating: number;
  tech: string;
  technical_details: {
    backend: string;
    frontend: string;
    database: string;
  };
}

export default function DashboardDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'preview' | 'demo'>('preview');
  const { dispatch, state } = useCart();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(`${apiUrl}/dashboards/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard');
        }
        const data = await response.json();
        setDashboard(data);
      } catch (err) {
        setError('Failed to load dashboard details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDashboard();
    }
  }, [id, apiUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Dashboard not found'}</div>
      </div>
    );
  }

  const isInCart = state.items.some(item => item.id === dashboard.id);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: dashboard.id,
        title: dashboard.name,
        price: dashboard.price_coins,
        image: dashboard.preview_url,
        tech: dashboard.tech,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images/Demo */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  activeTab === 'preview'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('demo')}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  activeTab === 'demo'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600'
                }`}
              >
                Live Demo
              </button>
            </div>
            {activeTab === 'preview' ? (
              <div className="p-4">
                <img
                  src={dashboard.preview_url}
                  alt={dashboard.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            ) : (
              <DashboardDemo demoUrl={dashboard.demo_url} />
            )}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{dashboard.name}</h1>
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                {dashboard.tech}
              </span>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">{dashboard.rating || 0}</span>
              </div>
              <span className="text-2xl font-bold text-indigo-600">{dashboard.price_coins} TND</span>
            </div>
            <p className="text-gray-600 mb-6">{dashboard.description}</p>
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`w-full py-3 px-4 rounded-md flex items-center justify-center ${
                isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isInCart ? 'Already in Cart' : 'Add to Cart'}
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 gap-4">
              {dashboard.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Layout className="h-5 w-5 text-indigo-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Technical Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-indigo-600" />
                <span>Backend: {dashboard.technical_details.backend}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-indigo-600" />
                <span>Frontend: {dashboard.technical_details.frontend}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-indigo-600" />
                <span>Database: {dashboard.technical_details.database}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
