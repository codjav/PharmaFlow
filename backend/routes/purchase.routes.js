import express from 'express';
import {
    getAllPurchases,
    getPurchaseById,
    createPurchase,
    deletePurchase,
    searchPurchases,
    getPurchaseStats,
    getRecentPurchases,
    getSupplierPurchases
} from '../controllers/purchaseController.js';

const router = express.Router();

router.get('/stats', getPurchaseStats);
router.get('/recent', getRecentPurchases);
router.get('/search', searchPurchases);

router.get('/supplier/:supplierId', getSupplierPurchases);

router.route('/')
    .get(getAllPurchases)
    .post(createPurchase);

router.route('/:id')
    .get(getPurchaseById)
    .delete(deletePurchase);

export default router;
