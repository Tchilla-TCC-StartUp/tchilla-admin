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
import ProtectedRoute from "./protected_route";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
        <Route path={AppRoutes.Confirm} element={<ConfirmEmail />} />
        <Route path={AppRoutes.Reset} element={<ResetPassword />} />
        <Route path={AppRoutes.FOREGOT} element={<ForegotPasswordPage />} />

        <Route
          path={AppRoutes.HOME}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path={AppRoutes.DASHBOARD}
          element={
            <ProtectedRoute>
              <PageLayout title="DashBoard">
                <DashboardPage />
              </PageLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.AGENDAMENTO}
          element={
            <ProtectedRoute>
              <PageLayout title="Agendamentos">
                <AgendamentoPage />
              </PageLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.AVALIACAO}
          element={
            <ProtectedRoute>
              <PageLayout title="Avaliações">
                <AvaliacaoPage />
              </PageLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.SERVEPACOTE}
          element={
            <ProtectedRoute>
              <PageLayout title="Serviços E Pacotes">
                <ServEPacotes />
              </PageLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.CONFIG}
          element={
            <ProtectedRoute>
              <PageLayout title="Configurações">
                <ConfiguracaoPage />
              </PageLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.PAGAMENTOS}
          element={
            <ProtectedRoute>
              <PageLayout title="Pagamentos">
                <PagamentoPage />
              </PageLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.PROFILE}
          element={
            <ProtectedRoute>
              <PageLayout title="Perfil">
                <ProfilePage />
              </PageLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
