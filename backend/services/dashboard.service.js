import db from "../config/db.js";

// GET /api/dashboard/stats
export const getDashboardStats = () => {
    const medicines = db.prepare(`
        SELECT COUNT(*) total
        FROM medicines
    `).get();

    const customers = db.prepare(`
        SELECT COUNT(*) total
        FROM customers
    `).get();

    const suppliers = db.prepare(`
        SELECT COUNT(*) total
        FROM suppliers
    `).get();

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

    return {
        totalMedicines:
            medicines.total,
        totalCustomers:
            customers.total,
        totalSuppliers:
            suppliers.total,
        totalSales:
            sales.total,
        totalPurchases:
            purchases.total
    };
};

// GET /api/dashboard/charts
export const getMonthlySalesChart = () => {
    return db.prepare(`
        SELECT
            strftime('%m',sale_date)
            month,
            SUM(total_amount)
            total
        FROM sales
        GROUP BY month
        ORDER BY month
    `).all();
};
export const getMonthlyPurchaseChart = () => {
    return db.prepare(`
        SELECT
            strftime('%m',purchase_date)
            month,
            SUM(total_amount)
            total
        FROM purchases
        GROUP BY month
        ORDER BY month
    `).all();
};

// GET /api/dashboard/recent-sales
export const getRecentSales = () => {
    return db.prepare(`
        SELECT
            s.invoice_number,
            c.name customer_name,
            s.total_amount,
            s.status,
            s.sale_date
        FROM sales s
        LEFT JOIN customers c
        ON s.customer_id=c.id
        ORDER BY sale_date DESC
        LIMIT 5
    `).all();
};

// GET /api/dashboard/recent-purchases
export const getRecentPurchases = () => {
    return db.prepare(`
        SELECT
            p.invoice_number,
            s.name supplier_name,
            p.total_amount,
            p.status,
            p.purchase_date
        FROM purchases p
        LEFT JOIN suppliers s
        ON p.supplier_id=s.id
        ORDER BY purchase_date DESC
        LIMIT 5
    `).all();
};

// GET /api/dashboard/top-medicines
export const getTopMedicines = () => {
    return db.prepare(`
        SELECT
            m.name,
            SUM(si.quantity)
            quantitySold
        FROM sale_items si
        JOIN medicines m
        ON si.medicine_id=m.id
        GROUP BY m.id
        ORDER BY quantitySold DESC
        LIMIT 10
    `).all();
};

// GET /api/dashboard/top-customers
export const getTopCustomers = () => {
    return db.prepare(`
        SELECT
            c.name,
            COUNT(s.id)
            ordersCount,
            SUM(s.total_amount)
            totalSales
        FROM customers c
        LEFT JOIN sales s
        ON c.id=s.customer_id
        GROUP BY c.id
        ORDER BY totalSales DESC
        LIMIT 10
    `).all();
};

// GET /api/dashboard/low-stock
export const getLowStockMedicines = () => {
    return db.prepare(`
        SELECT
            id,
            name,
            quantity,
            minimum_stock
        FROM medicines
        WHERE quantity<=minimum_stock
        ORDER BY quantity
    `).all();
};

// GET /api/dashboard/near-expiry
export const getNearExpiryMedicines = () => {
    return db.prepare(`
        SELECT
            id,
            name,
            expiry_date,
            quantity
        FROM medicines
        WHERE
        julianday(expiry_date)
        -
        julianday('now')
        <=30
    `).all();
};