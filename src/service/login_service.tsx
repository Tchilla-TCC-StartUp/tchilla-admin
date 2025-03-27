import axios, { AxiosError } from "axios";
import NavigationHooks from "../hooks/navigation_hook";


const LoginService = () => {
  const navigator = NavigationHooks();

  const onLogin = async (emailOrUsername: string, password: string) => {
    try {
      const response = await axios.post(
        "https://ecotrack-udd9.onrender.com/api/Auth/login",
        { emailOrUsername, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigator.navigateToDashBoard();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Erro ao fazer login:", error.response?.data);
        alert(error.response?.data?.message || "Credenciais inválidas!");
      } else {
        console.error("Erro desconhecido:", error);
        alert("Erro ao conectar com o servidor.");
      }
    }
  };

  return { onLogin };
};

export default LoginService;