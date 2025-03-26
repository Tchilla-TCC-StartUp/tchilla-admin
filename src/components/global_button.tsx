import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "text";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string; // Permite adicionar estilos personalizados
};

const GlobalButton: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  children,
  onClick,
  fullWidth = false,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center border-none rounded-lg cursor-pointer transition-all  text-center gap-2 px-6 py-5 text-base";

  const variants = {
    primary: "bg-primary-900 text-white hover:bg-primary-700 font-semibold",
    secondary: "bg-primary-200  text-gray-600 hover:bg-primary-300",
    outline:
      "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-normal",
    text: "bg-transparent text-primary-500 font-semibold hover:underline",
  };

  const disabledStyles =
    "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60";

  return (
    <button
      className={`${baseStyles} ${fullWidth ? "w-full" : ""} ${
        disabled ? disabledStyles : variants[variant]
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default GlobalButton;
