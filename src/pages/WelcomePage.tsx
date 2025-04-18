import { IoBusinessOutline, IoPeopleOutline } from "react-icons/io5";
import GlobalButton from "../components/Global/GlobalButton";
import Typography from "../components/Global/Typography";
import AuthLayout from "../layouts/AuthLayout";
import AppAssetsImages from "../resource/app_assets_images";
import NavigationHooks from "../hooks/NavigationHook";

const WelcomePage = () => {
  const { navigateToLogin } = NavigationHooks();
  const LeftContent = (
    <>
      <img
        className="w-[168px] h-auto lg:w-[268px] md:w-[200px] sm:w-[168px]"
        src={AppAssetsImages.vectores.logotipo}
        alt="Logo"
      />
      <Typography variant="h1_ultra_bold" color="var(--primary-950)">
        Bem-Vindo ao
        <br />
        Tchilla Admin
      </Typography>
    </>
  );

  const RightContent = (
    <>
      <GlobalButton variant="border">
        Cadastrar Como Prestador <IoPeopleOutline size={18} />
      </GlobalButton>
      <GlobalButton variant="border">
        Cadastrar Como Agência <IoBusinessOutline size={18} />
      </GlobalButton>
      <GlobalButton onClick={navigateToLogin}>Fazer Login</GlobalButton>
    </>
  );

  return (
    <>
      <AuthLayout left={LeftContent} right={RightContent} />
    </>
  );
};

export default WelcomePage;
