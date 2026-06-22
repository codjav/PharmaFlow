import express from 'express';
import {
    getSales,
    getSaleById,
    createSale,
    deleteSale,
    getPaginatedSales,
    searchSales,
    getSalesStats,
    getTodaySales,
    getRecentSales,
    getCustomerSales,
    updateSalePayment,
    markSalePaid,
    getMonthlySales,
    getSalesReport,
    getTopSellingMedicines,
    getInvoice,
    downloadInvoicePDF
} from "../controllers/sales.controller.js"

const router = express.Router();

router.get("/", getPaginatedSales);
router.post("/", createSale);
router.get("/search", searchSales);
router.get("/stats", getSalesStats);
router.get("/customer/:customerId", getCustomerSales);
router.patch("/:id/payment", updateSalePayment);
router.patch("/:id/mark-paid", markSalePaid);
router.get("/:id", getSaleById);
router.delete("/:id", deleteSale);
router.get("/today", getTodaySales);
router.get("/recent", getRecentSales);
router.get("/top-medicines", getTopSellingMedicines);
router.get("/monthly", getMonthlySales);
router.get("/report", getSalesReport);

router.get(
    "/:id/invoice",
    getInvoice
);

router.get(
    "/:id/pdf",
    downloadInvoicePDF
);

export default router;