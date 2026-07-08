import db from "../config/db.js";

// GET /api/dashboard/stats
export const getDashboardStats = () => {
  const medicines = db
    .prepare(
      `
        SELECT COUNT(*) total
        FROM medicines
    `,
    )
    .get();

  const customers = db
    .prepare(
      `
        SELECT COUNT(*) total
        FROM customers
    `,
    )
    .get();

  const suppliers = db
    .prepare(
      `
        SELECT COUNT(*) total
        FROM suppliers
    `,
    )
    .get();

  const sales = db
    .prepare(
      `
        SELECT
            COALESCE(SUM(total_amount),0)
            total
        FROM sales
    `,
    )
    .get();

  const purchases = db
    .prepare(
      `
        SELECT
            COALESCE(SUM(total_amount),0)
            total
        FROM purchases
    `,
    )
    .get();

  const stock = db
    .prepare(
      `
        SELECT
            COALESCE(SUM(quantity),0) total
        FROM medicine_batches
        WHERE status = 'ACTIVE'
    `,
    )
    .get();

  return {
    totalMedicines: medicines.total,
    totalStock: stock.total,
    totalCustomers: customers.total,
    totalSuppliers: suppliers.total,
    totalSales: sales.total,
    totalPurchases: purchases.total,
  };
};

// GET /api/dashboard/charts
export const getMonthlySalesChart = () => {
  return db
    .prepare(
      `
        SELECT
            strftime('%Y-%m',sale_date)
            month,
            SUM(total_amount)
            total
        FROM sales
        GROUP BY month
        ORDER BY month
    `,
    )
    .all();
};
export const getMonthlyPurchaseChart = () => {
  return db
    .prepare(
      `
        SELECT
          strftime('%Y-%m',purchase_date)
            month,
            SUM(total_amount)
            total
        FROM purchases
        GROUP BY month
        ORDER BY month
    `,
    )
    .all();
};

// GET /api/dashboard/recent-sales
export const getRecentSales = () => {
  return db
    .prepare(
      `
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
    `,
    )
    .all();
};

// GET /api/dashboard/recent-purchases
export const getRecentPurchases = () => {
  return db
    .prepare(
      `
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
    `,
    )
    .all();
};

// GET /api/dashboard/top-medicines
export const getTopMedicines = () => {
  return db
    .prepare(
      `
        SELECT
            m.name AS medicine_name,
            SUM(si.quantity) AS quantity_sold
        FROM sale_items si
        JOIN medicines m
        ON si.medicine_id = m.id
        GROUP BY m.id
        ORDER BY quantity_sold DESC
        LIMIT 10
    `,
    )
    .all();
};

// GET /api/dashboard/top-customers
export const getTopCustomers = () => {
  return db
    .prepare(
      `
        SELECT
            c.name,
            COUNT(s.id) AS total_orders,
            COALESCE(
                SUM(s.total_amount),
                0
            ) AS total_sales
        FROM customers c
        LEFT JOIN sales s
        ON c.id = s.customer_id
        GROUP BY c.id
        ORDER BY total_sales DESC
        LIMIT 10
    `,
    )
    .all();
};

// GET /api/dashboard/low-stock
export const getLowStockInventory = () => {
  return db
    .prepare(
      `
        SELECT
            m.id,
            m.name AS medicine_name,
            m.minimum_stock,
            COALESCE(
                SUM(b.quantity),
                0
            ) AS quantity
        FROM medicines m
        LEFT JOIN medicine_batches b
            ON m.id = b.medicine_id
            AND b.status = 'ACTIVE'
        GROUP BY m.id
        HAVING quantity <= m.minimum_stock
        ORDER BY quantity ASC
    `,
    )
    .all();
};

// GET /api/dashboard/near-expiry
export const getExpiringBatches = (days = 30) => {
  return db
    .prepare(
      `
        SELECT
            b.id,
            m.name AS medicine_name,
            b.batch_number,
            b.expiry_date,
            b.quantity
        FROM medicine_batches b
        JOIN medicines m
            ON b.medicine_id = m.id
        WHERE
            b.status = 'ACTIVE'
            AND b.quantity > 0
            AND DATE(b.expiry_date)
                <= DATE('now','+' || ? || ' day')
        ORDER BY b.expiry_date ASC
    `,
    )
    .all(days);
};

// GET /api/dashboard/summary
export const getDashboardSummary = () => {
  return {
    stats: getDashboardStats(),

    charts: {
      monthlySales: getMonthlySalesChart(),
      monthlyPurchases: getMonthlyPurchaseChart(),
    },

    tables: {
      recentSales: getRecentSales(),
      recentPurchases: getRecentPurchases(),
      topMedicines: getTopMedicines(),
      topCustomers: getTopCustomers(),
      lowStock: getLowStockInventory(),
      expiringBatches: getExpiringBatches(),
    },
  };
};
