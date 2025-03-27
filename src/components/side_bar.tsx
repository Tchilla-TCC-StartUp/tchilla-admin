import AppAssetsImages from "../resource/app_assets_images";
import { GoPerson } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import Typography from "./typography";
import NavigationHooks from "../hooks/navigation_hook";
import { useState } from "react";

const Sidebar = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const navigator = NavigationHooks();

  const handleNavigation = (page: string, navigate: () => void) => {
    setActivePage(page);
    navigate();
  };

  return (
    <div className="w-64 h-screen bg-primary-950 border-r border-gray-950 text-primary-50 p-4 fixed">
      {/* Logo */}
      <img
        src={AppAssetsImages.vectores.logotipo_white3x}
        alt="Logo"
        className="mb-6 mt-2 w-[130px]"
      />

      {/* Seção de navegação */}
      <Typography variant="h3_ligth" className="text-gray-300 text-xs uppercase mb-2 mt-4">
        NAVEGAÇÃO
      </Typography>
      <nav>
        <ul className="space-y-4">
          <li>
            <Typography
              onClick={() => handleNavigation("dashboard", navigator.navigateToDashBoard)}
              variant="side_bar_tab"
              className={`flex items-center gap-2 p-2 rounded-md ${activePage === "dashboard" ? "bg-[#A7F3D0] text-black font-bold" : ""}`}
            >
              <RxDashboard size={18} />
              <span>Dashboard</span>
            </Typography>
          </li>
          <li>
            <Typography
              onClick={() => handleNavigation("agendamentos", navigator.navigateToagendamento)}
              variant="side_bar_tab"
              className={`flex items-center gap-2 p-2 ${activePage === "agendamentos" ? "bg-[#A7F3D0] text-black font-bold" : ""}`}
            >
              <IoCalendarOutline size={18} />
              <span>Agendamentos</span>
              <span className="ml-auto bg-[#4CC9F0] text-white text-xs font-bold px-2 py-1 rounded-full">
                4
              </span>
            </Typography>
          </li>
          <li>
            <Typography
              onClick={() => handleNavigation("servicos", navigator.navigateToServicosEpacote)}
              variant="side_bar_tab"
              className={`flex items-center gap-2  ${activePage === "servicos" ? "bg-[#A7F3D0] text-black font-bold" : ""}`}
            >
              <HiOutlineMail size={18} />
              <span>Serviços e Pacotes</span>
            </Typography>
          </li>
          <li>
            <Typography
              onClick={() => handleNavigation("pagamentos", navigator.navigateTopagemantos)}
              variant="side_bar_tab"
              className={`flex items-center gap-2 p-2 ${activePage === "pagamentos" ? "bg-[#A7F3D0] text-black font-bold" : ""}`}
            >
              <MdOutlinePayment size={18} />
              <span>Pagamentos</span>
            </Typography>
          </li>
          <li>
            <Typography
              onClick={() => handleNavigation("avaliacoes", navigator.navigateToavaliacoes)}
              variant="side_bar_tab"
              className={`flex items-center gap-2  ${activePage === "avaliacoes" ? "bg-[#A7F3D0] text-black font-bold" : ""}`}
            >
              <BiCommentDetail size={18} />
              <span>Avaliações</span>
            </Typography>
          </li>
        </ul>
      </nav>

      {/* Seção de controle */}
      <Typography variant="h3_ligth" className="text-gray-300 text-xs uppercase mb-2 mt-28">
        MENU DE CONTROLE
      </Typography>
      <nav>
        <ul className="space-y-1">
          <li>
            <Typography
              onClick={() => handleNavigation("perfil", navigator.navigateToProfile)}
              variant="side_bar_tab"
              className={`flex items-center gap-2  ${activePage === "perfil" ? "bg-[#A7F3D0] text-black font-bold" : ""}`}
            >
              <GoPerson size={18} />
              <span>Meu Perfil</span>
            </Typography>
          </li>
          <li>
            <Typography
              onClick={() => handleNavigation("configuracoes", navigator.navigateToconfiguracoes)}
              variant="side_bar_tab"
              className={`flex items-center gap-2  ${activePage === "configuracoes" ? "bg-[#A7F3D0] text-black font-bold" : ""}`}
            >
              <IoSettingsOutline size={18} />
              <span>Configurações</span>
            </Typography>
          </li>
        </ul>
      </nav>
    </div>
  );
};


export default Sidebar;
