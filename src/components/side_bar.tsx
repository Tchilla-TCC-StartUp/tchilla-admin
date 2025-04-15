import { motion } from "framer-motion"; // Importando motion
import AppAssetsImages from "../resource/app_assets_images";
import {
  IoCalendarOutline,
  IoCashOutline,
  IoDocumentAttachOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import Typography from "./typography";
import NavigationHooks from "../hooks/navigation_hook";
import { useState } from "react";
import { GoPerson } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const [activePage, setActivePage] = useState<string>("dashboard");
  const navigator = NavigationHooks();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <IoStatsChartOutline size={18} />,
      page: "dashboard",
      navigate: navigator.navigateToDashBoard,
    },
    {
      label: "Agendamentos",
      icon: <IoCalendarOutline size={18} />,
      page: "agendamentos",
      navigate: navigator.navigateToagendamento,
      badge: 4,
    },
    {
      label: "Serviços",
      icon: <IoDocumentAttachOutline size={18} />,
      page: "servicos",
      navigate: navigator.navigateToServicosEpacote,
    },
    {
      label: "Pagamentos",
      icon: <IoCashOutline size={18} />,
      page: "pagamentos",
      navigate: navigator.navigateTopagemantos,
    },
    {
      label: "Categoria",
      icon: <BiCategory size={18} />,
      page: "categoria",
      navigate: navigator.navigateToCategorias,
    },
    {
      label: "Clieantes",
      icon: <IoPeopleOutline size={18} />,
      page: "clientes",
      navigate: navigator.navigateToUsers,
    },
    {
      label: "perfil",
      icon: <GoPerson size={18} />,
      page: "perfil",
      navigate: navigator.navigateToProfile,
    },
    {
      label: "configuracoes",
      icon: <IoSettingsOutline size={18} />,
      page: "configuracoes",
      navigate: navigator.navigateToconfiguracoes,
    },
  ];

  const handleNavigation = (page: string, navigate: () => void) => {
    setActivePage(page);
    navigate();
    if (onClose) onClose();
  };

  return (
    <>
      {/* Sidebar Desktop */}
      <div className="w-0 hidden md:w-20 lg:w-60 h-screen bg-white p-6 fixed z-40 flex flex-col justify-between border-r border-gray-200 md:block">
        <div>
          <img
            src={AppAssetsImages.vectores.logotipo3x}
            alt="Logo"
            className="mb-4 mt-2 w-[160px] hidden lg:block"
          />
          <nav>
            <ul className="space-y-4">
              {menuItems.map(({ label, icon, page, navigate, badge }) => {
                const isActive = activePage === page;
                return (
                  <li key={page}>
                    <Typography
                      onClick={() => handleNavigation(page, navigate)}
                      variant="p_medium"
                      className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-[#A0F0F1] text-[#003D4D] font-semibold"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <span
                        className={
                          isActive ? "text-[#003D4D]" : "text-gray-700"
                        }
                      >
                        {icon}
                      </span>
                      <span
                        className={`hidden lg:block ${
                          isActive ? "text-primary-950" : "text-gray-700"
                        }`}
                      >
                        {label}
                      </span>
                      {badge && (
                        <span className="ml-auto bg-[#30C5CD] text-white text-xs font-bold px-2 py-1 rounded-full">
                          {badge}
                        </span>
                      )}
                    </Typography>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Drawer Mobile */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 flex md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-64 bg-white h-full p-6"
            initial={{ x:  -1000}}
            animate={{ x: 0}}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <img
                src={AppAssetsImages.vectores.logotipo3x}
                alt="Logo"
                className="w-[120px]"
              />
              <button onClick={onClose}>
                <IoClose size={24} />
              </button>
            </div>
            <ul className="space-y-4">
              {menuItems.map(({ label, icon, page, navigate, badge }) => {
                const isActive = activePage === page;
                return (
                  <li key={page}>
                    <Typography
                      onClick={() => handleNavigation(page, navigate)}
                      variant="p_medium"
                      className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-[#A0F0F1] text-[#003D4D] font-semibold"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {icon}
                      {label}
                      {badge && (
                        <span className="ml-auto bg-[#30C5CD] text-white text-xs font-bold px-2 py-1 rounded-full">
                          {badge}
                        </span>
                      )}
                    </Typography>
                  </li>
                );
              })}
            </ul>
          </motion.div>
          {/* Ao clicar fora do drawer, fecha também */}
          <div className="flex-1" onClick={onClose} />
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;
