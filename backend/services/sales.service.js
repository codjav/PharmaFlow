import db from "../config/db.js";
import AppError from "../utils/AppError.js"
import {validateSales} from "../validators/sales.validator.js"

// GET     /api/sales
// Get all sales
export const getSales = () => {
    return db.prepare(`
        SELECT
            s.*,
            c.name customer_name,
            c.phone
        FROM sales s
        LEFT JOIN customers c
        ON s.customer_id = c.id
        ORDER BY sale_date DESC
    `).all();

};


// GET     /api/sales/:id
// Get sale by id
export const getSaleById = (id) => {
    const sale = db.prepare(`
        SELECT 
            s.*,
            c.name customer_name,
            c.phone
        FROM sales s
        LEFT JOIN customers c
        ON s.customer_id = c.id
        WHERE s.id = ?
    `).get(id);

    if(!sale) {
        throw new AppError(
            "Sale not found",
            404
        );
    }

    const item = db.prepare(`
        SELECT
            si.*,
            m.name medicine_name 
        FROM sale_items si
        JOIN medicines m
        ON si.medicine_id = m.id
        WHERE si.sale_id = ?
    `).all(id);

    return {
        ...sale,
        items
    };
};


// POST    /api/sales
// Create new sale
export const createSale = (saleData) => {
    validateSales(saleData);

    const transaction = db.transaction(() => {
        const {
            invoice_number,
            customer_name,
            customer_phone,
            payement_type = "CASH",
            sale_type = "RETAIL",
            discount = 0,
            paid_amount = 0,
            items
        } = saleData;

        let customer = db.prepare(`
            SELECT * 
            FROM customers 
            WHERE 
                name = ?,
                OR phone = ?
        `).get(
            customer_name,
            customer_phone
        );

        if(!customer) {
            const result = db.prepare(`
                INSERT INTO customers(
                    name,
                    phone
                )
                VALUES (?,?)
            `).run(
                customer_name,
                customer_phone
            );

            customer = db.prepare(`
                SELECT *
                FROM customers
                WHERE id=?
            `).get(
                result.lastInsertRowid
            );
        }

        let subtotal = 0;
        const saleItems = [];
        items.forEach(item => {
            const medicine = db.prepare(`
                SELECT *
                FROM medicines
                WHERE id = ?
            `).get(item.medicine_id);

            if(!medicine) {
                throw new AppError(
                    "Medicine not found",
                    404
                );
            }

            if(medicine.quantity < item.quantity) {
                throw new AppError(
                    `${medicine.name} out of stock`,
                    400
                );
            }

            let unitPrice;
            if(sale_type === "WHOLESALE") {
                unitPrice = medicine.dr_price;
            }
            else {
                unitPrice = medicine.mrp;
            }

            const total = unitPrice * item.quantity;

            subtotal += total;

            saleItems.push({
                medicine,
                quantity: item.quantity,
                unitPrice,
                total
            });
        });

        // GST Included
        const gst = 18;
        const totalAmount = subtotal - discount;
        const dueAmount = totalAmount - paid_amount;

        const status = 
            dueAmount > 0 
                ?"PARTIAL"
                : "PAID";

        const saleResult = db.prepare(`
            INSERT INTO sales (
                invoice_number,
                customer_id,
                sale_type,
                payement_type,
                subtotal,
                discount,
                gst,
                total_amount,
                paid_amount,
                due_amount,
                status
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?)
        `).run(
            invoice_number,
            customer.id,
            sale_type,
            payement_type,
            subtotal,
            discount,
            get,
            totalAmount,
            paid_amount,
            dueAmount,
            status
        );

        const saleId = saleResult.lastInsertRowid;

        saleItems.forEach(item => {
            db.prepare(`
                INSERT INTO sale_items(
                    sale_id,
                    medicine_id,
                    batch_number,
                    expiry_date,
                    quantity,
                    unit_price,
                    total
                )
                VALUES (?,?,?,?,?,?,?)
            `).run(
                saleId,
                item.medicine.id,
                item.medicine.batch_number,
                item.medicine.expiry_date,
                item.quantity,
                item.unitPrice,
                item.total
            );

            // Stock Reduce
            db.prepare(`
                UPDATE medicines
                SET quantity = quantity-?
                WHERE id = ?
            `).run(
                item.quantity,
                item.medicine.id
            );

            // Stock Movements
            db.prepare(`
                INSERT INTO stock_movements(
                    medicine_id,
                    movement_type,
                    quantity,
                    reference_id
                )
                VALUES (?,?,?,?)
            `).run(
                item.medicine.id,
                "SALE",
                item.quantity,
                saleId
            );
        });

        // Customer update
        db.prepare(`
            UPDATE customers
            SET 
                total_purchase = total_purchase + ?
                pending_due = pending_due + ?
            
            WHERE id = ?
        `).run (
            totalAmount,
            dueAmount,
            customer.id
        );

        return saleId;
    });

    const saleId = transaction();

    return getSaleById(saleId);
};


