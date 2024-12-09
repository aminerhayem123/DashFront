import { Download, Package, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Profile() {
  const apiUrl = import.meta.env.VITE_API_URL;  // Ensure this is set correctly in your .env
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    totalCoins: 0,
    totalDownloads: 0,
    totalPurchases: 0,
  });

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
          console.log(data); // Check what data is being returned from the backend
          setUserProfile(data);
        } else {
          console.error('Error fetching profile data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    fetchProfile();
  }, []);
  

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Total Coins</p>
              <p className="text-2xl font-bold text-gray-900">{userProfile.totalCoins}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Download className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{userProfile.totalDownloads}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-900">{userProfile.totalPurchases}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
