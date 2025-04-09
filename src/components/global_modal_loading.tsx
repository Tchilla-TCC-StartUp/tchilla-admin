import React from "react";
import GlobalCircularProgress from "./global_circular_progress";
import Typography from "./typography";

type GlobalModalLoadingProps = {
  isVisible: boolean;
  message?: string;
};

const GlobalModalLoading: React.FC<GlobalModalLoadingProps> = ({
  isVisible,
  message = "Carregando...",
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-4 w-full max-w-xs">
        <GlobalCircularProgress />
        <Typography variant="h3_ligth" color="var(--primary-900)">
          {message}
        </Typography>
      </div>
    </div>
  );
};

export default GlobalModalLoading;
