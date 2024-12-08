import React from 'react';
import { Coins, CreditCard, Shield, Zap } from 'lucide-react';

type Pack = {
  name: string;
  coins: number;
  price: number;
  color: string;
  popular?: boolean;
  features: string[];
  icon: React.ReactNode;
};

const packs: Pack[] = [
  {
    name: 'Bronze Pack',
    coins: 30,
    price: 30,
    color: 'bg-gradient-to-br from-yellow-700 to-yellow-500', // Brown gradient
    features: ['Access to 1 template', 'No support', 'No customization'],
    icon: <Coins className="w-8 h-8" />,
  },
  {
    name: 'Silver Pack',
    coins: 120,
    price: 100,
    color: 'bg-gradient-to-br from-gray-600 to-gray-400',
    features: ['Access to 3 templates', 'No support', 'No customization'],
    icon: <Shield className="w-8 h-8" />,
  },
  {
    name: 'Gold Pack',
    coins: 120,
    price: 180,
    color: 'bg-gradient-to-br from-yellow-600 to-yellow-400',
    popular: true,
    features: [
      'Access to 4 templates',
      '30-day support',
      'No customization',
    ],
    icon: <Zap className="w-8 h-8" />,
  },
  {
    name: 'Diamond Pack',
    coins: 220,
    price: 300,
    color: 'bg-gradient-to-br from-blue-600 to-blue-400',
    features: [
      'Access to 3 templates',
      'Lifetime support',
      'Full customization access',
    ],
    icon: <CreditCard className="w-8 h-8" />,
  },
];

const Packs: React.FC = () => {
  const handlePurchase = (pack: Pack) => {
    alert(`You purchased the ${pack.name} for ${pack.price} TND!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose Your Pack
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Select the perfect pack for your needs and start building amazing dashboards today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {packs.map((pack) => (
            <div
              key={pack.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                pack.popular ? 'ring-4 ring-indigo-500 ring-opacity-50' : ''
              }`}
            >
              {pack.popular && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Popular
                </div>
              )}
              <div
                className={`${pack.color} p-8 text-white h-full flex flex-col`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    {pack.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium opacity-80">Price</p>
                    <p className="text-3xl font-bold">{pack.price} TND</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-2">{pack.name}</h2>
                <p className="text-xl mb-6 opacity-90">
                  {pack.coins} Coins
                </p>

                <div className="flex-grow">
                  <ul className="space-y-3 mb-8">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handlePurchase(pack)}
                  className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                >
                  Purchase Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            All packs come with a 30-day money-back guarantee. Need help choosing?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Packs;
