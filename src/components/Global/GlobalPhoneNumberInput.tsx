import React, {
  useState,
  useEffect,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import countryCodes from "../../utils/ countryCodes";
import countryFlags from "../../utils/ countryFlags";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hintText?: string;
  initialCountryCode?: string;
  onCountryCodeChanged?: (code: string) => void;
  onValueChanged?: (value: string) => void;
};
const GlobalPhoneNumberInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      hintText,
      initialCountryCode = "AO",
      onCountryCodeChanged,
      onValueChanged,
      value,
      ...props
    },
    ref
  ) => {
    const [selectedCountry, setSelectedCountry] = useState(initialCountryCode);

    useEffect(() => {
      const code = countryCodes[selectedCountry] ?? "+244";
      onCountryCodeChanged?.(code);
    }, [selectedCountry]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const code = countryCodes[selectedCountry] ?? "";
      const cleanedValue = inputValue.startsWith(code)
        ? inputValue.slice(code.length).trimStart()
        : inputValue;

      onValueChanged?.(cleanedValue);
    };

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label className="text-sm font-semibold text-gray-900 mb-1">
            {label}
          </label>
        )}
        <div className="relative flex w-full">
          <div className="flex items-center px-2 bg-gray-100 rounded-l-md border border-gray-300">
            <select
              className="bg-transparent focus:outline-none text-sm font-medium"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {Object.keys(countryCodes).map((country) => (
                <option key={country} value={country}>
                  {countryFlags[country]} {countryCodes[country]}
                </option>
              ))}
            </select>
          </div>
          <input
            ref={ref}
            value={value}
            onChange={handleChange}
            maxLength={9}
            type="tel"
            className={`flex-1 px-4 py-3 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-r-md text-sm focus:outline-none focus:border-blue-500`}
            placeholder={hintText ?? "923 000 000"}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

export default GlobalPhoneNumberInput;
