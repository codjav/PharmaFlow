import AppError from "../utils/AppError.js";

export const validatePurchase = (purchase) => {
    if (!purchase.supplier_id) {
        throw new AppError(
            "Supplier is required",
            400
        );
    }

    if (!purchase.invoice_number?.trim()) {
        throw new AppError(
            "Invoice number is required",
            400
        );
    }

    if (
        !purchase.items ||
        purchase.items.length === 0
    ) {
        throw new AppError(
            "At least one purchase item is required",
            400
        );
    }

    purchase.items.forEach((item, index) => {
        if (!item.medicine_id) {
            throw new AppError(
                `Medicine is required in row ${index + 1}`,
                400
            );
        }

        if (!item.medicine_name?.trim()) {
            throw new AppError(
                `Medicine name is required in row ${index + 1}`,
                400
            );
        }

        if (!item.batch_number?.trim()) {
            throw new AppError(
                `Batch number is required in row ${index + 1}`,
                400
            );
        }

        if (!item.expiry_date) {
            throw new AppError(
                `Expiry date is required in row ${index + 1}`,
                400
            );
        }

        if (Number.isNaN(Date.parse(item.expiry_date))) {
            throw new AppError(
                `Invalid expiry date in row ${index + 1}`,
                400
            );
        }

        if (Number(item.quantity) <= 0) {
            throw new AppError(
                `Quantity must be greater than zero in row ${index + 1}`,
                400
            );
        }

        if (Number(item.purchase_price) <= 0) {
            throw new AppError(
                `Purchase price must be greater than zero in row ${index + 1}`,
                400
            );
        }

        if (Number(item.dr_price) <= 0) {
            throw new AppError(
                `Distributor price must be greater than zero in row ${index + 1}`,
                400
            );
        }

        if (Number(item.selling_price) <= 0) {
            throw new AppError(
                `Selling price must be greater than zero in row ${index + 1}`,
                400
            );
        }

        if (Number(item.mrp) <= 0) {
            throw new AppError(
                `MRP must be greater than zero in row ${index + 1}`,
                400
            );
        }
    });

    const totalAmount = purchase.items.reduce(
        (sum, item) =>
            sum + Number(item.quantity) * Number(item.purchase_price),
        0
    );

    const paidAmount = Number(purchase.paid_amount ?? 0);

    if (paidAmount < 0) {
        throw new AppError(
            "Paid amount cannot be negative",
            400
        );
    }

    if (paidAmount > totalAmount) {
        throw new AppError(
            "Paid amount cannot exceed total purchase amount",
            400
        );
    }
};