import React from "react";
import Sidebar from "../components/side_bar";
import Typography from "../components/typography";
import GlobalUserMenu from "../components/global_user_menu";
import GlobalSnackbar from "../components/global_snackbar";
const PageLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64 w-full min-h-screen ">
        <div className="w-full h-20 flex items-center justify-between px-6 border-b bg-primary-950 fixed z-[1000]">
          <Typography variant="h2_bold" color="white">
            {title}
          </Typography>

          <GlobalUserMenu />
        </div>
        <main className="p-5 mt-[5rem] overflow-hidden relative z-0 w-full h-screen bg-white">
          {children}
        </main>
      </div>
      <GlobalSnackbar />
    </div>
  );
};

export default PageLayout;
