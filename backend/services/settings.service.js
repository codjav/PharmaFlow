import db from "../config/db.js";
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES Module Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_SOURCE_PATH = path.resolve(
    __dirname,
    "../database/pharmacy.db"
);

const settings = db.prepare(`
    SELECT backup_location
    FROM settings
    LIMIT 1
`).get();

const backupDirectory =
    settings?.backup_location ||
    path.join(os.homedir(), "Downloads", "Pharmacy Backups");



/* ==========================================================
   GENERAL SETTINGS
========================================================== */

export const getSettings = () => {
    return db.prepare(`
        SELECT
            pharmacy_name,
            owner_name,
            phone,
            email,
            address,
            gst_number,
            drug_license_number,
            theme,
            auto_backup,
            backup_location,
            backup_frequency
        FROM settings
        LIMIT 1
    `).get();
};

export const updateSettings = (data) => {

    const {
        pharmacy_name,
        owner_name,
        phone,
        email,
        address,
        gst_number,
        drug_license_number,
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
        theme
    );

    return getSettings();
};



/* ==========================================================
   SECURITY
========================================================== */

export const changeUsername = (newUsername) => {

    const existing = db.prepare(`
        SELECT id
        FROM users
        WHERE username = ?
    `).get(newUsername);

    if (existing) {
        throw new AppError(
            "Username already exists.",
            400
        );
    }

    db.prepare(`
        UPDATE users
        SET username = ?
        WHERE id = 1
    `).run(newUsername);
};



export const changePassword = (
    currentPassword,
    newPassword
) => {

    const user = db.prepare(`
        SELECT *
        FROM users
        LIMIT 1
    `).get();

    const match = bcrypt.compareSync(
        currentPassword,
        user.password
    );

    if (!match) {
        throw new AppError(
            "Current password is incorrect.",
            400
        );
    }

    if (newPassword.length < 6) {
        throw new AppError(
            "Password must be at least 6 characters.",
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



export const updateTheme = (theme) => {

    if (!["LIGHT", "DARK"].includes(theme)) {
        throw new AppError(
            "Invalid theme.",
            400
        );
    }

    db.prepare(`
        UPDATE settings
        SET theme = ?
        WHERE id = 1
    `).run(theme);
};



export const logout = () => {
    return {
        success: true,
        message: "Logged out successfully."
    };
};



/* ==========================================================
   BACKUP SETTINGS
========================================================== */

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



/* ==========================================================
   CREATE BACKUP
========================================================== */

export const createBackup = () => {

    if (!fs.existsSync(backupDirectory)) {
        fs.mkdirSync(
            backupDirectory,
            { recursive: true }
        );
    }

    const timestamp = Date.now();

    const fileName = `backup-${timestamp}.db`;

    const destination = path.join(
        backupDirectory,
        fileName
    );

    fs.copyFileSync(
        DATABASE_SOURCE_PATH,
        destination
    );

    db.prepare(`
        INSERT INTO backup_history(
            file_name,
            file_path
        )
        VALUES(?, ?)
    `).run(
        fileName,
        destination
    );

    return {
        fileName,
        destination
    };

};



/* ==========================================================
   RESTORE BACKUP
========================================================== */

export const restoreBackup = (backupPath) => {

    if (!fs.existsSync(backupPath)) {
        throw new AppError(
            "Backup file not found.",
            404
        );
    }

    try {

        fs.copyFileSync(
            backupPath,
            DATABASE_SOURCE_PATH
        );

    } catch {

        throw new AppError(
            "Unable to restore backup.",
            500
        );

    }

};



/* ==========================================================
   BACKUP HISTORY
========================================================== */

export const getBackupHistory = () => {

    return db.prepare(`
        SELECT *
        FROM backup_history
        ORDER BY backup_date DESC
    `).all();

};