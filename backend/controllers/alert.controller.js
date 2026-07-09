import asyncHandler from "../utils/asyncHandler.js";

import * as alertService from "../services/alert.service.js";

// GET /api/alerts/low-stock
export const getLowStockMedicines = asyncHandler(async (req, res, next) => {
    const records = alertService.getLowStockMedicines();
    
    res.status(200).json({
        success: true,
        count: records.length,
        data: records
    });
});

// GET /api/alerts/near-expiry
export const getNearExpiryMedicines = asyncHandler(async (req, res, next) => {
    const records = alertService.getNearExpiryMedicines();
    
    res.status(200).json({
        success: true,
        count: records.length,
        data: records
    });
});

// GET /api/alerts/90-expiry
export const get90ExpiryMedicines = asyncHandler(async (req, res, next) => {
    const records = alertService.get90ExpiryMedicines();
    
    res.status(200).json({
        success: true,
        count: records.length,
        data: records
    });
});

// GET /api/alerts/expired
export const getExpiredMedicines = asyncHandler(async (req, res, next) => {
    const records = alertService.getExpiredMedicines();
    
    res.status(200).json({
        success: true,
        count: records.length,
        data: records
    });
});

export const getOutOfStockMedicines = asyncHandler(async (req, res) => {
    const records = alertService.getOutOfStockMedicines();

    res.status(200).json({
        success: true,
        count: records.length,
        data: records
    });
});

// GET /api/alerts/customer-dues
export const getCustomerDueAlerts = asyncHandler(async (req, res, next) => {
    const records = alertService.getCustomerDueAlerts();
    
    res.status(200).json({
        success: true,
        count: records.length,
        data: records
    });
});

// GET /api/alerts/supplier-dues
export const getSupplierDueAlerts = asyncHandler(async (req, res, next) => {
    const records = alertService.getSupplierDueAlerts();
    
    res.status(200).json({
        success: true,
        count: records.length,
        data: records
    });
});

// GET /api/alerts/summary
export const getAlertSummary = asyncHandler(async (req, res, next) => {
    const summaryData = alertService.getAlertSummary();
    
    res.status(200).json({
        success: true,
        data: summaryData
    });
});
