import { useNavigate } from "react-router-dom";
import AppRoutes from "../resource/app_routes";
const NavigationHooks = () => {
  const navigate = useNavigate();

  return {
    navigateToRegister: () => navigate(AppRoutes.REGISTER),
    navigateToHome: () => navigate(AppRoutes.DASHBOARD),
    navigateToLogin: () => navigate(AppRoutes.LOGIN),
    navigateToConfirm: () => navigate(AppRoutes.CONFIRM),
    navigateToUsers: () => navigate(AppRoutes.USERS),
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
