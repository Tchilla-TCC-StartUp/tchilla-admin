import { useErrorHandlerHook } from "../hooks/ErrorHandlerHook";
import Typography from "../components/Global/Typography";
import GlobalButton from "../components/Global/GlobalButton";

const ErrorScreen = () => {
  const { isError, errorMessage, screenType, retryLastRequest, isRetrying } =
    useErrorHandlerHook();

  if (!isError || screenType !== "fullScreen") return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[200]">
      <div className="bg-white p-6 max-w-md w-full shadow-md rounded-xl">
        <Typography variant="h1_bold" className="text-red-500">
          Erro
        </Typography>
        <Typography variant="h2_normal" className="mt-2">
          {errorMessage}
        </Typography>
        <div className="mt-4 flex gap-4">
          <GlobalButton
            onClick={retryLastRequest}
            variant="error"
            className="w-full"
            disabled={isRetrying}
          >
            {isRetrying ? "Tentando novamente..." : "Tentar Novamente"}
          </GlobalButton>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
