import React, { useState, useCallback } from 'react';
import { generateCareerImage, editImage } from './services/geminiService';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { TextInput } from './components/TextInput';
import { ActionButton } from './components/ActionButton';
import { ResultDisplay } from './components/ResultDisplay';
import { Spinner } from './components/Spinner';

interface UploadedImage {
  base64: string;
  mimeType: string;
}

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<UploadedImage | null>(null);
  const [profession, setProfession] = useState<string>('');
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage({
        base64: (reader.result as string).split(',')[1],
        mimeType: file.type,
      });
      setError(null);
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !profession) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const newImageBase64 = await generateCareerImage(originalImage.base64, originalImage.mimeType, profession);
      setGeneratedImage(`data:image/png;base64,${newImageBase64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, profession]);

  const handleEdit = useCallback(async () => {
    const imageToEdit = generatedImage;
    if (!imageToEdit || !editPrompt) return;

    setIsLoading(true);
    setError(null);

    try {
        const imagePart = imageToEdit.split(',')[1];
        const newImageBase64 = await editImage(imagePart, 'image/png', editPrompt);
        setGeneratedImage(`data:image/png;base64,${newImageBase64}`);
        setEditPrompt('');
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred during image editing.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  }, [generatedImage, editPrompt]);
  
  const handleStartOver = () => {
    setOriginalImage(null);
    setProfession('');
    setEditPrompt('');
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-200/80 p-6 md:p-10 transition-all duration-500">
          {!generatedImage && !isLoading && (
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex flex-col space-y-6">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-medium text-gray-900 tracking-tight">Your Future, Imagined</h2>
                    <p className="text-gray-600">Upload a clear photo and your dream job. Let our AI bring your career to life.</p>
                </div>
                <ImageUploader onImageUpload={handleImageUpload} />
                <TextInput
                  id="profession"
                  placeholder="e.g., Astronaut, Chef, Wildlife Photographer"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  label="Enter a Profession"
                />
                <ActionButton
                  onClick={handleGenerate}
                  disabled={!originalImage || !profession || isLoading}
                >
                  Generate My Career Photo
                </ActionButton>
              </div>
              <div className="hidden md:flex items-center justify-center bg-gray-100 rounded-xl h-full p-8 aspect-square">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-96">
              <Spinner />
              <p className="mt-4 text-gray-600 animate-pulse">
                Imagining your new career... this might take a moment.
              </p>
            </div>
          )}
          
          {error && (
             <div className="text-center p-8 bg-red-50 rounded-xl">
              <h3 className="text-xl font-medium text-red-700">Oops! Something went wrong.</h3>
              <p className="mt-2 text-red-600">{error}</p>
              <ActionButton onClick={handleStartOver} className="mt-6 bg-red-500 hover:bg-red-600">
                Try Again
              </ActionButton>
            </div>
          )}

          {generatedImage && !isLoading && !error && (
            <ResultDisplay
              imageSrc={generatedImage}
              editPrompt={editPrompt}
              onEditPromptChange={(e) => setEditPrompt(e.target.value)}
              onEdit={handleEdit}
              onStartOver={handleStartOver}
              isEditing={isLoading}
            />
          )}
        </div>
      </main>
       <footer className="text-center p-4 text-sm text-gray-500">
        Powered by Gemini.
      </footer>
    </div>
  );
};

export default App;