import React from "react";
import Select from "react-select";

type OptionType = { label: string; value: string };

type GlobalSelectProps = {
  label?: string;
  error?: string;
  options: OptionType[];
  value: OptionType[]; // para multi
  onChange: (selected: OptionType[]) => void;
  placeholder?: string;
  isMulti?: boolean;
};

const GlobalSelect: React.FC<GlobalSelectProps> = ({
  label,
  error,
  options,
  value,
  onChange,
  placeholder = "Selecione",
  isMulti = false,
}) => {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isDisabled ? "#e5e7eb" : "#fff",
      borderColor: error
        ? "#ef4444"
        : state.isFocused
        ? "#1f2937"
        : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 0.2px #1f2937" : "none", // suavizado
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "0.375rem",
      minHeight: "56px",
      fontSize: "0.875rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      transition: "all 0.2s ease",
      cursor: state.isDisabled ? "not-allowed" : "default",
      opacity: state.isDisabled ? 0.7 : 1,
    }),
    multiValue: (styles: any) => ({
      ...styles,
      backgroundColor: "#f3f4f6",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: "#374151",
      fontWeight: 500,
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: "#9ca3af",
      ':hover': {
        backgroundColor: '#e5e7eb',
        color: '#111827',
      },
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: '#9ca3af',
    }),
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-600 ">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <Select
          isMulti={isMulti}
          options={options}
          value={value}
          onChange={(selected) => onChange(selected as OptionType[])}
          styles={customStyles}
          placeholder={placeholder}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default GlobalSelect;