import db from "../config/db.js"
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js"

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

// POST /api/settings/backup


// POST /api/settings/restore
