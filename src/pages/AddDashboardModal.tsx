import React, { useState } from 'react';

interface AddDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDashboardModal: React.FC<AddDashboardModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceCoins, setPriceCoins] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [features, setFeatures] = useState('');
  const [technicalDetails, setTechnicalDetails] = useState('');
  const [tech, setTech] = useState('');
  const [rating, setRating] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  interface DashboardDetails {
    name: string;
    description: string;
    price_coins: number;
    demo_url: string;
    preview_url: string;
    features: string[];
    technical_details: Record<string, any>;
    tech: string;
    rating: number;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let parsedTechnicalDetails;
    try {
      parsedTechnicalDetails = JSON.parse(technicalDetails);
    } catch (error) {
      alert('Technical details must be valid JSON');
      return;
    }

    const dashboardDetails: DashboardDetails = {
      name,
      description,
      price_coins: parseInt(priceCoins, 10),
      demo_url: demoUrl,
      preview_url: previewUrl,
      features: features.split(',').map((feature) => feature.trim()),
      technical_details: parsedTechnicalDetails,
      tech,
      rating: parseFloat(rating),
    };

    try {
      const response = await fetch(`${apiUrl}/add_dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(dashboardDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to add dashboard');
      }

      onClose();
    } catch (error) {
      console.error('Error adding dashboard:', error);
      alert('Something went wrong!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 text-xl">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 p-8">Add Dashboard</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-8 pb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (Coins)</label>
            <input
              type="number"
              value={priceCoins}
              onChange={(e) => setPriceCoins(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Demo URL</label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preview URL</label>
            <input
              type="url"
              value={previewUrl}
              onChange={(e) => setPreviewUrl(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Features (comma separated)</label>
            <input
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Technical Details (JSON format)</label>
            <textarea
              value={technicalDetails}
              onChange={(e) => setTechnicalDetails(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tech</label>
            <input
              type="text"
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="sticky bottom-0 bg-white pt-4 pb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
            >
              Add Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDashboardModal;