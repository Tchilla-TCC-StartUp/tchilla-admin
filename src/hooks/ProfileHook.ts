import { useEffect, useState } from "react";
import ProfileService from "../service/ProfileService";
import { UserData } from "../interfaces/UserInterface";
import { useErrorHandlerHook } from "./ErrorHandlerHook";

const useProfile = () => {
  const { fetchUserData } = ProfileService();
  const { isError, screenType } = useErrorHandlerHook();
  const showErrorScreen = isError && screenType === "fullScreen";

  const [userData, setUserData] = useState<UserData>();

  const getUserData = async () => {
    const data = await fetchUserData();
    setUserData(data);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return {
    userData,
    showErrorScreen,
  };
};

export default useProfile;
