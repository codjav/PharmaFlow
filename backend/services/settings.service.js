import db from "../config/db.js"
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Secure path setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic fully qualified path definitions independent of server process entry points
const DATABASE_SOURCE_PATH = path.resolve(__dirname, "../database/pharmacy.db");
const BACKUPS_DIR_PATH = path.resolve(__dirname, "../backups");

// GET     /api/settings
// Get settings
export const getSettings = () => {
    return db.prepare(`
        SELECT *
        FROM settings
        LIMIT 1
    `).get();
};

// PUT     /api/settings
// Update settings
export const updateSettings = (data) => {
    const {
        pharmacy_name,
        owner_name,
        phone,
        email,
        address,
        gst_number,
        drug_license_number,
        invoice_prefix,
        purchase_prefix,
        currency,
        theme
    } = data;

    db.prepare(`
        UPDATE settings 
        SET 
            pharmacy_name = ?,
            owner_name = ?,
            phone = ?,
            email = ?,
            address = ?,
            gst_number = ?,
            drug_license_number = ?,
            invoice_prefix = ?,
            purchase_prefix = ?,
            currency = ?,
            theme = ?
        WHERE id = 1
    `).run(
        pharmacy_name,
        owner_name,
        phone,
        email,
        address,
        gst_number,
        drug_license_number,
        invoice_prefix,
        purchase_prefix,
        currency,
        theme
    );

    return getSettings();
};
 
// PATCH /api/settings/change-password
// Change Password
export const changePassword = (currentPassword, newPassword) => {
    const user = db.prepare(`
        SELECT *
        FROM users
        LIMIT 1
    `).get();

    const match = bcrypt.compareSync(
        currentPassword,
        user.password
    );

    if(!match) {
        throw new AppError(
            "Current password is incorrect",
            400
        );
    }

    const hashedPassword = bcrypt.hashSync(
        newPassword,
        10
    );

    db.prepare(`
        UPDATE users
        SET password = ?
        WHERE id = ?
    `).run(
        hashedPassword,
        user.id
    );
};

// PATCH /api/settings/change-username
// Change username
export const changeUsername = (newUsername) => {
    db.prepare(`
        UPDATE users
        SET username = ?
        WHERE id = 1
    `).run(newUsername);
};

// POST  /api/auth/logout
// Logout
export const logout = () => {
    return {
        success: true,
        message: "Logged out successfully"
    };
};

// PATCH /api/settings/theme
// Theme
export const updateTheme = (theme) => {
    db.prepare(`
        UPDATE settings
        SET theme = ?
        WHERE id = 1
    `).run(theme);
};

// GET     /api/settings/printer
// Get printer settings
export const getPrinterSettings = () => {
    return db.prepare(`
        SELECT 
            printer_type,
            default_printer,
            invoice_size
        FROM settings
        LIMIT 1
    `).get();
};

// PUT     /api/settings/printer
// Update printer settings
export const updatePrinterSettings = (
    printer_type,
    default_printer,
    invoice_size
) => {
    db.prepare(`
        UPDATE settings
        SET 
            printer_type = ?,
            default_printer = ?,
            invoice_size = ?
        WHERE id = 1
    `).run(
        printer_type,
        default_printer,
        invoice_size
    );
};

// GET     /api/settings/invoice
// Get invoice settings
export const getInvoiceSettings = () => {
    return db.prepare(`
        SELECT 
            invoice_prefix,
            purchase_prefix,
            currency,
            show_logo,
            show_gst,
            footer_message
        FROM settings
        LIMIT 1
    `).get();
};

// PUT     /api/settings/invoice
// Update invoice settings
export const updateInvoiceSettings = (
    invoice_prefix,
    purchase_prefix,
    currency,
    show_logo,
    show_gst,
    footer_message
) => {
    db.prepare(`
        UPDATE settings
        SET
            invoice_prefix = ?,
            purchase_prefix = ?,
            currency = ?,
            show_logo = ?,
            show_gst = ?,
            footer_message = ?
        WHERE id = 1
    `).run(
        invoice_prefix,
        purchase_prefix,
        currency,
        show_logo,
        show_gst,
        footer_message
    );
};

// GET     /api/settings/backup
// Get backup settings
export const getBackupSettings = () => {
    return db.prepare(`
        SELECT 
            auto_backup,
            backup_location,
            backup_frequency
        FROM settings
        LIMIT 1
    `).get();
};

// PUT     /api/settings/backup
// Update backup settings
export const updateBackupSettings = (
    auto_backup,
    backup_location,
    backup_frequency
) => {
    db.prepare(`
        UPDATE settings
        SET 
            auto_backup = ?,
            backup_location = ?,
            backup_frequency = ?
        WHERE id = 1
    `).run(
        auto_backup,
        backup_location,
        backup_frequency
    );

    return getBackupSettings();
};

// POST    /api/settings/backup/create
// Create backup
export const createBackup = () => {
    if (!fs.existsSync(BACKUPS_DIR_PATH)) {
        fs.mkdirSync(BACKUPS_DIR_PATH, { recursive: true });
    }

    const timestamp = Date.now();
    const fileName = `backup-${timestamp}.db`;
    const destination = path.join(BACKUPS_DIR_PATH, fileName);

    fs.copyFileSync(DATABASE_SOURCE_PATH, destination);

    db.prepare(`
        INSERT INTO backup_history(file_name, file_path)
        VALUES(?, ?)
    `).run(fileName, destination);

    return {
        fileName,
        destination
    };
};

// POST    /api/settings/backup/restore
// Restore backup
export const restoreBackup = (backupPath) => {
    if (!fs.existsSync(backupPath)) {
        throw new AppError("Target system file archive backup variant layout not found", 404);
    }

    fs.copyFileSync(backupPath, DATABASE_SOURCE_PATH);
};

// GET     /api/settings/backup/history
// Backup history
export const getBackupHistory = () => {
    return db.prepare(`
        SELECT *
        FROM backup_history
        ORDER BY backup_date DESC
    `).all();
};
