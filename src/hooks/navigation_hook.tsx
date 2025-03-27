import { useNavigate } from "react-router-dom";
import AppRoutes from "../resource/app_routes";
const NavigationHooks = () => {
  const navigate = useNavigate();

  return {
    navigateToRegister: () => navigate(AppRoutes.REGISTER),
    navigateToHome: () => {
      console.log("Redirecionando para Home...");
      navigate("/dashboard_page");
    },
    navigateToLogin: () => navigate(AppRoutes.LOGIN),
    navigateToConfirm: () => navigate(AppRoutes.Confirm),
    navigateToReset: () => navigate(AppRoutes.Reset),
    navigateToForegot: () => navigate(AppRoutes.FOREGOT),
    navigateToDashBoard: () => navigate(AppRoutes.DASHBOARD),
    navigateToagendamento: () => navigate(AppRoutes.AGENDAMENTO),
    navigateToavaliacoes: () => navigate(AppRoutes.AVALIACAO),
    navigateToconfiguracoes: () => navigate(AppRoutes.CONFIG),
    navigateToServicosEpacote: () => navigate(AppRoutes.SERVEPACOTE),
    navigateTopagemantos: () => navigate(AppRoutes.PAGAMENTOS),
    navigateToProfile: () => navigate(AppRoutes.PROFILE),
  };
};

export default NavigationHooks;
