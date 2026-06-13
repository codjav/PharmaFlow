CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    contact_person TEXT,
    phone TEXT NOT NULL,
    address TEXT,
    pending_due REAL DEFAULT 0.00,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    batch_number TEXT NOT NULL,
    category TEXT,
    company TEXT NOT NULL,
    supplier_id INTEGER,
    barcode TEXT UNIQUE,
    mrp REAL NOT NULL,
    dr_price REAL NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL CHECK(stock_quantity >= 0),
    expiry_date TEXT NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);