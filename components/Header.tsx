import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-10 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 011-1h.5a1.5 1.5 0 000-3H6a1 1 0 01-1-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
             </div>
            <span className="text-xl font-semibold text-gray-800">CareerDream</span>
          </div>
        </div>
      </div>
    </header>
  );
};