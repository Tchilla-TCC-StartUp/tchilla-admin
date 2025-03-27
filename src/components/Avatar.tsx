import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "User Avatar", className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-10 h-10 rounded-full object-cover border border-gray-300 ${className}`}
    />
  );
};

export default Avatar;