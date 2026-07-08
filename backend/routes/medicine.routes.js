import express from "express";
import {
    searchMedicines,
    getLowStockMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getPaginatedMedicines,
    getMedicineBatches,
} from "../controllers/medicine.controller.js";

const router = express.Router();


router.get("/", getPaginatedMedicines);
router.get("/search", searchMedicines);
router.get("/low-stock", getLowStockMedicines);
router.get("/:id/batches", getMedicineBatches);
router.get("/:id", getMedicineById);
router.post("/", createMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export default router;