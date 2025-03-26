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
      <div className="flex flex-col flex-1 ml-64 fixed w-screen">
        <div className="bg-primary-950 w-full h-20 flex items-center px-6">
          <Typography variant="h3_bold" color="#fff">
            {title}
          </Typography>
        </div>
        <main className="p-5  bg-primary-50">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
