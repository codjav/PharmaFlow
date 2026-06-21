import AppError from "../utils/AppError.js";

export const validateSales = (sale) => {
    if (!sale.customer_id) {
        throw new AppError(
            "Customer is required",
            400
        );
    }

    if(!sale.items || sale.items.length === 0) {
        throw new AppError(
            "Sale items are required",
            400
        );
    }
};