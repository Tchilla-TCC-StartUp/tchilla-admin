import { FaArrowRightLong } from "react-icons/fa6";
import AppAssetsImages from "../resource/app_assets_images";
import Typography from "../components/typography";
import GlobalInput from "../components/Global/global_input";
import GlobalButton from "../components/Global/global_button";
import NavigationHooks from "../hooks/NavigationHook";

import { useState } from "react";
import UserService from "../service/user_service";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { onLogin } = UserService();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const LeftContent = (
    <>
      <img
        className="w-[168px] h-auto lg:w-[268px] md:w-[200px] sm:w-[168px]"
        src={AppAssetsImages.vectores.logotipo}
        alt="Logo"
      />
      <Typography variant="h1_ultra_bold" color="var(--primary-950)">
        Faça o login na <br />
        plataforma
      </Typography>
      <Typography variant="h3_ligth" color="var(--gray-700)">
        Iniciar sessão para poder navegar na plataforma
      </Typography>
    </>
  );

  const RightContent = (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full md:gap-5"
    >
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
        className="cursor-pointer text-primary-800 font-light"
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
  );

  return (
    <>
      <AuthLayout left={LeftContent} right={RightContent} />
    </>
  );
};

export default LoginPage;
