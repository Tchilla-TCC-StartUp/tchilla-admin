import { motion } from "framer-motion";
import { useSnackbarStore } from "../stores/snackbar_store";
import Typography from "./typography";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

const GlobalSnackbar = () => {
  const { isVisible, message, type } = useSnackbarStore();

  if (!isVisible) return null;

  const snackbarStyles = {
    info: {
      bg: "bg-blue-500 text-white",
      icon: <FaInfoCircle className="text-white text-xl" />,
    },
    success: {
      bg: "bg-green-500 text-white",
      icon: <FaCheckCircle className="text-white text-xl" />,
    },
    warning: {
      bg: "bg-yellow-500 text-black",
      icon: <FaExclamationTriangle className="text-white text-xl" size={40} />,
    },
    error: {
      bg: "bg-red-500 text-white",
      icon: <FaTimesCircle className="text-white text-xl" size={40} />,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-8 py-4 rounded-lg shadow-lg w-[20rem] ${snackbarStyles[type].bg}`}
    >
      {snackbarStyles[type].icon}
      <Typography variant="h3_medium" className="text-white">
        {message}
      </Typography>
    </motion.div>
  );
};

export default GlobalSnackbar;
