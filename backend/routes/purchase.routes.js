import express from 'express';
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
    getPurchaseReport
} from '../controllers/purchase.controller.js';

const router = express.Router();

router.get('/stats', getPurchaseStats);
router.get('/report', getPurchaseReport);
router.get('/recent', getRecentPurchases);
router.get('/search', searchPurchases);
router.patch("/:id/payment", updatePurchasePayment);
router.patch("/:id/mark-paid", markPurchasePaid);

router.get('/supplier/:supplierId', getSupplierPurchases);

router.route('/')
    .get(getPaginatedPurchases)
    .post(createPurchase);

router.route('/:id')
    .get(getPurchaseById)
    .delete(deletePurchase);

export default router;
