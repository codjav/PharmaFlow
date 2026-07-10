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
    email TEXT,
    city TEXT,
    address TEXT,
    status TEXT DEFAULT 'ACTIVE',
    pending_due REAL DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS medicines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER,
    company TEXT NOT NULL,
    supplier_id INTEGER,
    barcode TEXT UNIQUE,
    minimum_stock INTEGER DEFAULT 5,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id)
        REFERENCES categories(id),
    FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
);


CREATE TABLE IF NOT EXISTS medicine_batches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medicine_id INTEGER NOT NULL,
    supplier_id INTEGER NOT NULL,
    batch_number TEXT NOT NULL,
    purchase_id INTEGER,
    expiry_date TEXT NOT NULL,
    mrp REAL NOT NULL,
    purchase_price REAL NOT NULL,
    dr_price REAL NOT NULL,
    selling_price REAL NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity >= 0),
    status TEXT DEFAULT 'ACTIVE',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(medicine_id, supplier_id, batch_number),
    FOREIGN KEY (medicine_id)
        REFERENCES medicines(id)
        ON DELETE CASCADE,
    FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id),
    FOREIGN KEY (purchase_id)
        REFERENCES purchases(id)
);


CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_code TEXT UNIQUE,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    city TEXT,
    address TEXT,
    status TEXT DEFAULT 'ACTIVE',
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


CREATE TABLE IF NOT EXISTS purchase_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_id INTEGER NOT NULL,
    medicine_id INTEGER NOT NULL,
    medicine_name TEXT NOT NULL,
    batch_number TEXT NOT NULL,
    expiry_date TEXT NOT NULL,
    mrp REAL NOT NULL,
    purchase_price REAL NOT NULL,
    dr_price REAL NOT NULL,
    selling_price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    subtotal REAL NOT NULL,
    FOREIGN KEY (purchase_id)
        REFERENCES purchases(id)
        ON DELETE CASCADE,
    FOREIGN KEY (medicine_id)
        REFERENCES medicines(id)
);


CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number TEXT UNIQUE,
    customer_id INTEGER,
    sale_type TEXT DEFAULT 'RETAIL',
    payment_type TEXT,
    subtotal REAL,
    discount REAL DEFAULT 0,
    gst REAL DEFAULT 18,
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
    sale_id INTEGER NOT NULL,
    medicine_id INTEGER NOT NULL,
    batch_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    discount REAL DEFAULT 0,
    total REAL NOT NULL,
    FOREIGN KEY(sale_id)
        REFERENCES sales(id),
    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id),
    FOREIGN KEY(batch_id)
        REFERENCES medicine_batches(id)
);


CREATE TABLE IF NOT EXISTS stock_movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medicine_id INTEGER NOT NULL,
    batch_id INTEGER NOT NULL,
    movement_type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    reference_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medicine_id)
        REFERENCES medicines(id),
    FOREIGN KEY (batch_id)
        REFERENCES medicine_batches(id)
);


CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pharmacy_name TEXT,
    owner_name TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    gst_number TEXT,
    drug_license_number TEXT,
    theme TEXT DEFAULT 'LIGHT',
    auto_backup INTEGER DEFAULT 1,
    backup_location TEXT,
    backup_frequency TEXT DEFAULT 'DAILY',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS backup_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT,
    file_path TEXT,
    backup_date TEXT DEFAULT CURRENT_TIMESTAMP
)