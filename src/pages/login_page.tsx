import { FaArrowRightLong } from "react-icons/fa6";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import AppAssetsImages from "../resource/app_assets_images";
import Typography from "../components/typography";
import AppGlobalInput from "../components/global_input";
import GlobalButton from "../components/global_button";
import NavigationHooks from "../hooks/navigation_hook";
const LoginPage = () => {
  return (
    <div className="flex items-strat justify-between px-40 py-40">
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
        <Typography variant="h3_normal" color="var(--gray-700)">
          Iniciar sessão para poder navegar na plataforma
        </Typography>
      </div>
      <div className="flex flex-col w-[400px] gap-8">
        <AppGlobalInput
          label="Seu email"
          type="email"
          placeholder="Informe o seu email"
          icon={<MdAlternateEmail />}
        />
        <AppGlobalInput
          label="Sua password"
          type="password"
          placeholder="Informa a password"
          icon={<MdLockOutline />}
        />
        <Typography variant="h3_normal" color="var(--gray-900)">
          Esqueci minha senha
        </Typography>
        <GlobalButton onClick={() => alert("Botão primário clicado!")}>
          Entrar <FaArrowRightLong />
        </GlobalButton>
        <div
          className="flex justify-center gap-1 cursor-pointer"
          onClick={NavigationHooks().navigateToRegister}
        >
          <Typography variant="p_normal" color="var(--gray-700)">
            Ainda não tenho uma conta?
          </Typography>
          <Typography variant="p_bold" color="var(--primary-950)">
            Criar conta
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
