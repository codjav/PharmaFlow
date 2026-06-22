import express from "express";

import {
    getLowStockMedicines,
    getNearExpiryMedicines,
    getExpiredMedicines,
    getCustomerDueAlerts,
    getSupplierDueAlerts,
    getAlertSummary
} from "../controllers/alert.controller.js";

const router = express.Router();

router.get("/low-stock", getLowStockMedicines);
router.get("/90-expiry", get90ExpiryMedicines);
router.get("/near-expiry", getNearExpiryMedicines);
router.get("/expired", getExpiredMedicines);
router.get("/customer-dues", getCustomerDueAlerts);
router.get("/supplier-dues", getSupplierDueAlerts);
router.get("/summary", getAlertSummary);

export default router;