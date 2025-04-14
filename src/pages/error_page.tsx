import { useErrorHandlerHook } from "../hooks/error_handler_hook";
import Typography from "../components/typography";
import GlobalButton from "../components/Global/global_button";

const ErrorScreen = () => {
  const { isError, errorMessage, screenType, retryLastRequest } =
    useErrorHandlerHook();
  if (!isError || screenType !== "fullScreen") return null;

  return (
    <div className="fixed inset-0 bg-white  flex items-center justify-center z-[200]">
      <div className="bg-white p-6  max-w-md w-full">
        <Typography variant="h1_bold" className="text-red-500">
          Erro
        </Typography>
        <Typography variant="h2_normal" className="mt-2">
          {errorMessage}
        </Typography>
        <div className="mt-4 flex gap-4">
          <GlobalButton onClick={retryLastRequest} className="w-full">
            Tentar Novamente
          </GlobalButton>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
