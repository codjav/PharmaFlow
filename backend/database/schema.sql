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
    expiry_date TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
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