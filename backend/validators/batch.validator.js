import AppError from "../utils/AppError.js";

export const validateBatch = (batch) => {
    if (!batch.medicine_id) {
        throw new AppError(
            "Medicine is required",
            400
        );
    }

    if (!batch.supplier_id) {
        throw new AppError(
            "Supplier is required",
            400
        );
    }

    if (!batch.batch_number?.trim()) {
        throw new AppError(
            "Batch number is required",
            400
        );
    }

    if (!batch.expiry_date) {
        throw new AppError(
            "Expiry date is required",
            400
        );
    }

    if (
        batch.quantity === undefined ||
        Number(batch.quantity) <= 0
    ) {
        throw new AppError(
            "Quantity must be greater than 0",
            400
        );
    }

    if (Number(batch.purchase_price) < 0) {
        throw new AppError(
            "Invalid purchase price",
            400
        );
    }

    if (Number(batch.dr_price) < 0) {
        throw new AppError(
            "Invalid distributor price",
            400
        );
    }

    if (Number(batch.selling_price) < 0) {
        throw new AppError(
            "Invalid selling price",
            400
        );
    }

    if (Number(batch.mrp) < 0) {
        throw new AppError(
            "Invalid MRP",
            400
        );
    }
};
