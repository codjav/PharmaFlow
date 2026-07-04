const TOKEN_KEY = "pharmaflow_token";
const USER_KEY = "pharmaflow_user";

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const saveUSer = (user) => {
    localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    );
};

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user
        ? JSON.parse(user)
        : null;
};

export const clearAuthStorage = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};
