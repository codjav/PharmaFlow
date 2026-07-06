import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import {validateCustomer} from "../validators/customer.validator.js";

// GET     /api/customers
// GET all
export const getAllCustomers = () => {
    return db.prepare(`
        SELECT * 
        FROM customers
        ORDER BY name
    `).all();
};

// GET     /api/customers/:id
// Get by id
export const getCustomerById = (id) => {
    const customer = db.prepare(`
        SELECT *
        FROM customers
        WHERE id =?
    `).get(id);

    if(!customer) {
        throw new AppError("Customer not found", 404);
    }

    return customer;
}

// POST    /api/customers
// Create customer
export const createCustomer = (customerData) => {
    validateCustomer(customerData);

    const {
        customer_code,
        name,
        phone,
        email,
        city,
        address,
        status = "ACTIVE"
    } = customerData;

    const existingCustomer = db.prepare(`
        SELECT id
        FROM customers
        WHERE phone = ?
    `).get(phone);

    if(existingCustomer) {
        throw new AppError("Customer already exists", 400);
    }

    const result = db.prepare(`
        INSERT into customers(
            customer_code,
            name,
            phone,
            email,
            city,
            address,
            status
        )
        VALUES(?,?,?,?,?,?,?)
    `).run(
        customer_code,
        name,
        phone,
        email,
        city,
        address,
        status
    )

    return getCustomerById(
        result.lastInsertRowid
    );
};

// PUT     /api/customers/:id
// Update customer
export const updateCustomer = (id, customerData) => {
    getCustomerById(id);

    const {
        customer_code,
        name,
        phone,
        email,
        city,
        address,
        status
    } = customerData;

    db.prepare(`
        UPDATE customers
        SET
            customer_code=?,
            name=?,
            phone=?,
            email=?,
            city=?,
            address=?,
            status=?
        WHERE id=?
    `).run(
        customer_code,
        name,
        phone,
        email,
        city,
        address,
        status,
        id
    );

    return getCustomerById(id);
}

// DELETE  /api/customers/:id
// Delete customer
export const deleteCustomer = (id) => {
    getCustomerById(id);

    db.prepare(`
        DELETE FROM customers 
        WHERE id=?
    `).run(id);
};

// Get active customers
export const getActiveCustomers = () => {
    return db.prepare(`
        SELECT *
        FROM customers
        WHERE status = 'ACTIVE'
        ORDER BY name
    `).all();
}

// GET /api/customers/search
// Search customer
export const searchCustomers = (
    keyword = ""
) => {
    const word = `%${keyword}%`

    return db.prepare(`
        SELECT *
        FROM customers
        WHERE 
            name LIKE ?
            OR phone LIKE ?
            OR customer_code LIKE ?
    `).all(
        word,
        word,
        word
    )
}

// GET /api/customers/stats
// Get stats
export const getCustomerStats = () => {
    const totalCustomers = db.prepare(`
        SELECT COUNT(*) total
        FROM customers
    `).get();

    const activeCustomers = db.prepare(`
        SELECT COUNT(*) total
        FROM customers
        WHERE status='ACTIVE'
    `).get();

    const inactiveCustomers = db.prepare(`
        SELECT COUNT(*) total
        FROM customers
        WHERE status = 'INACTIVE'
    `).get();

    const totalDue = db.prepare(`
        SELECT COALESCE(SUM(pending_due),0) total
        FROM customers
    `).get();

    return{
        totalCustomers: totalCustomers.total,
        activeCustomers: activeCustomers.total,
        inactiveCustomers: inactiveCustomers.total,
        totalDue: totalDue.total
    };
};

// GET /api/customers?page=1&limit=10
// Paginated
export const getPaginatedCustomers = (
    page = 1,
    limit = 10
) => {
    const offset = (page-1)*limit;

    const customers = db.prepare(`
        SELECT *
        FROM customers
        ORDER by name
        LIMIT ?
        OFFSET ?
    `).all(
        limit,
        offset
    );

    const totalRecords = db.prepare(`
        SELECT COUNT(*) total
        FROM customers
    `).get();

    return {
        customers,
        pagination: {
            page,
            limit,
            totalRecords: totalRecords.total,
            totalPages: Math.ceil(totalRecords.total/limit)
        }
    };
};

// GET /api/customers/top
// Get top customers
export const getTopCustomers = () => {
    return db.prepare(`
        SELECT
            c.id,
            c.name,
            c.phone,
            COUNT(s.id) total_orders,
            COALESCE(
                SUM(s.total_amount),
                0
            ) total_sales
        FROM customers c
        LEFT JOIN sales s
        ON c.id = s.customer_id
        GROUP BY c.id
        ORDER BY total_sales DESC
        LIMIT 5
    `).all();
};

// GET /api/customers/with-due
// Get customer with dues
export const getCustomersWithDue = () => {
    return db.prepare(`
        SELECT 
            id,
            customer_code,
            name,
            phone,
            pending_due
        FROM customers
        WHERE pending_due > 0
        ORDER BY pending_due DESC
    `).all();
};

// GET /api/customers/:id/summary
// Get summary
export const getCustomerSummary = (customerId) => {
    const customer = db.prepare(`
        SELECT * 
        FROM customers
        WHERE id = ?
    `).get(customerId);

    const summary = db.prepare(`
        SELECT 
        COUNT (*) total_sales,
        COALESCE (
            SUM(total_amount),
            0
        ) total_amount,
        COALESCE (
            SUM(paid_amount),
            0
        ) paid_amount,
        COALESCE (
            SUM(due_amount),
            0
        ) due_amount
        FROM sales
        WHERE customer_id = ?
    `).get(customerId);

    return {
        customer,
        ...summary
    };
};

// GET /api/customers/report
// Get report 
export const getCustomerReport = () => {
    const totalCustomers = db.prepare(`
        SELECT COUNT(*) total
        FROM customers
    `).get();

    const todayCustomers = db.prepare(`
        SELECT COUNT(*) total
        FROM customers 
        WHERE DATE(created_at) = DATE('now')
    `).get();

    const thisMonthCustomers = db.prepare(`
        SELECT COUNT(*) total
        FROM customers 
        WHERE strftime('%Y-%m',created_at)
        = strftime('%Y-%m','now')
    `).get();

    const customersWithDue = db.prepare(`
        SELECT COUNT(*) total
        FROM customers 
        WHERE pending_due > 0
    `).get();

    return {
        totalCustomers: totalCustomers.total,
        todayCustomers: todayCustomers.total,
        thisMonthCustomers: thisMonthCustomers.total,
        customersWithDue: customersWithDue.total
    };
};
