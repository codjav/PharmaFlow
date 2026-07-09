import db from "../config/db.js";

// GET /api/reports/sales
export const getSalesReport = (
    startDate,
    endDate
) => {
    return db.prepare(`
        SELECT
            invoice_number,
            total_amount,
            paid_amount,
            due_amount,
            status,
            sale_date
        FROM sales
        WHERE DATE(sale_date)
        BETWEEN DATE(?)
        AND DATE(?)
        ORDER BY sale_date DESC
    `).all(
        startDate,
        endDate
    );
};

// GET /api/reports/purchases
export const getPurchaseReport = (
    startDate,
    endDate
) => {
    return db.prepare(`
        SELECT
            invoice_number,
            total_amount,
            paid_amount,
            due_amount,
            status,
            purchase_date
        FROM purchases
        WHERE DATE(purchase_date)
        BETWEEN DATE(?)
        AND DATE(?)
        ORDER BY purchase_date DESC
    `).all(
        startDate,
        endDate
    );
};

// GET /api/reports/customers
export const getCustomerReport = () => {
    return db.prepare(`
        SELECT
            customer_code,
            name,
            phone,
            total_purchase,
            pending_due,
            status
        FROM customers
        ORDER BY total_purchase DESC
    `).all();
};

// GET /api/reports/suppliers
export const getSupplierReport = () => {
    return db.prepare(`
        SELECT
            supplier_code,
            name,
            phone,
            pending_due,
            status
        FROM suppliers
        ORDER BY name
    `).all();
};

// GET /api/reports/medicines
export const getMedicineReport = () => {
    return db.prepare(`
        SELECT
            m.name,
            m.company,
            COALESCE(SUM(mb.quantity), 0) AS quantity,
            m.minimum_stock,
            MIN(mb.selling_price) AS price,
            MIN(mb.expiry_date) AS expiry_date
        FROM medicines m
        LEFT JOIN medicine_batches mb
            ON m.id = mb.medicine_id
        GROUP BY
            m.id,
            m.name,
            m.company,
            m.minimum_stock
        ORDER BY m.name;
    `).all();
};

// GET /api/reports/profit
export const getProfitReport = () => {
    return db.prepare(`
        SELECT
            m.name,
            SUM(si.quantity) AS quantitySold,
            SUM(
                (
                    mb.selling_price -
                    mb.purchase_price
                ) * si.quantity
            ) AS profit
        FROM sale_items si

        JOIN medicines m
            ON si.medicine_id = m.id

        JOIN medicine_batches mb
            ON si.batch_id = mb.id

        GROUP BY m.id

        ORDER BY profit DESC;
    `).all();
};

// GET /api/reports/dashboard
export const getDashboardReport = () => {
    const sales = db.prepare(`
        SELECT
        COALESCE(SUM(total_amount),0)
        total
        FROM sales
    `).get();

    const purchases = db.prepare(`
        SELECT
        COALESCE(SUM(total_amount),0)
        total
        FROM purchases
    `).get();

    const customers = db.prepare(`
        SELECT COUNT(*) total
        FROM customers
    `).get();

    const suppliers = db.prepare(`
        SELECT COUNT(*) total
        FROM suppliers
    `).get();

    const medicines = db.prepare(`
        SELECT COUNT(*) total
        FROM medicines
    `).get();

    return {
        totalSales:
            sales.total,
        totalPurchases:
            purchases.total,
        totalCustomers:
            customers.total,
        totalSuppliers:
            suppliers.total,
        totalMedicines:
            medicines.total
    };
};
