import { useEffect, useState } from 'react';
import { Plus, LogOut, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AddDashboardModal from './AddDashboardModal';

const DashManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  interface PurchaseRequest {
    id: string;
    user_name: string;
    user_email: string;
    pack_name: string;
    status: string;
  }

  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([]);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPurchaseRequests = async () => {
      try {
        const response = await fetch(`${apiUrl}/purchase-requests`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch purchase requests');
        }
        const data = await response.json();
        setPurchaseRequests(data);
      } catch (error) {
        console.error('Error fetching purchase requests:', error);
      }
    };

    fetchPurchaseRequests();
  }, [apiUrl]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateRequest = async (requestId: string, status: string) => {
    try {
      const response = await fetch(`${apiUrl}/purchase-requests/${requestId}/${status}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update purchase request');
      }

      setPurchaseRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.error('Error updating purchase request:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom Navigation Bar */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <LayoutDashboard className="h-6 w-6 text-indigo-600 mr-2" />
                <span className="text-2xl font-bold text-indigo-600">DashManager</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow-sm rounded-lg divide-y">
            {/* Dashboard list will go here */}
            <div className="p-6 text-center text-gray-500">
              No dashboards added yet. Click "Add Dashboard" to create your first dashboard.
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-lg divide-y mt-8">
            <div className="p-6 text-center text-gray-500">
              <h2 className="text-xl font-bold mb-4">Purchase Requests</h2>
              {purchaseRequests.length === 0 ? (
                <p>No purchase requests found.</p>
              ) : (
                <ul>
                  {purchaseRequests.map((request) => (
                    <li key={request.id} className="flex justify-between items-center p-4 border-b">
                      <div>
                        <p className="font-medium">{request.user_name}</p>
                        <p className="text-sm text-gray-600">{request.user_email}</p>
                        <p className="text-sm text-gray-600">Pack: {request.pack_name}</p>
                        <p className="text-sm text-gray-600">Status: {request.status}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateRequest(request.id, 'approve')}
                          className="px-4 py-2 bg-green-600 text-white rounded-md"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdateRequest(request.id, 'reject')}
                          className="px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                          Refuse
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddDashboardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default DashManager;