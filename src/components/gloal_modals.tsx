import Typography from "./typography";

interface GlobalConfirmModalProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const GlobalConfirmModal: React.FC<GlobalConfirmModalProps> = ({
  show,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <Typography variant="h3_bold" className="mb-4">
          {title}
        </Typography>
        <Typography variant="p_normal" className="mb-6">
          {message}
        </Typography>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalConfirmModal;
