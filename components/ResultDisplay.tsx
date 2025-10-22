import React from 'react';
import { TextInput } from './TextInput';
import { ActionButton } from './ActionButton';
import { Spinner } from './Spinner';

interface ResultDisplayProps {
  imageSrc: string;
  editPrompt: string;
  onEditPromptChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: () => void;
  onStartOver: () => void;
  isEditing: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  imageSrc,
  editPrompt,
  onEditPromptChange,
  onEdit,
  onStartOver,
  isEditing,
}) => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 tracking-tight">Your Career Snapshot!</h2>
        <p className="text-gray-600 mt-2">Fine-tune your new reality. Describe any changes you'd like to see.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="w-full aspect-square bg-black/5 rounded-xl flex items-center justify-center overflow-hidden">
            <img
                src={imageSrc}
                alt="Generated career"
                className="w-full h-full object-contain"
            />
        </div>
        <div className="flex flex-col space-y-4 pt-4">
             <TextInput
                id="edit-prompt"
                label="Describe your edit..."
                placeholder="e.g., Change the background to a cityscape"
                value={editPrompt}
                onChange={onEditPromptChange}
                disabled={isEditing}
              />
              <ActionButton onClick={onEdit} disabled={!editPrompt || isEditing}>
                {isEditing ? <Spinner /> : 'Apply Edit'}
              </ActionButton>
              <button
                onClick={onStartOver}
                className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:text-gray-400"
                disabled={isEditing}
              >
                Start Over
              </button>
        </div>
      </div>
    </div>
  );
};