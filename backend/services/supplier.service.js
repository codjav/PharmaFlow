import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import { validateSupplier } from "../validators/supplier.validator.js";

// Get all supplier
export const getAllSuppliers = () => {
    return db.prepare(`
        SELECT *
        FROM suppliers
        ORDER BY name
    `).all();
}

// Get supplier by id
export const getSupplierById = (id) => {
    const supplier =  db.prepare(`
        SELECT *
        FROM suppliers
        WHERE id = ?
    `).get(id);

    if(!supplier) {
        throw new AppError(
            "Supplier not found",
            404
        );
    }

    return supplier;
};

// Create new supplier
export const createSupplier = (supplierData) => {
    validateSupplier(supplierData);

    const {
        supplier_code,
        name,
        company_name,
        contact_person,
        phone,
        email,
        city,
        address
    } = supplierData;

    db.prepare(`
        INSERT INTO suppliers(
            supplier_code,
            name,
            company_name,
            contact_person,
            phone,
            email,
            city,
            address
        )
        VALUES (?,?,?,?,?,?,?,?)
    `).run(
        supplier_code,
        name,
        company_name,
        contact_person,
        phone,
        email,
        city,
        address
    );

    return db.prepare(`
        SELECT * 
        FROM suppliers
        WHERE name = ?
    `).get(name);
};

// Update supplier
export const updateSupplier = (id, supplierData) => {
    getSupplierById(id);

    const {
        supplier_code,
        name,
        company_name,
        contact_person,
        phone,
        email,
        city,
        address,
        status
    } = supplierData;

    db.prepare(`
        UPDATE suppliers
        SET 
        supplier_code=?,
        name=?,
        company_name=?,
        contact_person=?,
        phone=?,
        email=?,
        city=?,
        address=?,
        status=?

        WHERE id=?
    `).run(
        supplier_code,
        name,
        company_name,
        contact_person,
        phone,
        email,
        city,
        address,
        status,
        id
    )

    return getSupplierById(id);
}

// Delete supplier
export const deleteSupplier = (id) => {
    getSupplierById(id);

    db.prepare(`
        DELETE FROM suppliers
        WHERE id=?
    `).run(id);
}

// Search supplier by name
export const searchSuppliers = (keyword = "") => {
    const searchPattern = `%${keyword}%`;

    return db.prepare(`
        SELECT * 
        FROM suppliers
        WHERE 
            name LIKE ?
            OR company_name LIKE ?
            OR phone LIKE ?
    `).all(
        searchPattern,
        searchPattern,
        searchPattern
    );
};

// Get supplier stats
export const getSupplierStats = () => {
    const totalSuppliers = db.prepare(`
        SELECT COUNT(*) total
        FROM suppliers
    `).get();

    const activeSuppliers = db.prepare(`
        SELECT COUNT(*) total
        FROM suppliers 
        WHERE status = 'ACTIVE'
    `).get();

    const inactiveSuppliers = db.prepare(`
        SELECT COUNT(*) total
        FROM suppliers 
        WHERE status = 'INACTIVE'
    `).get();

    const totalDue = db.prepare(`
        SELECT SUM(pending_due) total
        FROM suppliers
    `).get();

    return {
        totalSuppliers: totalSuppliers.total,
        activeSuppliers: activeSuppliers.total,
        inactiveSuppliers: inactiveSuppliers.total,
        totalDues: totalDue.total || 0
    }
}

// Pagination
export const getPaginatedSuppliers = (
    page = 1,
    limit = 10
) => {
    const offset = (page-1)*limit;
    const suppliers = db.prepare(`
        SELECT *
        FROM suppliers 
        ORDER BY created_at DESC
        LIMIT ?
        OFFSET ?
    `).all(
        limit,
        offset
    );

    const totalRecords = db.prepare(`
        SELECT COUNT(*) total
        FROM suppliers
    `).get();

    return {
        suppliers,
        pagination: {
            page, 
            limit, 
            totalRecords: totalRecords.total,
            totalPages: Math.ceil(
                totalRecords.total/limit
            )
        }
    };
};

// Get supplier summary
export const getSupplierSummary = (id) => {
    const supplier = db.prepare(`
        SELECT *
        FROM suppliers
        WHERE id=?
    `).get(id);

    if (!supplier) {
        throw new AppError(
            "Supplier not found",
            404
        );
    }

    const purchaseSummary = db.prepare(`
        SELECT
            COUNT(*) total_purchases,
            SUM(total_amount) total_amount,
            SUM(paid_amount) paid_amount,
            SUM(due_amount) due_amount
        FROM purchases
        WHERE supplier_id=?
    `).get(id);

    return {
        supplier,
        totalPurchases:
            purchaseSummary.total_purchases || 0,
        totalPurchaseAmount:
            purchaseSummary.total_amount || 0,
        paidAmount:
            purchaseSummary.paid_amount || 0,
        dueAmount:
            purchaseSummary.due_amount || 0
    };
};

// Get supplier with pending due
export const getSuppliersWithDue = () => {
    return db.prepare(`
        SELECT
            id,
            name,
            phone,
            pending_due
        FROM suppliers
        WHERE pending_due > 0
        ORDER BY pending_due DESC
    `).all();
};

// Get top suppliers
export const getTopSuppliers = () => {
    return db.prepare(`
        SELECT
            s.id,
            s.name,
            s.phone,
            COUNT(p.id) total_orders,
            SUM(p.total_amount) total_purchase
        FROM suppliers s
        LEFT JOIN purchases p
        ON s.id = p.supplier_id
        GROUP BY s.id
        ORDER BY total_purchase DESC
        LIMIT 5
    `).all();
};