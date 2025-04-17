import { FaArrowRightLong } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import AppAssetsImages from "../resource/app_assets_images";
import Typography from "../components/Global/typography";
import GlobalInput from "../components/Global/global_input";
import GlobalButton from "../components/Global/global_button";
import AppRoutes from "../resource/app_routes";
import { useState } from "react";
import GlobalAbsolutBackButton from "../components/Global/GlobalAbsolutBackButton";
import NavigationHooks from "../hooks/NavigationHook";
import AuthLayout from "../layouts/AuthLayout";

const ForegotPasswordPage = () => {
  const { navigateToConfirm } = NavigationHooks();
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToConfirm();
  };

  return (
    <>
      <GlobalAbsolutBackButton href={AppRoutes.LOGIN} />

      <AuthLayout
        left={
          <div className="mt-9">
            <img
              src={AppAssetsImages.vectores.logotipo}
              alt="Logo"
              className="w-[168px] h-auto lg:w-[268px] md:w-[200px] sm:w-[168px]"
            />
            <Typography variant="h1_ultra_bold" color="var(--primary-950)">
              Recuperar senha
            </Typography>
            <Typography variant="h3_ligth" color="var(--gray-700)">
              Informe o seu email para recuperar a senha
            </Typography>
          </div>
        }
        right={
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-full lg:w-[550px]"
            >
              <GlobalInput
                label="Seu email"
                placeholder="Insira o seu email"
                type="email"
                icon={<MdAlternateEmail />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <GlobalButton type="submit">
                Recuperar senha <FaArrowRightLong />
              </GlobalButton>
            </form>
          </>
        }
      ></AuthLayout>
    </>
  );
};

export default ForegotPasswordPage;
