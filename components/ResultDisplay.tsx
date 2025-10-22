
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
      <div>
        <h2 className="text-3xl font-medium text-slate-800 text-center">Your Career Snapshot!</h2>
        <p className="text-slate-600 text-center mt-2">Now you can edit the image with simple text prompts.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col space-y-6">
            <img
                src={imageSrc}
                alt="Generated career"
                className="w-full h-auto object-contain rounded-2xl shadow-lg"
            />
        </div>
        <div className="flex flex-col space-y-4">
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
                className="w-full text-center text-sm text-slate-500 hover:text-indigo-600 hover:underline py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isEditing}
              >
                Start Over
              </button>
        </div>
      </div>
    </div>
  );
};
