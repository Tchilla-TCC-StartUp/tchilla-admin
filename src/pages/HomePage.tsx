import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Global/GlobalSideBar";
import NavigationHooks from "../hooks/NavigationHook";

const Layout = () => {
  const { navigateToDashBoard } = NavigationHooks();

  // Usar useEffect para garantir que a navegação ocorra após a renderização
  useEffect(() => {
    navigateToDashBoard();
  }, [navigateToDashBoard]);

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
