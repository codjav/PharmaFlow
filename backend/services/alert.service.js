import db from "../config/db.js";

// GET /api/alerts/low-stock
export const getLowStockMedicines = () => {
    return db.prepare(`
        SELECT
            id,
            name,
            quantity,
            minimum_stock,
            company
        FROM medicines
        WHERE quantity <= minimum_stock
        ORDER BY quantity ASC
    `).all();
};

// GET /api/alerts/near-expiry
export const getNearExpiryMedicines = () => {
    return db.prepare(`
        SELECT
            id,
            name,
            company,
            quantity,
            expiry_date
        FROM medicines
        WHERE
            julianday(expiry_date)
            -
            julianday('now')
            <= 30
        AND
            julianday(expiry_date)
            >= 0
        ORDER BY expiry_date
    `).all();
};

// GET /api/alerts/90-expiry
export const get90ExpiryMedicines = () => {
    return db.prepare(`
        SELECT
            id,
            name,
            company,
            quantity,
            expiry_date
        FROM medicines
        WHERE
            julianday(expiry_date)
            -
            julianday('now')
            <= 90
        AND
            julianday(expiry_date)
            >= 30
        ORDER BY expiry_date
    `).all();
};

// GET /api/alerts/expired
export const getExpiredMedicines = () => {
    return db.prepare(`
        SELECT
            id,
            name,
            company,
            quantity,
            expiry_date
        FROM medicines
        WHERE DATE(expiry_date)
        < DATE('now')
        ORDER BY expiry_date
    `).all();
};

// GET /api/alerts/customer-dues
export const getCustomerDueAlerts = () => {
    return db.prepare(`
        SELECT
            id,
            name,
            phone,
            pending_due
        FROM customers
        WHERE pending_due > 0
        ORDER BY pending_due DESC
    `).all();
};

// GET /api/alerts/supplier-dues
export const getSupplierDueAlerts = () => {
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

// GET /api/alerts/summary
export const getAlertSummary = () => {
    const lowStock = db.prepare(`
        SELECT COUNT(*) total
        FROM medicines
        WHERE quantity <= minimum_stock
    `).get();

    const nearExpiry = db.prepare(`
        SELECT COUNT(*) total
        FROM medicines
        WHERE
            julianday(expiry_date)
            -
            julianday('now')
            <= 30
        AND
            julianday(expiry_date)
            >= 0
    `).get();

    const expired = db.prepare(`
        SELECT COUNT(*) total
        FROM medicines
        WHERE DATE(expiry_date)
        < DATE('now')
    `).get();

    const customerDue = db.prepare(`
        SELECT COUNT(*) total
        FROM customers
        WHERE pending_due > 0
    `).get();

    const supplierDue = db.prepare(`
        SELECT COUNT(*) total
        FROM suppliers
        WHERE pending_due > 0
    `).get();

    return {
        lowStockCount:
            lowStock.total,
        nearExpiryCount:
            nearExpiry.total,
        expiredCount:
            expired.total,
        customerDueCount:
            customerDue.total,
        supplierDueCount:
            supplierDue.total
    };
};
