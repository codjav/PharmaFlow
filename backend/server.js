import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./pharmacy.db");
db.serialize(() => {
    // 💊 Medicines Table
    db.run(`
        CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            barcode TEXT UNIQUE,
            mrp REAL NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER DEFAULT 0,
            expiry_date TEXT
        )
    `);

    // 🏢 Suppliers Table
    db.run(`
        CREATE TABLE IF NOT EXISTS suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT,
            address TEXT
        )
    `);
})

app.get("/", (req, res) => {
    res.send("Backend is working ✅");
});

app.listen(5001, () => {
    console.log("Server is Listening on port 5001");
});