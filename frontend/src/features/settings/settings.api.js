import api from "@/api/axios";



// ==============================
// General Settings
// ==============================

export const getSettings = async () => {
    const { data } = await api.get("/settings");
    return data;
};

export const updateSettings = async (payload) => {
    const { data } = await api.put("/settings", payload);
    return data;
};



// ==============================
// Security
// ==============================

export const changeUsername = async (payload) => {
    const { data } = await api.patch(
        "/settings/change-username",
        payload
    );

    return data;
};

export const changePassword = async (payload) => {
    const { data } = await api.patch(
        "/settings/change-password",
        payload
    );

    return data;
};

export const changeTheme = async (payload) => {
    const { data } = await api.patch(
        "/settings/theme",
        payload
    );

    return data;
};

export const logout = async () => {
    const { data } = await api.post("/settings/logout");
    return data;
};



// ==============================
// Backup
// ==============================

export const getBackupSettings = async () => {
    const { data } = await api.get("/settings/backup");
    return data;
};

export const updateBackupSettings = async (payload) => {
    const { data } = await api.put(
        "/settings/backup",
        payload
    );

    return data;
};

export const createBackup = async () => {
    const { data } = await api.post(
        "/settings/backup/create"
    );

    return data;
};

export const restoreBackup = async (payload) => {
    const { data } = await api.post(
        "/settings/backup/restore",
        payload
    );

    return data;
};

export const getBackupHistory = async () => {
    const { data } = await api.get(
        "/settings/backup/history"
    );

    return data;
};



export default {
    getSettings,
    updateSettings,

    changeUsername,
    changePassword,
    changeTheme,
    logout,

    getBackupSettings,
    updateBackupSettings,

    createBackup,
    restoreBackup,
    getBackupHistory,
};