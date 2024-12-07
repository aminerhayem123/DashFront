import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Code, Layout, Palette, Monitor } from 'lucide-react';
import DashboardDemo from '../components/DashboardDemo';
import { useCart } from '../contexts/CartContext';

// Sample data - in a real app, this would come from an API
const dashboard = {
  id: '1',
  title: 'Modern Analytics Dashboard',
  description: 'A beautiful analytics dashboard with real-time charts and responsive design.',
  price: 49,
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  tech: 'React',
  rating: 4.8,
  demoUrl: 'https://example.com/demo',
  features: [
    'Responsive Design',
    'Real-time Charts',
    'Dark/Light Mode',
    'Multiple Layouts',
    'Authentication Ready',
    'API Integration',
  ],
  screenshots: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  ],
};

export default function DashboardDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'preview' | 'demo'>('preview');
  const { dispatch, state } = useCart();

  const isInCart = state.items.some(item => item.id === dashboard.id);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: dashboard.id,
        title: dashboard.title,
        price: dashboard.price,
        image: dashboard.image,
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
                  src={dashboard.image}
                  alt={dashboard.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {dashboard.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <DashboardDemo demoUrl={dashboard.demoUrl} />
            )}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{dashboard.title}</h1>
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                {dashboard.tech}
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">{dashboard.rating}</span>
              </div>
              <span className="text-2xl font-bold text-indigo-600">${dashboard.price}</span>
            </div>

            <p className="text-gray-600 mb-6">{dashboard.description}</p>

            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`w-full py-3 px-4 rounded-md flex items-center justify-center ${
                isInCart
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
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
                <span>Clean Code</span>
              </div>
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-indigo-600" />
                <span>Customizable</span>
              </div>
              <div className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-indigo-600" />
                <span>Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}