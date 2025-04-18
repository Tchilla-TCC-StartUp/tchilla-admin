import { useBaseRequestHook } from "../hooks/BaseRequestHook";
import { UserData } from "../interfaces/UserInterface";
import UserRepository from "../repository/UserRepository";
import { useSnackbarStore } from "../stores/snackbar_store";

const ProfileService = () => {
  const { getUserData: repositoryGetUserData } = UserRepository();
  const { onRequest } = useBaseRequestHook();
  const { showSnackbar } = useSnackbarStore();
  return {
    fetchUserData: async (): Promise<UserData> => {
      return onRequest(
        async (token) => {
          return await repositoryGetUserData(token!);
        },
        undefined,
        (respose) => showSnackbar(respose.message, "error"),
        true
      );
    },
  };
};

export default ProfileService;
