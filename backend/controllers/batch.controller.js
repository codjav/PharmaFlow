import asyncHandler from "../utils/asyncHandler.js";
import * as batchService from "../services/batch.service.js";

// GET /api/batches
export const getAllBatches = asyncHandler(
    async (req, res) => {
        const batches = batchService.getAllBatches();

        res.status(200).json({
            success: true,
            count: batches.length,
            data: batches,
        });
    }
);

// GET /api/batches/:id
export const getBatchById = asyncHandler(
    async (req, res) => {
        const batch = batchService.getBatchById(
            Number(req.params.id)
        );

        res.status(200).json({
            success: true,
            data: batch,
        });
    }
);

// GET /api/batches/medicine/:medicineId
export const getMedicineBatches = asyncHandler(
    async (req, res) => {
        const batches =
            batchService.getMedicineBatches(
                Number(req.params.medicineId)
            );

        res.status(200).json({
            success: true,
            count: batches.length,
            data: batches,
        });
    }
);

// POST /api/batches
export const createBatch = asyncHandler(
    async (req, res) => {
        const batch = batchService.createBatch(
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Batch created successfully",
            data: batch,
        });
    }
);

// PUT /api/batches/:id
export const updateBatch = asyncHandler(
    async (req, res) => {
        const batch =
            batchService.updateBatch(
                Number(req.params.id),
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Batch updated successfully",
            data: batch,
        });
    }
);

// DELETE /api/batches/:id
export const deleteBatch = asyncHandler(
    async (req, res) => {
        batchService.deleteBatch(
            Number(req.params.id)
        );

        res.status(200).json({
            success: true,
            message: "Batch deleted successfully",
        });
    }
);

// PATCH /api/batches/:id/stock
export const updateBatchStock = asyncHandler(
    async (req, res) => {
        const batch =
            batchService.updateBatchStock(
                Number(req.params.id),
                Number(req.body.quantity)
            );

        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            data: batch,
        });
    }
);

// PATCH /api/batches/:id/status
export const updateBatchStatus = asyncHandler(
    async (req, res) => {
        const batch =
            batchService.updateBatchStatus(
                Number(req.params.id),
                req.body.status
            );

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: batch,
        });
    }
);

// GET /api/batches/available/:medicineId
export const getAvailableBatches = asyncHandler(
    async (req, res) => {
        const batches =
            batchService.getAvailableBatches(
                Number(req.params.medicineId)
            );

        res.status(200).json({
            success: true,
            count: batches.length,
            data: batches,
        });
    }
);

// GET /api/batches/expiring
export const getExpiringBatches = asyncHandler(
    async (req, res) => {
        const days =
            Number(req.query.days) || 30;

        const batches =
            batchService.getExpiringBatches(
                days
            );

        res.status(200).json({
            success: true,
            count: batches.length,
            data: batches,
        });
    }
);

// GET /api/batches/low-stock
export const getLowStockBatches = asyncHandler(
    async (req, res) => {
        const batches =
            batchService.getLowStockBatches();

        res.status(200).json({
            success: true,
            count: batches.length,
            data: batches,
        });
    }
);

// GET /api/batches/summary/:medicineId
export const getBatchSummary = asyncHandler(
    async (req, res) => {
        const summary =
            batchService.getBatchSummary(
                Number(req.params.medicineId)
            );

        res.status(200).json({
            success: true,
            data: summary,
        });
    }
);
