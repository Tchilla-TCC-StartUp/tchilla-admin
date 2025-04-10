import React from "react";
import Sidebar from "../components/side_bar";
import Typography from "../components/typography";
import GlobalUserMenu from "../components/global_user_menu";
import GlobalSnackbar from "../components/global_snackbar";
import GlobalModalLoading from "../components/global_modal_loading";
import { useBaseRequestHook } from "../hooks/base_request_hook";
import { useErrorHandlerHook } from "../hooks/error_handler_hook";
import ErrorScreen from "../pages/error_page";

const PageLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const { isLoading } = useBaseRequestHook();
  const { isError, screenType } = useErrorHandlerHook();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64 w-full min-h-screen">
        <div className="w-full h-20 flex items-center justify-between px-6 border-b bg-white border-gray-300 fixed z-[100]">
          <Typography variant="h2_bold" color="text-primary-800">
            {title}
          </Typography>
          <GlobalUserMenu />
        </div>
        <main className="p-5 mt-[5rem] overflow-hidden relative z-0 w-full h-screen bg-white">
          {children}
        </main>
      </div>
      <GlobalSnackbar />
      {isError && screenType === "fullScreen" && <ErrorScreen />}
      {isLoading && (
        <GlobalModalLoading isVisible={isLoading} message="Carregando..." />
      )}
    </div>
  );
};

export default PageLayout;
