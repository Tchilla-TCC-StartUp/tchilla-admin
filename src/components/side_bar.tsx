import AppAssetsImages from "../resource/app_assets_images";
import { GoPerson } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import Typography from "./typography";
import NavigationHooks from "../hooks/navigation_hook";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-primary-950 text-primary-50 p-5 fixed">
      <img
        src={AppAssetsImages.vectores.logotipo_white3x}
        alt="Logo"
        className="mb-[20px] mt-[20px] w-[180px]"
      />
      <nav>
        <ul className="space-y-4">
          <li>
            <Typography
              onClick={NavigationHooks().navigateToDashBoard}
              variant="side_bar_tab"
            >
              <RxDashboard />
              <span> Dashboard</span>
            </Typography>
          </li>
          <li>
            <Typography
              onClick={NavigationHooks().navigateToProfile}
              variant="side_bar_tab"
            >
              <GoPerson /> <span>Perfil</span>
            </Typography>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
