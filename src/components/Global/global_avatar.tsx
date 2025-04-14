import React from "react";

interface GlobalAvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

const GlobalAvatar: React.FC<GlobalAvatarProps> = ({
  src,
  alt = "User GlobalAvatar",
  className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-10 h-10 rounded-full object-cover border border-gray-300 ${className}`}
    />
  );
};

export default GlobalAvatar;
