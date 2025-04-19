import { useEffect } from "react";
import { motion } from "framer-motion";
import AppAssetsImages from "../../resource/app_assets_images";
import {
  IoCalendarOutline,
  IoCashOutline,
  IoDocumentAttachOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoStatsChartOutline,
  IoClose,
  IoBusinessOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import Typography from "./Typography";
import NavigationHooks from "../../hooks/NavigationHook";
import { useLocation } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import AppRoutes from "../../resource/app_routes";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const navigator = NavigationHooks();

  const getActivePage = () => {
    const path = location.pathname;

    if (path.startsWith(AppRoutes.AGENDAMENTO)) return "agendamentos";
    if (path.startsWith(AppRoutes.SERVEPACOTE)) return "servicos";
    if (path.startsWith(AppRoutes.PAGAMENTOS)) return "pagamentos";
    if (path.startsWith(AppRoutes.CATEGORIAS)) return "categoria";
    if (path.startsWith(AppRoutes.USERS)) return "clientes";
    if (path.startsWith(AppRoutes.PROFILE)) return "perfil";
    if (path.startsWith(AppRoutes.CONFIG)) return "configuracoes";
    if (path.startsWith(AppRoutes.AGENCIAS)) return "agencias";
    if (path.startsWith(AppRoutes.PRESTADOR)) return "prestadores";

    return "dashboard";
  };

  const activePage = getActivePage();

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
      icon: <IoPersonOutline size={18} />,
      page: "clientes",
      navigate: navigator.navigateToUsers,
    },
    {
      label: "Agencias",
      icon: <IoBusinessOutline size={18} />,
      page: "agencias",
      navigate: navigator.navigateToAgencias,
    },
    {
      label: "Prestadores",
      icon: <IoPeopleOutline size={18} />,
      page: "prestadores",
      navigate: navigator.navigateToPrestador,
    },
  ];

  const menuItems2 = [
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

  const handleNavigation = (_page: string, navigate: () => void) => {
    navigate();
    if (onClose) onClose();
  };

  // Bloquear scroll do body quando a sidebar mobile estiver aberta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Sidebar desktop */}
      <div className="w-0 hidden md:w-20 lg:w-60 h-screen bg-white p-6 fixed z-40 flex-col justify-between border-r border-gray-200 md:flex cursor-pointer">
        <div>
          <img
            src={AppAssetsImages.vectores.logotipo3x}
            alt="Logo"
            className="mb-4 mt-2 w-[160px] hidden lg:block"
          />
          <nav>
            <Typography
              variant="p_bold"
              className="text-gray-500 pt-4 text-xs uppercase mb-2 block md:hidden lg:block"
            >
              NAVEGAÇÃO
            </Typography>
            <ul className="space-y-4 cursor-pointer">
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

        <div className="mt-auto pb-10">
          <nav>
            <Typography
              variant="p_bold"
              className="text-gray-500 text-xs uppercase mb-2 block md:hidden lg:block"
            >
              MENU DE CONTROLE
            </Typography>
            <ul className="space-y-4 cursor-pointer">
              {menuItems2.map(({ label, icon, page, navigate }) => {
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
                    </Typography>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Sidebar mobile */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 flex md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-64 bg-white h-full p-6 flex flex-col justify-between overflow-y-auto"
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div>
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

              <Typography
                variant="h3_bold"
                className="text-gray-500 pt-4 text-xs uppercase mb-2"
              >
                NAVEGAÇÃO
              </Typography>
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
            </div>

            <div className="mt-10">
              <Typography
                variant="h3_bold"
                className="text-gray-500 text-xs uppercase mb-2"
              >
                MENU DE CONTROLE
              </Typography>
              <ul className="space-y-4">
                {menuItems2.map(({ label, icon, page, navigate }) => {
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
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
          <div className="flex-1" onClick={onClose} />
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;
