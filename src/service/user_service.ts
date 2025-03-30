import { useBaseRequestHook } from "../hooks/base_request_hook";
import NavigationHooks from "../hooks/navigation_hook";
import LoginInterface from "../interfaces/login_interface";
import UserRepository from "../repository/user_repository";
import AppConstants from "../resource/app_constants";


const UserService = () => {
    const { login } = UserRepository();
    const { onRequest } = useBaseRequestHook();
    const { navigateToDashBoard } = NavigationHooks();

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
            },

        );
    };

    const isUserLoggedIn = () => {
        return !!localStorage.getItem(AppConstants.keyToken);
    };

    return {
        onleLogin,
        isUserLoggedIn
    };
};

export default UserService;
