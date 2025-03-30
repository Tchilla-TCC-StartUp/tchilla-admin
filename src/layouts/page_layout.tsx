import React from "react";
import Sidebar from "../components/side_bar";
import Typography from "../components/typography";
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
        <div className="w-full h-20 flex items-center justify-start px-6 border-b bg-primary-950 fixed ">
          <Typography variant="h2_bold" color="white">
            {title}
          </Typography>
        </div>

        <main className="p-5 mt-[5rem]">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
