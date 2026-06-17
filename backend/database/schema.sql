CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT,
    email TEXT,
    role TEXT DEFAULT 'ADMIN',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_code TEXT UNIQUE,
    name TEXT NOT NULL UNIQUE,
    company_name TEXT,
    contact_person TEXT,
    phone TEXT NOT NULL,
    address TEXT,
    pending_due REAL DEFAULT 0.00,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS medicines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    batch_number TEXT NOT NULL,
    category_id INTEGER,
    company TEXT NOT NULL,
    supplier_id INTEGER,
    barcode TEXT UNIQUE,
    mrp REAL NOT NULL,
    dr_price REAL NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK(stock_quantity >= 0),
    minimum_stock INTEGER DEFAULT 5,
    expiry_date TEXT NOT NULL,
    image TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) 
        REFERENCES categories(id),
    FOREIGN KEY (supplier_id) 
        REFERENCES suppliers(id)
);


CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_code TEXT UNIQUE,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    total_purchase REAL DEFAULT 0,
    pending_due REAL DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number TEXT UNIQUE,
    supplier_id INTEGER NOT NULL,
    total_amount REAL,
    paid_amount REAL DEFAULT 0,
    due_amount REAL DEFAULT 0,
    status TEXT,
    purchase_date TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(supplier_id) 
        REFERENCES suppliers(id)
);


CREATE TABLE purchase_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_id INTEGER,
    medicine_id INTEGER,
    quantity INTEGER,
    purchase_price REAL,
    subtotal REAL,
    FOREIGN KEY(purchase_id)
        REFERENCES purchases(id),
    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id)
);


CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number TEXT UNIQUE,
    customer_id INTEGER,
    payment_type TEXT,
    subtotal REAL,
    discount REAL DEFAULT 0,
    gst REAL DEFAULT 0,
    total_amount REAL,
    paid_amount REAL,
    due_amount REAL,
    status TEXT,
    sale_date TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id)
        REFERENCES customers(id)
);


CREATE TABLE IF NOT EXISTS sale_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER,
    medicine_id INTEGER,
    quantity INTEGER,
    unit_price REAL,
    discount REAL DEFAULT 0,
    total REAL,
    FOREIGN KEY(sale_id)
        REFERENCES sales(id),
    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id)
);


CREATE TABLE IF NOT EXISTS stock_movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medicine_id INTEGER,
    movement_type TEXT,
    quantity INTEGER,
    reference_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id)
);


CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pharmacy_name TEXT,
    owner_name TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    theme TEXT DEFAULT 'LIGHT'
);

