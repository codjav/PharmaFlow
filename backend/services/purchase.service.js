import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import { validatePurchase } from "../validators/purchase.validator.js";

// GET     /api/purchases
// Get all purchase
export const getAllPurchases = () => {
    return db
        .prepare(
            `
        SELECT
            p.*,
            s.name supplier_name
        FROM purchases p
        JOIN suppliers s
        ON p.supplier_id = s.id
        ORDER BY p.purchase_date DESC
    `,
        )
        .all();
};

// GET     /api/purchases/:id
// Get purchase by id
export const getPurchaseById = (id) => {
    const purchase = db
        .prepare(
            `
        SELECT 
            p.*,
            s.name supplier_name
        FROM purchases p
        JOIN suppliers s
        ON p.supplier_id = s.id
        WHERE p.id = ?
    `,
        )
        .get(id);

    if (!purchase) {
        throw new AppError("Purchase not found", 404);
    }

    const items = db
        .prepare(
            `
    SELECT *
    FROM purchase_items
    WHERE purchase_id = ?
    ORDER BY id
`,
        )
        .all(id);

    return {
        ...purchase,
        items,
    };
};

export const getPurchaseItems = (purchaseId) => {
    return db.prepare(`
        SELECT *
        FROM purchase_items
        WHERE purchase_id = ?
        ORDER BY id
    `).all(purchaseId);
};

// POST    /api/purchases
// Create Purchase
export const createPurchase = (purchaseData) => {
    validatePurchase(purchaseData);

    const transaction = db.transaction(() => {
        const {
            invoice_number,
            supplier_id,
            paid_amount = 0,
            items,
        } = purchaseData;

        let totalAmount = 0;

        items.forEach((item) => {
            totalAmount += item.quantity * item.purchase_price;
        });

        const dueAmount = totalAmount - paid_amount;

        const purchaseResult = db
            .prepare(
                `
            INSERT INTO purchases(
                invoice_number,
                supplier_id,
                total_amount,
                paid_amount,
                due_amount,
                status
            )
            VALUES (?,?,?,?,?,?)
        `,
            )
            .run(
                invoice_number,
                supplier_id,
                totalAmount,
                paid_amount,
                dueAmount,
                dueAmount > 0 ? "PENDING" : "PAID",
            );

        const purchaseId = purchaseResult.lastInsertRowid;

        items.forEach((item) => {
            const subtotal =
                item.quantity * item.purchase_price;

            db.prepare(`
        INSERT INTO purchase_items(
            purchase_id,
            medicine_id,
            medicine_name,
            batch_number,
            expiry_date,
            mrp,
            purchase_price,
            dr_price,
            selling_price,
            quantity,
            subtotal
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `).run(
                purchaseId,
                item.medicine_id,
                item.medicine_name,
                item.batch_number,
                item.expiry_date,
                item.mrp,
                item.purchase_price,
                item.dr_price,
                item.selling_price,
                item.quantity,
                subtotal
            );

            const existingBatch = db.prepare(`
                SELECT id
                FROM medicine_batches
                WHERE medicine_id = ?
                  AND supplier_id = ?
                  AND batch_number = ?
            `).get(
                item.medicine_id,
                supplier_id,
                item.batch_number
            );

            if (existingBatch) {
                db.prepare(`
                    UPDATE medicine_batches
                    SET
                        quantity = quantity + ?,
                        expiry_date = ?,
                        mrp = ?,
                        purchase_price = ?,
                        dr_price = ?,
                        selling_price = ?,
                        status = 'ACTIVE'
                    WHERE id = ?
                `).run(
                    item.quantity,
                    item.expiry_date,
                    item.mrp,
                    item.purchase_price,
                    item.dr_price,
                    item.selling_price,
                    existingBatch.id
                );
            } else {
                db.prepare(`
                    INSERT INTO medicine_batches(
                        medicine_id,
                        supplier_id,
                        purchase_id,
                        batch_number,
                        expiry_date,
                        mrp,
                        purchase_price,
                        dr_price,
                        selling_price,
                        quantity,
                        status
                    )
                    VALUES (?,?,?,?,?,?,?,?,?,?,?)
                `).run(
                    item.medicine_id,
                    supplier_id,
                    purchaseId,
                    item.batch_number,
                    item.expiry_date,
                    item.mrp,
                    item.purchase_price,
                    item.dr_price,
                    item.selling_price,
                    item.quantity,
                    'ACTIVE'
                );
            }

            const batchId = existingBatch
                ? existingBatch.id
                : db.prepare(`
                    SELECT id
                    FROM medicine_batches
                    WHERE medicine_id = ?
                      AND supplier_id = ?
                      AND batch_number = ?
                `).get(
                    item.medicine_id,
                    supplier_id,
                    item.batch_number
                ).id;

            db.prepare(`
                INSERT INTO stock_movements(
                    medicine_id,
                    batch_id,
                    movement_type,
                    quantity,
                    reference_id
                )
                VALUES (?,?,?,?,?)
            `).run(
                item.medicine_id,
                batchId,
                "PURCHASE",
                item.quantity,
                purchaseId
            );
        });

        db.prepare(
            `
            UPDATE suppliers
            SET pending_due = pending_due + ?
            WHERE id = ?
        `,
        ).run(dueAmount, supplier_id);

        return purchaseId;
    });

    const purchaseId = transaction();

    return getPurchaseById(purchaseId);
};

