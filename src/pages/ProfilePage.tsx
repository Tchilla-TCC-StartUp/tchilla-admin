import { Card } from "../components/Global/GlobalCards";
import GlobalInput from "../components/Global/GlobalInput";
import GlobalPhoneNumberInput from "../components/Global/GlobalPhoneNumberInput";
import { AppGlobalUserAvatarName } from "../components/Global/GlobalUserAvatarName";
import useProfile from "../hooks/ProfileHook";
import ErrorScreen from "./ErrorPage";

const ProfilePage = () => {
  const { userData, showErrorScreen } = useProfile();
  const renderBody = () => {
    return (
      <div className="flex flex-1 items-center justify-center flex-col gap-3">
        {userData ? (
          <>
            <AppGlobalUserAvatarName name={userData?.nome ?? ""} size={100} />
            <Card className=" w-full lg:w-[50%]  md:w-[80%] flex flex-col items-start justify-center gap-2 md:gap-3 p-2 md:p-5">
              <GlobalInput value={userData?.nome} label="Nome" />
              <GlobalInput value={userData?.email} label="Email" />
              <GlobalPhoneNumberInput
                label="Número de Telefone"
                hintText="923 000 000"
                initialCountryCode="AO"
                value={userData?.telefone}
              />
              <GlobalInput value="ddddddddd" type="password" label="Password" />
            </Card>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };
  return showErrorScreen ? <ErrorScreen /> : renderBody();
};

export default ProfilePage;
