import AuthInterface from "../interfaces/auth_interface";
import LoginInterface from "../interfaces/login_interface";
import RegisterInterface from "../interfaces/register_interface";
import BaseRepository from "./base_repository";


const UserRepository = () => {
    const { post } = BaseRepository();
    return {

        login: async (body: LoginInterface): Promise<AuthInterface> => {
            return await post<AuthInterface>("api/Auth/login", {
                "emailOrUsername": body.email, "password": body.password
            });
        },

        register: async (body: RegisterInterface): Promise<AuthInterface> => {
            return await post<AuthInterface>("api/Auth/register", {
                "nome": body.name,
                "email": body.email,
                "telefone": body.telefone,
                "senha": body.password,
                "tipo": body.tipo

            });
        },

    };
};

export default UserRepository;


//   final response = await get('/Usuario/getInfoByToken',
//       option: Options(headers: {
//           "Authorization": token,
//       }));