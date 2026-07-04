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

            login({

                user: response.user

            });

            toast.success(response.message);

            navigate(ROUTES.DASHBOARD);

        },

        onError: (error) => {

            toast.error(error.message);

        }

    });

};

export default useLogin;