import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Feature {
  id: string;
  text: string;
}

interface TechnicalDetail {
  id: string;
  text: string;
}

interface AddDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const technologies = [
  'React',
  'Vue',
  'Angular',
  'React + TypeScript',
  'Bootstrap 5',
  'HTML/CSS',
  'Tailwind CSS',
];

export default function AddDashboardModal({ isOpen, onClose }: AddDashboardModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tech, setTech] = useState(technologies[0]);
  const [mainImage, setMainImage] = useState('');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [features, setFeatures] = useState<Feature[]>([{ id: '1', text: '' }]);
  const [technicalDetails, setTechnicalDetails] = useState<TechnicalDetail[]>([
    { id: '1', text: '' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle dashboard creation logic here
    console.log({
      title,
      description,
      price,
      tech,
      mainImage,
      screenshots,
      features,
      technicalDetails,
    });
    onClose();
  };

  const addFeature = () => {
    setFeatures([...features, { id: Date.now().toString(), text: '' }]);
  };

  const removeFeature = (id: string) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  const updateFeature = (id: string, text: string) => {
    setFeatures(
      features.map(feature =>
        feature.id === id ? { ...feature, text } : feature
      )
    );
  };

  const addTechnicalDetail = () => {
    setTechnicalDetails([
      ...technicalDetails,
      { id: Date.now().toString(), text: '' },
    ]);
  };

  const removeTechnicalDetail = (id: string) => {
    setTechnicalDetails(technicalDetails.filter(detail => detail.id !== id));
  };

  const updateTechnicalDetail = (id: string, text: string) => {
    setTechnicalDetails(
      technicalDetails.map(detail =>
        detail.id === id ? { ...detail, text } : detail
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Dashboard</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technology
            </label>
            <select
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {technologies.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image URL
            </label>
            <input
              type="url"
              value={mainImage}
              onChange={(e) => setMainImage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Screenshot URLs (one per line)
            </label>
            <textarea
              value={screenshots.join('\n')}
              onChange={(e) => setScreenshots(e.target.value.split('\n'))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Features
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {features.map((feature) => (
                <div key={feature.id} className="flex space-x-2">
                  <input
                    type="text"
                    value={feature.text}
                    onChange={(e) => updateFeature(feature.id, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter feature"
                    required
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(feature.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Technical Details
              </label>
              <button
                type="button"
                onClick={addTechnicalDetail}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Add Detail
              </button>
            </div>
            <div className="space-y-2">
              {technicalDetails.map((detail) => (
                <div key={detail.id} className="flex space-x-2">
                  <input
                    type="text"
                    value={detail.text}
                    onChange={(e) => updateTechnicalDetail(detail.id, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter technical detail"
                    required
                  />
                  {technicalDetails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTechnicalDetail(detail.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}