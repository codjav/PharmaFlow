import asyncHandler from "../utils/asyncHandler.js";
import * as medicineService from "../services/medicine.service.js"

// Get all 
export const getAllMedicines = asyncHandler(
    async (req, res) => {
        const medicines = medicineService.getAllMedicines();
        res.status(200).json({
            success: true,
            count: medicines.length,
            data: medicines
        });
    }
);

// Get by id
export const getMedicineById = asyncHandler(
    async (req, res) => {
        const medicines = medicineService.getMedicineById(req.params.id);
        res.status(200).json({
            success: true,
            data: medicines
        });
    }
);

// create 
export const createMedicine = asyncHandler(
    async (req, res) => {
        const medicine = medicineService.createMedicine(req.body);
        res.status(201).json({
            success: true,
            message: "Medicine created successfully",
            data: medicine
        });
    }
);