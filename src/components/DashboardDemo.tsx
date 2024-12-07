import React, { useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

interface DashboardDemoProps {
  demoUrl: string;
}

export default function DashboardDemo({ demoUrl }: DashboardDemoProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-2 rounded-md ${
              device === 'desktop' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'
            }`}
          >
            <Monitor className="h-5 w-5" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-2 rounded-md ${
              device === 'mobile' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'
            }`}
          >
            <Monitor className="h-5 w-5 rotate-90" />
          </button>
        </div>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
      </div>

      <div className={`relative rounded-lg overflow-hidden border ${
        device === 'mobile' ? 'w-[375px] h-[667px] mx-auto' : 'w-full h-[600px]'
      }`}>
        <iframe
          src={demoUrl}
          className="w-full h-full"
          data-theme={theme}
          title="Dashboard Demo"
        />
      </div>
    </div>
  );
}