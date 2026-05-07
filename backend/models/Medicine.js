import db from '../config/db.js'

const Medicine = {
    // Read All 
    findAll: () => {
        return db.prepare('SELECT * FROM medicines ORDER BY name ASC').all();
    },

    // Read One
    findById: (id) => {
        return db.prepare('SELECT * FROM medicines WHERE id = ?').get(id);
    },

    // Create
    create: (data) => {
        const stmt = db.prepare(`
            INSERT INTO medicines(name, batch_number, barcode, category, company, supplier_id, mrp, dr_price, price, quantity, expiry_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        const result = stmt.run(data.name, data.batch_number, data.barcode, data.category, data.company, data.supplier_id, data.mrp, data.dr_price, data.price, data.quantity, data.expiry_date);

        return result.lastInsertRowid;
    },

    // Update
    update: (id, data) => {
        const stmt = db.prepare(`
            UPDATE medicines
            SET name = ?, batch_number = ?, barcode = ?, category = ?, company = ?, supplier_id = ?, mrp = ?, dr_price = ?, price = ?, quantity = ?, expiry_date = ?
        `);
        const result = stmt.run(data.name, data.batch_number, data.barcode, data.category, data.company, data.supplier_id, data.mrp, data.dr_price, data.price, data.quantity, data.expiry_date);

        return result.changes > 0;
    },

    // Delete
    delete: (id) => {
        const stmt = db.prepare('DELETE FROM medicines WHERE id = ?')
        const result = stmt.run(id);
        return result.changes>0;
    }

};

export default Medicine;