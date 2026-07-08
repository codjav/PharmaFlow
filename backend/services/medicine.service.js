import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import { validateMedicine } from "../validators/medicine.validator.js";

// GET all medicine
export const getAllMedicines = () => {
    return db.prepare(`
        SELECT
            m.*,
            c.name AS category_name,
            s.name AS supplier_name,
            COALESCE(SUM(b.quantity), 0) AS total_stock
        FROM medicines m
        LEFT JOIN categories c
            ON m.category_id = c.id
        LEFT JOIN suppliers s
            ON m.supplier_id = s.id
        LEFT JOIN medicine_batches b
            ON b.medicine_id = m.id
        GROUP BY m.id
        ORDER BY m.name;
    `).all();
};

// GET medicine by id
export const getMedicineById = (id) => {
    const medicine = db.prepare(`
        SELECT
            m.*,
            c.name AS category_name,
            s.name AS supplier_name,
            COALESCE(SUM(b.quantity), 0) AS total_stock
        FROM medicines m
        LEFT JOIN categories c
            ON m.category_id = c.id
        LEFT JOIN suppliers s
            ON m.supplier_id = s.id
        LEFT JOIN medicine_batches b
            ON b.medicine_id = m.id
        WHERE m.id = ?
        GROUP BY m.id;
    `).get(id);

    if(!medicine) {
        throw new AppError("Medicine not found", 404);
    }

    return medicine;
};

export const getMedicineBatches = (medicineId) => {
    return db.prepare(`
        SELECT
            id,
            batch_number,
            expiry_date,
            mrp,
            purchase_price,
            dr_price,
            selling_price,
            quantity,
            status
        FROM medicine_batches
        WHERE medicine_id = ?
        ORDER BY expiry_date ASC
    `).all(medicineId);
};

// CREATE new medicine
export const createMedicine = (medicineData) => {

    validateMedicine(
        medicineData
    );

    const {
        name,
        category_id,
        company,
        supplier_id,
        barcode,
        minimum_stock
    } = medicineData;

    const existingBarcode = db.prepare(`
        SELECT id
        FROM medicines
        WHERE barcode = ?
    `).get(barcode);

    if(existingBarcode) {
        throw new AppError("Barcode already exists", 400);
    }

    const result = db.prepare(`
        INSERT INTO medicines(
            name,
            category_id,
            company,
            supplier_id,
            barcode,
            minimum_stock
        )
        VALUES (?,?,?,?,?,?)
    `).run(
        name,
        category_id,
        company,
        supplier_id,
        barcode,
        minimum_stock
    );

    return getMedicineById(
        result.lastInsertRowid
    );
};

// Update medicine
export const updateMedicine = (id, medicineData) => {
    getMedicineById(id);

    const {
        name,
        category_id,
        company,
        supplier_id,
        barcode,
        minimum_stock
    } = medicineData;

    db.prepare(`
        UPDATE medicines
        SET
            name = ?,
            category_id = ?,
            company = ?,
            supplier_id = ?,
            barcode = ?,
            minimum_stock = ?
        WHERE id = ?
    `).run(
        name,
        category_id,
        company,
        supplier_id,
        barcode,
        minimum_stock,
        id
    );

    return getMedicineById(id);
};

// Delete medicine
export const deleteMedicine = (id) => {
    getMedicineById(id);
    db.prepare(`
        DELETE FROM medicines
        WHERE id = ?
    `).run(id);
};

// Search medicine
export const searchMedicines = (keyword = "") => {

    const searchPattern = `%${keyword}%`;

    return db.prepare(`
        SELECT
            m.*,
            c.name AS category_name,
            s.name AS supplier_name,
            COALESCE(SUM(b.quantity),0) AS total_stock
        FROM medicines m
        LEFT JOIN categories c
            ON m.category_id = c.id
        LEFT JOIN suppliers s
            ON m.supplier_id = s.id
        LEFT JOIN medicine_batches b
            ON b.medicine_id = m.id
        WHERE
            m.name LIKE ?
            OR m.company LIKE ?
            OR m.barcode LIKE ?
            OR c.name LIKE ?
        GROUP BY m.id
    `).all(
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern
    )
}

// Low stock medicines
export const getLowStockMedicines = () => {
    return db.prepare(`
        SELECT
            m.id,
            m.name,
            m.minimum_stock,
            COALESCE(SUM(b.quantity),0) AS total_stock
        FROM medicines m
        LEFT JOIN medicine_batches b
            ON b.medicine_id = m.id
        GROUP BY m.id
        HAVING total_stock <= m.minimum_stock
        ORDER BY total_stock
    `).all();
};


// Pagination
export const getPaginatedMedicines = (
    page = 1,
    limit = 10
) => {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const offset = (pageNum - 1) * limitNum;

    const medicines = db.prepare(`
        SELECT
            m.*,
            c.name AS category_name,
            s.name AS supplier_name,
            COALESCE(SUM(b.quantity),0) AS total_stock
        FROM medicines m
        LEFT JOIN categories c
            ON m.category_id = c.id
        LEFT JOIN suppliers s
            ON m.supplier_id = s.id
        LEFT JOIN medicine_batches b
            ON b.medicine_id = m.id
        GROUP BY m.id
        ORDER BY m.id DESC
        LIMIT ?
        OFFSET ?
    `).all(limitNum, offset);

    const countResult = db.prepare(`
        SELECT COUNT(*) AS total
        FROM medicines
    `).get();

    const total = countResult ? countResult.total : 0;

    return {
        medicines,
        pagination: {
            page: pageNum,
            limit: limitNum,
            totalRecords: total,
            totalPages: Math.max(1, Math.ceil(total / limitNum))
        }
    };
};
