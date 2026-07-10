import express from "express";
import {
    getAllPurchases,
    getPurchaseById,
    createPurchase,
    deletePurchase,
    searchPurchases,
    getPurchaseStats,
    getRecentPurchases,
    getSupplierPurchases,
    getPaginatedPurchases,
    updatePurchasePayment,
    markPurchasePaid,
    getNextInvoiceNumber,
    getPurchaseReport,
    getPurchaseItems
} from "../controllers/purchase.controller.js";

const router = express.Router();

router.get("/stats", getPurchaseStats);
router.get("/report", getPurchaseReport);
router.get("/recent", getRecentPurchases);
router.get("/search", searchPurchases);

router.get("/supplier/:supplierId", getSupplierPurchases);

// ⭐ NEW
router.get("/:id/items", getPurchaseItems);

router.patch("/:id/payment", updatePurchasePayment);
router.patch("/:id/mark-paid", markPurchasePaid);

router.route("/")
    .get(getPaginatedPurchases)
    .post(createPurchase);

router.get("/next-invoice", getNextInvoiceNumber);
router.route("/:id")
    .get(getPurchaseById)
    .delete(deletePurchase);

export default router;