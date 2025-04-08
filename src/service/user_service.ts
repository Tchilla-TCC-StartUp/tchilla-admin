import { useBaseRequestHook } from "../hooks/base_request_hook";
import NavigationHooks from "../hooks/navigation_hook";
import LoginInterface from "../interfaces/login_interface";
import RegisterInterface from "../interfaces/register_interface";
import { ResetPasswordInterface, UpdateUserInterface, UserInterface } from "../interfaces/user_interface";
import UserRepository from "../repository/user_repository";
import AppConstants from "../resource/app_constants";
import { useUserStore } from "../stores/ userStore";

const UserService = () => {
    const {
        login,
        register,
        getUserData,
        logout,
        updateUser,
        resetPassword
    } = UserRepository();

    const storedUser = useUserStore.getState().user;
    const { setUser, clearUser } = useUserStore();
    const { onRequest } = useBaseRequestHook();
    const { navigateToDashBoard, navigateToLogin } = NavigationHooks();

    const onleLogin = async (loginData: LoginInterface) => {
        return onRequest(
            async () => {
                const response = await login(loginData);
                return response;
            },
            (data) => {
                if (data?.data) {
                    localStorage.setItem(AppConstants.keyToken, data.data);
                    navigateToDashBoard();
                }
            }
        );
    };

    const onRegister = async (registerData: RegisterInterface) => {
        return onRequest(async () => {
            return await register(registerData);
        });
    };

    const fetchUserData = async (): Promise<UserInterface | null> => {

        if (storedUser) {
            console.log("User from store:", storedUser);
            return storedUser;
        }
        const result = await onRequest(async () => {
            return await getUserData();
        });
        if (result) {
            setUser(result);
            console.log("User from API:", result);
        }

        return result ?? null;
    };





    const onLogout = async () => {
        return onRequest(
            async () => {
                const res = await logout();
                localStorage.removeItem(AppConstants.keyToken);
                clearUser();
                navigateToLogin();
                return res;
            }
        );
    };

    const onUpdateUser = async (data: UpdateUserInterface) => {
        return onRequest(async () => {
            return await updateUser(data);
        });
    };

    const onResetPassword = async (data: ResetPasswordInterface) => {
        return onRequest(async () => {
            return await resetPassword(data);
        });
    };

    const isUserLoggedIn = () => {
        return !!localStorage.getItem(AppConstants.keyToken);
    };

    return {
        onleLogin,
        onRegister,
        fetchUserData,
        onLogout,
        onUpdateUser,
        onResetPassword,
        isUserLoggedIn,
        storedUser
    };
};

export default UserService;
