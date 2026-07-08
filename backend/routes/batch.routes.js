import express from "express";

import {
    getAllBatches,
    getBatchById,
    getMedicineBatches,
    createBatch,
    updateBatch,
    deleteBatch,
    updateBatchStock,
    updateBatchStatus,
    getAvailableBatches,
    getExpiringBatches,
    getLowStockBatches,
    getBatchSummary,
} from "../controllers/batch.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Inventory & Dashboard
|--------------------------------------------------------------------------
*/

router.get("/", getAllBatches);

router.get("/expiring", getExpiringBatches);

router.get("/low-stock", getLowStockBatches);

router.get("/available/:medicineId", getAvailableBatches);

router.get("/summary/:medicineId", getBatchSummary);

router.get("/medicine/:medicineId", getMedicineBatches);

/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

router.post("/", createBatch);

router.route("/:id")
    .get(getBatchById)
    .put(updateBatch)
    .delete(deleteBatch);

/*
|--------------------------------------------------------------------------
| Inventory Actions
|--------------------------------------------------------------------------
*/

router.patch("/:id/stock", updateBatchStock);

router.patch("/:id/status", updateBatchStatus);

export default router;
