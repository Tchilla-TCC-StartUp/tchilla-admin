import { useState, useRef, useEffect } from "react";
import { AppGlobalUserAvatarName } from "./global_user_avatar_name";
import Typography from "./typography";
import { IoChevronDownOutline, IoLogOutOutline } from "react-icons/io5";
import UserService from "../service/user_service";
import Shimmer from "./global_shimmers";
import GlobalModalLoading from "./global_modal_loading";

const GlobalUserMenu = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { storedUser, onLogout, fetchUserData } = UserService();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await onLogout();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    const fetchData = async () => {
      await fetchUserData();
    };
    fetchData();
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mr-[15%]" ref={menuRef}>
      <div
        className="flex items-center justify-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {storedUser === null ? (
          <Shimmer type="avatar" width="34px" height="34px" rounded />
        ) : (
          <AppGlobalUserAvatarName
            name={storedUser?.nome ?? "User"}
            size={34}
          />
        )}

        {storedUser === null ? (
          <Shimmer type="text" width="150px" height="18px" />
        ) : (
          <>
            <Typography variant="h3_bold" className="text-gray-900">
              {storedUser?.nome}
            </Typography>
            <IoChevronDownOutline className="text-gray-900" />
          </>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden z-50 cursor-pointer">
          <ul className="divide-y divide-gray-200">
            <li>
              <Typography
                variant="h3_normal"
                onClick={handleLogout}
                className="text-red-800 px-4 py-2 flex items-center gap-2 hover:bg-primary-200"
              >
                <IoLogOutOutline /> Sair
              </Typography>
            </li>
          </ul>
        </div>
      )}
      <GlobalModalLoading isVisible={isLoading} message="Fazendo Logout...." />
    </div>
  );
};

export default GlobalUserMenu;
