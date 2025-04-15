import React, { InputHTMLAttributes, forwardRef } from "react";

type GlobalInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
};

const GlobalInput = forwardRef<HTMLInputElement, GlobalInputProps>(
  (
    {
      label,
      error,
      icon,
      tabIndex,
      className = "",
      containerClassName = "",
      inputClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-1 w-full ${containerClassName}`}>
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
            tabIndex={tabIndex}
            ref={ref}
            className={`w-full p-4 border border-gray-400 rounded-md text-sm transition-colors focus:border-primary-800 focus:outline-none ${
              icon ? "pl-12" : ""
            } ${error ? "border-red-500" : ""} ${
              props.disabled
                ? "bg-gray-200 text-gray-600 cursor-not-allowed opacity-70"
                : ""
            } ${inputClassName} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

export default GlobalInput;
