import express from "express";

import {
    getSystemSettings,
    updateSystemSettings,
    processPasswordChange,
    processUsernameChange,
    processThemeToggle,
    processUserLogout,
    getBackupConfig,
    updateBackupConfig,
    commitSnapshotBackup,
    commitSnapshotRestore,
    getBackupLogsHistory,
} from "../controllers/settings.controller.js";

const router = express.Router();



// ==========================
// General Settings
// ==========================

router
    .route("/")
    .get(getSystemSettings)
    .put(updateSystemSettings);



// ==========================
// Security
// ==========================

router.patch("/change-username", processUsernameChange);

router.patch("/change-password", processPasswordChange);

router.patch("/theme", processThemeToggle);

router.post("/logout", processUserLogout);



// ==========================
// Backup
// ==========================

router
    .route("/backup")
    .get(getBackupConfig)
    .put(updateBackupConfig);

router.get("/backup/history", getBackupLogsHistory);

router.post("/backup/create", commitSnapshotBackup);

router.post("/backup/restore", commitSnapshotRestore);



export default router;