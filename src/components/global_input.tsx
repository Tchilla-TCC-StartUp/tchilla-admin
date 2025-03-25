import React, { InputHTMLAttributes } from "react";

type AppGlobalInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
};

const AppGlobalInput: React.FC<AppGlobalInputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-900 mb-1">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
            {icon}
          </span>
        )}
        <input
          className={`w-full p-4 border border-gray-400 rounded-md text-sm transition-colors focus:border-primary-800 focus:outline-none ${
            icon ? "pl-12" : ""
          } ${error ? "border-red-500" : ""} ${
            props.disabled
              ? "bg-gray-200 text-gray-600 cursor-not-allowed opacity-70"
              : ""
          } ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default AppGlobalInput;
