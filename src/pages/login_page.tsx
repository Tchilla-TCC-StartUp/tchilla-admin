import { FaArrowRightLong } from "react-icons/fa6";
import AppAssetsImages from "../resource/app_assets_images";
import Typography from "../components/typography";
import GlobalInput from "../components/Global/global_input";
import GlobalButton from "../components/Global/global_button";
import NavigationHooks from "../hooks/navigation_hook";

import { useState } from "react";
import UserService from "../service/user_service";
import { useBaseRequestHook } from "../hooks/base_request_hook";
import GlobalSnackbar from "../components/Global/global_snackbar";
import GlobalModalLoading from "../components/Global/global_modal_loading";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { onLogin } = UserService();
  const { isLoading } = useBaseRequestHook();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="flex items-start justify-between px-60 py-40 h-screen bg-primary-50">
      <div className="flex flex-col items-start gap-8">
        <img
          className="w-[268px] h-auto"
          src={AppAssetsImages.vectores.logotipo}
          alt="Logo"
        />
        <Typography variant="h1_ultra_bold" color="var(--primary-950)">
          Faça o login na
          <br />
          plataforma
        </Typography>
        <Typography variant="h3_ligth" color="var(--gray-700)">
          Iniciar sessão para poder navegar na plataforma
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col w-[400px] gap-8">
        <GlobalInput
          label="Seu email"
          type="email"
          placeholder="Informe o seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <GlobalInput
          label="Sua password"
          type="password"
          placeholder="Informe a sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p
          onClick={NavigationHooks().navigateToForegot}
          className="cursor-pointer text-gray-700 font-light"
        >
          Esqueci minha senha
        </p>

        <GlobalButton type="submit">
          Entrar <FaArrowRightLong />
        </GlobalButton>

        <div
          className="flex justify-center gap-1 cursor-pointer"
          onClick={NavigationHooks().navigateToRegister}
        >
          <Typography variant="p_light" color="var(--gray-700)">
            Ainda não tenho uma conta?
          </Typography>
          <Typography variant="p_bold" color="var(--primary-950)">
            Criar conta
          </Typography>
        </div>   
      </form>
      <GlobalModalLoading isVisible={isLoading} message="Fazendo login..." />
      <GlobalSnackbar />
    </div>
  );
};

export default LoginPage;
