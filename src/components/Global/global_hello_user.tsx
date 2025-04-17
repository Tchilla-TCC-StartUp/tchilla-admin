import UserService from "../../service/UserService";
import Shimmer from "./global_shimmers";
import Typography from "../typography";

const GlobalHelloUser = () => {
  const { storedUser } = UserService();
  return (
    <div className="flex flex-col items-start justify-center gap-1">
      {storedUser != null ? (
        <Typography variant="p_medium" className="text-gray-500">
          Hello Admin,
        </Typography>
      ) : (
        <Shimmer type="text" width="120px" />
      )}
      {storedUser != null ? (
        <Typography variant="onboarding_title" className="text-gray-800">
          {storedUser?.nome}
        </Typography>
      ) : (
        <Shimmer type="text" width="150px" />
      )}
    </div>
  );
};

export default GlobalHelloUser;
