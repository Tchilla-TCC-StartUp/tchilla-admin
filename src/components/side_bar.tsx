import AppAssetsImages from "../resource/app_assets_images";
import { IoCalendarOutline, IoCashOutline, IoChatboxEllipsesOutline, IoDocumentAttachOutline, IoPersonOutline, IoSettingsOutline, IoStatsChartOutline } from "react-icons/io5";
import Typography from "./typography";
import NavigationHooks from "../hooks/navigation_hook";
import { useState } from "react";
import { GoPerson } from "react-icons/go";


const Sidebar = () => {
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
      label: "Avaliações",
      icon: <IoChatboxEllipsesOutline size={18} />,
      page: "avaliacoes",
      navigate: navigator.navigateToavaliacoes,
    },
    {
      label: "Clieantes",
      icon: <IoPersonOutline size={18} />,
      page: "clientes",
      navigate: navigator.navigateToUsers,
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
    },]
  const handleNavigation = (page: string, navigate: () => void) => {
    console.log("Navegando para:", page);
    setActivePage(page);
    navigate();
  };
  

  return (
    <div className="w-64 h-screen bg-white p-6 fixed z-40 flex flex-col justify-between border-r border-gray-200">
      <div>
        <img
          src={AppAssetsImages.vectores.logotipo3x}
          alt="Logo"
          className="mb-6 mt-2 w-[160px]"
        />
        <Typography variant="h3_bold" className="text-gray-500 pt-10 text-xs uppercase mb-2">
        NAVEGAÇÃO
        </Typography>
        <nav>
          <ul className="space-y-4">
            {menuItems.map(({ label, icon, page, navigate, badge }) => {
              const isActive = activePage === page;
              return (
                <li key={page}>
                  <Typography
                    onClick={() => handleNavigation(page, navigate)}
                    variant="side_bar_tab"
                    className={`flex items-center gap-2 p-2 rounded-md transition-colors ${isActive
                        ? "bg-[#A0F0F1] text-[#003D4D] font-semibold"
                        : "text-gray-800 hover:bg-gray-100"
                      }`}
                  >
                    <span className={isActive ? "text-[#003D4D]" : "text-gray-700"}>
                      {icon}
                    </span>
                    <span className={isActive ? "text-[#003D4D]" : "text-slate-800"}>{label}</span>
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
        <Typography variant="h3_bold" className="text-gray-500 text-xs uppercase mb-2">
          MENU DE CONTROLE
        </Typography>
        <nav>
          <ul className="space-y-4">
            {menuItems2.map(({ label, icon, page, navigate }) => {
              const isActive = activePage === page;

              return (<li key={page}>
                <Typography
                  onClick={() => handleNavigation(page, navigate)}
                  variant="side_bar_tab"
                  className={`flex items-center gap-2 p-2 rounded-md transition-colors ${isActive
                      ? "bg-[#A0F0F1] text-[#003D4D] font-semibold"
                      : "text-gray-800 hover:bg-gray-100"
                    }`}
                >
                  <span className={isActive ? "text-[#003D4D]" : "text-gray-700"}>
                    {icon}
                  </span>
                  <span className={isActive ? "text-[#003D4D]" : "text-slate-800"}>{label}</span>


                </Typography>
              </li>)
            }
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
