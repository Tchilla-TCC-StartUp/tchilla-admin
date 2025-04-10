import React from 'react';
import GlobalInput from './global_input';

type UploadImagemPreviewProps = {
  foto: File | null;
  index: number;
  onChange: (index: number, file: File | null) => void;
};

const UploadImagemPreview: React.FC<UploadImagemPreviewProps> = ({ foto, index, onChange }) => {
  const inputId = `foto-${index}`;

  return (
    <div
      className="relative group border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center aspect-square bg-gray-50 hover:border-primary-500 transition"
    >
      {foto ? (
        <>
          <img
            src={URL.createObjectURL(foto)}
            alt={`Foto ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(index, null)}
            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded hover:bg-opacity-70 transition"
          >
            Remover
          </button>
        </>
      ) : (
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center w-full h-full text-gray-400 cursor-pointer hover:text-primary-600 text-sm p-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l2 10h10l2-10h2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 16v2a2 2 0 002 2H6a2 2 0 002-2v-2" />
          </svg>
          <span>Clique para adicionar</span>
          <GlobalInput
            id={inputId}
            type="file"
            accept="image/*"
            inputClassName="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) onChange(index, file);
            }}
          />
        </label>
      )}
    </div>
  );
};

export default UploadImagemPreview;