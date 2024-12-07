import { useState } from 'react';
import TechFilter from '../components/TechFilter';
import DashboardCard from '../components/DashboardCard';

// Sample data - in a real app, this would come from an API
const dashboards = [
  {
    id: '1',
    title: 'Modern Analytics Dashboard',
    description: 'A beautiful analytics dashboard with real-time charts and responsive design.',
    price: 49,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tech: 'React',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'E-commerce Admin Panel',
    description: 'Complete admin panel for managing your online store with inventory tracking.',
    price: 69,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tech: 'Vue',
    rating: 4.9,
  },
  // Add more sample dashboards...
];

export default function Home() {
  const [selectedTech, setSelectedTech] = useState('');

  const filteredDashboards = selectedTech
    ? dashboards.filter(d => d.tech === selectedTech)
    : dashboards;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Dashboard Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save development time with our pre-built, fully customizable dashboard templates
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <TechFilter
            selectedTech={selectedTech}
            onTechChange={setSelectedTech}
          />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDashboards.map(dashboard => (
            <DashboardCard
              key={dashboard.id}
              {...dashboard}
            />
          ))}
        </div>
      </div>
    </div>
  );
}