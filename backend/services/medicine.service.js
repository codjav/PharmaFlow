import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import { validateMedicine } from "../validators/medicine.validator.js";

// GET all medicine
export const getAllMedicines = () => {
    return db.exec(`
        SELECT
            m.*,
            c.name AS category_name,
            s.name AS supplier_name
        
        FROM medicines m

        LEFT JOIN categories c
            ON m.category_id = c.id

        LEFT JOIN suppliers s 
            ON m.supplier_id = s.id

        ORDER BY m.name
    `).all();
};

// GET medicine by id
export const getMedicineById = (id) => {
    const medicine = db.prepare(`
        SELECT * 
        FROM medicines
        WHERE id = ?
    `).get(id);

    if(!medicine) {
        throw new AppError("Medicine not found", 404);
    }

    return medicine;
};

// CREATE new medicine
export const createMedicine = (medicineData) => {

    validateMedicine(
        medicineData
    );

    const {
        name,
        batch_number,
        category_id,
        company,
        supplier_id,
        barcode,
        mrp,
        dr_price,
        price,
        quantity,
        minimum_stock,
        expiry_date
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
            batch_number,
            category_id,
            company,
            supplier_id,
            barcode,
            mrp,
            dr_price,
            price,
            quantity,
            minimum_stock,
            expiry_date
        )
        VALUES (
            ?,?,?,?,?,?,?,?,?,?,?,?
        )
    `).run(
        name,
        batch_number,
        category_id,
        company,
        supplier_id,
        barcode,
        mrp,
        dr_price,
        price,
        quantity,
        minimum_stock,
        expiry_date
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
        batch_number,
        category_id,
        company,
        supplier_id,
        barcode,
        mrp,
        dr_price,
        price,
        quantity,
        minimum_stock,
        expiry_date
    } = medicineData;

    db.prepare(`
        UPDATE medicines
        SET 
            name = ?,
            batch_number = ?,
            category_id = ?,
            company = ?,
            supplier_id = ?,
            barcode = ?,
            mrp = ?,
            dr_price = ?,
            price = ?,
            quantity = ?,
            minimum_stock = ?,
            expiry_date = ?
        WHERE id=?
    `).run(
        name,
        batch_number,
        category_id,
        company,
        supplier_id,
        barcode,
        mrp,
        dr_price,
        price,
        quantity,
        minimum_stock,
        expiry_date,
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
    // if(!keyword.trim()) {
    //     return db.prepare(`
    //         SELECT * 
    //         FROM medicines
    //     `).all();
    // }

    const searchPatter = `%${keyword}%`;

    return db.prepare(`
        SELECT 
            m.*,
            c.name AS category_name 
        FROM medicines m
        LEFT JOIN categories c
            ON m.category_id = c.id
        WHERE 
            m.name LIKE ?
            OR m.company LIKE ?
            OR barcode LIKE ?
            OR c.name LIKE ?
    `).all(
        searchPatter,
        searchPatter,
        searchPatter,
        searchPatter
    )
}