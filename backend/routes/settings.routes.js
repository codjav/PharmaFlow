import express from 'express';
import {
    getSystemSettings, updateSystemSettings, processPasswordChange,
    processUsernameChange, processUserLogout, processThemeToggle,
    getPrinterConfig, updatePrinterConfig, getInvoiceConfig,
    updateInvoiceConfig, getBackupConfig, updateBackupConfig,
    commitSnapshotBackup, commitSnapshotRestore, getBackupLogsHistory
} from '../controllers/settingController.js';

const router = express.Router();

// General Base Endpoint Operations Layout
router.route('/')
    .get(getSystemSettings)
    .put(updateSystemSettings);

// Identity Control Security Endpoints
router.patch('/change-password', processPasswordChange);
router.patch('/change-username', processUsernameChange);
router.patch('/theme', processThemeToggle);
router.post('/logout', processUserLogout);

// Layout Customization Modules Endpoints
router.route('/printer')
    .get(getPrinterConfig)
    .put(updatePrinterConfig);

router.route('/invoice')
    .get(getInvoiceConfig)
    .put(updateInvoiceConfig);

// Automated Storage Safety Modules Endpoints
router.route('/backup')
    .get(getBackupConfig)
    .put(updateBackupConfig);

router.get('/backup/history', getBackupLogsHistory);
router.post('/backup/create', commitSnapshotBackup);
router.post('/backup/restore', commitSnapshotRestore);

export default router;
