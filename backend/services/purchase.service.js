import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import { validatePurchase } from "../validators/purchase.validator.js";

// GET     /api/purchases
// Get all purchase
export const getAllPurchases = () => {
    return db.prepare(`
        SELECT
            p.*,
            s.name supplier_name
        FROM purchases p
        JOIN suppliers s
        ON p.supplier_id = s.id
        ORDER BY p.purchase_date DESC
    `).all();
};

// GET     /api/purchases/:id
// Get purchase by id
export const getPurchaseById = (id) => {
    const purchase = db.prepare(`
        SELECT 
            p.*,
            s.name supplier_name
        FROM purchases p
        JOIN suppliers s
        ON p.supplier_id = s.id
        WHERE p.id = ?
    `).get(id);

    if (!purchase) {
        throw new AppError(
            "Purchase not found",
            404
        );
    }

    const items = db.prepare(`
        SELECT
            pi.*,
            m.name medicine_name
        FROM purchase_items pi
        JOIN medicines m
        ON pi.medicine_id = m.id
        WHERE pi.purchase_id = ?
    `).all(id);

    return {
        ...purchase,
        items
    };

}

// POST    /api/purchases
// Create Purchase
export const createPurchase = (purchaseData) => {
    validatePurchase(purchaseData);

    const transaction = db.transaction(() => {
        const {
            invoice_number,
            supplier_id,
            paid_amount = 0,
            items
        } = purchaseData;

        let totalAmount = 0;

        items.forEach(item => {
            totalAmount += 
                item.quantity *
                item.purchase_price;
        });

        const dueAmount = totalAmount-paid_amount;

        const purchaseResult = db.prepare(`
            INSERT INTO purchases(
                invoice_number,
                supplier_id,
                total_amount,
                paid_amount,
                due_amount,
                status
            )
            VALUES (?,?,?,?,?,?)
        `).run(
            invoice_number,
            supplier_id,
            totalAmount,
            paid_amount,
            dueAmount,
            dueAmount > 0
                ? "PENDING"
                : "PAID"
        );

        const purchaseId = purchaseResult.lastInsertRowid;

        items.forEach((item) => {
            const subtotal =
                item.quantity * 
                item.purchase_price;

            db.prepare(`
                INSERT INTO purchase_items(
                    purchase_id,
                    medicine_id,
                    quantity,
                    purchase_price,
                    subtotal
                )
                VALUES (?,?,?,?,?)
            `).run(
                purchaseId,
                item.medicine_id,
                item.quantity,
                item.purchase_price,
                subtotal
            )

            db.prepare(`
                UPDATE medicines
                SET quantity = quantity + ?
                WHERE id = ?
            `).run(
                item.quantity,
                item.medicine_id
            );

            db.prepare(`
                INSERT into stock_movements(
                    medicine_id,
                    movement_type,
                    quantity,
                    reference_id
                )
                VALUES (?,?,?,?)
            `).run(
                item.medicine_id,
                "PURCHASE",
                item.quantity,
                purchaseId
            );
        });

        db.prepare(`
            UPDATE suppliers
            SET pending_due = pending_due + ?
            WHERE id = ?
        `).run(
            dueAmount,
            supplier_id
        );

        return purchaseId;
    });

    const purchaseId = transaction();

    return getPurchaseById(purchaseId);
};

// DELETE  /api/purchases/:id
// Delete purchase 
export const deletePurchase = (id) => {

    const purchase = getPurchaseById(id);

    const transaction =
        db.transaction(() => {
            purchase.items.forEach(item => {
                db.prepare(`
                    UPDATE medicines
                    SET quantity = quantity - ?
                    WHERE id = ?
                `).run(
                    item.quantity,
                    item.medicine_id
                );
            });

            db.prepare(`
                DELETE FROM purchase_items
                WHERE purchase_id = ?
            `).run(id);

            db.prepare(`
                UPDATE suppliers
                SET pending_due = pending_due - purchase.due_amount
                WHERE id = ?
            `).run(
                purchase.due_amount,
                purchase.supplier_id
            )

            db.prepare(`
                DELETE FROM purchases
                WHERE id = ?
            `).run(id);
        });

    transaction();
};

// GET     /api/purchases/search
// Search purchase
export const searchPurchases = (
    keyword = ""
) => {
    return db.prepare(`
        SELECT
            p.*,
            s.name supplier_name
        FROM purchases p
        JOIN suppliers s
        ON p.supplier_id=s.id
        WHERE
            p.invoice_number LIKE ?
            OR s.name LIKE ?
    `).all(
        `%${keyword}%`,
        `%${keyword}%`
    );
};

// GET     /api/purchases/stats
// Get purchase stats
export const getPurchaseStats = () => {
    const totalPurchases =
        db.prepare(`
            SELECT COUNT(*) total
            FROM purchases
        `).get();
    const totalAmount =
        db.prepare(`
            SELECT SUM(total_amount) total
            FROM purchases
        `).get();
    const totalDue =
        db.prepare(`
            SELECT SUM(due_amount) total
            FROM purchases
        `).get();

    return {
        totalPurchases:
            totalPurchases.total,
        totalAmount:
            totalAmount.total || 0,
        totalDue:
            totalDue.total || 0
    };
};

// GET     /api/purchases/recent
// Get recent purchases
export const getRecentPurchases = () => {
    return db.prepare(`
        SELECT
            p.*,
            s.name supplier_name
        FROM purchases p
        JOIN suppliers s
        ON p.supplier_id=s.id
        ORDER BY purchase_date DESC
        LIMIT 5
    `).all();
};

// GET     /api/purchases/supplier/:supplierId
// Get purchase by supplier name or id
export const getSupplierPurchases = (
    supplierId
) => {
    return db.prepare(`
        SELECT *
        FROM purchases
        WHERE supplier_id=?
        ORDER BY purchase_date DESC
    `).all(supplierId);
};