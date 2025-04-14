import React from "react";

interface ShimmerProps {
  type: "avatar" | "text" | "container";
  width?: string;
  height?: string;
  rounded?: boolean;
}

const Shimmer: React.FC<ShimmerProps> = ({
  type,
  width = "100%",
  height = "20px",
}) => {
  const avatarStyles = "w-8 h-8 rounded-full";
  const textStyles = "h-4";
  const containerStyles = "w-full h-full";

  let classNames = "";
  switch (type) {
    case "avatar":
      classNames = `${avatarStyles} bg-gray-300 animate-pulse`;
      break;
    case "text":
      classNames = `${textStyles} bg-gray-300 animate-pulse rounded-md`;
      break;
    case "container":
      classNames = `${containerStyles} bg-gray-300 animate-pulse rounded-md`;
      break;
    default:
      classNames = `${textStyles} bg-gray-300 animate-pulse rounded-md`;
  }

  return <div className={classNames} style={{ width, height }} />;
};

export default Shimmer;
