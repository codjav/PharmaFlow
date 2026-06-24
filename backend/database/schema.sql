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
    batch_number TEXT NOT NULL,
    category_id INTEGER,
    company TEXT NOT NULL,
    supplier_id INTEGER,
    barcode TEXT UNIQUE,
    mrp REAL NOT NULL,
    dr_price REAL NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK(quantity >= 0),
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
    sale_id INTEGER,
    medicine_id INTEGER,
    batch_number TEXT,
    expiry_date TEXT,
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
    gst_number TEXT,
    drug_license_number TEXT,
    invoice_prefix TEXT DEFAULT 'INV',
    purchase_prefix TEXT DEFAULT 'PUR',
    currency TEXT DEFAULT '₹',
    theme TEXT DEFAULT 'LIGHT',
    printer_type TEXT DEFAULT 'THERMAL',
    default_printer TEXT,
    invoice_size TEXT DEFAULT 'THERMAL',
    show_logo INTEGER DEFAULT 1,
    show_gst INTEGER DEFAULT 1,
    footer_message TEXT DEFAULT 'Thank You For Visiting',
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