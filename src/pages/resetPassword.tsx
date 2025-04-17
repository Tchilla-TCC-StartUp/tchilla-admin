import { FaArrowRight } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import AppAssetsImages from "../resource/app_assets_images";
import GlobalAbsolutBackButton from "../components/Global/global_absolut_back_button";
import AppRoutes from "../resource/app_routes";
import AuthLayout from "../layouts/AuthLayout";
import Typography from "../components/typography";
import GlobalButton from "../components/Global/global_button";
import GlobalInput from "../components/Global/global_input";

const ResetPassword = () => {
  return (
    <>
      <GlobalAbsolutBackButton href={AppRoutes.CONFIRM} />

      <AuthLayout
        left={
          <div className="mt-9">
            <img
              src={AppAssetsImages.vectores.logotipo}
              alt="Logo"
              className="w-[168px] h-auto lg:w-[268px] md:w-[200px] sm:w-[168px]"
            />

            <h1 className="text-2xl font-bold text-gray-900">
              Definir uma nova senha
            </h1>
            <p className="text-gray-500 mt-2">
              Informe a nova senha para sua conta
            </p>
          </div>
        }
        right={
          <>
            <GlobalInput
              placeholder="Confirme a nova senha"
              icon={<MdLockOutline />}
            />

            <Typography variant="p_normal" className="text-gray-600">
              A senha deve ter no mínimo 8 caracteres, incluindo uma letra
              maiúscula, uma letra minúscula, um número e um caractere especial
              (@, $, %, &, etc.).
            </Typography>

            <GlobalInput
              placeholder="Confirme a nova senha"
              icon={<MdLockOutline />}
            />

            <GlobalInput
              placeholder="Confirme a nova senha"
              icon={<MdLockOutline />}
            />

            <GlobalButton>
              Atualizar senha <FaArrowRight />
            </GlobalButton>
          </>
        }
      />
    </>
  );
};

export default ResetPassword;
