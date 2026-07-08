import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js"

import * as purchaseService from "../services/purchase.service.js"

// Get all
export const getAllPurchases = asyncHandler(
    async (req, res) => {
        const purchases = purchaseService.getAllPurchases();
        res.status(200).json({
        success: true,
        count: purchases.length,
        data: purchases
        });
    }
);

// Get by id
export const getPurchaseById = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        const purchase = purchaseService.getPurchaseById(Number(id));
        res.status(200).json({
        success: true,
        data: purchase
        });
    }
);

// Get purchase items
export const getPurchaseItems = asyncHandler(
    async (req, res) => {
        const { id } = req.params;

        const items = purchaseService.getPurchaseItems(Number(id));

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    }
);

// Create new
export const createPurchase = asyncHandler(
    async (req, res) => {
        const newPurchase = purchaseService.createPurchase(req.body);
        res.status(201).json({
        success: true,
        message: "Purchase created successfully",
        data: newPurchase
        });
    }
);

// Delete
export const deletePurchase = asyncHandler(
    async (req, res) => {
        purchaseService.deletePurchase(Number(req.params.id));
        res.status(200).json({
        success: true,
        message: "Purchase deleted successffully"
        });
    }
);

// Search
export const searchPurchases = asyncHandler(
    async (req, res) => {
        const purchases = purchaseService.searchPurchases(req.query.keyword);
        res.status(200).json({
        success: true,
        count: purchases.length,
        data: purchases
        });
    }
);

// Get status
export const getPurchaseStats = asyncHandler(
    async (req, res) => {
        const stats = purchaseService.getPurchaseStats();
        res.status(200).json({
        success: true,
        data: stats
        });
    }
);

// Recent purchase
export const getRecentPurchases = asyncHandler(
    async (req, res) => {
        const recent = purchaseService.getRecentPurchases();
        res.status(200).json({
        success: true,
        data: recent
        });
    }
);

// Get by supplier
export const getSupplierPurchases = asyncHandler(
    async (req, res) => {
        const {supplierId} = req.params;
        const records = purchaseService.getSupplierPurchases(Number(supplierId));
        res.status(200).json({
        success: true,
        count: records.length,
        data: records
        });
    }
);

// Pagination
export const getPaginatedPurchases = asyncHandler(
    async (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = purchaseService.getPaginatedPurchases(page, limit);

        res.status(200).json({
            success: true,
            data: result.purchases,
            pagination: result.pagination
        });
    }
);

// Update Payment
export const updatePurchasePayment = asyncHandler(
    async (req, res, next) => {
        const {id} = req.params;
        const amount = Number(req.body.amount);

        if(isNaN(amount) || amount<=0) {
            return next(new AppError("Please, specify a valid positive amount",400));
        }

        purchaseService.updatePurchasePayment(Number(id), amount);

        res.status(200).json({
            success: true,
            message: 'Payment adjustment done'
        });
    }
);

// Mark Paid
export const markPurchasePaid = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        purchaseService.markPurchasePaid(Number(id));

        res.status(200).json({
            success: true,
            message: "Purchase invoice fully settled."
        });
    }
);

// Get report 
export const getPurchaseReport = asyncHandler(
    async (req, res) => {
        const reportData = purchaseService.getPurchaseReport();

        res.status(200).json({
            success: true,
            data: reportData
        });
    }
);
