import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface GlobalBackButtonProps {
  href?: string;
  onClick?: () => void;
}

const GlobalBackButton: React.FC<GlobalBackButtonProps> = ({
  href,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      navigate(href);
    }
  };

  return (
    <div
      className="w-[30px] h-[30px]  md:w-[40px] md:h-[40px] text-gray-600 border mb-10 rounded-lg border-gray-600 flex items-center justify-center text-[25px] cursor-pointer"
      onClick={handleClick}
    >
      <FaArrowLeftLong className="text-[15px] md:text-[20px]" />
    </div>
  );
};

export default GlobalBackButton;
