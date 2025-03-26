import { useNavigate } from "react-router-dom";
import AppRoutes from "../resource/app_routes";
const NavigationHooks = () => {
  const navigate = useNavigate();

  return {
    navigateToRegister: () => navigate(AppRoutes.REGISTER),
    navigateToHome: () => navigate(AppRoutes.HOME),
    navigateToLogin: () => navigate(AppRoutes.LOGIN),
    navigateToForegot: () => navigate(AppRoutes.FOREGOT),
    navigateToDashBoard: () => navigate(AppRoutes.DASHBOARD),
    navigateToProfile: () => navigate(AppRoutes.PROFILE),
  };
};

export default NavigationHooks;
