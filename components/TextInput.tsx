
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ id, label, ...props }) => {
  return (
    <div className="relative">
      <input
        id={id}
        className="block px-3.5 pb-2.5 pt-4 w-full text-base text-slate-900 bg-transparent rounded-lg border border-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 peer"
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute text-base text-slate-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};
