import React from "react";
import Typography from "../typography";


type ModalVariant = "confirmation" | "success" | "warning" | "error" | "info";

interface GlobalConfirmModalProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: ModalVariant;
}

const GlobalConfirmModal: React.FC<GlobalConfirmModalProps> = ({
  show,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "confirmation",
}) => {
  React.useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (show) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.touchAction = "auto";
    };
  }, [show]);

  if (!show) return null;

  const variantStyles = {
    confirmation: {
      confirmButton: "bg-red-600 text-white hover:bg-red-700",
      cancelButton: "bg-gray-300 text-gray-800 hover:bg-gray-400",
      showCancel: true,
    },
    success: {
      confirmButton: "bg-green-600 text-white hover:bg-green-700",
      cancelButton: "",
      showCancel: false,
    },
    warning: {
      confirmButton: "bg-yellow-600 text-white hover:bg-yellow-700",
      cancelButton: "bg-gray-300 text-gray-800 hover:bg-gray-400",
      showCancel: true,
    },
    error: {
      confirmButton: "bg-red-600 text-white hover:bg-red-700",
      cancelButton: "",
      showCancel: false,
    },
    info: {
      confirmButton: "bg-blue-600 text-white hover:bg-blue-700",
      cancelButton: "",
      showCancel: false,
    },
  };

  const { confirmButton, cancelButton, showCancel } = variantStyles[variant];

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[400]"
        style={{
          overflow: show ? "hidden" : "auto",
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <Typography variant="h3_bold" className="mb-4">
            {title}
          </Typography>
          <Typography variant="p_normal" className="mb-6">
            {message}
          </Typography>
          <div className="flex justify-end gap-4">
            {showCancel && onCancel && (
              <button
                onClick={onCancel}
                className={`px-4 py-2 rounded ${cancelButton}`}
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded ${confirmButton}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalConfirmModal;
