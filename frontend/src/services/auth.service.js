import * as authApi from "@/api/auth.api";

export const login = async (credentials) => {
    const response = await authApi.login(credentials);

    if (!response.success) {
        throw new Error(response.message);
    }

    return response;
};

export const logout = async () => {
    return authApi.logout();
};