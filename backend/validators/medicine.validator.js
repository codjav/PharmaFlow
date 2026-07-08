import AppError from "../utils/AppError.js";

export const validateMedicine = (medicine) => {
    const {
        name,
        company,
        category_id,
        supplier_id,
        minimum_stock
    } = medicine;

    if (!name?.trim()) {
        throw new AppError(
            "Medicine name is required",
            400
        );
    }

    if (!company?.trim()) {
        throw new AppError(
            "Company name is required",
            400
        );
    }

    if (!category_id) {
        throw new AppError(
            "Category is required",
            400
        );
    }

    if (!supplier_id) {
        throw new AppError(
            "Supplier is required",
            400
        );
    }

    if (
        minimum_stock !== undefined &&
        Number(minimum_stock) < 0
    ) {
        throw new AppError(
            "Minimum stock cannot be negative",
            400
        );
    }
};