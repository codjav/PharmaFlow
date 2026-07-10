import * as settingService from "../services/settings.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";



// ============================
// General Settings
// ============================

export const getSystemSettings = asyncHandler(async (req, res) => {
    const data = settingService.getSettings();

    res.status(200).json({
        success: true,
        data,
    });
});

export const updateSystemSettings = asyncHandler(async (req, res) => {
    const data = settingService.updateSettings(req.body);

    res.status(200).json({
        success: true,
        message: "Settings updated successfully.",
        data,
    });
});



// ============================
// Security
// ============================

export const processUsernameChange = asyncHandler(async (req, res, next) => {
    const { newUsername } = req.body;

    if (!newUsername?.trim()) {
        return next(new AppError("Please provide a valid username.", 400));
    }

    settingService.changeUsername(newUsername);

    res.status(200).json({
        success: true,
        message: "Username changed successfully.",
    });
});



export const processPasswordChange = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return next(
            new AppError(
                "Current password and new password are required.",
                400
            )
        );
    }

    settingService.changePassword(
        currentPassword,
        newPassword
    );

    res.status(200).json({
        success: true,
        message: "Password changed successfully.",
    });
});



export const processThemeToggle = asyncHandler(async (req, res, next) => {
    const { theme } = req.body;

    if (!theme) {
        return next(new AppError("Theme is required.", 400));
    }

    settingService.updateTheme(theme);

    res.status(200).json({
        success: true,
        message: "Theme updated successfully.",
    });
});



export const processUserLogout = asyncHandler(async (req, res) => {
    const data = settingService.logout();

    res.status(200).json(data);
});



// ============================
// Backup
// ============================

export const getBackupConfig = asyncHandler(async (req, res) => {
    const data = settingService.getBackupSettings();

    res.status(200).json({
        success: true,
        data,
    });
});



export const updateBackupConfig = asyncHandler(async (req, res) => {
    const {
        auto_backup,
        backup_location,
        backup_frequency,
    } = req.body;

    const data = settingService.updateBackupSettings(
        auto_backup,
        backup_location,
        backup_frequency
    );

    res.status(200).json({
        success: true,
        message: "Backup settings updated successfully.",
        data,
    });
});



export const commitSnapshotBackup = asyncHandler(async (req, res) => {
    const data = settingService.createBackup();

    res.status(201).json({
        success: true,
        message: "Backup created successfully.",
        data,
    });
});



export const commitSnapshotRestore = asyncHandler(async (req, res, next) => {
    const { backup_path } = req.body;

    if (!backup_path) {
        return next(new AppError("Backup path is required.", 400));
    }

    settingService.restoreBackup(backup_path);

    res.status(200).json({
        success: true,
        message: "Backup restored successfully.",
    });
});



export const getBackupLogsHistory = asyncHandler(async (req, res) => {
    const history = settingService.getBackupHistory();

    res.status(200).json({
        success: true,
        count: history.length,
        data: history,
    });
});