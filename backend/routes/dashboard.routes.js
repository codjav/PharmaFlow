import express from 'express';
import {
    getDashboardStats,
    getDashboardSummary,
    getRecentSales,
    getRecentPurchases,
    getTopMedicines,
    getTopCustomers,
    getLowStockInventory,
    getExpiringBatches,
    getMonthlySalesChart,
    getMonthlyPurchaseChart
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/recent-sales", getRecentSales);
router.get("/recent-purchases", getRecentPurchases);
router.get("/top-medicines", getTopMedicines);
router.get("/top-customers", getTopCustomers);
router.get("/low-stock", getLowStockInventory);
router.get("/expiring-batches", getExpiringBatches);
router.get("/monthly-sales", getMonthlySalesChart);
router.get("/monthly-purchases", getMonthlyPurchaseChart);
router.get("/summary", getDashboardSummary);

export default router;