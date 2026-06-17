import express from "express";
import {
    getAllMedicines,
    getMedicineById,
    createMedicine
} from "../controllers/medicine.controller.js";

const router = express.Router();

router.route("/")
    .get(getAllMedicines)
    .post(createMedicine);
    
router.route("/:id")
    .get(getMedicineById);

export default router;