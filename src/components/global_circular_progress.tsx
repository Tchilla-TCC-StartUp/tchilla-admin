import React from "react";

type GlobalCircularProgressProps = {
  size?: number;
  className?: string;
};

const GlobalCircularProgress: React.FC<GlobalCircularProgressProps> = ({
  size = 40,
  className = "",
}) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 border-2 border-primary-500 rounded-full"
        style={{ width: size, height: size }}
      ></div>

      <div
        className="absolute inset-0 border-2 border-primary-50 border-t-transparent rounded-full animate-spin"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default GlobalCircularProgress;
