import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./resource/app_routes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ForegotPasswordPage from "./pages/ForegotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import PageLayout from "./layouts/PageLayout";
import ConfirmEmail from "./pages/ConfirmEmailPage";
import ResetPassword from "./pages/ResetPasswordPage";
import AgendamentoPage from "./pages/AgendamentoPage";
import ConfiguracaoPage from "./pages/ConfiguracoesPage";
import PagamentoPage from "./pages/PaymentsPage";
import ServEPacotes from "./pages/ServicesPage";
import ProtectedRoute from "./protected_route";
import UsersPage from "./pages/ClientsPage";
import Categorias from "./pages/CategoryPage";
import AgenciasPage from "./pages/AgenciasPage";
import PrestadoresPage from "./pages/PrestadoresPage";
import { useEffect } from "react";
import SettingsService from "./service/SettingsService";
import { useSettings } from "./hooks/SettingsHook";

const AppRouter = () => {
  const { getAllEnumsApp } = SettingsService();
  const { setEnums } = useSettings();

  const fetchSettings = async () => {
    const enums = await getAllEnumsApp();
    setEnums(enums);
  };

  useEffect(() => {
    fetchSettings();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
        <Route path={AppRoutes.CONFIRM} element={<ConfirmEmail />} />
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
          path={AppRoutes.CATEGORIAS}
          element={
            <ProtectedRoute>
              <PageLayout title="Caregorias">
                <Categorias />
              </PageLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.SERVEPACOTE}
          element={
            <ProtectedRoute>
              <PageLayout title="Serviços">
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
          path={AppRoutes.USERS}
          element={
            <ProtectedRoute>
              <PageLayout title="Clientes">
                <UsersPage />
              </PageLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.AGENCIAS}
          element={
            <ProtectedRoute>
              <PageLayout title="Agencias">
                <AgenciasPage />
              </PageLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.PRESTADOR}
          element={
            <ProtectedRoute>
              <PageLayout title="Parestador">
                <PrestadoresPage />
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
