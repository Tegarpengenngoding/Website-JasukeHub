
import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onClick: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <div 
      className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(service)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-2 py-1 bg-slate-900/80 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider text-indigo-400 border border-indigo-500/20">
          {service.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <img src={service.sellerAvatar} alt={service.sellerName} className="w-6 h-6 rounded-full" />
          <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">{service.sellerName}</span>
        </div>
        
        <h3 className="font-semibold text-sm line-clamp-2 h-10 mb-2 group-hover:text-indigo-400 transition-colors">
          {service.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-4">
          <i className="fas fa-star text-yellow-500 text-[10px]"></i>
          <span className="text-xs font-bold">{service.rating}</span>
          <span className="text-slate-500 text-[10px]">({service.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Starting At</span>
          <span className="text-lg font-bold text-white">${service.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
