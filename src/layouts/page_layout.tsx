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
    <div className="flex flex-col">
      <Sidebar />
      <div className="bg-primary-950 w-[full] h-[80px] flex items-center">
        <Typography variant="h3_bold" color="#fff">
          {title}
        </Typography>
      </div>
      <main className="flex-1 p-5 ml-64">{children}</main>
    </div>
  );
};

export default PageLayout;
