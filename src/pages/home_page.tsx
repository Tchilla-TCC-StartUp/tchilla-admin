import { Outlet } from "react-router-dom";
import Sidebar from "../components/side_bar";


const Layout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <main className="flex-1 p-6 bg-primary-50 ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
