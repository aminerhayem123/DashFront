import { User, Package, Clock, Download } from 'lucide-react';

export default function Profile() {
  const purchases = [
    {
      id: '1',
      title: 'Modern Analytics Dashboard',
      date: '2024-03-15',
      price: 49,
      downloads: 3,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    },
    // Add more purchases as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <User className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Download className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-2xl font-bold text-gray-900">Mar 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase History */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Purchase History</h2>
        </div>
        <div className="divide-y">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="p-6 flex items-center">
              <img
                src={purchase.image}
                alt={purchase.title}
                className="w-24 h-16 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-medium text-gray-900">{purchase.title}</h3>
                <p className="text-sm text-gray-500">Purchased on {purchase.date}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-900">${purchase.price}</p>
                <button className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}