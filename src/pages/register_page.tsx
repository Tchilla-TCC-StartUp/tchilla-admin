import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import AppAssetsImages from "../resource/app_assets_images";
import Typography from "../components/typography";
import AppGlobalInput from "../components/global_input";
import GlobalButton from "../components/global_button";
import NavigationHooks from "../hooks/navigation_hook";
const RegisterPage = () => {
  return (
    <div className="flex items-star justify-between px-40 py-40">
      <div className="flex flex-col items-start gap-8">
        <img
          className="w-[268px] h-auto"
          src={AppAssetsImages.vectores.logotipo}
          alt="Logo"
        />
        <Typography variant="h1_ultra_bold" color="var(--primary-950)">
          Crie uma conta
          <br />
          na plataforma
        </Typography>
        <Typography variant="h3_normal" color="var(--gray-700)">
          Crie a conta para contribuir com a comunidade
        </Typography>
      </div>
      <div className="flex flex-col w-[400px] gap-8">
        <AppGlobalInput
          label="Seu nome"
          type="text"
          placeholder="Informe o seu email"
          icon={<GoPerson />}
        />
        <AppGlobalInput
          label="Seu email"
          type="email"
          placeholder="Informe o seu email"
          icon={<MdAlternateEmail />}
        />
        <AppGlobalInput
          label="Sua senha"
          type="password"
          placeholder="Informe a senha"
          icon={<MdLockOutline />}
        />
        <AppGlobalInput
          label="Confirma sua senha"
          type="password"
          placeholder="Informe a senha novamente"
          icon={<MdLockOutline />}
        />
        <Typography variant="h3_normal" color="var(--gray-900)">
          Esqueci minha senha
        </Typography>
        <GlobalButton onClick={() => alert("Botão primário clicado!")}>
          Criar conta <FaArrowRightLong />
        </GlobalButton>
        <div
          className="flex justify-center gap-1 cursor-pointer"
          onClick={NavigationHooks().navigateToLogin}
        >
          <Typography variant="p_normal" color="var(--gray-700)">
            Já tem uma conta?
          </Typography>
          <Typography variant="p_bold" color="var(--primary-950)">
            Entrar
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
