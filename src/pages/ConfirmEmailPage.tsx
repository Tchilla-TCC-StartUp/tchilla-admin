import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import AppAssetsImages from "../resource/app_assets_images";
import NavigationHooks from "../hooks/NavigationHook";
import GlobalButton from "../components/Global/GlobalButton";
import AppRoutes from "../resource/app_routes";
import AuthLayout from "../layouts/AuthLayout";
import GlobalAbsolutBackButton from "../components/Global/GlobalAbsolutBackButton";
import Typography from "../components/Global/Typography";
import GlobalInput from "../components/Global/GlobalInput";
const ConfirmEmail = () => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < pin.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <GlobalAbsolutBackButton href={AppRoutes.FOREGOT} />

      <AuthLayout
        left={
          <div className="mt-9">
            <img
              src={AppAssetsImages.vectores.logotipo}
              alt="Logo"
              className="w-[160px] mb-10"
            />

            <Typography variant="h1_ultra_bold">
              Código de Confirmação
            </Typography>

            <Typography variant="p_normal" className="text-gray-500">
              Enviamos um Código de Confirmação para o seu email. Verifique seu
              email, por favor.
            </Typography>
          </div>
        }
        right={
          <>
            <div className="flex gap-3 mt-6">
              {pin.map((value, index) => (
                <GlobalInput
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14"
                />
              ))}
            </div>

            <GlobalButton
              className="mt-6 w-full"
              onClick={NavigationHooks().navigateToReset}
            >
              Recuperar senha <FaArrowRight />
            </GlobalButton>
          </>
        }
      />
    </>
  );
};

export default ConfirmEmail;
