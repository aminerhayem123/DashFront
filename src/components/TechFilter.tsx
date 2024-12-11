import { 
  LayoutGrid, // React
  Box, // Vue
  Layers, // Angular
  Code2, // TypeScript
  Code, // HTML/CSS
  Palette, // Tailwind
} from 'lucide-react';

const technologies = [
  { name: 'All', icon: null, color: 'text-gray-500' }, // All option
  { name: 'React', icon: LayoutGrid, color: 'text-blue-500' },
  { name: 'Vue', icon: Box, color: 'text-green-500' },
  { name: 'Angular', icon: Layers, color: 'text-red-500' },
  { name: 'TypeScript', icon: Code2, color: 'text-blue-600' },
  { name: 'HTML/CSS', icon: Code, color: 'text-orange-500' },
  { name: 'Tailwind', icon: Palette, color: 'text-cyan-500' },
];

interface TechFilterProps {
  selectedTech: string;
  onTechChange: (tech: string) => void;
}

export default function TechFilter({ selectedTech, onTechChange }: TechFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      {technologies.map((tech) => {
        const Icon = tech.icon;
        return (
          <button
            key={tech.name}
            onClick={() => onTechChange(tech.name)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all
              ${selectedTech === tech.name 
                ? 'bg-gray-100 shadow-inner' 
                : 'hover:bg-gray-50'}`}
          >
            {Icon && <Icon className={`h-5 w-5 ${tech.color}`} />}
            <span className={selectedTech === tech.name ? 'font-semibold' : ''}>
              {tech.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
