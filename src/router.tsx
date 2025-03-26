import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./resource/app_routes";
import LoginPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";
import HomePage from "./pages/home_page";
import ForegotPasswordPage from "./pages/foregot_password_page";
import DashboardPage from "./pages/dashboard_page";
import ProfilePage from "./pages/profile_page";
import PageLayout from "./layouts/page_layout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.HOME} element={<HomePage />} />
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
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
