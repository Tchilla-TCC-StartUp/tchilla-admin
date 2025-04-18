import { Navigate } from "react-router-dom";
import UserService from "./service/UserService";
import AppRoutes from "./resource/app_routes";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isUserLoggedIn } = UserService();
  return isUserLoggedIn() ? (
    children
  ) : (
    <Navigate to={AppRoutes.WELCOME} replace />
  );
};

export default ProtectedRoute;
