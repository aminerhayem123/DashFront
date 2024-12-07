import React from 'react';

type Pack = {
  name: string;
  coins: number;
  price: number;
  color: string;
};

const packs: Pack[] = [
  { name: 'Bronze Pack', coins: 30, price: 30, color: 'bg-yellow-400' },
  { name: 'Silver Pack', coins: 80, price: 75, color: 'bg-gray-400' },
  { name: 'Gold Pack', coins: 120, price: 110, color: 'bg-yellow-600' },
  { name: 'Diamond Pack', coins: 180, price: 150, color: 'bg-blue-400' },
];

const Packs: React.FC = () => {
  const handlePurchase = (pack: Pack) => {
    alert(`You purchased the ${pack.name} for ${pack.price} TND!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Buy Packs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packs.map((pack) => (
          <div
            key={pack.name}
            className={`p-6 rounded-lg shadow-lg ${pack.color} text-white text-center`}
          >
            <h2 className="text-2xl font-semibold mb-4">{pack.name}</h2>
            <p className="text-lg">💰 {pack.coins} Coins</p>
            <p className="text-lg mt-2">💸 {pack.price} TND</p>
            <button
              onClick={() => handlePurchase(pack)}
              className="mt-4 bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packs;
