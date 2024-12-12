import { Download, Package, User } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PurchaseHistory {
  id: number;
  name: string;
  price_coins: number;
  preview_url: string;
  demo_url: string;
  purchased_at: string;
  technical_details: {
    frontend: string;
    backend: string;
    database: string;
  };
  features: string[];
}

interface UserProfile {
  name: string;
  email: string;
  coins: number;
  total_purchases: number;
  total_downloads: number;
}

export default function Profile() {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    coins: 0,
    total_purchases: 0,
    total_downloads: 0,
  });
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Fetch Profile Data
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`${apiUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile({
            name: data.name,
            email: data.email,
            coins: data.totalCoins,
            total_purchases: data.totalPurchases,
            total_downloads: data.totalDownloads,
          });
        } else {
          console.error('Error fetching profile data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [apiUrl]);

  // Fetch Purchase History
  useEffect(() => {
    async function fetchPurchaseHistory() {
      try {
        const response = await fetch(`${apiUrl}/profile/purchase-history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPurchaseHistory(data);
        } else {
          console.error('Error fetching purchase history');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoadingHistory(false);
      }
    }

    fetchPurchaseHistory();
  }, [apiUrl]);

  if (loadingProfile || loadingHistory) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <User className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
            <p className="text-gray-600">{userProfile.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Available Coins</p>
              <p className="text-2xl font-bold text-gray-900">{userProfile.coins}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Download className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{userProfile.total_downloads}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-900">{userProfile.total_purchases}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Purchase History</h2>
        {purchaseHistory.length === 0 ? (
          <p className="text-gray-600">You have not purchased any dashboards yet.</p>
        ) : (
          <div className="space-y-6">
            {purchaseHistory.map((purchase) => (
              <div key={purchase.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <img 
                  src={purchase.preview_url} 
                  alt={purchase.name} 
                  className="h-24 w-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{purchase.name}</h3>
                      <p className="text-sm text-gray-600">
                        Purchased on: {new Date(purchase.purchased_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-indigo-600">
                      {purchase.price_coins} coins
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Tech Stack: {purchase.technical_details.frontend}, {purchase.technical_details.backend}, {purchase.technical_details.database}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {purchase.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <a 
                      href={purchase.demo_url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
