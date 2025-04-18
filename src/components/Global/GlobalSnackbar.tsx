import { motion } from "framer-motion";

import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import { useSnackbarStore } from "../../stores/snackbar_store";
import Typography from "./Typography";

const GlobalSnackbar = () => {
  const { isVisible, message, type } = useSnackbarStore();

  if (!isVisible) return null;

  const snackbarStyles = {
    info: {
      bg: "bg-blue-500 text-white",
      icon: <FaInfoCircle className="text-white" />,
    },
    success: {
      bg: "bg-green-500 text-white",
      icon: <FaCheckCircle className="text-white" />,
    },
    warning: {
      bg: "bg-yellow-500 text-black",
      icon: <FaExclamationTriangle className="text-white" />,
    },
    error: {
      bg: "bg-red-600 text-white",
      icon: <FaTimesCircle className="text-white" />,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={`fixed  left-0 bottom-0 right-0 flex items-center gap-3 px-8 py-4 z-[102] ${snackbarStyles[type].bg}`}
    >
      {snackbarStyles[type].icon}
      <Typography variant="h3_medium" className="text-white">
        {message}
      </Typography>
    </motion.div>
  );
};

export default GlobalSnackbar;
