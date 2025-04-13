import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import AppAssetsImages from "../resource/app_assets_images";
import NavigationHooks from "../hooks/navigation_hook";
import GlobalButton from "../components/Global/global_button";

const confirmEmail = () => {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-20">
        <div className="flex flex-col items-start justify-center min-h-screen bg-white px-20">
          
          <img
          src={AppAssetsImages.vectores.logotipo}
          alt="Logo"
          className="w-[160px] mb-10"
        />
    
          <h1 className="text-xl font-bold text-gray-900">PIN</h1>
          <p className="text-gray-500 max-w-sm mt-2">
            Enviamos um PIN de verificação para o seu email. Verifique seu email, por favor.
          </p>
    
          <div className="flex gap-3 mt-6">
            {pin.map((value, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
    
          <GlobalButton className="mt-6 w-[400px] bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center text-base font-semibold gap-2 hover:bg-blue-700 transition" onClick={NavigationHooks().navigateToReset}>
            Recuperar senha <FaArrowRight />
          </GlobalButton>
        </div>
        </div>
      );
    };
  

export default confirmEmail;