import * as settingService from '../services/settings.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';

export const getSystemSettings = asyncHandler(async (req, res) => {
    const data = settingService.getSettings();
    res.status(200).json({ success: true, data });
});

export const updateSystemSettings = asyncHandler(async (req, res) => {
    const data = settingService.updateSettings(req.body);
    res.status(200).json({ success: true, message: "General configuration properties successfully committed", data });
});

export const processPasswordChange = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return next(new AppError("Please supply both running context currentPassword and target newPassword values", 400));
    }
    settingService.changePassword(currentPassword, newPassword);
    res.status(200).json({ success: true, message: "Security user profile password successfully altered" });
});

export const processUsernameChange = asyncHandler(async (req, res, next) => {
    const { newUsername } = req.body;
    if (!newUsername?.trim()) {
        return next(new AppError("Please provide a valid text value argument string profile signature", 400));
    }
    settingService.changeUsername(newUsername);
    res.status(200).json({ success: true, message: "Authentication access login username key successfully altered" });
});

export const processUserLogout = asyncHandler(async (req, res) => {
    const summary = settingService.logout();
    res.status(200).json(summary);
});

export const processThemeToggle = asyncHandler(async (req, res, next) => {
    const { theme } = req.body;
    if (!theme) return next(new AppError("Please provide an initialization theme configuration property value string", 400));
    settingService.updateTheme(theme);
    res.status(200).json({ success: true, message: "Workspace user interface presentation styles successfully saved" });
});

export const getPrinterConfig = asyncHandler(async (req, res) => {
    const data = settingService.getPrinterSettings();
    res.status(200).json({ success: true, data });
});

export const updatePrinterConfig = asyncHandler(async (req, res) => {
    const { printer_type, default_printer, invoice_size } = req.body;
    const data = settingService.updatePrinterSettings(printer_type, default_printer, invoice_size);
    res.status(200).json({ success: true, message: "Hardware print driver configuration maps updated cleanly", data });
});

export const getInvoiceConfig = asyncHandler(async (req, res) => {
    const data = settingService.getInvoiceSettings();
    res.status(200).json({ success: true, data });
});

export const updateInvoiceConfig = asyncHandler(async (req, res) => {
    const { invoice_prefix, purchase_prefix, currency, show_logo, show_gst, footer_message } = req.body;
    const data = settingService.updateInvoiceSettings(invoice_prefix, purchase_prefix, currency, show_logo, show_gst, footer_message);
    res.status(200).json({ success: true, message: "System billing voucher configuration metrics altered", data });
});

export const getBackupConfig = asyncHandler(async (req, res) => {
    const data = settingService.getBackupSettings();
    res.status(200).json({ success: true, data });
});

export const updateBackupConfig = asyncHandler(async (req, res) => {
    const { auto_backup, backup_location, backup_frequency } = req.body;
    const data = settingService.updateBackupSettings(auto_backup, backup_location, backup_frequency);
    res.status(200).json({ success: true, message: "System maintenance hot backup intervals tracking configuration metrics saved", data });
});

export const commitSnapshotBackup = asyncHandler(async (req, res) => {
    const details = settingService.createBackup();
    res.status(201).json({ success: true, message: "Database core archive backup variant generated cleanly", data: details });
});

export const commitSnapshotRestore = asyncHandler(async (req, res, next) => {
    const { backup_path } = req.body;
    if (!backup_path) return next(new AppError("Please specify a path target mapping parameter location coordinate", 400));
    settingService.restoreBackup(backup_path);
    res.status(200).json({ success: true, message: "Database core operational context roll-back sequence finished cleanly" });
});

export const getBackupLogsHistory = asyncHandler(async (req, res) => {
    const historyLogs = settingService.getBackupHistory();
    res.status(200).json({ success: true, count: historyLogs.length, data: historyLogs });
});
