import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./resource/app_routes";
import LoginPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