// DELETE  /api/purchases/:id
// Delete purchase
export const deletePurchase = (id) => {
    const purchase = getPurchaseById(id);

    const transaction = db.transaction(() => {
        db.prepare(`
            DELETE FROM stock_movements
            WHERE reference_id = ?
              AND movement_type = 'PURCHASE'
        `).run(id);

        db.prepare(`
            DELETE FROM medicine_batches
            WHERE purchase_id = ?
        `).run(id);

        db.prepare(
            `
                DELETE FROM purchase_items
                WHERE purchase_id = ?
            `,
        ).run(id);

        db.prepare(
            `
                UPDATE suppliers
                SET pending_due = pending_due - ?
                WHERE id = ?
            `,
        ).run(purchase.due_amount, purchase.supplier_id);

        db.prepare(
            `
                DELETE FROM purchases
                WHERE id = ?
            `,
        ).run(id);
    });

    transaction();
};

// GET     /api/purchases/search
// Search purchase
export const searchPurchases = (keyword = "") => {
    return db
        .prepare(
            `
        SELECT
            p.*,
            s.name supplier_name
        FROM purchases p
        JOIN suppliers s
        ON p.supplier_id=s.id
        WHERE
            p.invoice_number LIKE ?
            OR s.name LIKE ?
    `,
        )
        .all(`%${keyword}%`, `%${keyword}%`);
};

// GET     /api/purchases/stats
// Get purchase stats
export const getPurchaseStats = () => {
    const totalPurchases = db
        .prepare(
            `
            SELECT COUNT(*) total
            FROM purchases
        `,
        )
        .get();
    const totalAmount = db
        .prepare(
            `
            SELECT SUM(total_amount) total
            FROM purchases
        `,
        )
        .get();
    const totalDue = db
        .prepare(
            `
            SELECT SUM(due_amount) total
            FROM purchases
        `,
        )
        .get();

    return {
        totalPurchases: totalPurchases.total,
        totalAmount: totalAmount.total || 0,
        totalDue: totalDue.total || 0,
    };
};

// GET     /api/purchases/recent
// Get recent purchases
export const getRecentPurchases = () => {
    return db
        .prepare(
            `
        SELECT
            p.*,
            s.name supplier_name
        FROM purchases p
        JOIN suppliers s
        ON p.supplier_id=s.id
        ORDER BY purchase_date DESC
        LIMIT 5
    `,
        )
        .all();
};

// GET     /api/purchases/supplier/:supplierId
// Get purchase by supplier name or id
export const getSupplierPurchases = (supplierId) => {
    return db
        .prepare(
            `
        SELECT *
        FROM purchases
        WHERE supplier_id=?
        ORDER BY purchase_date DESC
    `,
        )
        .all(supplierId);
};

// GET /api/purchases?page=1&limit=10
// Pagination
export const getPaginatedPurchases = (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const purchases = db
        .prepare(
            `
        SELECT 
            p.*,
            s.name supplier_name
        FROM purchases p
        JOIN suppliers s
        ON p.supplier_id = s.id
        ORDER BY purchase_date DESC
        LIMIT ?
        OFFSET ?
    `,
        )
        .all(limit, offset);

    const totalRecords = db
        .prepare(
            `
        SELECT COUNT(*) total
        FROM purchases
    `,
        )
        .get();

    return {
        purchases,
        pagination: {
            page,
            limit,
            totalRecords: totalRecords.total,
            totalPages: Math.ceil(totalRecords.total / limit),
        },
    };
};

