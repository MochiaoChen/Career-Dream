
import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  }

  return (
    <div>
      <label
        htmlFor="image-upload"
        className={`flex justify-center items-center w-full h-64 px-4 transition bg-white border-2 border-dashed rounded-2xl appearance-none cursor-pointer hover:border-indigo-400 focus:outline-none ${isDragging ? 'border-indigo-400' : 'border-slate-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg" />
        ) : (
          <span className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="font-medium text-slate-500">
              Drop an image, or{' '}
              <span className="text-indigo-500 underline" onClick={(e) => { e.preventDefault(); triggerFileSelect();}}>browse</span>
            </span>
          </span>
        )}
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleChange}
      />
    </div>
  );
};
