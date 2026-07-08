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

// Update
export const updateMedicine = asyncHandler(
    async (req, res) => {
        const medicine = medicineService.updateMedicine(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Medicine updated successfully",
            data: medicine
        });
    }
);

// Delete
export const deleteMedicine = asyncHandler(
    async (req, res) => {
        medicineService.deleteMedicine(req.params.id);
        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully"
        });
    }
);

// Search 
export const searchMedicines = asyncHandler(
    async (req, res) => {
        const medicines = medicineService.searchMedicines(req.query.keyword);
        res.status(200).json({
            success: true,
            count: medicines.length,
            data: medicines
        })
    }
)

// Low stock
export const getLowStockMedicines = asyncHandler(
    async (req, res) => {
        const medicines = medicineService.getLowStockMedicines();
        res.status(200).json({
            success: true,
            count: medicines.length,
            data: medicines
        });
    }
);


// Get paginated medicines
export const getPaginatedMedicines = asyncHandler(async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = medicineService.getPaginatedMedicines(page, limit);

    res.status(200).json({
        success: true,
        data: result.medicines,
        pagination: result.pagination
    });
});

export const getMedicineBatches = asyncHandler(
    async (req, res) => {

        const { id } = req.params;

        const batches =
            medicineService.getMedicineBatches(Number(id));

        res.status(200).json({
            success: true,
            count: batches.length,
            data: batches
        });

    }
);
