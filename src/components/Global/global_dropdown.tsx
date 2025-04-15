import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Option = {
  label: string;
  value: string | number;
};

type GlobalDropdownProps = {
  label?: string;
  error?: string;
  options: Option[];
  onChange: (value: string | number) => void;
  selectedValue?: string | number;
  placeholder?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  dropdownClassName?: string;
};

const GlobalDropdown: React.FC<GlobalDropdownProps> = ({
  label,
  error,
  options,
  onChange,
  selectedValue,
  placeholder = "Selecione...",
  icon,
  containerClassName = "",
  dropdownClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className={`flex flex-col gap-1 w-full ${containerClassName}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-900 mb-1 truncate overflow-hidden whitespace-nowrap">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={`w-full p-4 border border-gray-400 rounded-md text-sm flex items-center justify-between cursor-pointer transition-colors 
            ${error ? "border-red-500" : "focus:border-primary-800"} 
            ${dropdownClassName}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            {icon && <span className="text-gray-500 text-lg">{icon}</span>}
            <span
              className={`block truncate overflow-hidden whitespace-nowrap ${
                selectedOption ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <IoIosArrowDown
            className={`text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md z-10 max-h-52 overflow-auto">
            {options.map((opt) => (
              <li
                key={opt.value}
                className="p-3 text-sm truncate overflow-hidden whitespace-nowrap cursor-pointer hover:bg-gray-100 transition"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default GlobalDropdown;
