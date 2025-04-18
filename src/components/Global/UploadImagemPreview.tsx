import React, { useMemo } from "react";
import GlobalInput from "./GlobalInput";

type UploadImagemPreviewProps = {
  foto: File | null;
  index: number;
  onChange: (index: number, file: File | null) => void;
  placeholderIcon?: React.ReactNode;
  placeholderImage?: string;
  initialImage?: string;
  size?: number | string;
  showRemoveButton?: boolean;
  className?: string;
};

const UploadImagemPreview: React.FC<UploadImagemPreviewProps> = ({
  foto,
  index,
  onChange,
  placeholderIcon,
  placeholderImage,
  initialImage,
  size,
  showRemoveButton = true,
  className = "",
}) => {
  const inputId = `foto-${index}`;

  const imageSrc = useMemo(() => {
    if (foto) return URL.createObjectURL(foto);
    return initialImage || null;
  }, [foto, initialImage]);

  const sizeStyle = size
    ? typeof size === "number"
      ? {
          width: `${size}px`,
          height: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
        }
      : { width: size, height: size, minWidth: size, minHeight: size }
    : {};

  const DefaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mb-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h18v18H3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 9l3 3 3-3 3 3-6 6-6-6"
      />
      <circle cx="9" cy="7" r="1" />
    </svg>
  );

  const RemoveButton = () => (
    <button
      type="button"
      onClick={() => onChange(index, null)}
      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-0.5 rounded hover:bg-opacity-70 transition"
      aria-label={`Remover imagem ${index + 1}`}
    >
      Remover
    </button>
  );

  return (
    <div
      className={`relative group border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50 hover:border-primary-500 transition ${
        size ? "" : "aspect-square"
      } ${className}`}
      style={{ ...sizeStyle, boxSizing: "border-box" }}
    >
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={`Imagem ${index + 1}`}
            className="w-full h-full object-cover"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
          {showRemoveButton && <RemoveButton />}
        </>
      ) : (
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center w-full h-full text-gray-400 cursor-pointer hover:text-primary-600 text-sm p-4"
        >
          {placeholderImage ? (
            <img
              src={placeholderImage}
              alt="Placeholder"
              className="w-full h-full object-cover"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <>
              {placeholderIcon || DefaultIcon}
              <span>Clique para adicionar</span>
            </>
          )}
          <GlobalInput
            id={inputId}
            type="file"
            accept="image/png,image/jpeg"
            inputClassName="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file) onChange(index, file);
            }}
          />
        </label>
      )}
    </div>
  );
};

export default UploadImagemPreview;
