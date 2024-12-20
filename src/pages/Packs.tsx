import React, { useEffect, useState } from 'react';
import { Coins, Shield } from 'lucide-react';

type Pack = {
  id: number;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch packs data
  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await fetch(`${apiUrl}/packs`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const formattedPacks = data.map((pack: any, index: number) => ({
          id: pack.id,
          name: pack.name,
          coins: pack.nb_coins,
          price: pack.price,
          color:
            index === 0
              ? 'bg-gradient-to-br from-yellow-700 to-yellow-500'
              : 'bg-gradient-to-br from-gray-600 to-gray-400',
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

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserProfile({
          name: data.name,
          email: data.email,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handlePurchase = (pack: Pack) => {
    setSelectedPack(pack);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!selectedPack) return;
  
    const purchaseDetails = {
      packId: selectedPack.id,
      name: userProfile.name,
      email: userProfile.email,
    };
  
    // Send purchase request to backend
    try {
      const response = await fetch(`${apiUrl}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(purchaseDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to complete purchase');
      }
  
      // Set confirmation message
      setConfirmationMessage(
        'We received your order, and we will check if you completed the money transfer within 3 days. Please ensure that you include your email in the bank transaction so we can confirm the payment. Thank you for trusting our service!'
      );
  
      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('Something went wrong!');
    }
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

      {/* Modal */}
      {isModalOpen && selectedPack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedPack.name} Purchase</h2>
            <p className="text-lg mb-4">Price: {selectedPack.price} TND</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
              >
                Complete Purchase
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Message */}
      {confirmationMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
            <p className="text-lg mb-6">{confirmationMessage}</p>
            <button
              onClick={() => setConfirmationMessage('')}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packs;
