
import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-300 shadow-sm h-full flex flex-col">
      <div className="h-40 w-full relative bg-gray-200 shrink-0">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-bold text-gray-900 border border-gray-300 rounded">
          {event.type}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-blue-600 font-bold text-sm">{event.date}</span>
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-gray-500 text-xs">{event.location}</span>
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-3 flex-1">{event.title}</h3>
        
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors mt-auto">
            Регистрация
        </button>
      </div>
    </div>
  );
};
