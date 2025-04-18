import { useSnackbarStore } from "../stores/snackbar_store";


type ValidationResult = {
    isValid: boolean;
    errors: { [key: string]: string };
};

const useValidation = () => {
    const { showSnackbar } = useSnackbarStore();

    const validateEmail = (email: string): string | null => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!email) {
            return "Email é obrigatório!";
        } else if (!emailRegex.test(email)) {
            return "Email inválido!";
        }
        return null;
    };

    const validatePassword = (password: string): string | null => {
        if (!password) {
            return "Senha é obrigatória!";
        } else if (password.length < 6) {
            return "A senha deve ter pelo menos 6 caracteres!";
        }
        return null;
    };

    const validateForm = (email: string, password: string): ValidationResult => {
        const errors: { [key: string]: string } = {};

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError) {
            errors.email = emailError;
        }

        if (passwordError) {
            errors.password = passwordError;
        }

        const isValid = Object.keys(errors).length === 0;

        if (!isValid) {
            Object.values(errors).forEach((errorMessage) => {
                showSnackbar(errorMessage, "warning");
            });
        }

        return { isValid, errors };
    };

    return { validateForm };
};

export default useValidation;
