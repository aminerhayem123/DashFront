import { useState, useEffect } from 'react';
import TechFilter from '../components/TechFilter';
import DashboardCard from '../components/DashboardCard';

interface Dashboard {
  id: string;
  name: string;
  description: string;
  price_coins: number;
  demo_url: string;
  preview_url: string;
  features: string[];
  rating: number;
  tech: string;
}

export default function Home() {
  const [selectedTech, setSelectedTech] = useState('');
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const response = await fetch(`${apiUrl}/dashboards`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboards');
        }
        const data = await response.json();
        console.log('Fetched dashboards:', data); // Add this log to debug
        setDashboards(data);
      } catch (err) {
        setError('Failed to load dashboards');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, [apiUrl]);

  const filteredDashboards = selectedTech
    ? dashboards.filter(d => d.tech === selectedTech)
    : dashboards;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

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
          {filteredDashboards.map(dashboard => {
            console.log('Dashboard rating:', dashboard.rating); // Add this log to debug
            return (
              <DashboardCard
                key={dashboard.id}
                id={dashboard.id}
                title={dashboard.name}
                description={dashboard.description}
                price={dashboard.price_coins}
                image={dashboard.preview_url}
                tech={dashboard.tech}
                rating={Number(dashboard.rating)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}