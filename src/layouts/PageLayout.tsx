import React, { useState } from "react";
import Sidebar from "../components/side_bar";
import Typography from "../components/typography";
import GlobalUserMenu from "../components/Global/global_user_menu";
import GlobalSnackbar from "../components/Global/global_snackbar";
import GlobalModalLoading from "../components/Global/GlobalModalLoading";
import { useBaseRequestHook } from "../hooks/BaseRequestHook";
import { IoClose, IoMenuOutline } from "react-icons/io5";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  const { isLoading } = useBaseRequestHook();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 w-full">
        <header className="h-20 flex items-center justify-between px-6 border-b bg-white fixed z-[100] left-0 right-0 md:left-20 lg:left-60">
          <div className="sm:block md:hidden">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? (
                <>
                  <IoClose size={28} />
                </>
              ) : (
                <>
                  <IoMenuOutline size={28} />
                </>
              )}
            </button>
          </div>
          <Typography
            variant="h2_bold"
            color="text-primary-800"
            className="hidden md:block"
          >
            {title}
          </Typography>

          <GlobalUserMenu />
        </header>

        <main className="lg:ml-60 md:ml-20 ms:ml-0 p-5 flex-1 mt-20 overflow-hidden relative z-0">
          {children}
        </main>
      </div>

      <GlobalSnackbar />
      {isLoading && (
        <GlobalModalLoading isVisible={isLoading} message="Carregando..." />
      )}
    </div>
  );
};

export default PageLayout;
