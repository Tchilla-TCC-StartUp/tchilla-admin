import React from "react";
import GlobalCircularProgress from "./global_circular_progress";
import Typography from "../typography";


type GlobalModalLoadingProps = {
  isVisible: boolean;
  message?: string;
};

const GlobalModalLoading: React.FC<GlobalModalLoadingProps> = ({
  isVisible,
  message = "Carregando...",
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
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-4 w-full max-w-xs">
        <GlobalCircularProgress size="w-[6rem] h-[6rem]" />
        <Typography variant="h3_medium" color="var(--primary-900)">
          {message}
        </Typography>
      </div>
    </div>
  );
};

export default GlobalModalLoading;
