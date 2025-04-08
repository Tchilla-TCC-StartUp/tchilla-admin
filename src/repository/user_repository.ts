import AuthInterface from "../interfaces/auth_interface";
import LoginInterface from "../interfaces/login_interface";
import RegisterInterface from "../interfaces/register_interface";
import { ResetPasswordInterface, UpdateUserInterface, UserInterface } from "../interfaces/user_interface";
import BaseRepository from "./base_repository";

const UserRepository = () => {
    const { post, get, put } = BaseRepository();

    return {
        login: async (body: LoginInterface): Promise<AuthInterface> => {
            return await post<AuthInterface>("api/Auth/login", {
                emailOrUsername: body.email,
                password: body.password,
            });
        },

        register: async (body: RegisterInterface): Promise<AuthInterface> => {
            return await post<AuthInterface>("api/Auth/register", {
                nome: body.nome,
                email: body.email,
                telefone: body.telefone,
                senha: body.senha,
                tipo: body.tipo,
            });
        },

        getUserData: async (): Promise<UserInterface> => {
            const response = await get("api/Usuario/getInfoByToken") as { data: UserInterface };
            return response.data;
        },

        logout: async (): Promise<AuthInterface> => {
            return await put<AuthInterface>("api/Auth/logout");
        },

        updateUser: async (body: UpdateUserInterface): Promise<string> => {
            const response = await put<any>("api/Usuario/update", {
                nome: body.nome,
                email: body.email,
                telefone: body.telefone,
            });

            return response.mensagem;
        },

        resetPassword: async (body: ResetPasswordInterface): Promise<AuthInterface> => {
            return await put<AuthInterface>(
                `api/Auth/change-password?oldPassword=${body.oldPassword}&newPassword=${body.newPassword}`,
                null,

            );
        },
    };
};

export default UserRepository;
