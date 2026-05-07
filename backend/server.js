import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./pharmacy.db");
db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON;");
    // 🏢 Suppliers Table
    db.run(`
        CREATE TABLE IF NOT EXISTS suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT,
            address TEXT
        )
    `);

    // 💊 Medicines Table
    db.run(`
        CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT,
            company TEXT NOT NULL,
            supplier_id INTEGER,
            FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
            barcode TEXT UNIQUE,
            mrp REAL NOT NULL,
            dr_price REAL NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER DEFAULT 0,
            expiry_date TEXT NOT NULL
        )
    `);
});

app.get("/", (req, res) => {
    res.send("Backend is working ✅");
});

app.listen(5001, () => {
    console.log("Server is Listening on port 5001");
});

// ➕ Add Medicine
app.post("/api/medicines", (req, res) => {
    const {name, category, company, supplier_id, barcode, mrp, dr_price, price, quantity, expiry_date} = req.body;
    db.run(
        `INSERT INTO medicines(name, barcode, category, company, supplier_id, mrp, dr_price, price, quantity, expiry_date)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, barcode, category, company, supplier_id, mrp, dr_price, price, quantity, expiry_date],
        function (err) {
            if(err) {
                return res.status(500).json({error: err.message});
            }
            res.json({ message: "Medicine Added", id: this.lastID });
        }
    );
});

// 📋 Get All Medicines
app.get("/api/medicines", (req, res) => {
    db.all("SELECT * FROM medicines", [], (err, rows) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});
