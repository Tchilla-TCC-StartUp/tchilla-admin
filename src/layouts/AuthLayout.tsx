import React from "react";
import GlobalModalLoading from "../components/Global/GlobalModalLoading";
import GlobalSnackbar from "../components/Global/GlobalSnackbar";
import { useBaseRequestHook } from "../hooks/BaseRequestHook";

interface AuthLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ left, right }) => {
  const { isLoading } = useBaseRequestHook();
  return (
    <div className="flex flex-col items-center justify-start gap-4 px-4 py-8 min-h-screen bg-white sm:px-10 sm:gap-6 md:pt-[10rem] md:px-20 lg:px-32 md:flex-row md:items-start lg:justify-between xl:px-60 xl:py-40">
      <div className="w-full md:w-1/2 flex flex-col gap-6">{left}</div>
      <div className="w-full md:w-1/2 flex flex-col gap-6 lg:max-w-[45%]">
        {right}
      </div>
      <GlobalModalLoading isVisible={isLoading} message="Fazendo login..." />
      <GlobalSnackbar />
    </div>
  );
};

export default AuthLayout;
