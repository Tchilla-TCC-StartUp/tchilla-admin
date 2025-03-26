import NavigationHooks from "../hooks/navigation_hook";
const LoginService = () => {
  const navigator = NavigationHooks();
  return {
    onLogin: () => {
      navigator.navigateToHome();
    },
    
  };
};

export default LoginService;
