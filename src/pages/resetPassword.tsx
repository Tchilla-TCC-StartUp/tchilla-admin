import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AppAssetsImages from "../resource/app_assets_images";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-20">
    <div className="flex flex-col items-start justify-center min-h-screen px-20 bg-white">
      {/* Logo */}
      <img
          src={AppAssetsImages.vectores.logotipo}
          alt="Logo"
          className="w-[160px] mb-10"
        />

      {/* Título e descrição */}
      <h1 className="text-2xl font-bold text-gray-900">Definir uma nova senha</h1>
      <p className="text-gray-500 mt-2">Informe a nova senha para sua conta</p>

      {/* Input: Nova Senha */}
      <div className="relative w-[400px] mt-6">
        <MdLockOutline className="absolute left-4 top-4 text-gray-400 text-lg" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Informe a nova senha"
          className="w-full h-12 px-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-3 text-gray-400"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>

      {/* Requisitos da senha */}
      <p className="text-gray-500 text-sm mt-2 w-[400px]">
        A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@, $, %, &, etc.).
      </p>

      {/* Input: Confirmar Senha */}
      <div className="relative w-[400px] mt-4">
        <MdLockOutline className="absolute left-4 top-4 text-gray-400 text-lg" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirme a nova senha"
          className="w-full h-12 px-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-3 text-gray-400"
        >
          {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>

      {/* Botão Atualizar Senha */}
      <button className="mt-6 w-[400px] h-12 bg-blue-900 text-white rounded-lg flex items-center justify-center text-base font-semibold gap-2 hover:bg-blue-950 transition">
        Atualizar senha <FaArrowRight />
      </button>
    </div>
    </div>
  );
};


export default ResetPassword;