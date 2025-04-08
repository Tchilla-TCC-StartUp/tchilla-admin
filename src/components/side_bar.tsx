import AppAssetsImages from "../resource/app_assets_images";
import { RxDashboard } from "react-icons/rx";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import Typography from "./typography";
import NavigationHooks from "../hooks/navigation_hook";
import { useState } from "react";

const Sidebar = () => {
  const [activePage, setActivePage] = useState<string>("dashboard");
  const navigator = NavigationHooks();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <RxDashboard size={18} />,
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
      icon: <HiOutlineMail size={18} />,
      page: "servicos",
      navigate: navigator.navigateToServicosEpacote,
    },
    {
      label: "Pagamentos",
      icon: <MdOutlinePayment size={18} />,
      page: "pagamentos",
      navigate: navigator.navigateTopagemantos,
    },
    {
      label: "Avaliações",
      icon: <BiCommentDetail size={18} />,
      page: "avaliacoes",
      navigate: navigator.navigateToavaliacoes,
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
