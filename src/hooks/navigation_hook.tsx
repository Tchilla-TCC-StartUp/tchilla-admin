import { useNavigate } from "react-router-dom";
import AppRoutes from "../resource/app_routes";
const NavigationHooks = () => {
  const navigate = useNavigate();

  return {
    navigateToRegister: () => navigate(AppRoutes.REGISTER),
    navigateToHome: () => navigate(AppRoutes.HOME),
    navigateToLogin: () => navigate(AppRoutes.LOGIN),
  };
};

export default NavigationHooks;
