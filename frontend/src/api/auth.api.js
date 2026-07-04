import api from "./axios";

export const login = async (credentials) => {
    const {data} = await api.post(
        "/auth/login",
        credentials
    );

    return data;
};

export const logout = async () => {
    const {data} = await api.post(
        "/auth/logout"
    );

    return data;
};

export const getCurrentUser = async () => {
    const {data} = await api.get(
        "/auth/me"
    );

    return data;
}