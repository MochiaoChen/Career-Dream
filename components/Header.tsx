
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg"></div>
            <span className="text-xl font-semibold text-slate-800">AI Career Dream</span>
          </div>
        </div>
      </div>
    </header>
  );
};
