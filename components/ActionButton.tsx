
import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={`w-full inline-flex justify-center items-center px-6 py-3.5 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
