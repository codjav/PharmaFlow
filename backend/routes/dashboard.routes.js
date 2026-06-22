import express from 'express';
import {
    getDashboardStats,
    getRecentSales,
    getRecentPurchases,
    getTopMedicines,
    getTopCustomers,
    getLowStockMedicines,
    getNearExpiryMedicines,
    getMonthlySalesChart,
    getMonthlyPurchaseChart
} from "../controllers/dashboard.controller.js"

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/recent-sales", getRecentSales);
router.get("/recent-purchases", getRecentPurchases);
router.get("/top-medicines", getTopMedicines);
router.get("/top-customers", getTopCustomers);
router.get("/low-stock", getLowStockMedicines);
router.get("/near-expiry", getNearExpiryMedicines);
router.get("/monthly-sales", getMonthlySalesChart);
router.get("/monthly-purchases", getMonthlyPurchaseChart);

export default router;