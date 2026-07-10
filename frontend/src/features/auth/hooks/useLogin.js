import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import * as authService from "@/services/auth.service";
import useAuth from "@/hooks/useAuth";
import ROUTES from "@/constants/routes";

const useLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    return useMutation({
        mutationFn: authService.login,

        onSuccess: (response) => {
            // Save login permanently
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    user: response.user,
                })
            );

            login({
                user: response.user,
            });

            toast.success(response.message);

            navigate(ROUTES.DASHBOARD, {
                replace: true,
            });
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                error.message ||
                "Login failed"
            );
        },
    });
};

export default useLogin;