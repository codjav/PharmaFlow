import AppError from "../utils/AppError.js";

export const validateSales = (sale) => {
    if (!sale.customer_id) {
        throw new AppError(
            "Customer is required",
            400
        );
    }

    if (!sale.items || sale.items.length === 0) {
        throw new AppError(
            "Sale items are required",
            400
        );
    }

    sale.items.forEach((item, index) => {
        if (!item.medicine_id) {
            throw new AppError(
                `Medicine is required in row ${index + 1}`,
                400
            );
        }

        if (!item.batch_id) {
            throw new AppError(
                `Batch is required in row ${index + 1}`,
                400
            );
        }

        if (!item.quantity || Number(item.quantity) <= 0) {
            throw new AppError(
                `Quantity must be greater than 0 in row ${index + 1}`,
                400
            );
        }
    });

    const paidAmount = Number(sale.paid_amount ?? 0);

    if (paidAmount < 0) {
        throw new AppError(
            "Paid amount cannot be negative",
            400
        );
    }
};