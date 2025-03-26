import  {FaArrowLeftLong} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


interface GlobalBackButtonProps {
  href?: string;
  onClick?: () => void;
}

const GlobalBackButton: React.FC<GlobalBackButtonProps> = ({ href, onClick }) => {
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
      className="w-[50px] h-[50px] text-primary-800 border mb-10 rounded-lg border-primary-800 flex items-center justify-center text-[25px] cursor-pointer"
      onClick={handleClick}
    >
      <FaArrowLeftLong />
    </div>
  );
};

export default GlobalBackButton;
