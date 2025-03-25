import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "text";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const GlobalButton: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  children,
  onClick,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center border-none rounded-lg cursor-pointer transition-all font-semibold text-center gap-2 px-6 py-5 text-base";

  const variants = {
    primary: "bg-primary-900 text-white hover:bg-primary-600",
    secondary: "bg-gray-200 text-primary-900 hover:bg-gray-300",
    outline:
      "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white",
    text: "bg-transparent text-primary-500 font-semibold hover:underline",
  };

  const disabledStyles =
    "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60";

  return (
    <button
      className={`${baseStyles} ${
        disabled ? disabledStyles : variants[variant]
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default GlobalButton;
