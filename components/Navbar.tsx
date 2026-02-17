
import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, onSearch }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.CLIENT)}>
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-cube text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Jasuke HUB
          </span>
        </div>

        <div className="flex-1 max-w-xl w-full">
          <div className="relative group">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"></i>
            <input 
              type="text" 
              placeholder="Search for AR/VR, Game Dev, interactive gadgets..."
              className="w-full bg-slate-800 border border-slate-700 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(currentView === AppView.CLIENT ? AppView.SELLER : AppView.CLIENT)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              currentView === AppView.SELLER 
                ? 'bg-slate-100 text-slate-900 hover:bg-white' 
                : 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/20'
            }`}
          >
            Switch to {currentView === AppView.CLIENT ? 'Seller' : 'Client'} Mode
          </button>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <i className="fas fa-bell text-slate-400 hover:text-white cursor-pointer p-2"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentView}`} 
              className="w-9 h-9 rounded-full ring-2 ring-indigo-500/20 p-0.5 bg-slate-800"
              alt="Avatar"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
