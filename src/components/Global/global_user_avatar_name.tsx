import React from "react";
import clsx from "clsx";

type AppGlobalUserAvatarNameProps = {
  name: string;
  size?: number;
};

const colors = [
  "bg-red-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-orange-600",
  "bg-purple-600",
  "bg-teal-600",
  "bg-pink-600",
  "bg-indigo-600",
  "bg-amber-600",
  "bg-amber-900", 
];

const getTailwindColorClass = (name: string): string => {
  const index = name ? name.charCodeAt(0) % colors.length : 0;
  return colors[index];
};

export const AppGlobalUserAvatarName: React.FC<
  AppGlobalUserAvatarNameProps
> = ({ name, size = 40 }) => {
  const initial = name ? name[0].toUpperCase() : "?";
  const backgroundColor = getTailwindColorClass(name);

  const avatarSize = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size * 0.5}px`,
  };

  return (
    <div
      className={clsx(
        "rounded-full flex items-center justify-center text-slate-50 font-medium",
        backgroundColor
      )}
      style={avatarSize}
    >
      {initial}
    </div>
  );
};
