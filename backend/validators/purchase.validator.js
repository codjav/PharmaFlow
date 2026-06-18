import AppError from "../utils/AppError.js";

export const validatePurchase = (purchase) => {
    if (!purchase.supplier_id) {
        throw new AppError(
            "Supplier is required",
            400
        );
    }

    if (
        !purchase.items ||
        purchase.items.length === 0
    ) {
        throw new AppError(
            "Purchase items are required",
            400
        );
    }
};