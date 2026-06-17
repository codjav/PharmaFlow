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
    return db.exec(`

    `)
}