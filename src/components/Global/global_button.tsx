import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "text"
  | "darck"
  | "error";

type ButtonProps = {
  variant?: ButtonVariant;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

const GlobalButton: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  children,
  onClick,
  fullWidth = false,
  className = "",
  type = "button",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center border-none rounded-[8px] cursor-pointer transition-all text-center gap-2 px-[18px] py-[16px] min-h-[48px] ";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-gradient-to-r from-[#00DED8] to-[#002F6C] text-white ",
    secondary: "bg-primary-200 text-gray-600 hover:bg-primary-300",
    error: "bg-red-600 text-white hover:bg-primary-300",
    darck: "bg-sky-900 text-white hover:bg-primary-300",
    outline:
      "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-normal",
    text: "bg-transparent text-primary-500 hover:underline",
  };

  const disabledStyles =
    "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60";

  return (
    <button
      type={type}
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