// DELETE  /api/sales/:id
// Delete sale
export const deleteSale = (saleId) => {
    const sale = getSaleById(saleId);

    const transaction = db.transaction(() => {
        // Restock
        sale.items.forEach((item) => {
            db.prepare(`
                UPDATE medicines 
                SET quantity = quantity + ?
                WHERE id = ?
            `).run(
                item.quantity,
                item.medicine_id
            );

            db.prepare(`
                INSERT INTO stock_movements(
                    medicine_id,
                    movement_type,
                    quantity,
                    reference_id
                )
                VALUES (?,?,?,?)
            `).run(
                item.medicine_id,
                "SALE_DELETE",
                item.quantity,
                saleId
            );
        });

        // Update Customers
        db.prepare(`
            UPDATE customers 
            SET 
                total_purchase = total_purchase - ?,
                pending_due = pending_due - ?
            WHERE id = ?
        `).run(
            sale.total_amount,
            sale.due_amount,
            sale.customer_id
        );

        db.prepare(`
            DELETE FROM sale_items
            WHERE sale_id =?
        `).run(saleId);

        db.prepare(`
            DELETE FROM sales
            WHERE id=?
        `).run(saleId);
    });

    transaction();
};


// Get paginated sales
export const getPaginatedSales = (page = 1, limit = 10) => {
    const offset = (page-1) * limit;

    const sales = db.prepare(`
        SELECT 
            s.*,
            c.name customer_name
        FROM sales s
        LEFT JOIN customers c
        ON s.customer_id = c.id
        ORDER BY sale_date DESC
        LIMIT ?
        OFFSET ?
    `).all(
        limit,
        offset
    );

    const total = db.prepare(`
        SELECT COUNT(*) total
        FROM sales
    `).get();

    return {
        sales,
        pagination: {
            page,
            limit,
            totalRecords: total.total,
            totalPages: Math.ceil(total.total / limit)
        }
    };
};


