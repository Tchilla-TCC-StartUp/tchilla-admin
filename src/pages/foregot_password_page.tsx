import AppAssetsImages from "../resource/app_assets_images";
import Typography from "../components/typography";
import GlobalInput from "../components/global_input";
import { MdAlternateEmail } from "react-icons/md";
import GlobalButton from "../components/global_button";
import { FaArrowRightLong } from "react-icons/fa6";
import GlobalBackButton from "../components/global_back_button";
import NavigationHooks from "../hooks/navigation_hook";
const ForegotPasswordPage = () => {
  return (
    <div className="flex items-center flex-col  py-[60px] px-40 bg-primary-50 h-screen">
      <div className=" flex flex-col items-start justify-center gap-5 w-[400px]">
        <GlobalBackButton href="/login">

        </GlobalBackButton>
        <img
          src={AppAssetsImages.vectores.logotipo}
          alt="Logo"
          className="w-[250px]"
        />
        <Typography variant="h1_ultra_bold">Recuperar senha</Typography>
        <Typography variant="h3_ligth" color="var(--gray-600)">
          Informe o seu email para recuperar a senha
        </Typography>

        <GlobalInput
          placeholder="Insira o seu email"
          type="email"
          icon={<MdAlternateEmail />}
        />
        <GlobalButton
          className="w-[fill] mt-[10px] bg-primary-900"
          onClick={NavigationHooks().navigateToConfirm}
        >
          Recuperar senha <FaArrowRightLong />
        </GlobalButton>
      </div>
    </div>
  );
};

export default ForegotPasswordPage;
