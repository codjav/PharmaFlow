import settingsApi from "./settings.api";



// ==============================
// General Settings
// ==============================

const getSettings = async () => {
    const response = await settingsApi.getSettings();
    return response.data;
};

const updateSettings = async (payload) => {
    const response = await settingsApi.updateSettings(payload);
    return response.data;
};



// ==============================
// Security
// ==============================

const changeUsername = async (payload) => {
    const response = await settingsApi.changeUsername(payload);
    return response;
};

const changePassword = async (payload) => {
    const response = await settingsApi.changePassword(payload);
    return response;
};

const changeTheme = async (payload) => {
    const response = await settingsApi.changeTheme(payload);
    return response;
};

const logout = async () => {
    const response = await settingsApi.logout();
    return response;
};



// ==============================
// Backup
// ==============================

const getBackupSettings = async () => {
    const response = await settingsApi.getBackupSettings();
    return response.data;
};

const updateBackupSettings = async (payload) => {
    const response = await settingsApi.updateBackupSettings(payload);
    return response.data;
};

const createBackup = async () => {
    const response = await settingsApi.createBackup();
    return response.data;
};

const restoreBackup = async (payload) => {
    const response = await settingsApi.restoreBackup(payload);
    return response;
};

const getBackupHistory = async () => {
    const response = await settingsApi.getBackupHistory();
    return response.data;
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