// GET /api/sales/search
// Search sale
export const searchSales = (keyword = "") => {
    return db.prepare(`
        SELECT 
            s.*,
            c.name customer_name,
            c.phone
        FROM sales s
        LEFT JOIN customers c
        ON s.customer_id = c.id
        WHERE 
            s.invoice_number LIKE ?
            OR c.name LIKE ?
            OR c.phone LIKE ?
        ORDER BY sale_date DESC
    `).all(
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`
    );
};


// GET /api/sales/stats
// Get stats
export const getSalesStats = () => {
    return db.prepare(`
        SELECT
            COUNT(*) totalSales,
            COALESCE(SUM(total_amount), 0) totalAmount,
            COALESCE(SUM(paid_amount), 0) paidAmount,
            COALESCE(SUM(due_amount), 0) dueAmount
        FROM sales
    `).get();
};

// Get today sales
export const getTodalSales = () => {
    return db.prepare(`
        SELECT 
            COUNT(*) totalSales,
            COALESCE(SUM(total_amount), 0) totalAmount
        FROM sales
        WHERE DATE(sale_date) = DATE('now')
    `).get();
};


// GET /api/sales/recent
// Get recent sales
export const getRecentSales = () => {
    return db.prepare(`
        SELECT 
            s.id,
            s.invoice_number,
            s.total_amount,
            s.status,
            s.sale_date,
            c.name customer_name
        FROM sales s
        LEFT JOIN customers c
        ON s.customer_id = c.id
        ORDER BY s.sale_date DESC
        LIMIT 10
    `).all();
}


// GET /api/sales/customer/:customerId
// Get sales by customer
export const getCustomerSales = (customerId) => {
    return db.prepare(`
        SELECT * 
        FROM sales 
        WHERE customer_id = ?
        ORDER BY sale_date DESC
    `).all(customerId);
};


// PATCH /api/sales/:id/payment
// Update payment
export const updateSalePayment = (saleId, amount) => {
    const sale = db.prepare(`
        SELECT *
        FROM sales
        WHERE id = ?
    `).get(saleId);

    if(!sale) {
        throw new AppError(
            "Sale not found",
            404
        );
    }

    const newPaidAmount = sale.paid_amount + amount;
    const newDueAmount = sale.total_amount - newPaidAmount;

    const status = 
        newDueAmount > 0
            ? "PARTIAL"
            : "PAID";
    
    db.prepare(`
        UPDATE sales
        SET 
            paid_amount = ?
            due_amount = ?
            status = ?
        WHERE id = ?
    `).run(
        newPaidAmount,
        newDueAmount,
        status,
        saleId
    );

    db.prepare(`
        UPDATE customers
        SET 
            pending_due = pending_due - ?
        WHERE id = ?
    `).run(
        amount,
        sale.customer_id
    );
};


// PATCH /api/sales/:id/mark-paid
// Mark paid
export const markSalePaid = (saleId) => {
    const sale = db.prepare(`
        SELECT *
        FROM sales
        WHERE id=?
    `).get(saleId);

    if(!sale) {
        throw new AppError(
            "Sale not found",
            404
        );
    }

    db.prepare(`
        UPDATE sales
        SET 
            paid_amount = total_amount,
            due_amount = 0,
            status = 'PAID'
        WHERE id = ?
    `).run(saleId);

    db.prepare(`
        UPDATE customers
        SET 
            pending_due = pending_due - ?
        WHERE id = ?
    `).run(
        sale.total_amount,
        sale.customer_id
    );
};

// Get monthly sales chart 
export const getMonthlySales = () => {
    return db.prepare(`
        SELECT 
            strftime('%m',sale_date) month,
            SUM(total_amount) total
        FROM sales
        GROUP BY month
        ORDER BY month
    `).all();
}


// GET /api/sales/report
// Get report
export const getSalesReport = () => {
    const todaySales = db.prepare(`
        SELECT 
            COALESCE(SUM(total_amount), 0) total
        FROM sales
        WHERE DATE(sale_date)=DATE('now')
    `).get();

    const monthSales = db.prepare(`
        SELECT 
            COALESCE(SUM(total_amount), 0) total
        FROM sales
        WHERE strftime('%Y-%m',sale_date)
        =
        strftime('%Y-%m','now')
    `).get();

    const yearSales = db.prepare(`
        SELECT 
            COALESCE(SUM(total_amount), 0) total
        FROM sales
        WHERE strftime('%Y',sale_date)
        =
        strftime('%Y','now')
    `).get();

    const averageSale = db.prepare(`
        SELECT 
            COALESCE(AVG(total_amount), 0) avgSale
        FROM sales
    `).get();

    return {
        todaySales: todaySales.total,
        monthSales: monthSales.total,
        yearSales: yearSales.total,
        averageSale: averageSale.avgSale
    };
};


// GET /api/sales/top-medicines
// Get top medicines
export const getTopSellingMedicines = () => {
    return db.prepare(`
        SELECT 
            m.id,
            m.name,
            SUM(si.quantity) quantitySold,
            SUM(si.total) totalRevenue
        FROM sales s
        JOIN medicines m
        ON si.medicine_id = m.id
        GROUP BY m.id
        ORDER BY quantitySold DESC
        LIMIT 10
    `).all();
}
