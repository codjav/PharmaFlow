import express from "express";
import {
    searchMedicines,
    getLowStockMedicines,
    getNearExpiryMedicines,
    get90ExpiryMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine,
    adjustStock,
    getPaginatedMedicines
} from "../controllers/medicine.controller.js";

const router = express.Router();


router.get("/", getPaginatedMedicines);
router.get("/search", searchMedicines);
router.get("/low-stock", getLowStockMedicines);
router.get("/near-expiry", getNearExpiryMedicines);
router.get("/90-expiry", get90ExpiryMedicines);
router.get("/:id", getMedicineById);
router.post("/", createMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);
router.patch("/:id/adjust-stock", adjustStock);

export default router;