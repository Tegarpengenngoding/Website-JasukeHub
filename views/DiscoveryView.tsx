
import React from 'react';
import { Service } from '../types';
import ServiceCard from '../components/ServiceCard';
import { CATEGORIES } from '../constants';

interface DiscoveryViewProps {
  services: Service[];
  onSelectService: (service: Service) => void;
  selectedCategory: string;
  setCategory: (category: string) => void;
}

const DiscoveryView: React.FC<DiscoveryViewProps> = ({ services, onSelectService, selectedCategory, setCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 p-8 md:p-16 mb-12 border border-indigo-500/20">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.3)_0%,_transparent_70%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Build the <span className="text-indigo-400">Future</span> of Immersive Tech.
          </h1>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Find the world's best AR/VR developers, gamification experts, and interactive experience designers for your next breakthrough project.
          </p>
          <div className="flex gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/20">
              Post a Project
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-all border border-slate-700">
              Browse Categories
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white border-transparent' 
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onClick={onSelectService} 
          />
        ))}
      </div>
      
      {services.length === 0 && (
        <div className="text-center py-20">
          <div className="text-slate-600 text-5xl mb-4">
            <i className="fas fa-search"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-300">No services found</h3>
          <p className="text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default DiscoveryView;