// PATCH   /api/purchases/:id/payment
// Update Payment
export const updatePurchasePayment = (purchaseId, amount) => {
    const purchase = db
        .prepare(
            `
        SELECT *
        FROM purchases 
        WHERE id=?
    `,
        )
        .get(purchaseId);

    if (!purchase) {
        throw new AppError("Purchase not found", 404);
    }

    const newPaidAmount = purchase.paid_amount + amount;

    if (newPaidAmount > purchase.total_amount) {
        throw new AppError(
            "Payment cannot exceed total purchase amount.",
            400
        );
    }

    const newDueAmount = purchase.total_amount - newPaidAmount;

    db.prepare(
        `
        UPDATE purchases
        SET 
            paid_amount = ?,
            due_amount = ?,
            status = ?
        WHERE id = ?
    `,
    ).run(
        newPaidAmount,
        newDueAmount,
        newDueAmount > 0 ? "PENDING" : "PAID",
        purchaseId,
    );

    db.prepare(
        `
        UPDATE suppliers
        SET
            pending_due = pending_due - ?
        WHERE id = ?
    `,
    ).run(amount, purchase.supplier_id);

    return db.prepare(`
        SELECT
            p.*,
            s.name AS supplier_name
        FROM purchases p
        JOIN suppliers s
            ON s.id = p.supplier_id
        WHERE p.id = ?
    `).get(purchaseId);
};

// PATCH   /api/purchases/:id/mark-paid
// Mark purchase paid
export const markPurchasePaid = (purchaseId) => {
    const purchase = db
        .prepare(
            `
        SELECT * 
        FROM purchases 
        WHERE id = ?
    `,
        )
        .get(purchaseId);

    if (!purchase) {
        throw new AppError("Purchase not found", 404);
    }

    db.prepare(
        `
        UPDATE purchases
        SET
            paid_amount = total_amount,
            due_amount = 0,
            status = 'PAID'
        WHERE id = ?
    `,
    ).run(purchaseId);

    db.prepare(
        `
        UPDATE suppliers
        SET 
            pending_due = pending_due - ?
        WHERE id = ?
    `,
    ).run(purchase.due_amount, purchase.supplier_id);
};

// GET     /api/purchases/report
// Get purchase report over the time
export const getPurchaseReport = () => {
    const todayPurchase = db
        .prepare(
            `
        SELECT 
            COALESCE(SUM(total_amount), 0) AS total
        FROM purchases
        WHERE DATE(purchase_date) = DATE('now')
    `,
        )
        .get();

    const thisMonthPurchase = db
        .prepare(
            `
        SELECT 
            COALESCE(SUM(total_amount), 0) AS total
        FROM purchases
        WHERE strftime('%Y-%m', purchase_date)
            = strftime('%Y-%m', 'now')
    `,
        )
        .get();

    const thisYearPurchase = db
        .prepare(
            `
        SELECT 
            COALESCE(SUM(total_amount), 0) AS total
        FROM purchases
        WHERE strftime('%Y', purchase_date)
            = strftime('%Y', 'now')
    `,
        )
        .get();

    const totalPaidAmount = db
        .prepare(
            `
        SELECT 
            COALESCE(SUM(paid_amount), 0) AS total
        FROM purchases
    `,
        )
        .get();

    const totalDueAmount = db
        .prepare(
            `
        SELECT 
            COALESCE(SUM(due_amount), 0) AS total
        FROM purchases
    `,
        )
        .get();

    const totalPurchases = db
        .prepare(
            `
        SELECT 
            COALESCE(SUM(total_amount), 0) AS total
        FROM purchases
    `,
        )
        .get();

    return {
        todayPurchase: todayPurchase.total,
        thisMonthPurchase: thisMonthPurchase.total,
        thisYearPurchase: thisYearPurchase.total,
        totalPaidAmount: totalPaidAmount.total,
        totalDueAmount: totalDueAmount.total,
        totalPurchases: totalPurchases.total,
    };
};
