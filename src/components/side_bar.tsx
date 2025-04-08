import AppAssetsImages from "../resource/app_assets_images";
import { IoCalendarOutline, IoCashOutline, IoChatboxEllipsesOutline, IoDocumentAttachOutline, IoPersonOutline, IoStatsChartOutline } from "react-icons/io5";
import Typography from "./typography";
import NavigationHooks from "../hooks/navigation_hook";
import { useState } from "react";

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

  const handleNavigation = (page: string, navigate: () => void) => {
    console.log("Navegando para:", page);
    setActivePage(page);
    navigate();
  };

  return (
    <div className="w-64 h-screen bg-primary-950  text-primary-50 p-4 fixed z-40">
      <img
        src={AppAssetsImages.vectores.logotipo_white3x}
        alt="Logo"
        className="mb-6 mt-2 w-[130px]"
      />
      <nav>
        <ul className="space-y-4">
          {menuItems.map(({ label, icon, page, navigate, badge }) => (
            <li key={page}>
              <Typography
                onClick={() => handleNavigation(page, navigate)}
                variant="side_bar_tab"
                className={`flex items-center gap-2 p-2 rounded-md ${
                  activePage === page
                    ? "bg-white text-primary-950 font-bold"
                    : ""
                }`}
              >
                {icon} {label}
                {badge && (
                  <span className="ml-auto bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {badge}
                  </span>
                )}
              </Typography>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
