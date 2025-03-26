import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import AppAssetsImages from "../resource/app_assets_images";
import Typography from "../components/typography";
import GlobalInput from "../components/global_input";
import GlobalButton from "../components/global_button";
import NavigationHooks from "../hooks/navigation_hook";
const RegisterPage = () => {
  return (
    <div className="flex items-star justify-between px-60 pt-40 h-screen  bg-primary-50 ">
      <div className="flex flex-col items-start gap-4">
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
        <Typography variant="h3_ligth" color="var(--gray-700)">
          Crie a conta para contribuir com a comunidade
        </Typography>
      </div>
      <div className="flex flex-col w-[400px] gap-1">
        <GlobalInput
          label="Seu nome"
          type="text"
          placeholder="Informe o seu email"
          tabIndex={1}
          icon={<GoPerson />}
        />
        <GlobalInput
          label="Seu email"
          type="email"
          placeholder="Informe o seu email"
          tabIndex={2}
          icon={<MdAlternateEmail />}
        />
        <GlobalInput
          label="Sua senha"
          type="password"
          placeholder="Informe a senha"
          tabIndex={3}
          icon={<MdLockOutline />}
        />
        <GlobalInput
          label="Confirma sua senha"
          type="password"
          placeholder="Informe a senha novamente"
          tabIndex={4}
          icon={<MdLockOutline />}
        />
       
        <GlobalButton onClick={() => alert("Botão primário clicado!")}>
          Criar conta <FaArrowRightLong />
        </GlobalButton>
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
        <div
          className="flex justify-center gap-1 cursor-pointer"
          onClick={NavigationHooks().navigateToLogin}
        >
          <Typography variant="p_light" color="var(--gray-700)">
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
