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
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className={`relative flex flex-col justify-center items-center w-full aspect-video p-4 transition-all duration-300 bg-gray-50 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-100 hover:border-blue-400 ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
        ) : (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              <span className="font-semibold text-blue-600" onClick={(e) => { e.preventDefault(); triggerFileSelect();}}>Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
          </div>
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