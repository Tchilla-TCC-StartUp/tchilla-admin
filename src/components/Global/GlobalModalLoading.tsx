import React from "react";
import GlobalCircularProgress from "./GlobalCircularProgress";

type GlobalModalLoadingProps = {
  isVisible: boolean;
  message?: string;
};

const GlobalModalLoading: React.FC<GlobalModalLoadingProps> = ({
  isVisible,
}) => {
  React.useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-30">
      <GlobalCircularProgress size="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem]" />
    </div>
  );
};

export default GlobalModalLoading;
