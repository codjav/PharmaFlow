import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import { validateBatch } from "../validators/batch.validator.js";

// GET /api/batches
export const getAllBatches = () => {
    return db.prepare(`
        SELECT
            b.*,
            m.name AS medicine_name,
            s.name AS supplier_name
        FROM medicine_batches b
        JOIN medicines m
            ON b.medicine_id = m.id
        JOIN suppliers s
            ON b.supplier_id = s.id
        ORDER BY
            b.expiry_date ASC,
            b.created_at ASC
    `).all();
};

// GET /api/batches/:id
export const getBatchById = (id) => {
    const batch = db.prepare(`
        SELECT
            b.*,
            m.name AS medicine_name,
            s.name AS supplier_name
        FROM medicine_batches b
        JOIN medicines m
            ON b.medicine_id = m.id
        JOIN suppliers s
            ON b.supplier_id = s.id
        WHERE b.id = ?
    `).get(id);

    if (!batch) {
        throw new AppError(
            "Batch not found",
            404
        );
    }

    return batch;
};

// GET /api/batches/medicine/:medicineId
export const getMedicineBatches = (medicineId) => {
    return db.prepare(`
        SELECT *
        FROM medicine_batches
        WHERE medicine_id = ?
        ORDER BY
            expiry_date ASC,
            created_at ASC
    `).all(medicineId);
};

// POST /api/batches
export const createBatch = (batchData) => {

    validateBatch(batchData);

    const {
        medicine_id,
        supplier_id,
        batch_number,
        expiry_date,
        mrp,
        purchase_price,
        dr_price,
        selling_price,
        quantity,
    } = batchData;

    const existingBatch = db.prepare(`
        SELECT id
        FROM medicine_batches
        WHERE
            medicine_id = ?
            AND batch_number = ?
    `).get(
        medicine_id,
        batch_number
    );

    if (existingBatch) {
        throw new AppError(
            "Batch already exists for this medicine",
            400
        );
    }

    const result = db.prepare(`
        INSERT INTO medicine_batches(

            medicine_id,
            supplier_id,
            batch_number,
            expiry_date,
            mrp,
            purchase_price,
            dr_price,
            selling_price,
            quantity

        )
        VALUES(?,?,?,?,?,?,?,?,?)
    `).run(

        medicine_id,
        supplier_id,
        batch_number,
        expiry_date,
        mrp,
        purchase_price,
        dr_price,
        selling_price,
        quantity

    );

    return getBatchById(
        result.lastInsertRowid
    );
};

// PUT /api/batches/:id
export const updateBatch = (
    id,
    batchData
) => {

    getBatchById(id);

    validateBatch(batchData);

    const {

        medicine_id,
        supplier_id,
        batch_number,
        expiry_date,
        mrp,
        purchase_price,
        dr_price,
        selling_price,
        quantity,
        status,

    } = batchData;

    db.prepare(`
        UPDATE medicine_batches
        SET

            medicine_id=?,
            supplier_id=?,
            batch_number=?,
            expiry_date=?,
            mrp=?,
            purchase_price=?,
            dr_price=?,
            selling_price=?,
            quantity=?,
            status=?

        WHERE id=?
    `).run(

        medicine_id,
        supplier_id,
        batch_number,
        expiry_date,
        mrp,
        purchase_price,
        dr_price,
        selling_price,
        quantity,
        status,
        id

    );

    return getBatchById(id);
};

// DELETE /api/batches/:id
export const deleteBatch = (id) => {

    getBatchById(id);

    db.prepare(`
        DELETE FROM medicine_batches
        WHERE id = ?
    `).run(id);
};

// PATCH /api/batches/:id/stock
export const updateBatchStock = (
    batchId,
    quantityChange
) => {

    const batch = getBatchById(batchId);

    const newQuantity =
        batch.quantity + quantityChange;

    if (newQuantity < 0) {
        throw new AppError(
            "Insufficient stock in batch",
            400
        );
    }

    let status = batch.status;

    if (newQuantity === 0) {
        status = "OUT_OF_STOCK";
    } else if (status === "OUT_OF_STOCK") {
        status = "ACTIVE";
    }

    db.prepare(`
        UPDATE medicine_batches
        SET
            quantity = ?,
            status = ?
        WHERE id = ?
    `).run(
        newQuantity,
        status,
        batchId
    );

    return getBatchById(batchId);
};

// GET /api/batches/available/:medicineId
export const getAvailableBatches = (
    medicineId
) => {

    return db.prepare(`
        SELECT *
        FROM medicine_batches

        WHERE
            medicine_id = ?
            AND quantity > 0
            AND status = 'ACTIVE'

        ORDER BY
            expiry_date ASC,
            created_at ASC
    `).all(medicineId);

};

// GET /api/batches/expiring
export const getExpiringBatches = (
    days = 30
) => {

    return db.prepare(`
        SELECT

            b.*,

            m.name medicine_name,

            s.name supplier_name

        FROM medicine_batches b

        JOIN medicines m
            ON b.medicine_id = m.id

        JOIN suppliers s
            ON b.supplier_id = s.id

        WHERE

            DATE(b.expiry_date)
            <= DATE('now', '+' || ? || ' day')

            AND b.quantity > 0

        ORDER BY
            b.expiry_date ASC
    `).all(days);

};

// GET /api/batches/low-stock
export const getLowStockBatches = () => {

    return db.prepare(`
        SELECT

            b.*,

            m.name medicine_name,

            m.minimum_stock

        FROM medicine_batches b

        JOIN medicines m
            ON b.medicine_id = m.id

        WHERE

            b.quantity <= m.minimum_stock

            AND b.quantity > 0

        ORDER BY
            b.quantity ASC
    `).all();

};

// PATCH /api/batches/:id/status
export const updateBatchStatus = (
    id,
    status
) => {

    getBatchById(id);

    db.prepare(`
        UPDATE medicine_batches
        SET status = ?
        WHERE id = ?
    `).run(
        status,
        id
    );

    return getBatchById(id);

};

// GET /api/batches/summary/:medicineId
export const getBatchSummary = (
    medicineId
) => {

    const totalStock = db.prepare(`
        SELECT
            COALESCE(SUM(quantity),0) total
        FROM medicine_batches
        WHERE medicine_id = ?
    `).get(medicineId);

    const totalBatches = db.prepare(`
        SELECT COUNT(*) total
        FROM medicine_batches
        WHERE medicine_id = ?
    `).get(medicineId);

    const nextExpiry = db.prepare(`
        SELECT expiry_date
        FROM medicine_batches

        WHERE
            medicine_id = ?
            AND quantity > 0

        ORDER BY expiry_date ASC

        LIMIT 1
    `).get(medicineId);

    return {

        totalStock: totalStock.total,

        totalBatches: totalBatches.total,

        nextExpiry:
            nextExpiry?.expiry_date ?? null,

    };

};

