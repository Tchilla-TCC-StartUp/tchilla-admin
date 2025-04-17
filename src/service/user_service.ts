import { useBaseRequestHook } from "../hooks/BaseRequestHook";
import NavigationHooks from "../hooks/NavigationHook";
import useValidation from "../hooks/ValidationHook";
import LoginInterface from "../interfaces/login_interface";
import RegisterInterface from "../interfaces/register_interface";
import {
  ResetPasswordInterface,
  UpdateUserInterface,
  UserInterface,
} from "../interfaces/user_interface";
import UserRepository from "../repository/user_repository";
import AppConstants from "../resource/app_constants";
import { useUserStore } from "../stores/ userStore";
import { useAuthStore } from "../stores/auth_store";

const UserService = () => {
  const { login, register, getUserData, logout, updateUser, resetPassword } =
    UserRepository();

  const { clearToken, setToken } = useAuthStore();

  const storedUser = useUserStore.getState().user;
  const { setUser, clearUser } = useUserStore();
  const { onRequest } = useBaseRequestHook();
  const { navigateToDashBoard, navigateToLogin } = NavigationHooks();
  const { validateForm } = useValidation();
  const onLogin = async (loginData: LoginInterface) => {
    const { isValid } = validateForm(loginData.email, loginData.password);
    if (!isValid) {
      return;
    }
    return onRequest(
      async () => {
        console.log("Login data:", loginData);
        const response = await login(loginData);
        return response;
      },
      (data) => {
        if (data?.data) {
          setToken(data.data);
          navigateToDashBoard();
        }
      }
    );
  };

  const onRegister = async (registerData: RegisterInterface) => {
    return onRequest(async () => await register(registerData));
  };

  const fetchUserData = async (): Promise<UserInterface | null> => {
    if (storedUser) {
      console.log("User from store:", storedUser);
      return storedUser;
    }
    const result = await onRequest(
      async (token) => {
        return await getUserData(token!);
      },
      undefined,
      undefined,
      true
    );
    if (result) {
      setUser(result);
      console.log("User from API:", result);
    }
    return result ?? null;
  };

  const onLogout = async () => {
    return onRequest(
      async (token) => {
        const res = await logout(token ?? "");
        clearToken();
        clearUser();
        navigateToLogin();
        return res;
      },
      undefined,
      undefined,
      true
    );
  };

  const onUpdateUser = async (data: UpdateUserInterface) => {
    return onRequest(async () => {
      return await updateUser(data);
    });
  };

  const onResetPassword = async (data: ResetPasswordInterface) => {
    return onRequest(
      async (token) => {
        return await resetPassword(data, token!);
      },
      undefined,
      undefined,
      true
    );
  };

  const isUserLoggedIn = () => {
    return !!localStorage.getItem(AppConstants.keyToken);
  };

  return {
    onLogin,
    onRegister,
    fetchUserData,
    onLogout,
    onUpdateUser,
    onResetPassword,
    isUserLoggedIn,
    storedUser,
  };
};

export default UserService;
