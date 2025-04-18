import React from "react";

type GlobalCircularProgressProps = {
  className?: string;
  size?: string;
  color?: string;
  speed?: string;
};

const GlobalCircularProgress: React.FC<GlobalCircularProgressProps> = ({
  className = "",
  size = "h-12 w-12",
  color = "border-primary-700",
  speed = "animate-spin",
}) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className} ${size}`}
      role="progressbar"
      aria-label="Carregando"
    >
      <div
        className={`absolute inset-0 border-4 ${color} rounded-full opacity-40`}
      ></div>
      <div
        className={`absolute inset-0 border-4 ${color} border-t-transparent rounded-full ${speed}`}
        style={{
          animationDuration: "1.5s",
        }}
      ></div>
    </div>
  );
};

export default GlobalCircularProgress;
