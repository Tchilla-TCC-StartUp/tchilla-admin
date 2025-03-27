import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./resource/app_routes";
import LoginPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";
import HomePage from "./pages/home_page";
import ForegotPasswordPage from "./pages/foregot_password_page";
import DashboardPage from "./pages/dashboard_page";
import ProfilePage from "./pages/profile_page";
import PageLayout from "./layouts/page_layout";
import ConfirmEmail from "./pages/confirmEmail";
import ResetPassword from "./pages/resetPassword";
import AgendamentoPage from "./pages/agendamento_page";
import AvaliacaoPage from "./pages/avaliacoes";
import ConfiguracaoPage from "./pages/configuracoes_page";
import PagamentoPage from "./pages/pagemantos_page";
import ServEPacotes from "./pages/servicosEpacotes_page";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.HOME} element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
        <Route path={AppRoutes.Confirm} element={<ConfirmEmail />} />
        <Route path="/ResetPassword" element={< ResetPassword/>} />
        <Route path={AppRoutes.FOREGOT} element={<ForegotPasswordPage />} />

        <Route
          path={AppRoutes.DASHBOARD}
          element={
            <PageLayout title="DashBoard">
              <DashboardPage />
            </PageLayout>
          }
        />
         <Route
          path={AppRoutes.AGENDAMENTO}
          element={
            <PageLayout title="Agendamentos">
              <AgendamentoPage />
            </PageLayout>
          }
        />
         <Route
          path={AppRoutes.AVALIACAO}
          element={
        <PageLayout title="Avaliações">
              <AvaliacaoPage />
            </PageLayout>
          }
          
        />
        <Route
          path={AppRoutes.SERVEPACOTE}
          element={
            <PageLayout title="Serviços E Pacotes">
              <ServEPacotes />
            </PageLayout>
          }
          
        />
         <Route
          path={AppRoutes.CONFIG}
          element={
            <PageLayout title="Configurações">
              <ConfiguracaoPage />
            </PageLayout>
          }
          
        />
         <Route
          path={AppRoutes.PAGAMENTOS}
          element={
            <PageLayout title="Pagamentos">
              <PagamentoPage />
            </PageLayout>
          }
        />
        <Route
          path={AppRoutes.PROFILE}
          element={
            <PageLayout title="Perfil">
              <ProfilePage />
            </PageLayout>
          }
        />
      </Routes>
    </Router>
  );
};


export default AppRouter;
