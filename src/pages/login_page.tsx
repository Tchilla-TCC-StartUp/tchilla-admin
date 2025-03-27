import { FaArrowRightLong } from "react-icons/fa6";
import AppAssetsImages from "../resource/app_assets_images";
import Typography from "../components/typography";
import GlobalInput from "../components/global_input";
import GlobalButton from "../components/global_button";
import NavigationHooks from "../hooks/navigation_hook";
import LoginService from "../service/login_service";
import { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const service = LoginService();
  return (
    <div className="flex items-strat justify-between px-60 py-40  h-screen bg-primary-50">
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
      <div className="flex flex-col w-[400px] gap-8">
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
          placeholder="Informa a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p
          onClick={NavigationHooks().navigateToForegot}
          className="cursor-pointer text-gray-700 font-light"
        >
          Esqueci minha senha
        </p>
        <GlobalButton onClick={() => service.onLogin(email, password)}>
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

        <div className="flex justify-center items-center gap-3 cursor-pointer">
          <div className="w-[100%] h-[1px] bg-gray-400"></div>
          <Typography variant="p_bold" color="var(--gray-700)">
            Ou
          </Typography>
          <div className="w-[100%] h-[1px] bg-gray-400"></div>
        </div>
        <GlobalButton
          variant="secondary"
          onClick={() => alert("Botão primário clicado!")}
        >
          Entrar com o Google
          <img src={AppAssetsImages.vectores.google} alt="google" />
        </GlobalButton>
      </div>
    </div>
  );
};

export default LoginPage;
