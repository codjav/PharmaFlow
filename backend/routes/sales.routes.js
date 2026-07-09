import express from "express";
import {
    getSales,
    getSaleById,
    getSaleItems,
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
    downloadInvoicePDF,
} from "../controllers/sales.controller.js";

const router = express.Router();

router.get("/stats", getSalesStats);
router.get("/report", getSalesReport);
router.get("/today", getTodaySales);
router.get("/recent", getRecentSales);
router.get("/monthly", getMonthlySales);
router.get("/top-medicines", getTopSellingMedicines);

router.get("/search", searchSales);

router.get("/customer/:customerId", getCustomerSales);

// NEW
router.get("/:id/items", getSaleItems);

router.patch("/:id/payment", updateSalePayment);
router.patch("/:id/mark-paid", markSalePaid);

router.get("/:id/invoice", getInvoice);
router.get("/:id/pdf", downloadInvoicePDF);

router.route("/")
    .get(getPaginatedSales)
    .post(createSale);

router.route("/:id")
    .get(getSaleById)
    .delete(deleteSale);

export default router;
