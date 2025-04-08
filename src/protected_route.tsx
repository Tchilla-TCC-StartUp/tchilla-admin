import { Navigate } from "react-router-dom";
import UserService from "./service/user_service";
import AppRoutes from "./resource/app_routes";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isUserLoggedIn } = UserService();
  return isUserLoggedIn() ? (
    children
  ) : (
    <Navigate to={AppRoutes.LOGIN} replace />
  );
};

export default ProtectedRoute;
