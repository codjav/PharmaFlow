import db from "../config/db.js";

// GET /api/alerts/low-stock
export const getLowStockMedicines = () => {
    return db.prepare(`
        SELECT
            m.id,
            m.name,
            m.company,
            m.minimum_stock,
            COALESCE(SUM(mb.quantity),0) AS quantity
        FROM medicines m
        LEFT JOIN medicine_batches mb
        ON mb.medicine_id = m.id
        GROUP BY
            m.id,
            m.name,
            m.company,
            m.minimum_stock
        HAVING quantity <= m.minimum_stock
        ORDER BY quantity ASC;
    `).all();
};

// GET /api/alerts/near-expiry
export const getNearExpiryMedicines = () => {
    return db.prepare(`
        SELECT
            mb.id,
            m.name,
            m.company,
            mb.batch_number,
            mb.quantity,
            mb.expiry_date
        FROM medicine_batches mb
        JOIN medicines m
        ON mb.medicine_id = m.id
        WHERE
            DATE(mb.expiry_date) >= DATE('now')
        AND
            DATE(mb.expiry_date) <= DATE('now','+30 day')
        AND
            mb.quantity > 0
        ORDER BY mb.expiry_date;
    `).all();
};

// GET /api/alerts/90-expiry
export const get90ExpiryMedicines = () => {
    return db.prepare(`
        SELECT
            mb.id,
            m.name,
            m.company,
            mb.batch_number,
            mb.quantity,
            mb.expiry_date
        FROM medicine_batches mb
        JOIN medicines m
        ON mb.medicine_id = m.id
        WHERE
            DATE(mb.expiry_date) > DATE('now','+30 day')
        AND
            DATE(mb.expiry_date) <= DATE('now','+90 day')
        AND
            mb.quantity > 0
        ORDER BY mb.expiry_date;
    `).all();
};

// GET /api/alerts/expired
export const getExpiredMedicines = () => {
    return db.prepare(`
        SELECT
            mb.id,
            m.name,
            m.company,
            mb.batch_number,
            mb.quantity,
            mb.expiry_date
        FROM medicine_batches mb
        JOIN medicines m
        ON mb.medicine_id = m.id
        WHERE
            DATE(mb.expiry_date) < DATE('now')
        AND
            mb.quantity > 0
        ORDER BY mb.expiry_date;
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

export const getOutOfStockMedicines = () => {
    return db.prepare(`
        SELECT
            m.id,
            m.name,
            m.company,
            m.minimum_stock,
            COALESCE(SUM(mb.quantity),0) AS quantity
        FROM medicines m
        LEFT JOIN medicine_batches mb
            ON m.id = mb.medicine_id
        GROUP BY
            m.id,
            m.name,
            m.company,
            m.minimum_stock
        HAVING quantity = 0
        ORDER BY m.name
    `).all();
};

// GET /api/alerts/summary
export const getAlertSummary = () => {
    const lowStock = db.prepare(`
        SELECT COUNT(*) total
        FROM (
            SELECT
                m.id
            FROM medicines m
            LEFT JOIN medicine_batches mb
            ON mb.medicine_id = m.id
            GROUP BY
                m.id,
                m.minimum_stock
            HAVING
                COALESCE(SUM(mb.quantity),0)
                <=
                m.minimum_stock
        )
    `).get();

    const nearExpiry = db.prepare(`
        SELECT COUNT(*) total
        FROM medicine_batches
        WHERE
            DATE(expiry_date)>=DATE('now')
        AND
            DATE(expiry_date)<=DATE('now','+30 day')
        AND
            quantity>0
    `).get();

    const expiry90 = db.prepare(`
    SELECT COUNT(*) total
    FROM medicine_batches
    WHERE
        DATE(expiry_date) > DATE('now','+30 day')
    AND
        DATE(expiry_date) <= DATE('now','+90 day')
    AND
        quantity > 0
`).get();

    const outOfStock = db.prepare(`
    SELECT COUNT(*) total
    FROM (
        SELECT
            m.id
        FROM medicines m
        LEFT JOIN medicine_batches mb
            ON m.id = mb.medicine_id
        GROUP BY m.id
        HAVING COALESCE(SUM(mb.quantity),0) = 0
    )
`).get();

    const expired = db.prepare(`
        SELECT COUNT(*) total
        FROM medicine_batches
        WHERE
            DATE(expiry_date)<DATE('now')
        AND
            quantity>0
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
    lowStockCount: lowStock.total,
    outOfStockCount: outOfStock.total,
    nearExpiryCount: nearExpiry.total,
    expiry90Count: expiry90.total,
    expiredCount: expired.total,
    customerDueCount: customerDue.total,
    supplierDueCount: supplierDue.total,
};
};
