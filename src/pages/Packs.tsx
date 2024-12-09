import React, { useEffect, useState } from 'react';
import { Coins, Shield } from 'lucide-react';

type Pack = {
  id: number; // Add id if needed for key purposes
  name: string;
  coins: number;
  price: number;
  color: string;
  popular?: boolean;
  features: string[];
  icon: React.ReactNode;
};

const Packs: React.FC = () => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await fetch(`${apiUrl}/packs`); // Adjust the URL as per your backend setup
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Map the backend data to match the structure of Pack type
        const formattedPacks = data.map((pack: any, index: number) => ({
          id: pack.id,
          name: pack.name,
          coins: pack.nb_coins,
          price: pack.price,
          color:
            index === 0
              ? 'bg-gradient-to-br from-yellow-700 to-yellow-500'
              : 'bg-gradient-to-br from-gray-600 to-gray-400', // Add more conditions for other colors
          features: pack.features,
          icon: index === 0 ? <Coins className="w-8 h-8" /> : <Shield className="w-8 h-8" />,
        }));

        setPacks(formattedPacks);
      } catch (error) {
        console.error('Error fetching packs:', error);
      }
    };

    fetchPacks();
  }, []);

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

        <div className="flex justify-center gap-8 mt-16">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105`}
            >
              <div className={`${pack.color} p-8 text-white h-full flex flex-col`}>
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
                <p className="text-xl mb-6 opacity-90">{pack.coins} Coins</p>

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
      </div>
    </div>
  );
};

export default Packs;
