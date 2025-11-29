
import React from 'react';
import { Startup } from '../types';

interface StartupCardProps {
  startup: Startup;
  onClick: () => void;
}

export const StartupCard: React.FC<StartupCardProps> = ({ startup, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm active:bg-gray-50 h-full flex flex-col justify-between cursor-pointer hover:border-blue-300 transition-colors"
    >
      <div className="flex items-start space-x-3">
        <img 
            src={startup.logoUrl} 
            alt={startup.name} 
            className="w-12 h-12 rounded border border-gray-200 object-cover bg-gray-100 shrink-0"
        />
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 text-base truncate pr-2">{startup.name}</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200 whitespace-nowrap shrink-0">
                  {startup.category}
                </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2 leading-snug">
                {startup.description}
            </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
           <span>г. {startup.location}</span>
           <span className="font-semibold text-green-600">Стадия: {startup.stage}</span>
      </div>
    </div>
  );
};
