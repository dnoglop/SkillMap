import React from 'react';

export const SkillMapLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.location.reload()} title="SkillMap Home">
      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background circle with gradient effect */}
          <circle cx="20" cy="20" r="20" fill="url(#gradient)" className="drop-shadow-lg"/>
          
          {/* Modern path/route symbol */}
          <path 
            d="M12 28C12 24.6863 14.6863 22 18 22C21.3137 22 24 19.3137 24 16C24 12.6863 26.6863 10 30 10" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round"
            fill="none"
            className="group-hover:stroke-blue-100 transition-colors duration-200"
          />
          
          {/* Connection nodes */}
          <circle cx="12" cy="28" r="3" fill="white" className="group-hover:fill-blue-100 transition-colors duration-200"/>
          <circle cx="24" cy="16" r="2.5" fill="white" opacity="0.9" className="group-hover:fill-blue-100 transition-colors duration-200"/>
          <circle cx="30" cy="10" r="2" fill="white" opacity="0.8" className="group-hover:fill-blue-100 transition-colors duration-200"/>
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6"/>
              <stop offset="100%" stopColor="#1E40AF"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors duration-200">
          SkillMap AI
        </span>
        <div className="h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </div>
  );
};